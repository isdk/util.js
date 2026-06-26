[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / FilenameReservedRegex

# Variable: FilenameReservedRegex

> `const` **FilenameReservedRegex**: `RegExp`

Defined in: [src/filename.ts:9](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/filename.ts#L9)

Regular expression pattern for reserved characters in a filename.
do not use /g global option here: when the regex is executed multiple times, it will always begin where it left off last time.
