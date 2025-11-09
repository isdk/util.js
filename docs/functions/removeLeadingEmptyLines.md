[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / removeLeadingEmptyLines

# Function: removeLeadingEmptyLines()

> **removeLeadingEmptyLines**(`text`): `string`

Defined in: [src/remove-leading-empty-lines.ts:16](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/remove-leading-empty-lines.ts#L16)

Removes all leading empty lines or "#" comments line from the given string.

This function trims any sequence of empty lines that appear at the beginning
of the input string. It accounts for different newline characters including
'\n', '\r\n', and also considers lines that contain only whitespace characters.

## Parameters

### text

`string`

The string from which to remove leading empty lines.

## Returns

`string`

The string with leading empty lines removed.

## Example

```ts
const sampleText = '# This is a comment\n\nHello, world!\n';
const cleanedText = removeLeadingEmptyLines(sampleText);
// cleanedText is now 'Hello, world!\n'
```
