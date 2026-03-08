import net from 'net'

export interface FindPortOptions {
  retryCount?: number
  host?: string
}

let lastSearch: Promise<any> = Promise.resolve()

/**
 * Finds an available port.
 *
 * @param port - The starting port number or a string representation of it. Defaults to 0 (random port).
 * @param options - Either the retry count (number) or an options object.
 * @returns A promise that resolves to the available port number.
 */
export async function findPort(
  port: string | number | undefined,
  options?: number | FindPortOptions
): Promise<number> {
  // 简单的 Promise 序列化，确保同一进程内探测任务排队执行，解决并发冲突
  const result = await (lastSearch = lastSearch.catch(() => {}).then(() => _findPort(port, options)))
  return result
}

async function _findPort(
  port: string | number | undefined,
  options?: number | FindPortOptions
): Promise<number> {
  let retryCount = 10
  let host: string | undefined

  if (typeof options === 'number') {
    retryCount = options
  } else if (options && typeof options === 'object') {
    retryCount = options.retryCount ?? 10
    host = options.host
  }

  let currentPort: number
  if (port === undefined) {
    currentPort = 0
  } else {
    currentPort = typeof port === 'string' ? parseInt(port, 10) : Math.floor(port)
    if (!(currentPort >= 0)) {
      currentPort = 0
    }
    if (currentPort > 65535) {
      throw new Error('Port out of range: ' + currentPort)
    }
  }

  for (let i = 0; i <= retryCount; i++) {
    try {
      return await tryListen(currentPort, host)
    } catch (err: any) {
      if (i === retryCount) {
        throw err
      }

      const isPermissionError = err.code === 'EACCES' || err.code === 'EPERM'
      const isAddrInUse = err.code === 'EADDRINUSE'

      if (isPermissionError || isAddrInUse) {
        if (isPermissionError && currentPort < 1024) {
          currentPort = 1024
        } else {
          currentPort++
        }

        if (currentPort > 65535) {
          throw new Error('No available ports found up to 65535')
        }
      } else {
        throw err
      }
    }
  }

  /* v8 ignore next 2 */
  throw new Error('No available ports found')
}

function tryListen(port: number, host?: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()

    server.on('error', (err) => {
      server.close(() => reject(err))
    })

    server.listen(port, host, () => {
      const addr = server.address() as net.AddressInfo
      const result = addr.port
      server.close((err) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  })
}
