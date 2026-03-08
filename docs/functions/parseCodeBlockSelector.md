[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / parseCodeBlockSelector

# Function: parseCodeBlockSelector()

> **parseCodeBlockSelector**(`lang?`): [`CodeBlockSelectorPart`](../interfaces/CodeBlockSelectorPart.md)[]

Defined in: [src/extract-code-block.ts:160](https://github.com/isdk/util.js/blob/30c54a8a455a9593000448de2a45f94a197d73de/src/extract-code-block.ts#L160)

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
