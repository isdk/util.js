[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / extractCodeBlock

# Function: extractCodeBlock()

> **extractCodeBlock**(`text`, `langOrOptions?`): `string` \| [`CodeString`](../interfaces/CodeString.md) \| (`string` \| [`CodeString`](../interfaces/CodeString.md))[]

Defined in: [src/extract-code-block.ts:199](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/extract-code-block.ts#L199)

Extracts fenced code block(s) from the input `text`, with support for nested path selectors.

This function acts as a query engine for Markdown code blocks. It can extract
single blocks, multiple blocks, or drill down into nested structures using
CSS-like syntax.

## Parameters

### text

`string`

The input string containing Markdown.

### langOrOptions?

`string` \| `string`[] \| [`ExtractCodeBlockOptions`](../interfaces/ExtractCodeBlockOptions.md)

Either a language/selector string or a full [ExtractCodeBlockOptions](../interfaces/ExtractCodeBlockOptions.md) object.

## Returns

`string` \| [`CodeString`](../interfaces/CodeString.md) \| (`string` \| [`CodeString`](../interfaces/CodeString.md))[]

A single [CodeString](../interfaces/CodeString.md), an array of [CodeString](../interfaces/CodeString.md)s (if `all: true`),
         or the original `text` if no matches are found at the specified index.

## Example

```ts
// Simple extraction (last block)
const code = extractCodeBlock(input, 'js');

// Nested extraction
const inner = extractCodeBlock(input, 'md > ts');

// Extract all matching blocks
const all = extractCodeBlock(input, { lang: 'container > item', all: true });
```
