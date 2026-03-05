[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / extractCodeBlock

# Function: extractCodeBlock()

> **extractCodeBlock**(`text`, `langOrOptions?`): `string` \| [`CodeString`](../interfaces/CodeString.md) \| (`string` \| [`CodeString`](../interfaces/CodeString.md))[]

Defined in: [src/extract-code-block.ts:198](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L198)

Extracts fenced code block(s) from the input `text`, with support for nested path selectors.

This function acts as a query engine for Markdown code blocks. It can extract
single blocks, multiple blocks, or drill down into nested structures using
CSS-like syntax.

## Parameters

### text

`string`

The input string containing Markdown.

### langOrOptions?

Either a language/selector string or a full [ExtractCodeBlockOptions](../interfaces/ExtractCodeBlockOptions.md) object.

`string` | [`ExtractCodeBlockOptions`](../interfaces/ExtractCodeBlockOptions.md)

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
