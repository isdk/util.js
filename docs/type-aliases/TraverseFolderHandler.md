[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / TraverseFolderHandler

# Type Alias: TraverseFolderHandler()

> **TraverseFolderHandler** = (`filePath`, `entry`) => `boolean` \| `void` \| `Promise`\<`boolean` \| `void`\>

Defined in: [src/traverse-folder.ts:11](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/traverse-folder.ts#L11)

A handler function for asynchronous folder traversal.

## Parameters

### filePath

`string`

The full path of the file or directory.

### entry

`Dirent`

The directory entry (file or folder).

## Returns

`boolean` \| `void` \| `Promise`\<`boolean` \| `void`\>

Returns `true` to stop further traversal, or `false`/`void` to continue.
