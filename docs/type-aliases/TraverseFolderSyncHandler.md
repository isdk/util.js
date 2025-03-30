[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / TraverseFolderSyncHandler

# Type Alias: TraverseFolderSyncHandler()

> **TraverseFolderSyncHandler** = (`filePath`, `entry`) => `boolean` \| `void`

Defined in: [traverse-folder.ts:18](https://github.com/isdk/util.js/blob/79fcdde5490ce675c34a8f772113e8a202beea65/src/traverse-folder.ts#L18)

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
