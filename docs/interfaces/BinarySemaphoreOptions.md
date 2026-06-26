[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / BinarySemaphoreOptions

# Interface: BinarySemaphoreOptions

Defined in: [src/async-semaphore.ts:41](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L41)

二进制信号量的配置选项。

## Extended by

- [`SemaphoreOptions`](SemaphoreOptions.md)

## Properties

### capacity?

> `optional` **capacity?**: `number`

Defined in: [src/async-semaphore.ts:64](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L64)

内部等待队列的初始预分配容量。
适用于高性能场景，开发者可以根据并发规模预估此值以减少动态扩容。

***

### initFn?

> `optional` **initFn?**: () => `any`

Defined in: [src/async-semaphore.ts:47](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L47)

用于初始化令牌的函数。
当信号量释放且没有等待任务时，如果未提供令牌，将调用此函数生成新令牌。
默认为 `() => '1'`。

#### Returns

`any`

***

### pauseFn?

> `optional` **pauseFn?**: () => `void`

Defined in: [src/async-semaphore.ts:53](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L53)

可选的暂停函数。
当等待队列开始积压（第一个任务进入队列）时调用，用于通知上游停止发送数据，
以避免产生过多的等待 Promise 导致内存溢出。

#### Returns

`void`

***

### resumeFn?

> `optional` **resumeFn?**: () => `void`

Defined in: [src/async-semaphore.ts:59](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L59)

可选的恢复函数。
当信号量有空闲槽位且之前已调用过 `pauseFn` 时调用。
如果定义了 `pauseFn`，则必须同时定义此函数。

#### Returns

`void`
