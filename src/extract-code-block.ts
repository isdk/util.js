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
 * Options for extracting code blocks.
 */
export interface ExtractCodeBlockOptions {
  /**
   * Optional. The expected language identifier (case-insensitive).
   */
  lang?: string
  /**
   * Optional. The 0-based index of the code block to extract.
   * Supports negative indexing: -1 means the last one, -2 means the second to last, etc.
   * Defaults to -1.
   */
  index?: number
  /**
   * Optional. If true, returns an array of all matching code blocks.
   */
  all?: boolean
}

/**
 * Extracts fenced code block(s) from the input `text`, optionally filtered by language.
 *
 * This function supports both triple-backtick (```) and triple-tilde (~~~) fenced code block
 * syntaxes as commonly used in Markdown.
 *
 * @example
 * ```ts
 * const input = 'Intro\n```js\nconsole.log("hello");\n```\nOutro';
 * const code = extractCodeBlock(input, 'js');
 * console.log(code);        // 'console.log("hello");'
 * console.log(code.lang);   // 'js'
 * ```
 *
 * @param text - The input string that may contain one or more fenced code blocks.
 * @param lang - Optional. The expected language identifier (case-insensitive). If omitted,
 *               the last code block in the text is returned, irrespective of its language.
 * @returns The extracted code content as a {@link CodeString} instance (with `lang` and `meta` properties)
 *          if a matching code block is found, or as the original `text` if no match is found.
 */
export function extractCodeBlock(
  text: string,
  lang?: string
): CodeString | string
/**
 * Extracts fenced code block(s) from the input `text` with options.
 *
 * @example
 * ```ts
 * const input = '```js\n1\n```\n```ts\n2\n```';
 * // Get the first block
 * const first = extractCodeBlock(input, { index: 0 }); // '1\n' (js)
 * // Get all blocks
 * const all = extractCodeBlock(input, { all: true }); // ['1\n' (js), '2\n' (ts)]
 * ```
 *
 * @param text - The input string that may contain one or more fenced code blocks.
 * @param options - Optional. Extraction options:
 *                  - `lang`: Filter by language (case-insensitive).
 *                  - `index`: The index of the block to extract. `-1` is the last one (default).
 *                  - `all`: If `true`, returns an array of all matching blocks.
 * @returns If `options.all` is true, returns an array of {@link CodeString} or string.
 *          Otherwise, returns a single {@link CodeString} or the original `text` if no match is found at the specified index.
 */
export function extractCodeBlock(
  text: string,
  options?: ExtractCodeBlockOptions
): CodeString | string | (CodeString | string)[]
export function extractCodeBlock(
  text: string,
  langOrOptions?: string | ExtractCodeBlockOptions
) {
  const options: ExtractCodeBlockOptions =
    typeof langOrOptions === 'string'
      ? { lang: langOrOptions }
      : (langOrOptions ?? {})
  const { lang, index = -1, all } = options

  const _text = text.trim()
  const regex =
    /(```|~~~)(?<lang>\S*)[ \t]*(?<meta>\S*?)\n(?<code>[\s\S]*?)\1/gm
  const matches: (CodeString | string)[] = []

  let matched: RegExpExecArray | null
  while ((matched = regex.exec(_text)) !== null) {
    const _lang = matched.groups?.lang?.toLowerCase()
    if (!lang || lang === _lang) {
      let code: CodeString | string = matched.groups!.code
      if (matched.groups!.lang || matched.groups!.meta) {
        const codeString = new String(code) as CodeString
        if (matched.groups!.lang) {
          codeString.lang = matched.groups!.lang.toLowerCase()
        }
        if (matched.groups!.meta) {
          codeString.meta = matched.groups!.meta
        }
        code = codeString
      } else {
        // Even if no lang/meta, if it's a matched code block,
        // we might want it as a String object to be consistent
        // but previous implementation returned CodeString if matched.groups.code existed.
        // Let's stick to returning String object for any valid code block match to support meta/lang if they exist.
        code = new String(code) as CodeString
      }
      matches.push(code)
    }
  }

  if (all) {
    return matches
  }

  const targetIndex = index < 0 ? matches.length + index : index
  const result = matches[targetIndex] ?? text
  return result
}
