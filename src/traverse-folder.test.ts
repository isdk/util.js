import { vi } from 'vitest'
import { traverseFolder, traverseFolderSync } from './traverse-folder'
import { Dirent, readdirSync } from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'

const MockDirent = Dirent as any

// Mock fs.promises.readdir 和 fs.readdirSync
vi.mock('fs/promises', () => ({
  readdir: vi.fn(),
}))

vi.mock('fs', () => {
  class MockDirent {
    name: string
    isFile = () => true
    isDirectory = () => false
    constructor(name: string) {
      this.name = name
    }
  }

  return {
    readdirSync: vi.fn(),
    Dirent: MockDirent, // 使用自定义的 MockDirent 替代 fs.Dirent
  }
})

describe('traverseFolder', () => {
  it('should traverse all files and directories asynchronously', async () => {
    const mockFiles = [
      new MockDirent('file1.txt'),
      new MockDirent('file2.txt'),
      new MockDirent('subdir'),
    ]
    ;(readdir as any).mockResolvedValue(mockFiles)

    const handlerMock = vi.fn().mockImplementation(() => false)

    await traverseFolder('/mock/path', handlerMock)

    expect(handlerMock).toHaveBeenCalledTimes(3)
    expect(handlerMock).toHaveBeenCalledWith(
      path.join('/mock/path', 'file1.txt'),
      mockFiles[0]
    )
    expect(handlerMock).toHaveBeenCalledWith(
      path.join('/mock/path', 'file2.txt'),
      mockFiles[1]
    )
    expect(handlerMock).toHaveBeenCalledWith(
      path.join('/mock/path', 'subdir'),
      mockFiles[2]
    )
  })

  it('should stop traversal when handler returns true', async () => {
    const mockFiles = [
      new MockDirent('file1.txt'),
      new MockDirent('file2.txt'),
      new MockDirent('file3.txt'),
    ]
    ;(readdir as any).mockResolvedValue(mockFiles)

    const handlerMock = vi
      .fn()
      .mockImplementation((filePath: string) => filePath.endsWith('file2.txt'))

    await traverseFolder('/mock/path', handlerMock)

    expect(handlerMock).toHaveBeenCalledTimes(2) // Stops after file2.txt
  })
})

describe('traverseFolderSync', () => {
  it('should traverse all files and directories synchronously', () => {
    const mockFiles = [
      new MockDirent('file1.txt'),
      new MockDirent('file2.txt'),
      new MockDirent('subdir'),
    ]
    ;(readdirSync as any).mockReturnValue(mockFiles)

    const handlerMock = vi.fn().mockImplementation(() => false)

    traverseFolderSync('/mock/path', handlerMock)

    expect(handlerMock).toHaveBeenCalledTimes(3)
    expect(handlerMock).toHaveBeenCalledWith(
      path.join('/mock/path', 'file1.txt'),
      mockFiles[0]
    )
    expect(handlerMock).toHaveBeenCalledWith(
      path.join('/mock/path', 'file2.txt'),
      mockFiles[1]
    )
    expect(handlerMock).toHaveBeenCalledWith(
      path.join('/mock/path', 'subdir'),
      mockFiles[2]
    )
  })

  it('should stop traversal when handler returns true', () => {
    const mockFiles = [
      new MockDirent('file1.txt'),
      new MockDirent('file2.txt'),
      new MockDirent('file3.txt'),
    ]
    ;(readdirSync as any).mockReturnValue(mockFiles)

    const handlerMock = vi
      .fn()
      .mockImplementation((filePath: string) => filePath.endsWith('file2.txt'))

    traverseFolderSync('/mock/path', handlerMock)

    expect(handlerMock).toHaveBeenCalledTimes(2) // Stops after file2.txt
  })
})
