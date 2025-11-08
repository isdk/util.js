
import { describe, test, expect } from 'vitest'
import net from 'net'
import { findPort } from './find-port'

describe('findPort', () => {
  test('should return the same port if it is available', async () => {
    const port = await findPort(3000)
    expect(port).toBe(3000)
  })

  test('should return a new port if the given port is occupied', async () => {
    const server = net.createServer().listen(3001)
    const port = await findPort(3001)
    expect(port).toBe(3002)
    server.close()
  })

  test('should return a random available port when port is 0', async () => {
    const port = await findPort(0)
    expect(port).toBeGreaterThan(0)
  })

  test('should return a random available port when port is undefined', async () => {
    const port = await findPort(undefined as any)
    expect(port).toBeGreaterThan(0)
  })

  test('should handle string port numbers', async () => {
    const port = await findPort('3005')
    expect(port).toBe(3005)
  })

  test('should return a new port if the given string port is occupied', async () => {
    const server = net.createServer().listen(3006)
    const port = await findPort('3006')
    expect(port).toBe(3007)
    server.close()
  })

  test('should reject when all retries fail', async () => {
    const server1 = net.createServer().listen(4000)
    const server2 = net.createServer().listen(4001)
    const server3 = net.createServer().listen(4002)
    await expect(findPort(4000, 2)).rejects.toThrow('EADDRINUSE')
    server1.close()
    server2.close()
    server3.close()
  })
})
