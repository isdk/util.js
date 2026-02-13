[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / TraverseFolderSyncHandler

# Type Alias: TraverseFolderSyncHandler()

> **TraverseFolderSyncHandler** = (`filePath`, `entry`) => `boolean` \| `void`

Defined in: [src/traverse-folder.ts:18](https://github.com/isdk/util.js/blob/40caefda2d376f288af37d8babc9da0357d94056/src/traverse-folder.ts#L18)

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
