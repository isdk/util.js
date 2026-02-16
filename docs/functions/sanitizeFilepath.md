[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / sanitizeFilepath

# Function: sanitizeFilepath()

> **sanitizeFilepath**(`filepath`, `options?`): `string`

Defined in: [src/filename.ts:178](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/filename.ts#L178)

Sanitizes each part of a file path and reassembles it, ensuring the path is valid according to provided options.

## Parameters

### filepath

`string`

The file path to sanitize, represented as a string.

### options?

[`SanitizeFilenameOptions`](../interfaces/SanitizeFilenameOptions.md) = `{}`

Optional settings for sanitization, extending `SanitizeFilenameOptions`. Allows customization of replacement characters and maximum filename length.

## Returns

`string`

The sanitized file path as a string.
