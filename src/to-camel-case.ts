import { toPascalCase } from './to-pascal-case'
/**
 * Converts a string to camelCase.
 *
 * @param str - The string to convert.
 * @returns The camelCase version of the string.
 *
 * @example
 * ```typescript
 * console.log(toCamelCase("some-word")); // Output: "someWord"
 * console.log(toCamelCase("some_Word")); // Output: "someWord"
 * console.log(toCamelCase("Some Word")); // Output: "someWord"
 * console.log(toCamelCase("SomeWord"));  // Output: "someWord"
 * console.log(toCamelCase(""));          // Output: ""
 * ```
 */
export function toCamelCase(str: string) {
  str = toPascalCase(str)
  return str.charAt(0).toLowerCase() + str.slice(1)
}
