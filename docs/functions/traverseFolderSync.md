[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / traverseFolderSync

# Function: traverseFolderSync()

> **traverseFolderSync**(`directoryPath`, `fileHandler`): `void`

Defined in: [traverse-folder.ts:76](https://github.com/isdk/util.js/blob/4a17f40c6487cc8186e888c58b4e6268f4dcb357/src/traverse-folder.ts#L76)

Traverses a folder synchronously and applies a handler to each file or directory.

## Parameters

### directoryPath

`string`

The root directory to start traversal.

### fileHandler

[`TraverseFolderSyncHandler`](../type-aliases/TraverseFolderSyncHandler.md)

A handler function called for each file/directory.

## Returns

`void`

## Example

```typescript
traverseFolderSync('/path/to/folder', (filePath, entry) => {
  console.log(`Found: ${filePath}`);
  if (entry.name === 'stopfile.txt') {
    console.log('Stopping traversal...');
    return true; // Stops further traversal
  }
  return false; // Continues traversal
});
```
