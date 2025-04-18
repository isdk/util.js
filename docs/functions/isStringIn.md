[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / isStringIn

# Function: isStringIn()

> **isStringIn**(`str`, `arr`): `boolean`

Defined in: [is-string-in.ts:17](https://github.com/isdk/util.js/blob/4a17f40c6487cc8186e888c58b4e6268f4dcb357/src/is-string-in.ts#L17)

Checks if a given string exists within an array of strings or a single string.

## Parameters

### str

`string`

The string to search for.

### arr

An array of strings or a single string to search within.

`string` | `string`[]

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
