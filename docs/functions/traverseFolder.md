[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / traverseFolder

# Function: traverseFolder()

> **traverseFolder**(`directoryPath`, `fileHandler`): `Promise`\<`void`\>

Defined in: [traverse-folder.ts:38](https://github.com/isdk/util.js/blob/37cf8e647afe115375188dc281429b45345985c4/src/traverse-folder.ts#L38)

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
