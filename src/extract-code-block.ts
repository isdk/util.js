/**
 * An extension of the built-in `String` type that carries metadata about
 * the extracted code block.
 *
 * When {@link extractCodeBlock} successfully extracts a fenced code block,
 * the returned string is augmented with these properties if they are present
 * in the markdown fence.
 */
export interface CodeString extends String {
  /**
   * The programming language identifier of the code block (e.g., 'ts', 'js').
   * It is normalized to lowercase.
   */
  lang?: string
  /**
   * Any additional metadata provided after the language identifier on the fence line.
   */
  meta?: string
}

/**
 * Supported combinators for code block selectors.
 *
 * - `>` (Direct Child): Matches top-level code blocks within the current context.
 * - ` ` (Descendant): Matches all code blocks within the current context, including deeply nested ones. (Planned)
 * - `+` (Adjacent Sibling): Matches the very next code block at the same nesting level. (Planned)
 * - `~` (General Sibling): Matches all subsequent code blocks at the same nesting level. (Planned)
 */
export type CodeBlockCombinator = '>' | ' ' | '+' | '~'

/**
 * Represents a single segment in a code block selector path.
 *
 * A path like `md > ts` is parsed into two parts:
 * 1. `{ combinator: ' ', lang: 'md' }`
 * 2. `{ combinator: '>', lang: 'ts' }`
 */
export interface CodeBlockSelectorPart {
  /**
   * The relationship to the previous segment in the path.
   * For the first segment, ' ' usually implies a search in the root context.
   */
  combinator: CodeBlockCombinator
  /**
   * The target language identifier or alias to match.
   */
  lang: string
}

/**
 * Options for extracting code blocks.
 */
export interface ExtractCodeBlockOptions {
  /**
   * Optional. The expected language identifier or a CSS-like selector path.
   * Supports aliases (e.g., 'js' for 'javascript').
   *
   * @example 'ts' - Find the last TypeScript block.
   * @example 'md > ts' - Find ts blocks inside md blocks.
   */
  lang?: string
  /**
   * Optional. The 0-based index of the code block to extract from the final result set.
   * Supports negative indexing: -1 means the last one, -2 means the second to last, etc.
   * Defaults to -1.
   */
  index?: number
  /**
   * Optional. If true, returns an array of all matching code blocks.
   */
  all?: boolean
  /**
   * Optional. A map of language aliases to their normalized names.
   */
  langMap?: Record<string, string>
}

const LANGUAGE_MAP: Record<string, string> = {
  javascript: 'js',
  jsx: 'js',
  typescript: 'ts',
  tsx: 'ts',
  markdown: 'md',
  python: 'py',
  ruby: 'rb',
  bash: 'sh',
  zsh: 'sh',
  shell: 'sh',
  yaml: 'yml',
  golang: 'go',
  rust: 'rs',
  'c#': 'cs',
  csharp: 'cs',
  'c++': 'cpp',
}

function normalizeLanguage(lang?: string, customMap?: Record<string, string>) {
  if (!lang) return lang
  const l = lang.toLowerCase()
  if (customMap && l in customMap) return customMap[l]
  return LANGUAGE_MAP[l] || l
}

/**
 * Extracts top-level fenced code blocks from the input `text`.
 *
 * This function handles nested blocks correctly by ensuring the closing fence
 * matches the length and character of the opening fence. It only scans the
 * immediate level of the provided text.
 *
 * @param text - The input string.
 * @param options - Extraction options (uses `lang` and `langMap` for filtering).
 * @returns An array of {@link CodeString} objects representing the matched blocks.
 */
export function extractTopLevelCodeBlocks(
  text: string,
  options: ExtractCodeBlockOptions = {}
): CodeString[] {
  const { lang, langMap } = options
  const targetLang = normalizeLanguage(lang, langMap)

  const regex =
    /^[ \t]*(?<fence>`{3,}|~{3,})(?<lang>\S*)[ \t]*(?<meta>\S*?)\n(?<code>[\s\S]+?\n)?[ \t]*\k<fence>$/gm

  const matches: CodeString[] = []
  let matched: RegExpExecArray | null

  regex.lastIndex = 0

  while ((matched = regex.exec(text)) !== null) {
    const _lang = matched.groups?.lang?.toLowerCase()
    if (!targetLang || targetLang === normalizeLanguage(_lang, langMap)) {
      const code: string = matched.groups!.code || ''
      const codeString = new String(code) as CodeString
      if (matched.groups!.lang) {
        codeString.lang = matched.groups!.lang.toLowerCase()
      }
      if (matched.groups!.meta) {
        codeString.meta = matched.groups!.meta
      }
      matches.push(codeString)
    }
  }

  return matches
}

/**
 * Parses a selector string into an array of structured {@link CodeBlockSelectorPart} objects.
 *
 * @example
 * ```ts
 * parseCodeBlockSelector('md > ts');
 * // => [{combinator: ' ', lang: 'md'}, {combinator: '>', lang: 'ts'}]
 * ```
 *
 * @param lang - The selector string.
 * @returns An array of parsed selector parts.
 */
export function parseCodeBlockSelector(lang?: string): CodeBlockSelectorPart[] {
  if (!lang) return []
  const parts: CodeBlockSelectorPart[] = []
  const regex = /([>+~])?\s*([^\s>+~]+)/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(lang)) !== null) {
    const combinator = (match[1] as CodeBlockCombinator) || ' '
    const targetLang = match[2]
    parts.push({ combinator, lang: targetLang })
  }
  return parts
}

/**
 * Extracts fenced code block(s) from the input `text`, with support for nested path selectors.
 *
 * This function acts as a query engine for Markdown code blocks. It can extract
 * single blocks, multiple blocks, or drill down into nested structures using
 * CSS-like syntax.
 *
 * @example
 * ```ts
 * // Simple extraction (last block)
 * const code = extractCodeBlock(input, 'js');
 *
 * // Nested extraction
 * const inner = extractCodeBlock(input, 'md > ts');
 *
 * // Extract all matching blocks
 * const all = extractCodeBlock(input, { lang: 'container > item', all: true });
 * ```
 *
 * @param text - The input string containing Markdown.
 * @param langOrOptions - Either a language/selector string or a full {@link ExtractCodeBlockOptions} object.
 * @returns A single {@link CodeString}, an array of {@link CodeString}s (if `all: true`),
 *          or the original `text` if no matches are found at the specified index.
 */
export function extractCodeBlock(
  text: string,
  langOrOptions?: string | ExtractCodeBlockOptions
): CodeString | string | (CodeString | string)[] {
  const options: ExtractCodeBlockOptions =
    typeof langOrOptions === 'string'
      ? { lang: langOrOptions }
      : (langOrOptions ?? {})

  const { index = -1, all } = options
  const parts = parseCodeBlockSelector(options.lang)

  let currentResults: CodeString[] = []

  if (parts.length === 0) {
    // Default search when no language or selector is specified
    currentResults = extractTopLevelCodeBlocks(text, options)
  } else {
    // We iterate through each part of the selector path
    let currentContexts: string[] = [text]

    for (let i = 0; i < parts.length; i++) {
      const { combinator, lang } = parts[i]
      const isLastPart = i === parts.length - 1
      const nextResults: CodeString[] = []

      // The first part defaults to a top-level search if no combinator is provided
      const actualCombinator = (i === 0 && combinator === ' ') ? '>' : combinator

      for (const ctx of currentContexts) {
        let foundBlocks: CodeString[] = []

        switch (actualCombinator) {
          case '>':
            // Direct child search using the atomic top-level parser
            foundBlocks = extractTopLevelCodeBlocks(ctx, { ...options, lang, all: true })
            break
          case ' ':
            // TODO: Implement recursive descendant search
            console.warn('Descendant selector " " is not implemented yet.')
            break
          case '+':
            // TODO: Implement adjacent sibling search
            console.warn('Adjacent sibling selector "+" is not implemented yet.')
            break
          case '~':
            // TODO: Implement general sibling search
            console.warn('General sibling selector "~" is not implemented yet.')
            break
        }
        nextResults.push(...foundBlocks)
      }

      if (isLastPart) {
        currentResults = nextResults
      } else {
        // The found blocks become the context for the next step in the path
        currentContexts = nextResults.map(block => block.toString())
        if (currentContexts.length === 0) break
      }
    }
  }

  if (all) {
    return currentResults
  }

  const targetIndex = index < 0 ? currentResults.length + index : index
  const finalResult = currentResults[targetIndex]
  // Return original text as a fallback to match historical behavior
  return finalResult !== undefined ? finalResult : text
}
