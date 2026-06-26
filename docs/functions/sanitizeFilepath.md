[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / sanitizeFilepath

# Function: sanitizeFilepath()

> **sanitizeFilepath**(`filepath`, `options?`): `string`

Defined in: [src/filename.ts:178](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/filename.ts#L178)

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
