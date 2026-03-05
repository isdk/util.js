[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / sanitizeFilename

# Function: sanitizeFilename()

> **sanitizeFilename**(`filename`, `options?`): `string`

Defined in: [src/filename.ts:110](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/filename.ts#L110)

Sanitizes a given filename by replacing invalid characters with a specified replacement character or a default.

## Parameters

### filename

`string`

The filename to sanitize, represented as a string.

### options?

[`SanitizeFilenameOptions`](../interfaces/SanitizeFilenameOptions.md) = `{}`

An optional object containing configuration options:
  - `replacement` {string} - The character to replace invalid characters with. Default is '!'. Cannot contain reserved filename characters.
  - `maxLength` {number} - The maximum length of the sanitized filename. Default is `MAX_FILENAME_LENGTH`.

## Returns

`string`

The sanitized filename.

## Throws

- If the `replacement` contains reserved filename characters or control characters.
