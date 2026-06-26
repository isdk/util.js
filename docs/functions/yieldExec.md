[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / yieldExec

# Function: yieldExec()

> **yieldExec**(): `Promise`\<`void`\>

Defined in: [src/sleep.ts:28](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/sleep.ts#L28)

Yields execution control to the event loop, allowing pending I/O operations
and scheduled tasks to run before continuing.

## Returns

`Promise`\<`void`\>

## Remarks

This method creates a microtask checkpoint using `setImmediate`, which helps:
- Interleave CPU-intensive work with I/O events
- Prevent event loop blocking
- Maintain application responsiveness

Particularly useful for breaking up long synchronous operations in Node.js.
