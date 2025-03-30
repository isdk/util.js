[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / normalizeIncludeFiles

# Function: normalizeIncludeFiles()

> **normalizeIncludeFiles**(`files`?, `defaultFiles`?): `string`[]

Defined in: [include-files.ts:34](https://github.com/isdk/util.js/blob/f467c507a8cfd31890519496ac9059c8ad3f8d03/src/include-files.ts#L34)

Normalizes a list of file patterns for glob matching.

This function takes either an array of file patterns or an object containing `include` and `exclude` arrays,
and returns a normalized array of file patterns. If no patterns are provided, it defaults to including
all text-based files as defined in `DefaultAllTextFiles`.

## Parameters

### files?

Either an array of file patterns or an object with `include` and `exclude` properties.

`string`[] | [`IncludeFiles`](../interfaces/IncludeFiles.md)

### defaultFiles?

`string`[] = `DefaultAllTextFiles`

An optional array of default file patterns to use if no include patterns are specified.
                      Defaults to `DefaultAllTextFiles`.

## Returns

`string`[]

A normalized array of file patterns, with excluded patterns prefixed by `!`.

## Example

```typescript
const result = normalizeIncludeFiles({
  include: ['*.ts', '*.js'],
  exclude: ['node_modules/**']
});
console.log(result);
// Output: ['*.ts', '*.js', '!node_modules/**']
```
