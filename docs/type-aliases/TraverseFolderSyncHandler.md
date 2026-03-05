[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / TraverseFolderSyncHandler

# Type Alias: TraverseFolderSyncHandler()

> **TraverseFolderSyncHandler** = (`filePath`, `entry`) => `boolean` \| `void`

Defined in: [src/traverse-folder.ts:21](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/traverse-folder.ts#L21)

A handler function for synchronous folder traversal.

## Parameters

### filePath

`string`

The full path of the file or directory.

### entry

`Dirent`

The directory entry (file or folder).

## Returns

`boolean` \| `void`

Returns `true` to stop further traversal, or `false` to continue.
