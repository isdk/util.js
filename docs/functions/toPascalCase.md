[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / toPascalCase

# Function: toPascalCase()

> **toPascalCase**(`str`): `string`

Defined in: [src/to-pascal-case.ts:16](https://github.com/isdk/util.js/blob/30c54a8a455a9593000448de2a45f94a197d73de/src/to-pascal-case.ts#L16)

Converts a string to PascalCase.

## Parameters

### str

`string`

The string to convert.

## Returns

`string`

The PascalCase version of the string.

## Example

```typescript
console.log(toPascalCase("some-word")); // Output: "SomeWord"
console.log(toPascalCase("some_Word")); // Output: "SomeWord"
console.log(toPascalCase("someWord"));  // Output: "SomeWord"
console.log(toPascalCase("some word")); // Output: "SomeWord"
console.log(toPascalCase("SOME_WORD")); // Output: "SomeWord"
```
