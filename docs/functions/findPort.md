[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / findPort

# Function: findPort()

> **findPort**(`port`, `options?`): `Promise`\<`number`\>

Defined in: [src/find-port.ts:17](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/find-port.ts#L17)

Finds an available port.

## Parameters

### port

`string` \| `number` \| `undefined`

The starting port number or a string representation of it. Defaults to 0 (random port).

### options?

`number` \| [`FindPortOptions`](../interfaces/FindPortOptions.md)

Either the retry count (number) or an options object.

## Returns

`Promise`\<`number`\>

A promise that resolves to the available port number.
