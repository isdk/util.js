[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / FilenameReservedRegex

# Variable: FilenameReservedRegex

> `const` **FilenameReservedRegex**: `RegExp`

Defined in: [src/filename.ts:8](https://github.com/isdk/util.js/blob/7adcba7486666eedeab98e54e02046229c8cb7fc/src/filename.ts#L8)

Regular expression pattern for reserved characters in a filename.
do not use /g global option here: when the regex is executed multiple times, it will always begin where it left off last time.
