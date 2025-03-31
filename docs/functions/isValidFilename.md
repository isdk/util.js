[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / isValidFilename

# Function: isValidFilename()

> **isValidFilename**(`filename`): `boolean` \| `""`

Defined in: [filename.ts:63](https://github.com/isdk/util.js/blob/337b47688186bc271c622eb5b7ca550ac681e127/src/filename.ts#L63)

Validates if a given string is a valid filename.

## Parameters

### filename

`string`

The filename to be validated.

## Returns

`boolean` \| `""`

True if the filename is valid, false otherwise.

## Throws

If the input is not a string.

## Example

```ts
isValidFilename('myFile.txt'); // Returns true
isValidFilename('my<file.txt'); // Returns false
```
