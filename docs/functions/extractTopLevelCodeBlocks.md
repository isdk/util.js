[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / extractTopLevelCodeBlocks

# Function: extractTopLevelCodeBlocks()

> **extractTopLevelCodeBlocks**(`text`, `options?`): [`CodeString`](../interfaces/CodeString.md)[]

Defined in: [src/extract-code-block.ts:115](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/extract-code-block.ts#L115)

Extracts top-level fenced code blocks from the input `text`.

This function handles nested blocks correctly by ensuring the closing fence
matches the length and character of the opening fence. It only scans the
immediate level of the provided text.

## Parameters

### text

`string`

The input string.

### options?

[`ExtractCodeBlockOptions`](../interfaces/ExtractCodeBlockOptions.md) = `{}`

Extraction options (uses `lang` and `langMap` for filtering).

## Returns

[`CodeString`](../interfaces/CodeString.md)[]

An array of [CodeString](../interfaces/CodeString.md) objects representing the matched blocks.
