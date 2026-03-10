import { isAsync } from 'util-ex'
import { EventEmitter } from 'events-ex'
import { Deque } from './deque'
import { AbortError } from '@isdk/common-error'

// async-sema Released under MIT
// https://github.com/vercel/async-sema/blob/main/src/index.ts

/**
 * 信号量内部等待队列的默认预分配容量。
 * 当选项中未指定容量时使用此值。
 */
export const DefaultAsyncSemaphoreCapacity = 32

/**
 * 就绪检查函数的类型定义。
 * 可以是同步或异步函数。返回 `true` 表示信号量已准备好接受新请求。
 */
export type SemaphoreIsReadyFuncType = () => Promise<boolean> | boolean

/**
 * 内部辅助函数，判断输入是否为函数。
 * @param x 要检查的值
 * @returns 如果是函数则返回 true
 */
function isFn(x: any) {
  return typeof x === 'function'
}

/**
 * 默认的令牌初始化函数。
 * 默认返回字符串 '1' 作为令牌。
 */
function defaultInit() {
  return '1'
}

/**
 * 二进制信号量的配置选项。
 */
export interface BinarySemaphoreOptions {
  /**
   * 用于初始化令牌的函数。
   * 当信号量释放且没有等待任务时，如果未提供令牌，将调用此函数生成新令牌。
   * 默认为 `() => '1'`。
   */
  initFn?: () => any
  /**
   * 可选的暂停函数。
   * 当等待队列开始积压（第一个任务进入队列）时调用，用于通知上游停止发送数据，
   * 以避免产生过多的等待 Promise 导致内存溢出。
   */
  pauseFn?: () => void
  /**
   * 可选的恢复函数。
   * 当信号量有空闲槽位且之前已调用过 `pauseFn` 时调用。
   * 如果定义了 `pauseFn`，则必须同时定义此函数。
   */
  resumeFn?: () => void
  /**
   * 内部等待队列的初始预分配容量。
   * 适用于高性能场景，开发者可以根据并发规模预估此值以减少动态扩容。
   */
  capacity?: number
}

/**
 * 获取信号量时的选项。
 */
export interface BinarySemaphoreAcquireOptions {
  /**
   * 可选的 AbortSignal，用于取消获取操作。
   * 如果在获取到令牌前信号被中止，`acquire` 返回的 Promise 将被拒绝并抛出 `AbortError`。
   */
  signal?: AbortSignal
  /**
   * 允许扩展其他自定义选项。
   */
  [n: string]: any
}

/**
 * 释放信号量时的选项。
 */
export interface BinarySemaphoreReleaseOptions {
  /**
   * 可选的令牌。如果使用了自定义的 `initFn`，释放时应归还对应的令牌。
   */
  token?: any
  /**
   * 允许扩展其他自定义选项。
   */
  [n: string]: any
}

/**
 * 信号量释放函数的接口定义。
 * 它本身是一个函数，同时也包含释放选项作为属性。
 */
export interface BinarySemaphoreReleaserFunc extends BinarySemaphoreReleaseOptions {
  /**
   * 调用此函数以释放信号量。
   */
  (): void
}

/**
 * 通用信号量的配置选项，继承自二进制信号量选项。
 */
export interface SemaphoreOptions extends BinarySemaphoreOptions {
  /**
   * 最大并发数。
   * 指定允许同时获取信号量的最大调用方数量。
   */
  maxConcurrency?: number
  /**
   * 可选的就绪检查函数。
   * 在尝试获取令牌前调用，如果返回 false（或解析为 false 的 Promise），则无法立即获取。
   */
  isReadyFn?: SemaphoreIsReadyFuncType
}

/**
 * 内部等待任务项的结构定义。
 */
export interface SemaphoreTaskItem extends BinarySemaphoreAcquireOptions {
  /**
   * 当获取成功时调用的解析函数，接收释放函数作为参数。
   */
  resolve: (value: any) => void
  /**
   * 当获取失败（如被中止）时调用的拒绝函数。
   */
  reject: (reason?: any) => void
  /**
   * 与此任务关联的令牌。
   */
  token?: any
}

/**
 * 二进制信号量（Binary Semaphore）实现。
 * 二进制信号量在任何时刻只允许一个调用方获取成功（类似于互斥锁）。
 * 它提供了获取（acquire）、释放（release）以及管理等待队列的机制，并支持背压控制（通过 pauseFn/resumeFn）。
 *
 * 示例用法：
 *
 * ```typescript
 * const semaphore = new BinarySemaphore();
 *
 * async function performTask(data) {
 *   const release = await semaphore.acquire();
 *   try {
 *     console.log('正在处理:', data);
 *     // 执行异步操作...
 *   } finally {
 *     release(); // 或者使用 semaphore.release();
 *   }
 * }
 * ```
 */
export class BinarySemaphore {
  /** 存储等待获取令牌的任务队列。 */
  readonly waiting: Deque<SemaphoreTaskItem | undefined>
  /** 当前空闲的令牌。对于二进制信号量，只能持有一个令牌。 */
  protected free: any
  /** 内部事件触发器，用于协调释放和分发逻辑。 */
  protected emitter: EventEmitter
  /** 标记是否使用默认的令牌初始化函数。 */
  protected useDefaultTokens: boolean
  /** 获取积压时的暂停回调。 */
  protected pauseFn?: () => void
  /** 恢复处理的回调。 */
  protected resumeFn?: () => void
  /** 令牌初始化函数。 */
  protected initTokenFn: (token?: any) => void
  /** 记录当前是否处于暂停状态。 */
  protected paused: boolean
  /** 记录当前活跃的（已获取但未释放）操作总数。 */
  protected _activeCount: number

  /**
   * 创建一个二进制信号量实例。
   *
   * @param options 配置选项。
   * @throws {Error} 如果只提供了 pauseFn 而未提供 resumeFn，或者反之，则抛出错误。
   */
  constructor(options: BinarySemaphoreOptions = {}) {
    const {
      initFn = defaultInit,
      pauseFn,
      resumeFn,
      capacity = DefaultAsyncSemaphoreCapacity,
    } = options

    if (isFn(pauseFn) !== isFn(resumeFn)) {
      throw new Error('pauseFn and resumeFn must be both set for pausing')
    }

    this.waiting = new Deque(capacity)
    this.emitter = new EventEmitter()
    this.useDefaultTokens = initFn === defaultInit
    this.pauseFn = pauseFn
    this.resumeFn = resumeFn
    this.initTokenFn = initFn
    this.paused = false
    this._activeCount = 0
    this.initFree(options)
    this.init(options)
  }

  /**
   * 初始化空闲令牌。在构造函数中被调用。
   * @param options 配置选项。
   */
  initFree(options?: BinarySemaphoreOptions) {
    this.free = this.initTokenFn()
  }

  /**
   * 当信号量被释放时执行的内部处理逻辑。
   * 检查等待队列，如果有任务则分发令牌；否则将令牌归还至空闲池，并视情况调用 `resumeFn`。
   *
   * @param options 释放选项，可能包含令牌。
   */
  onReleased(options?: BinarySemaphoreReleaseOptions) {
    const token = options?.token
    const task = this.waiting.shift(true)

    if (task) {
      this._dispatchTask(task, options)
    } else {
      if (this.resumeFn && this.paused) {
        this.paused = false
        this.resumeFn()
      }

      this.unlock(token)
    }
  }

  /**
   * 初始化事件监听。在构造函数中被调用。
   * @param options 配置选项。
   */
  init(options: BinarySemaphoreOptions) {
    this.emitter.on('release', (item?: Partial<SemaphoreTaskItem>) => {
      this.onReleased(item)
    })
  }

  /**
   * 创建一个新的释放函数。
   * 确保释放逻辑只被执行一次，并携带相关的释放选项。
   *
   * @param options 释放选项。
   * @returns 返回一个可调用的释放函数。
   * @internal
   */
  _newReleaser(options?: BinarySemaphoreReleaseOptions) {
    let called = false
    const releaser = () => {
      if (called) return
      called = true

      this.release(options)
    }
    if (options) {
      Object.assign(releaser, options)
    }

    return releaser as BinarySemaphoreReleaserFunc
  }

  /**
   * 将令牌分发给等待的任务。
   *
   * @param task 等待中的任务项。
   * @param options 释放时传递的选项。
   * @internal
   */
  _dispatchTask(
    task: SemaphoreTaskItem,
    options?: BinarySemaphoreReleaseOptions
  ) {
    const { resolve } = task
    resolve(this._newReleaser(options))
  }

  /**
   * 锁定信号量。尝试从空闲池中提取令牌。
   *
   * @param options 获取选项。
   * @returns 如果有可用令牌则返回该令牌，否则返回 undefined。
   */
  lock(options?: BinarySemaphoreAcquireOptions) {
    const free = this.free
    if (free) {
      this.free = undefined
      return free
    }
  }

  /**
   * 解锁信号量。将令牌归还至空闲池。
   *
   * @param token 要归还的令牌。如果未提供，则使用初始化函数生成。
   */
  unlock(token?: any) {
    this.free = this.useDefaultTokens ? '1' : (token ?? this.initTokenFn())
  }

  /**
   * 尝试立即获取令牌。
   * 如果信号量当前不可用，则立即返回 `undefined` 而不进入等待队列。
   *
   * @param options 获取选项。
   * @returns 如果获取成功则返回令牌，否则返回 `undefined`。
   */
  tryAcquire(options?: BinarySemaphoreAcquireOptions): any | undefined {
    return this.lock(options)
  }

  /**
   * 获取信号量。
   * 如果信号量当前可用，将立即解析。否则，调用方将被加入等待队列，
   * 直到有令牌被释放。
   *
   * 逻辑流程：
   * 1. 增加活跃计数。
   * 2. 尝试通过 `tryAcquire` 立即获取令牌。
   * 3. 如果 `tryAcquire` 返回的是异步结果（通过 `isAsync` 判断），则等待其解析。
   * 4. 如果最终未获得令牌，则将任务推入 `waiting` 队列，并处理可选的 `AbortSignal`。
   * 5. 如果此时是队列中的第一个任务且定义了 `pauseFn`，则触发暂停回调。
   *
   * @param options 获取选项，可包含 `signal` 用于取消。
   * @returns 解析为释放函数（`BinarySemaphoreReleaserFunc`）的 Promise。
   */
  async acquire(options?: BinarySemaphoreAcquireOptions) {
    this._activeCount++
    const signal = options?.signal
    const addTaskToWait = (task: SemaphoreTaskItem) => {
      if (this.pauseFn && !this.paused) {
        this.paused = true
        this.pauseFn()
      }

      const index = this.waiting.push(task)
      const reject = task.reject
      if (signal) {
        signal.addEventListener('abort', () => {
          this.waiting[index] = undefined
          const reason =
            signal.reason instanceof Error
              ? signal.reason
              : new AbortError(signal.reason || 'aborted')
          ;(signal as any).alreadyRejected = true
          reject(reason)
        })
      }
      return index
    }

    const token = this.tryAcquire(options)
    const isAsyncToken = token && isAsync(token)
    const newPromise = (token?: any) =>
      new Promise<BinarySemaphoreReleaserFunc>((resolve, reject) => {
        const task: SemaphoreTaskItem = { ...options, resolve, reject, token }
        if (token === undefined) {
          addTaskToWait(task)
        } else {
          this._dispatchTask(task, { ...options, token })
        }
      })

    // token !== undefined means that the semaphore is not full, so we can resolve the promise immediately.
    //const result = token !== undefined ? Promise.resolve(token) : new Promise(addWait);
    const result = isAsyncToken
      ? token.then((token: any) => newPromise(token))
      : newPromise(token)
    return result as Promise<BinarySemaphoreReleaserFunc>
  }

  /**
   * 释放信号量，增加可用执行槽位。
   * 如果等待队列中有任务，将触发下一个任务的执行。
   * 此方法会减少 `activeCount` 并发出 'release' 事件。
   *
   * @param options 释放选项。
   */
  release(options?: BinarySemaphoreReleaseOptions): void {
    this._activeCount--
    this.emitter.emit('release', options)
  }

  /**
   * 等待所有当前活跃的操作完成。
   * 它通过尝试获取一次信号量来确保之前的操作已经释放。
   * 在进程终止前使用此方法以确保没有挂起的异步任务。
   *
   * @returns 解析为包含已获取令牌的数组的 Promise。
   */
  drain(): Promise<any[]> {
    const a = [this.acquire()]
    return Promise.all(a)
  }

  /**
   * 中止所有正在等待的任务。
   * 所有在等待队列中的 Promise 将被拒绝并抛出 `AbortError`。
   *
   * @param reason 中止的原因。
   */
  abort(reason?: any): void {
    let p: SemaphoreTaskItem | undefined
    while ((p = this.waiting.shift(true))) {
      p.reject(new AbortError(reason))
      // this.unlock(p.token);
    }
  }

  /**
   * 获取所有活跃操作的总数。
   * 包含：
   * - 正在队列中等待获取信号量的操作（`pendingCount`）。
   * - 已经成功获取信号量但尚未释放的操作。
   *
   * @returns 活跃操作的总数。
   */
  get activeCount(): number {
    return this._activeCount
  }

  /**
   * 获取当前在等待队列中的调用方数量。
   *
   * @returns 等待中的 Promise 数量。
   */
  get pendingCount(): number {
    return this.waiting.size
  }
}

/**
 * 计数信号量（Semaphore）实现。
 * 扩展自二进制信号量，允许指定最大并发数（`maxConcurrency`）。
 * 支持可选的就绪检查（`isReadyFn`）。
 *
 * 示例用法：
 *
 * ```typescript
 * const semaphore = new Semaphore(5); // 允许 5 个并发操作
 *
 * async function fetchData(id) {
 *   const release = await semaphore.acquire();
 *   try {
 *     console.log(`正在获取数据 ${id}, 等待中: ${semaphore.pendingCount}`);
 *     // ... 异步操作
 *   } finally {
 *     release();
 *   }
 * }
 * ```
 */
export class Semaphore extends BinarySemaphore {
  /** 最大并发限制。 */
  readonly maxConcurrency: number
  /** 存储空闲令牌的队列。 */
  protected override free: Deque<any>
  /** 就绪检查函数。 */
  private isReady?: SemaphoreIsReadyFuncType

  /**
   * 创建一个计数信号量实例。
   *
   * @param maxConcurrency 最大并发数，或者包含并发设置的配置对象。
   * @param options 配置选项。
   * @throws {Error} 如果未指定有效并发数则抛出错误。
   */
  constructor(
    maxConcurrency: number | SemaphoreOptions,
    options?: SemaphoreOptions
  ) {
    if (typeof maxConcurrency === 'number') {
      options = options || {}
      options.maxConcurrency = maxConcurrency
    } else {
      options = maxConcurrency
      if (typeof options.maxConcurrency !== 'number') {
        throw new Error('maxConcurrency must be set')
      }
      // maxConcurrency = options.maxConcurrency
    }
    super(options)
    this.maxConcurrency = options.maxConcurrency
    if (options.isReadyFn) this.isReady = options.isReadyFn
  }

  /**
   * 初始化令牌池，填充至最大并发数。
   * @param options 配置选项。
   */
  override initFree(options: SemaphoreOptions) {
    const maxConcurrency = (options.maxConcurrency = Math.max(
      1,
      options.maxConcurrency!
    ))
    this.free = new Deque(maxConcurrency)
    for (let i = 0; i < maxConcurrency; i++) {
      this.free.push(this.initTokenFn())
    }
  }

  /**
   * 尝试获取令牌，包含就绪状态检查。
   * 如果定义了 `isReadyFn`，将先调用它。
   *
   * @param options 获取选项。
   * @returns 可能返回令牌、Promise（当就绪检查为异步时）或 undefined。
   */
  override tryAcquire(
    options?: BinarySemaphoreAcquireOptions
  ): Promise<any | undefined> | any | undefined {
    let isReady = this.isReady as unknown as Promise<boolean>
    if (isReady && isAsync(isReady)) {
      const isPromise = isReady instanceof Promise
      if (!isPromise) {
        isReady = (isReady as any)() as Promise<boolean>
      }
      return isReady.then((ready: boolean) => {
        if (ready) {
          return this.lock(options)
        }
      })
    } else if (!isReady || (isReady as any)()) {
      return this.lock(options)
    }
  }

  /**
   * 将令牌归还至空闲令牌池。
   * @param token 要归还的令牌。
   */
  override unlock(token?: any) {
    this.free.push(this.useDefaultTokens ? '1' : (token ?? this.initTokenFn()))
  }

  /**
   * 从空闲令牌池中取出一个令牌。
   * @param options 获取选项。
   * @returns 如果池中不为空则返回一个令牌，否则返回 undefined。
   */
  override lock(options?: BinarySemaphoreAcquireOptions) {
    return this.free.pop()
  }

  /**
   * 消耗掉所有并发槽位，确保当前没有其他操作正在运行。
   * 常用于在关键操作前清空并发环境。
   *
   * @returns 解析为包含所有令牌数组的 Promise。
   */
  override drain(): Promise<any[]> {
    const a = new Array(this.maxConcurrency)
    for (let i = 0; i < this.maxConcurrency; i++) {
      a[i] = this.acquire()
    }
    return Promise.all(a)
  }
}

/**
 * 创建一个速率限制器函数（Rate Limiter）。
 * 当调用频率超过设定的 `rps`（每秒请求数）时，该函数会通过 Promise 阻塞调用方，
 * 并在调用率回到限制范围内时解析。
 *
 * @param rps 限制的速率。默认单位时间内允许的请求数。
 * @param options 配置项。
 * @param options.timeUnit 时间窗口大小（毫秒）。默认为 1000ms。
 * @param options.uniformDistribution 是否强制离散均匀分布。
 *    - 若为 `false`（默认）：允许在时间窗口开始时立即耗尽所有配额，然后暂停直到窗口结束。
 *    - 若为 `true`：将配额均匀分配到时间窗口内（例如 5 rps 会每 200ms 允许一次请求）。
 *      在流量持续且快速的场景下（如读取文件）建议开启，以避免瞬时突发流量。
 * @returns 返回一个异步限流函数，调用该函数即可实现限流。
 *
 * 示例：
 * ```ts
 * const lim = RateLimit(5); // 限制为 5 次/秒
 *
 * async function processItems(items) {
 *   for (const item of items) {
 *     await lim(); // 可能会在这里阻塞
 *     await handle(item);
 *   }
 * }
 * ```
 */
export function RateLimit(
  rps: number,
  {
    timeUnit = 1000,
    uniformDistribution = false,
  }: {
    timeUnit?: number
    uniformDistribution?: boolean
  } = {}
) {
  const sema = new Semaphore(uniformDistribution ? 1 : rps)
  const delay = uniformDistribution ? timeUnit / rps : timeUnit

  return async function rl() {
    await sema.acquire()
    setTimeout(() => sema.release(), delay)
  }
}
