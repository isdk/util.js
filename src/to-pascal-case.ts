/**
 * Converts a string to PascalCase.
 *
 * @param str - The string to convert.
 * @returns The PascalCase version of the string.
 *
 * @example
 * ```typescript
 * console.log(toPascalCase("some-word")); // Output: "SomeWord"
 * console.log(toPascalCase("some_Word")); // Output: "SomeWord"
 * console.log(toPascalCase("someWord"));  // Output: "SomeWord"
 * console.log(toPascalCase("some word")); // Output: "SomeWord"
 * console.log(toPascalCase("SOME_WORD")); // Output: "SomeWord"
 * ```
 */
export function toPascalCase(str: string) {
  if (!str) return ""; // Handle empty string case

  // Step 1: Split the string into words based on separators (-, _, space)
  const words = str
    .replace(/[-_ ]+/g, " ") // Replace hyphens, underscores, or spaces with a space
    .split(" ")
    .filter(Boolean); // Remove empty strings from the array

  // Step 2: Capitalize the first letter of each word and join them together
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
