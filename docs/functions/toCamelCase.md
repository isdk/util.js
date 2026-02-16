[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / toCamelCase

# Function: toCamelCase()

> **toCamelCase**(`str`): `string`

Defined in: [src/to-camel-case.ts:17](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/to-camel-case.ts#L17)

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
