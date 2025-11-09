[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / glob

# Function: glob()

> **glob**(`filepath`, `pattern`, `rootDir`?): `undefined` \| `boolean`

Defined in: [src/glob.ts:29](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/glob.ts#L29)

Matches a file path against a list of glob patterns.

This function checks if the given `filepath` matches any of the provided glob `pattern`s.
If a `rootDir` is specified, the `filepath` will first be converted to a relative path
based on the `rootDir`.

## Parameters

### filepath

`string`

The file path to match.

### pattern

`string`[]

An array of glob patterns to match against.

### rootDir?

`string`

(Optional) The root directory used to calculate the relative path of `filepath`.

## Returns

`undefined` \| `boolean`

Returns `true` if the `filepath` matches any of the patterns, otherwise `false`.

## Example

```typescript
import { glob } from './glob';

const filepath = '/home/user/project/src/index.ts';
const patterns = ['src/*.ts', '!src/test.ts'];
const rootDir = '/home/user/project';

const result = glob(filepath, patterns, rootDir);
console.log(result); // true
```
