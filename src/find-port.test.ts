import { describe, test, expect, vi, afterEach } from 'vitest'
import net from 'net'
import { findPort } from './find-port'

describe('findPort', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // --- 1. 参数与输入验证 ---

  test('should return the same port if it is available', async () => {
    const port = await findPort(13000)
    expect(port).toBe(13000)
  })

  test('should return a random available port when port is 0', async () => {
    const port = await findPort(0)
    expect(port).toBeGreaterThan(0)
  })

  test('should return a random available port when port is undefined', async () => {
    const port = await findPort(undefined as any)
    expect(port).toBeGreaterThan(0)
  })

  test('should handle string port numbers (including float strings)', async () => {
    expect(await findPort('13200')).toBe(13200)
    expect(await findPort('13200.9')).toBe(13200)
  })

  test('should handle invalid numeric inputs', async () => {
    expect(await findPort(-10)).toBeGreaterThan(0)
    expect(await findPort(3000.7)).toBe(3000)
    expect(await findPort('abc' as any)).toBeGreaterThan(0)
  })

  test('should throw if starting port is out of range', async () => {
    await expect(findPort(70000)).rejects.toThrow('Port out of range')
  })

  // --- 2. 选项与网络配置 ---

  test('should support host option (IPv4 and IPv6)', async () => {
    const port = await findPort(13300, { host: '127.0.0.1' })
    expect(port).toBe(13300)
    try {
      const portV6 = await findPort(13400, { host: '::1' })
      expect(portV6).toBe(13400)
    } catch (e: any) {
      if (e.code !== 'EADDRNOTAVAIL') throw e
    }
  })

  test('should support retryCount in number format (legacy)', async () => {
    const s = net.createServer().listen(20000)
    try {
      const port = await findPort(20000, 1)
      expect(port).toBe(20001)
    } finally {
      s.close()
    }
  })

  test('should support retryCount in options object', async () => {
    const s = net.createServer().listen(20100)
    try {
      const port = await findPort(20100, { retryCount: 1 })
      expect(port).toBe(20101)
    } finally {
      s.close()
    }
  })

  // --- 3. 错误逻辑与跳转验证 (Mock) ---

  test('should jump to 1024 if EACCES occurs below 1024', async () => {
    const mockServer = new net.Server()
    vi.spyOn(net, 'createServer').mockReturnValueOnce(mockServer)
    vi.spyOn(mockServer, 'listen').mockImplementationOnce(function(this: any) {
      const err: any = new Error('EACCES'); err.code = 'EACCES'
      process.nextTick(() => this.emit('error', err))
      return this
    })
    const port = await findPort(80)
    expect(port).toBe(1024)
  })

  test('should jump to 1024 if EPERM occurs below 1024', async () => {
    const mockServer = new net.Server()
    vi.spyOn(net, 'createServer').mockReturnValueOnce(mockServer)
    vi.spyOn(mockServer, 'listen').mockImplementationOnce(function(this: any) {
      const err: any = new Error('EPERM'); err.code = 'EPERM'
      process.nextTick(() => this.emit('error', err))
      return this
    })
    const port = await findPort(82)
    expect(port).toBe(1024)
  })

  test('should NOT jump to 1024 if EADDRINUSE occurs below 1024', async () => {
    const s1 = new net.Server(); vi.spyOn(net, 'createServer').mockReturnValueOnce(s1)
    vi.spyOn(s1, 'listen').mockImplementationOnce(function(this: any) {
      const err: any = new Error('EADDRINUSE'); err.code = 'EADDRINUSE'
      process.nextTick(() => this.emit('error', err)); return this
    })
    vi.spyOn(s1, 'close').mockImplementationOnce(function(this: any, cb: any) {
      if (cb) process.nextTick(cb); return this
    })

    const s2 = new net.Server(); vi.spyOn(net, 'createServer').mockReturnValueOnce(s2)
    vi.spyOn(s2, 'listen').mockImplementationOnce(function(this: any, ...args: any[]) {
      const p = args[0]; const cb = args.find(a => typeof a === 'function')
      this.address = () => ({ port: p })
      if (cb) process.nextTick(cb); return this
    })
    vi.spyOn(s2, 'close').mockImplementationOnce(function(this: any, cb: any) {
      if (cb) process.nextTick(cb); return this
    })

    const port = await findPort(90)
    expect(port).toBe(91)
  })

  test('should just increment if EACCES occurs at or above 1024', async () => {
    const mockServer = new net.Server()
    vi.spyOn(net, 'createServer').mockReturnValueOnce(mockServer)
    vi.spyOn(mockServer, 'listen').mockImplementationOnce(function(this: any) {
      const err: any = new Error('EACCES'); err.code = 'EACCES'
      process.nextTick(() => this.emit('error', err)); return this
    })
    vi.spyOn(mockServer, 'close').mockImplementationOnce(function(this: any, cb: any) {
      if (cb) process.nextTick(cb); return this
    })
    const port = await findPort(2000)
    expect(port).toBe(2001)
  })

  test('should handle mixed error path: EACCES(80) -> EADDRINUSE(1024) -> SUCCESS(1025)', async () => {
    const s1 = new net.Server(); vi.spyOn(net, 'createServer').mockReturnValueOnce(s1)
    vi.spyOn(s1, 'listen').mockImplementationOnce(function(this: any) {
      const err: any = new Error('EACCES'); err.code = 'EACCES'
      process.nextTick(() => this.emit('error', err)); return this
    })
    vi.spyOn(s1, 'close').mockImplementationOnce(function(this: any, cb: any) { if (cb) process.nextTick(cb); return this })

    const s2 = new net.Server(); vi.spyOn(net, 'createServer').mockReturnValueOnce(s2)
    vi.spyOn(s2, 'listen').mockImplementationOnce(function(this: any) {
      const err: any = new Error('EADDRINUSE'); err.code = 'EADDRINUSE'
      process.nextTick(() => this.emit('error', err)); return this
    })
    vi.spyOn(s2, 'close').mockImplementationOnce(function(this: any, cb: any) { if (cb) process.nextTick(cb); return this })

    const port = await findPort(80, 5)
    expect(port).toBe(1025)
  })

  // --- 4. 边界限制验证 ---

  test('should honor retryCount: 0', async () => {
    const server = net.createServer().listen(18000)
    try {
      await expect(findPort(18000, 0)).rejects.toThrow('EADDRINUSE')
    } finally {
      server.close()
    }
  })

  test('should throw error if all retries fail', async () => {
    const s1 = net.createServer().listen(21000)
    const s2 = net.createServer().listen(21001)
    try {
      await expect(findPort(21000, 1)).rejects.toThrow('EADDRINUSE')
    } finally {
      s1.close(); s2.close()
    }
  })

  test('should throw error if port exceeds 65535 via retry', async () => {
    const server = net.createServer().listen(65535)
    try {
      await expect(findPort(65535, 1)).rejects.toThrow('No available ports found up to 65535')
    } finally {
      server.close()
    }
  })

  test('should throw if host is unreachable/invalid', async () => {
    await expect(findPort(3000, { host: 'invalid.host.local', retryCount: 0 })).rejects.toThrow()
  })

  // --- 5. 并发与独立性 ---

  test('should handle concurrent calls (serialization)', async () => {
    const results = await Promise.all([
      findPort(16000),
      findPort(16000),
      findPort(16000)
    ])
    expect(results).toEqual([16000, 16000, 16000])
  })

  test('should not block queue if a previous call failed', async () => {
    const results = await Promise.allSettled([
      findPort(80000), 
      findPort(17000)  
    ])
    expect(results[0].status).toBe('rejected')
    expect(results[1].status).toBe('fulfilled')
    if (results[1].status === 'fulfilled') {
      expect(results[1].value).toBe(17000)
    }
  })
})
