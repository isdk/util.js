[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / parseCodeBlockSelector

# Function: parseCodeBlockSelector()

> **parseCodeBlockSelector**(`lang?`): [`CodeBlockSelectorPart`](../interfaces/CodeBlockSelectorPart.md)[]

Defined in: [src/extract-code-block.ts:160](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L160)

Parses a selector string into an array of structured [CodeBlockSelectorPart](../interfaces/CodeBlockSelectorPart.md) objects.

## Parameters

### lang?

`string`

The selector string.

## Returns

[`CodeBlockSelectorPart`](../interfaces/CodeBlockSelectorPart.md)[]

An array of parsed selector parts.

## Example

```ts
parseCodeBlockSelector('md > ts');
// => [{combinator: ' ', lang: 'md'}, {combinator: '>', lang: 'ts'}]
```
