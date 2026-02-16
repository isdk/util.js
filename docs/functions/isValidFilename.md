[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / isValidFilename

# Function: isValidFilename()

> **isValidFilename**(`filename`): `boolean` \| `""`

Defined in: [src/filename.ts:65](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/filename.ts#L65)

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
