[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / toCapitalCase

# Function: toCapitalCase()

> **toCapitalCase**(`str`): `string`

Defined in: [src/to-capital-case.ts:17](https://github.com/isdk/util.js/blob/40caefda2d376f288af37d8babc9da0357d94056/src/to-capital-case.ts#L17)

Converts a string to capital case, where the first letter of each word is capitalized
and the rest are in lowercase. Words are separated by spaces, hyphens, or underscores.

## Parameters

### str

`string`

The input string to convert.

## Returns

`string`

The converted string in capital case.

## Example

```typescript
toCapitalCase('hello world'); // Returns 'Hello World'
toCapitalCase('HELLO-WORLD'); // Returns 'Hello World'
toCapitalCase('hello_world'); // Returns 'Hello World'
toCapitalCase('hElLo_wOrLd-TeSt cAsE'); // Returns 'H El Lo W Or Ld Te St C As E'
toCapitalCase(''); // Returns ''
```
