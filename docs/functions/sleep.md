[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / sleep

# Function: sleep()

> **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [src/sleep.ts:12](https://github.com/isdk/util.js/blob/61856e5b1bbb9d976eeb1fdfe1a4d88a26997dec/src/sleep.ts#L12)

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
