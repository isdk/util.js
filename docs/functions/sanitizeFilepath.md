[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / sanitizeFilepath

# Function: sanitizeFilepath()

> **sanitizeFilepath**(`filepath`, `options`): `string`

Defined in: [filename.ts:149](https://github.com/isdk/util.js/blob/6db2d9183a0020b4684dd604078788d3db3480e8/src/filename.ts#L149)

Sanitizes each part of a file path and reassembles it, ensuring the path is valid according to provided options.

## Parameters

### filepath

`string`

The file path to sanitize, represented as a string.

### options

[`SanitizeFilenameOptions`](../interfaces/SanitizeFilenameOptions.md) = `{}`

Optional settings for sanitization, extending `SanitizeFilenameOptions`. Allows customization of replacement characters and maximum filename length.

## Returns

`string`

The sanitized file path as a string.
