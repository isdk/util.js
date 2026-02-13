[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / FilenameReservedRegex

# Variable: FilenameReservedRegex

> `const` **FilenameReservedRegex**: `RegExp`

Defined in: [src/filename.ts:8](https://github.com/isdk/util.js/blob/40caefda2d376f288af37d8babc9da0357d94056/src/filename.ts#L8)

Regular expression pattern for reserved characters in a filename.
do not use /g global option here: when the regex is executed multiple times, it will always begin where it left off last time.
