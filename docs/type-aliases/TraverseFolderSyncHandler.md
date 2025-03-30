[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / TraverseFolderSyncHandler

# Type Alias: TraverseFolderSyncHandler()

> **TraverseFolderSyncHandler** = (`filePath`, `entry`) => `boolean` \| `void`

Defined in: [traverse-folder.ts:18](https://github.com/isdk/util.js/blob/d56ec17a58f2c8d32fa62a973286199a24a5c2c7/src/traverse-folder.ts#L18)

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
