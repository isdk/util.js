/**
 * Converts a string to capital case, where the first letter of each word is capitalized
 * and the rest are in lowercase. Words are separated by spaces, hyphens, or underscores.
 *
 * @param str - The input string to convert.
 * @returns The converted string in capital case.
 *
 * @example
 * ```typescript
 * toCapitalCase('hello world'); // Returns 'Hello World'
 * toCapitalCase('HELLO-WORLD'); // Returns 'Hello World'
 * toCapitalCase('hello_world'); // Returns 'Hello World'
 * toCapitalCase('hElLo_wOrLd-TeSt cAsE'); // Returns 'H El Lo W Or Ld Te St C As E'
 * toCapitalCase(''); // Returns ''
 * ```
 */
export function toCapitalCase(str: string) {
  if (!str) return '' // Handle empty string case

  // Step 1: Split the string into words based on separators (-, _, space)
  const words = str
    .replace(/[-_ ]+/g, ' ') // Replace hyphens, underscores, or spaces with a space
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Replace lowercase letter followed by uppercase letter with space
    .split(' ')
    .filter(Boolean) // Remove empty strings from the array

  // Step 2: Capitalize the first letter of each word and join them together
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
