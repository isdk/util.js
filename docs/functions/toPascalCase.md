[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / toPascalCase

# Function: toPascalCase()

> **toPascalCase**(`str`): `string`

Defined in: [to-pascal-case.ts:16](https://github.com/isdk/util.js/blob/4a17f40c6487cc8186e888c58b4e6268f4dcb357/src/to-pascal-case.ts#L16)

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
