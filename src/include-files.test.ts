// normalizeIncludeFiles.test.ts
import { describe, it, expect } from 'vitest'
import { normalizeIncludeFiles, DefaultAllTextFiles } from './include-files'

describe('normalizeIncludeFiles', () => {
  it('should use default files when no patterns are provided', () => {
    const result = normalizeIncludeFiles([])
    expect(result).toEqual([])
  })

  it('should handle a simple array of include patterns', () => {
    const input = ['**/*.ts', '**/*.js']
    const result = normalizeIncludeFiles(input)
    expect(result).toEqual(['**/*.ts', '**/*.js'])
  })

  it('should handle an object with include and exclude patterns', () => {
    const input = {
      include: ['**/*.ts', '**/*.js'],
      exclude: ['**/node_modules/**'],
    }
    const result = normalizeIncludeFiles(input)
    expect(result).toEqual(['**/*.ts', '**/*.js', '!**/node_modules/**'])
  })

  it('should fallback to default files when include is empty', () => {
    const input = {
      include: [],
      exclude: ['**/node_modules/**'],
    }
    const result = normalizeIncludeFiles(input)
    expect(result).toEqual(['!**/node_modules/**'])
  })

  it('should handle only exclude patterns with default include', () => {
    const input = {
      exclude: ['**/dist/**', '**/build/**'],
    }
    const result = normalizeIncludeFiles(input)
    expect(result).toEqual(['!**/dist/**', '!**/build/**'])
  })

  it('should handle an empty object as input', () => {
    const input = {}
    const result = normalizeIncludeFiles(input)
    expect(result).toEqual([])
  })

  it('should handle undefined input gracefully', () => {
    const result = normalizeIncludeFiles(undefined)
    expect(result).toEqual([])
  })
})
