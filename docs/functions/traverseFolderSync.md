[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / traverseFolderSync

# Function: traverseFolderSync()

> **traverseFolderSync**(`directoryPath`, `fileHandler`): `void`

Defined in: [traverse-folder.ts:66](https://github.com/isdk/util.js/blob/d56ec17a58f2c8d32fa62a973286199a24a5c2c7/src/traverse-folder.ts#L66)

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
