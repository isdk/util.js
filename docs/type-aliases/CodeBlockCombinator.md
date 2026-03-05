[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / CodeBlockCombinator

# Type Alias: CodeBlockCombinator

> **CodeBlockCombinator** = `">"` \| `" "` \| `"+"` \| `"~"`

Defined in: [src/extract-code-block.ts:29](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/extract-code-block.ts#L29)

Supported combinators for code block selectors.

- `>` (Direct Child): Matches top-level code blocks within the current context.
- ` ` (Descendant): Matches all code blocks within the current context, including deeply nested ones. (Planned)
- `+` (Adjacent Sibling): Matches the very next code block at the same nesting level. (Planned)
- `~` (General Sibling): Matches all subsequent code blocks at the same nesting level. (Planned)
