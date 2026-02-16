[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / extractCodeBlock

# Function: extractCodeBlock()

## Call Signature

> **extractCodeBlock**(`text`, `lang?`): `string` \| [`CodeString`](../interfaces/CodeString.md)

Defined in: [src/extract-code-block.ts:61](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/extract-code-block.ts#L61)

Extracts fenced code block(s) from the input `text`, optionally filtered by language.

This function supports both triple-backtick (```) and triple-tilde (~~~) fenced code block
syntaxes as commonly used in Markdown.

### Parameters

#### text

`string`

The input string that may contain one or more fenced code blocks.

#### lang?

`string`

Optional. The expected language identifier (case-insensitive). If omitted,
              the last code block in the text is returned, irrespective of its language.

### Returns

`string` \| [`CodeString`](../interfaces/CodeString.md)

The extracted code content as a [CodeString](../interfaces/CodeString.md) instance (with `lang` and `meta` properties)
         if a matching code block is found, or as the original `text` if no match is found.

### Example

```ts
const input = 'Intro\n```js\nconsole.log("hello");\n```\nOutro';
const code = extractCodeBlock(input, 'js');
console.log(code);        // 'console.log("hello");'
console.log(code.lang);   // 'js'
```

## Call Signature

> **extractCodeBlock**(`text`, `options?`): `string` \| [`CodeString`](../interfaces/CodeString.md) \| (`string` \| [`CodeString`](../interfaces/CodeString.md))[]

Defined in: [src/extract-code-block.ts:85](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/extract-code-block.ts#L85)

Extracts fenced code block(s) from the input `text` with options.

### Parameters

#### text

`string`

The input string that may contain one or more fenced code blocks.

#### options?

[`ExtractCodeBlockOptions`](../interfaces/ExtractCodeBlockOptions.md)

Optional. Extraction options:
                 - `lang`: Filter by language (case-insensitive).
                 - `index`: The index of the block to extract. `-1` is the last one (default).
                 - `all`: If `true`, returns an array of all matching blocks.

### Returns

`string` \| [`CodeString`](../interfaces/CodeString.md) \| (`string` \| [`CodeString`](../interfaces/CodeString.md))[]

If `options.all` is true, returns an array of [CodeString](../interfaces/CodeString.md) or string.
         Otherwise, returns a single [CodeString](../interfaces/CodeString.md) or the original `text` if no match is found at the specified index.

### Example

```ts
const input = '```js\n1\n```\n```ts\n2\n```';
// Get the first block
const first = extractCodeBlock(input, { index: 0 }); // '1\n' (js)
// Get all blocks
const all = extractCodeBlock(input, { all: true }); // ['1\n' (js), '2\n' (ts)]
```
