/**
 * Checks if a given string exists within an array of strings or a single string.
 *
 * @param str - The string to search for.
 * @param arr - An array of strings or a single string to search within.
 * @returns Returns `true` if the string is found, otherwise `false`.
 *
 * @example
 * ```typescript
 * const result = isStringIn("apple", ["banana", "apple", "cherry"]);
 * console.log(result); // true
 *
 * const singleResult = isStringIn("hello", "hello");
 * console.log(singleResult); // true
 * ```
 */
export function isStringIn(str: string, arr: string[] | string) {
  if (typeof arr === 'string') {
    arr = [arr]
  }
  return arr.indexOf(str) !== -1
}
