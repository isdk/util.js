[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / extractTopLevelCodeBlocks

# Function: extractTopLevelCodeBlocks()

> **extractTopLevelCodeBlocks**(`text`, `options?`): [`CodeString`](../interfaces/CodeString.md)[]

Defined in: [src/extract-code-block.ts:115](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L115)

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
