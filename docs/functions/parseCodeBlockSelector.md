[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / parseCodeBlockSelector

# Function: parseCodeBlockSelector()

> **parseCodeBlockSelector**(`lang?`): [`CodeBlockSelectorPart`](../interfaces/CodeBlockSelectorPart.md)[]

Defined in: [src/extract-code-block.ts:160](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/extract-code-block.ts#L160)

Parses a selector string into an array of structured [CodeBlockSelectorPart](../interfaces/CodeBlockSelectorPart.md) objects.

## Parameters

### lang?

`string` \| `string`[]

The selector string.

## Returns

[`CodeBlockSelectorPart`](../interfaces/CodeBlockSelectorPart.md)[]

An array of parsed selector parts.

## Example

```ts
parseCodeBlockSelector('md > ts');
// => [{combinator: ' ', lang: 'md'}, {combinator: '>', lang: 'ts'}]
```
