import { globMatch } from '@isdk/glob'
import path from 'path'

/**
 * Matches a file path against a list of glob patterns.
 *
 * This function checks if the given `filepath` matches any of the provided glob `pattern`s.
 * If a `rootDir` is specified, the `filepath` will first be converted to a relative path
 * based on the `rootDir`.
 *
 * @param filepath - The file path to match.
 * @param pattern - An array of glob patterns to match against.
 * @param rootDir - (Optional) The root directory used to calculate the relative path of `filepath`.
 *
 * @returns Returns `true` if the `filepath` matches any of the patterns, otherwise `false`.
 *
 * @example
 * ```typescript
 * import { glob } from './glob';
 *
 * const filepath = '/home/user/project/src/index.ts';
 * const patterns = ['src/*.ts', '!src/test.ts'];
 * const rootDir = '/home/user/project';
 *
 * const result = glob(filepath, patterns, rootDir);
 * console.log(result); // true
 * ```
 */
export function glob(filepath: string, pattern: string[], rootDir?: string) {
  if (rootDir) {
    filepath = path.relative(rootDir, filepath)
  }
  return globMatch(filepath, pattern)
}
