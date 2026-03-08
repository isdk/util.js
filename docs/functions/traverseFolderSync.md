[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / traverseFolderSync

# Function: traverseFolderSync()

> **traverseFolderSync**(`directoryPath`, `fileHandler`): `void`

Defined in: [src/traverse-folder.ts:89](https://github.com/isdk/util.js/blob/30c54a8a455a9593000448de2a45f94a197d73de/src/traverse-folder.ts#L89)

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
