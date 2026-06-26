[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / traverseFolder

# Function: traverseFolder()

> **traverseFolder**(`directoryPath`, `fileHandler`): `Promise`\<`void`\>

Defined in: [src/traverse-folder.ts:44](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/traverse-folder.ts#L44)

Traverses a folder asynchronously and applies a handler to each file or directory.

## Parameters

### directoryPath

`string`

The root directory to start traversal.

### fileHandler

[`TraverseFolderHandler`](../type-aliases/TraverseFolderHandler.md)

A handler function called for each file/directory.

## Returns

`Promise`\<`void`\>

## Example

```typescript
await traverseFolder('/path/to/folder', async (filePath, entry) => {
  console.log(`Found: ${filePath}`);
  if (entry.name === 'stopfile.txt') {
    console.log('Stopping traversal...');
    return true; // Stops further traversal
  }
  return false; // Continues traversal
});
```
