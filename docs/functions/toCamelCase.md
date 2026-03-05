[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / toCamelCase

# Function: toCamelCase()

> **toCamelCase**(`str`): `string`

Defined in: [src/to-camel-case.ts:17](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/to-camel-case.ts#L17)

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
