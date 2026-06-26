[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / sleep

# Function: sleep()

> **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [src/sleep.ts:12](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/sleep.ts#L12)

Suspends execution for a specified number of milliseconds

## Parameters

### ms

`number`

The number of milliseconds to pause execution

## Returns

`Promise`\<`void`\>

## Example

```ts
await sleep(500); // Pause for half a second
```

## Remarks

This implementation uses `setTimeout` under the hood and is more precise
for longer durations than `setImmediate`-based approaches
