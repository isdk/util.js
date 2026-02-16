import { readdir } from 'fs/promises'
import { type Dirent, readdirSync } from 'fs'
import path from 'path'

/**
 * A handler function for asynchronous folder traversal.
 * @param filePath - The full path of the file or directory.
 * @param entry - The directory entry (file or folder).
 * @returns Returns `true` to stop further traversal, or `false`/`void` to continue.
 */
export type TraverseFolderHandler = (
  filePath: string,
  entry: Dirent
) => boolean | void | Promise<boolean | void>
/**
 * A handler function for synchronous folder traversal.
 * @param filePath - The full path of the file or directory.
 * @param entry - The directory entry (file or folder).
 * @returns Returns `true` to stop further traversal, or `false` to continue.
 */
export type TraverseFolderSyncHandler = (
  filePath: string,
  entry: Dirent
) => boolean | void

/**
 * Traverses a folder asynchronously and applies a handler to each file or directory.
 *
 * @param directoryPath - The root directory to start traversal.
 * @param fileHandler - A handler function called for each file/directory.
 *
 * @example
 * ```typescript
 * await traverseFolder('/path/to/folder', async (filePath, entry) => {
 *   console.log(`Found: ${filePath}`);
 *   if (entry.name === 'stopfile.txt') {
 *     console.log('Stopping traversal...');
 *     return true; // Stops further traversal
 *   }
 *   return false; // Continues traversal
 * });
 * ```
 */
export async function traverseFolder(
  directoryPath: string,
  fileHandler: TraverseFolderHandler
) {
  const files = await readdir(directoryPath, { withFileTypes: true })

  for (const entry of files) {
    const filePath = path.join(directoryPath, entry.name)
    try {
      if (entry.isDirectory()) {
        const stopped = await fileHandler(filePath, entry)
        if (!stopped) {
          await traverseFolder(filePath, fileHandler)
        }
      } else {
        const stopped = await fileHandler(filePath, entry)
        if (stopped === true) {
          break
        }
      }
    } catch (err) {
      console.error(`Error processing file: ${filePath}`)
      console.error(err)
    }
  }
}

/**
 * Traverses a folder synchronously and applies a handler to each file or directory.
 *
 * @param directoryPath - The root directory to start traversal.
 * @param fileHandler - A handler function called for each file/directory.
 *
 * @example
 * ```typescript
 * traverseFolderSync('/path/to/folder', (filePath, entry) => {
 *   console.log(`Found: ${filePath}`);
 *   if (entry.name === 'stopfile.txt') {
 *     console.log('Stopping traversal...');
 *     return true; // Stops further traversal
 *   }
 *   return false; // Continues traversal
 * });
 * ```
 */
export function traverseFolderSync(
  directoryPath: string,
  fileHandler: TraverseFolderSyncHandler
) {
  const files = readdirSync(directoryPath, { withFileTypes: true })

  for (const entry of files) {
    const filePath = path.join(directoryPath, entry.name)
    try {
      if (entry.isDirectory()) {
        const stopped = fileHandler(filePath, entry)
        if (!stopped) {
          traverseFolder(filePath, fileHandler)
        }
      } else {
        const stopped = fileHandler(filePath, entry)
        if (stopped === true) {
          break
        }
      }
    } catch (err) {
      console.error(`Error processing file: ${filePath}`)
      console.error(err)
    }
  }
}
