[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / omitDeepBy

# Function: omitDeepBy()

> **omitDeepBy**\<`T`\>(`value`, `predicate`, `cache?`): `any`

Defined in: [src/omit-deep-by.ts:92](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/omit-deep-by.ts#L92)

Recursively removes properties from an object or array that satisfy the given predicate condition.

This function traverses the input value deeply and omits any property or element that causes the
predicate function to return `true`. The operation is performed recursively on nested objects and arrays.

For arrays:
- Each element is processed recursively through omitDeepBy
- Elements that satisfy the predicate are filtered out
- If the resulting array is empty, returns `undefined`

For plain objects:
- Each property is processed recursively through omitDeepBy
- Properties that satisfy the predicate are omitted
- Supports both string and symbol keys via `Reflect.ownKeys`
- If the resulting object is empty, returns `undefined`

For primitive values:
- Returns the value unchanged

Special handling:
- Circular references are properly handled using a WeakMap cache
- Non-plain objects (Date, RegExp, etc.) are preserved as-is
- Empty results (after filtering) return `undefined`

## Type Parameters

### T

`T`

The type of the input value

## Parameters

### value

`T`

The data structure to process. Can be any type including objects, arrays, or primitives.

### predicate

(`v`, `k`) => `boolean`

A function that determines whether a property should be removed.
                   The function receives two parameters:
                   - `v`: The current value being evaluated
                   - `k`: The key/index of the current value in its parent container
                   Returns `true` to indicate the item should be removed, `false` to keep it.

### cache?

`WeakMap`\<`object`, `any`\> = `...`

Internal WeakMap for handling circular references. Should not be provided by callers.

## Returns

`any`

A new data structure with matching properties removed, or `undefined` if the result would be empty.
         The returned type matches the input type but with some properties potentially omitted.

## Examples

```ts
// Remove all null and undefined values
const obj = { a: 1, b: null, c: { d: undefined, e: 2 } };
const result = omitDeepBy(obj, (v) => v == null);
// Result: { a: 1, c: { e: 2 } }
```

```ts
// Remove array elements with specific value
const arr = [1, 2, null, 3, undefined];
const result = omitDeepBy(arr, (v) => v == null);
// Result: [1, 2, 3]
```

```ts
// Remove properties based on custom conditions
const data = {
  name: 'John',
  age: 0,
  address: {
    street: '',
    city: 'NYC',
    zip: null
  },
  hobbies: ['reading', '', 'swimming']
};

const cleaned = omitDeepBy(data, (value, key) => {
  // Remove falsy values except 0 and false
  if (key === 'age') return false; // Keep age even if 0
  return !value && value !== 0 && value !== false;
});

// Result: {
//   name: 'John',
//   age: 0,
//   address: { city: 'NYC' },
//   hobbies: ['reading', 'swimming']
// }
```

```ts
// Handle circular references safely
const circular: any = { a: 1 };
circular.self = circular;
const result = omitDeepBy(circular, (v) => v === 1);
// Result: { self: [Circular] } where self points to the same object
```
