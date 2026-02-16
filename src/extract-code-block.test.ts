import { describe, it, expect } from 'vitest'
import { type CodeString, extractCodeBlock } from './extract-code-block'

function hasLang(val: unknown): val is { lang: string } {
  return typeof val === 'object' && val !== null && 'lang' in val
}

describe('extractCodeBlock', () => {
  it('should return original primitive string when no code block is present', () => {
    const input = 'plain text without any code'
    const result = extractCodeBlock(input)
    expect(result).toBe(input)
    expect(typeof result).toBe('string')
    expect(!hasLang(result)).toBe(true)
  })

  it('should extract the last code block as String object with lang when no lang filter is specified', () => {
    const input = `
\`\`\`js
console.log(1);
\`\`\`
\`\`\`ts
const x: number = 1;
\`\`\`
`
    const result: CodeString = extractCodeBlock(input)
    expect(result instanceof String).toBe(true)
    expect(result.toString()).toBe('const x: number = 1;\n')
    expect(hasLang(result)).toBe(true)
    expect(result.lang).toBe('ts')
  })

  it('should extract matching language block (case-insensitive)', () => {
    const input = '```JS\nalert("hi");\n```'
    const result: CodeString = extractCodeBlock(input, 'js')
    expect(result instanceof String).toBe(true)
    expect(result.toString()).toBe('alert("hi");\n')
    expect(result.lang).toBe('js')
  })

  it('should return original primitive string when lang is specified but no match found', () => {
    const input = '```py\nprint("hello")\n```'
    const result = extractCodeBlock(input, 'js')
    expect(result).toBe(input)
    expect(typeof result).toBe('string')
    expect(!hasLang(result)).toBe(true)
  })

  it('should handle mixed fence types correctly', () => {
    const input = `
~~~javascript
console.log("tildes");
~~~
\`\`\`ts
console.log("backticks");
\`\`\`
`
    let result: any = extractCodeBlock(input, 'javascript')
    expect(result instanceof String).toBe(true)
    expect(result.toString()).toBe('console.log("tildes");\n')
    expect(result.lang).toBe('javascript')

    result = extractCodeBlock(input, 'ts')
    expect(result instanceof String).toBe(true)
    expect(result.toString()).toBe('console.log("backticks");\n')
    expect(result.lang).toBe('ts')
  })

  it('should support language aliases', () => {
    const input = `
\`\`\`javascript
console.log("js");
\`\`\`
\`\`\`ts
console.log("ts");
\`\`\`
`
    // Request 'js', should match 'javascript' block
    let result: any = extractCodeBlock(input, 'js')
    expect(result.toString()).toBe('console.log("js");\n')
    expect(result.lang).toBe('javascript')

    // Request 'javascript', should match 'javascript' block
    result = extractCodeBlock(input, 'javascript')
    expect(result.toString()).toBe('console.log("js");\n')

    const input2 = '```js\nconsole.log("js");\n```'
    // Request 'javascript', should match 'js' block
    result = extractCodeBlock(input2, 'javascript')
    expect(result.toString()).toBe('console.log("js");\n')
    expect(result.lang).toBe('js')

    const input3 = '```bash\necho 1\n```'
    // Request 'sh', should match 'bash' block
    result = extractCodeBlock(input3, 'sh')
    expect(result.toString()).toBe('echo 1\n')
    expect(result.lang).toBe('bash')
  })

  it('should support language aliases with "all" option', () => {
    const input = `
\`\`\`js
console.log(1);
\`\`\`
\`\`\`javascript
console.log(2);
\`\`\`
\`\`\`ts
console.log(3);
\`\`\`
`
    const result = extractCodeBlock(input, { lang: 'js', all: true }) as any[]
    expect(result).toHaveLength(2)
    expect(result[0].toString()).toBe('console.log(1);\n')
    expect(result[1].toString()).toBe('console.log(2);\n')
    expect(result[0].lang).toBe('js')
    expect(result[1].lang).toBe('javascript')
  })

  it('should support language aliases with "index" option', () => {
    const input = `
\`\`\`js
console.log(1);
\`\`\`
\`\`\`javascript
console.log(2);
\`\`\`
`
    const result: any = extractCodeBlock(input, {
      lang: 'javascript',
      index: 0,
    })
    expect(result.toString()).toBe('console.log(1);\n')
    expect(result.lang).toBe('js')

    const result2: any = extractCodeBlock(input, { lang: 'js', index: 1 })
    expect(result2.toString()).toBe('console.log(2);\n')
    expect(result2.lang).toBe('javascript')
  })

  it('should support custom langMap option', () => {
    const input = '```custom\ncustom code\n```'
    // Map 'my-custom' to 'custom'
    const result: any = extractCodeBlock(input, {
      lang: 'my-custom',
      langMap: { 'my-custom': 'custom' },
    })
    expect(result.toString()).toBe('custom code\n')
    expect(result.lang).toBe('custom')

    // Override existing mapping: map 'js' to 'typescript' (weird but for testing)
    const input2 = '```ts\nconst x = 1;\n```'
    const result2: any = extractCodeBlock(input2, {
      lang: 'js',
      langMap: { js: 'ts' },
    })
    expect(result2.toString()).toBe('const x = 1;\n')
    expect(result2.lang).toBe('ts')
  })

  it('should extract empty code block as just a newline', () => {
    const input = '```js\n```'
    const result: any = extractCodeBlock(input, 'js')
    expect(result instanceof String).toBe(true)
    expect(result.toString()).toBe('')
    expect(result.lang).toBe('js')
  })

  it('should preserve multiple lines exactly', () => {
    const input = '```ts\nline1\nline2\n```'
    const result: CodeString = extractCodeBlock(input)
    expect(result.toString()).toBe('line1\nline2\n')
    expect(result.lang).toBe('ts')
  })

  it('should ignore unclosed code blocks and return original primitive', () => {
    const input = '```js\nunclosed'
    const result = extractCodeBlock(input, 'js')
    expect(result).toBe(input)
    expect(typeof result).toBe('string')
    expect(!hasLang(result)).toBe(true)
  })

  it('should normalize lang tag to first word and lowercase', () => {
    const input = '```TS twoslash\nx();\n```'
    const result: CodeString = extractCodeBlock(input, 'ts')
    expect(result instanceof String).toBe(true)
    expect(result.toString()).toBe('x();\n')
    expect(result.lang).toBe('ts')
    expect(result.meta).toBe('twoslash')
  })

  it('should return last matching block for repeated languages', () => {
    const input = `
\`\`\`js
first();
\`\`\`
\`\`\`js
second();
\`\`\`
`
    const result: any = extractCodeBlock(input, 'js')
    expect(result.toString()).toBe('second();\n')
    expect(result.lang).toBe('js')
  })

  it('should return primitive string when code block has no language', () => {
    const input = '```\nno lang\n```'
    const result = extractCodeBlock(input)
    expect(result instanceof String).toBe(true)
    expect(result.valueOf()).toBe('no lang\n') // note: includes \n!
    expect(!hasLang(result)).toBe(true)
  })

  it('should return String object only when lang is present', () => {
    const input = '```json\n{"a":1}\n```'
    const result: any = extractCodeBlock(input)
    expect(result instanceof String).toBe(true)
    expect(result.toString()).toBe('{"a":1}\n') // ✅ now includes \n
    expect(result.lang).toBe('json')
  })

  it('should preserve leading/trailing whitespace inside code', () => {
    const input = '```txt\n  spaced  \n\n```'

    const result: any = extractCodeBlock(input)

    expect(result.toString()).toBe('  spaced  \n\n')

    expect(result.lang).toBe('txt')
  })

  describe('options: index', () => {
    const input = `
\`\`\`js
console.log(1);
\`\`\`

\`\`\`ts
const x: number = 1;
\`\`\`

\`\`\`js
console.log(2);
\`\`\`
  `

    it('should extract the first code block when index is 0', () => {
      const result: any = extractCodeBlock(input, { index: 0 })

      expect(result.toString()).toBe('console.log(1);\n')

      expect(result.lang).toBe('js')
    })

    it('should extract the second code block when index is 1', () => {
      const result: any = extractCodeBlock(input, { index: 1 })

      expect(result.toString()).toBe('const x: number = 1;\n')

      expect(result.lang).toBe('ts')
    })

    it('should extract the last code block when index is -1', () => {
      const result: any = extractCodeBlock(input, { index: -1 })

      expect(result.toString()).toBe('console.log(2);\n')

      expect(result.lang).toBe('js')
    })

    it('should extract the second to last code block when index is -2', () => {
      const result: any = extractCodeBlock(input, { index: -2 })

      expect(result.toString()).toBe('const x: number = 1;\n')

      expect(result.lang).toBe('ts')
    })

    it('should filter by language and then apply index', () => {
      const result: any = extractCodeBlock(input, { lang: 'js', index: 1 })

      expect(result.toString()).toBe('console.log(2);\n')

      expect(result.lang).toBe('js')
    })

    it('should return original text if index is out of bounds', () => {
      const result = extractCodeBlock(input, { index: 10 })
      expect(result).toBe(input)
    })
  })

  describe('options: all', () => {
    const input = `
\`\`\`js
console.log(1);
\`\`\`

\`\`\`ts
const x: number = 1;
\`\`\`

\`\`\`js
console.log(2);
\`\`\`
  `

    it('should extract all code blocks when all is true', () => {
      const result = extractCodeBlock(input, { all: true }) as any[]

      expect(result).toHaveLength(3)

      expect(result[0].toString()).toBe('console.log(1);\n')

      expect(result[1].toString()).toBe('const x: number = 1;\n')

      expect(result[2].toString()).toBe('console.log(2);\n')
    })

    it('should extract all matching language code blocks when all is true', () => {
      const result = extractCodeBlock(input, { lang: 'js', all: true }) as any[]

      expect(result).toHaveLength(2)

      expect(result[0].toString()).toBe('console.log(1);\n')

      expect(result[1].toString()).toBe('console.log(2);\n')
    })

    it('should return an empty array if no matches and all is true', () => {
      const result = extractCodeBlock(input, {
        lang: 'python',
        all: true,
      }) as any[]

      expect(result).toEqual([])
    })
  })
})
