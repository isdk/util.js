[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / isStringIn

# Function: isStringIn()

> **isStringIn**(`str`, `arr`): `boolean`

Defined in: [src/is-string-in.ts:17](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/is-string-in.ts#L17)

Checks if a given string exists within an array of strings or a single string.

## Parameters

### str

`string`

The string to search for.

### arr

`string` \| `string`[]

An array of strings or a single string to search within.

## Returns

`boolean`

Returns `true` if the string is found, otherwise `false`.

## Example

```typescript
const result = isStringIn("apple", ["banana", "apple", "cherry"]);
console.log(result); // true

const singleResult = isStringIn("hello", "hello");
console.log(singleResult); // true
```
