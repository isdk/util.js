[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / traverseFolderSync

# Function: traverseFolderSync()

> **traverseFolderSync**(`directoryPath`, `fileHandler`): `void`

Defined in: [traverse-folder.ts:66](https://github.com/isdk/util.js/blob/79fcdde5490ce675c34a8f772113e8a202beea65/src/traverse-folder.ts#L66)

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
