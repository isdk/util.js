[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / omitEmptyDeep

# Function: omitEmptyDeep()

> **omitEmptyDeep**\<`T`\>(`value`, `omitFunc?`): `any`

Defined in: [src/omit-empty-deep.ts:33](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/omit-empty-deep.ts#L33)

Deeply removes empty values from objects or arrays, supporting both string and Symbol keys.

## Type Parameters

### T

`T`

The type of the input value

## Parameters

### value

`T`

The original data that needs to be cleaned

### omitFunc?

`boolean`

## Returns

`any`

The cleaned data. If the input value itself is deeply empty, returns undefined.

## Remarks

This function uses recursion to clean data. For objects, it handles both `string` keys and `Symbol` keys.
If child objects or child arrays become empty after cleaning, their corresponding keys will also be removed from the parent object.

## Example

```ts
const sym = Symbol('id');
omitEmptyDeep({ [sym]: "", a: 1 }) // => { a: 1 }
```
