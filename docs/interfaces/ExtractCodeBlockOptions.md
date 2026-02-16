[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / ExtractCodeBlockOptions

# Interface: ExtractCodeBlockOptions

Defined in: [src/extract-code-block.ts:24](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/extract-code-block.ts#L24)

Options for extracting code blocks.

## Properties

### all?

> `optional` **all**: `boolean`

Defined in: [src/extract-code-block.ts:38](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/extract-code-block.ts#L38)

Optional. If true, returns an array of all matching code blocks.

***

### index?

> `optional` **index**: `number`

Defined in: [src/extract-code-block.ts:34](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/extract-code-block.ts#L34)

Optional. The 0-based index of the code block to extract.
Supports negative indexing: -1 means the last one, -2 means the second to last, etc.
Defaults to -1.

***

### lang?

> `optional` **lang**: `string`

Defined in: [src/extract-code-block.ts:28](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/extract-code-block.ts#L28)

Optional. The expected language identifier (case-insensitive).
