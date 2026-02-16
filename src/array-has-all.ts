/**
 * Checks whether the provided array contains all of the specified elements.
 *
 * @typeParam T - The type of elements in the arrays.
 * @param array - The array to check against.
 * @param elements - The list of elements to be checked for presence in the array.
 * @returns `true` if all elements are present in the array; otherwise, `false`.
 *
 * @example
 * ```ts
 * arrayHasAll([1, 2, 3], [2, 3]); // true
 * arrayHasAll(['a', 'b', 'c'], ['x', 'y']); // false
 * ```
 */
export function arrayHasAll<T = any>(array: T[], elements: T[]) {
  const targetSet = new Set(elements)
  const foundSet = new Set()

  for (const item of array) {
    if (targetSet.has(item)) {
      foundSet.add(item)
      if (foundSet.size === targetSet.size) {
        return true
      }
    }
  }

  return foundSet.size === targetSet.size
}
