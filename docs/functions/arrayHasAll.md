[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / arrayHasAll

# Function: arrayHasAll()

> **arrayHasAll**\<`T`\>(`array`, `elements`): `boolean`

Defined in: [src/array-has-all.ts:15](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/array-has-all.ts#L15)

Checks whether the provided array contains all of the specified elements.

## Type Parameters

### T

`T` = `any`

The type of elements in the arrays.

## Parameters

### array

`T`[]

The array to check against.

### elements

`T`[]

The list of elements to be checked for presence in the array.

## Returns

`boolean`

`true` if all elements are present in the array; otherwise, `false`.

## Example

```ts
arrayHasAll([1, 2, 3], [2, 3]); // true
arrayHasAll(['a', 'b', 'c'], ['x', 'y']); // false
```
