[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / CodeBlockSelectorPart

# Interface: CodeBlockSelectorPart

Defined in: [src/extract-code-block.ts:38](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L38)

Represents a single segment in a code block selector path.

A path like `md > ts` is parsed into two parts:
1. `{ combinator: ' ', lang: 'md' }`
2. `{ combinator: '>', lang: 'ts' }`

## Properties

### combinator

> **combinator**: [`CodeBlockCombinator`](../type-aliases/CodeBlockCombinator.md)

Defined in: [src/extract-code-block.ts:43](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L43)

The relationship to the previous segment in the path.
For the first segment, ' ' usually implies a search in the root context.

***

### lang

> **lang**: `string`

Defined in: [src/extract-code-block.ts:47](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L47)

The target language identifier or alias to match.
