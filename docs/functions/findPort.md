[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / findPort

# Function: findPort()

> **findPort**(`port`, `options?`): `Promise`\<`number`\>

Defined in: [src/find-port.ts:17](https://github.com/isdk/util.js/blob/30c54a8a455a9593000448de2a45f94a197d73de/src/find-port.ts#L17)

Finds an available port.

## Parameters

### port

The starting port number or a string representation of it. Defaults to 0 (random port).

`string` | `number` | `undefined`

### options?

Either the retry count (number) or an options object.

`number` | [`FindPortOptions`](../interfaces/FindPortOptions.md)

## Returns

`Promise`\<`number`\>

A promise that resolves to the available port number.
