[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / FilenameReservedRegex

# Variable: FilenameReservedRegex

> `const` **FilenameReservedRegex**: `RegExp`

Defined in: [src/filename.ts:9](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/filename.ts#L9)

Regular expression pattern for reserved characters in a filename.
do not use /g global option here: when the regex is executed multiple times, it will always begin where it left off last time.
