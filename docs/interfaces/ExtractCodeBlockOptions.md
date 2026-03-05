[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / ExtractCodeBlockOptions

# Interface: ExtractCodeBlockOptions

Defined in: [src/extract-code-block.ts:53](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L53)

Options for extracting code blocks.

## Properties

### all?

> `optional` **all**: `boolean`

Defined in: [src/extract-code-block.ts:71](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L71)

Optional. If true, returns an array of all matching code blocks.

***

### index?

> `optional` **index**: `number`

Defined in: [src/extract-code-block.ts:67](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L67)

Optional. The 0-based index of the code block to extract from the final result set.
Supports negative indexing: -1 means the last one, -2 means the second to last, etc.
Defaults to -1.

***

### lang?

> `optional` **lang**: `string`

Defined in: [src/extract-code-block.ts:61](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L61)

Optional. The expected language identifier or a CSS-like selector path.
Supports aliases (e.g., 'js' for 'javascript').

#### Examples

```ts
'ts' - Find the last TypeScript block.
```

```ts
'md > ts' - Find ts blocks inside md blocks.
```

***

### langMap?

> `optional` **langMap**: `Record`\<`string`, `string`\>

Defined in: [src/extract-code-block.ts:75](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L75)

Optional. A map of language aliases to their normalized names.
