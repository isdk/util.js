[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / CodeBlockCombinator

# Type Alias: CodeBlockCombinator

> **CodeBlockCombinator** = `">"` \| `" "` \| `"+"` \| `"~"`

Defined in: [src/extract-code-block.ts:29](https://github.com/isdk/util.js/blob/30c54a8a455a9593000448de2a45f94a197d73de/src/extract-code-block.ts#L29)

Supported combinators for code block selectors.

- `>` (Direct Child): Matches top-level code blocks within the current context.
- ` ` (Descendant): Matches all code blocks within the current context, including deeply nested ones. (Planned)
- `+` (Adjacent Sibling): Matches the very next code block at the same nesting level. (Planned)
- `~` (General Sibling): Matches all subsequent code blocks at the same nesting level. (Planned)
