[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / toCamelCase

# Function: toCamelCase()

> **toCamelCase**(`str`): `string`

Defined in: [src/to-camel-case.ts:17](https://github.com/isdk/util.js/blob/1244ecc63e69dca791e24e154694c362d05c92c5/src/to-camel-case.ts#L17)

Converts a string to camelCase.

## Parameters

### str

`string`

The string to convert.

## Returns

`string`

The camelCase version of the string.

## Example

```typescript
console.log(toCamelCase("some-word")); // Output: "someWord"
console.log(toCamelCase("some_Word")); // Output: "someWord"
console.log(toCamelCase("Some Word")); // Output: "someWord"
console.log(toCamelCase("SomeWord"));  // Output: "someWord"
console.log(toCamelCase(""));          // Output: ""
```
