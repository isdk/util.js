export const DefaultAllTextFiles = [
  '**/*.((j|t)s?(x)|m(j|t)s)?(x)',
  '**/*.(md|markdown|txt|?(x)htm?(l)|yaml|yml|xml|json|bat|sh|bash|zsh|ini|css|scss|less|sass|py|rb|php|go|java|c|cpp|h|hpp|hxx|rust|zig)',
]

export interface IncludeFiles {
  include?: string[]
  exclude?: string[]
}

/**
 * Normalizes a list of file patterns for glob matching.
 *
 * This function takes either an array of file patterns or an object containing `include` and `exclude` arrays,
 * and returns a normalized array of file patterns. If no patterns are provided, it defaults to including
 * all text-based files as defined in `DefaultAllTextFiles`.
 *
 * @param files - Either an array of file patterns or an object with `include` and `exclude` properties.
 * @param defaultFiles - An optional array of default file patterns to use if no include patterns are specified.
 *                       Defaults to `DefaultAllTextFiles`.
 * @returns A normalized array of file patterns, with excluded patterns prefixed by `!`.
 *
 * @example
 *
 * ```typescript
 * const result = normalizeIncludeFiles({
 *   include: ['*.ts', '*.js'],
 *   exclude: ['node_modules/**']
 * });
 * console.log(result);
 * // Output: ['*.ts', '*.js', '!node_modules/**']
 * ```
 */
export function normalizeIncludeFiles(files?: string[]|IncludeFiles, defaultFiles = []) {
  if (!files) {
    files = [...defaultFiles]
  } else if (!Array.isArray(files)) {
    const include = files.include || []
    const exclude = files.exclude || []
    if (include.length === 0) {
      include.push(...defaultFiles)
    }
    files = [...include]
    for (const file of exclude) {
      files.push(`!${file}`)
    }
  } else {
    files = [...files]
  }

  if (files.length === 0) {
    files.push(...defaultFiles)
  }
  return files
}
