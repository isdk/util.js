// glob.test.ts
import { describe, it, expect } from 'vitest'
import { glob } from './glob'
import path from 'path'

describe('glob function', () => {
  const rootDir = '/home/user/project'

  it('should match a simple glob pattern', () => {
    const filepath = '/home/user/project/src/index.ts'
    const patterns = ['**/*.ts']
    const result = glob(filepath, patterns, rootDir)
    expect(result).toBe(true)
  })

  it('should not match an excluded pattern', () => {
    const filepath = '/home/user/project/src/test.ts'
    const patterns = ['**/*.ts', '!**/test.ts']
    const result = glob(filepath, patterns, rootDir)
    expect(result).toBe(false)
  })

  it('should handle relative paths correctly when rootDir is provided', () => {
    const filepath = '/home/user/project/src/utils/helper.ts'
    const patterns = ['src/utils/*.ts']
    const result = glob(filepath, patterns, rootDir)
    expect(result).toBe(true)
  })

  it('should work without a rootDir', () => {
    const filepath = '/home/user/project/src/index.ts'
    const patterns = ['/home/user/project/**/*.ts']
    const result = glob(filepath, patterns)
    expect(result).toBe(true)
  })

  it('should return false for non-matching patterns', () => {
    const filepath = '/home/user/project/src/index.js'
    const patterns = ['**/*.ts']
    const result = glob(filepath, patterns, rootDir)
    expect(result).toBeFalsy()
  })

  it('should handle empty patterns array', () => {
    const filepath = '/home/user/project/src/index.ts'
    const patterns: string[] = []
    const result = glob(filepath, patterns, rootDir)
    expect(result).toBeFalsy()
  })

  it('should handle absolute file paths correctly', () => {
    const filepath = path.resolve('/home/user/project/src/index.ts')
    const patterns = [path.resolve('/home/user/project/**/*.ts')]
    const result = glob(filepath, patterns)
    expect(result).toBe(true)
  })
})
