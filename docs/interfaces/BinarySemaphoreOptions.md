[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / BinarySemaphoreOptions

# Interface: BinarySemaphoreOptions

Defined in: [src/async-semaphore.ts:21](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L21)

## Extended by

- [`SemaphoreOptions`](SemaphoreOptions.md)

## Properties

### capacity?

> `optional` **capacity**: `number`

Defined in: [src/async-semaphore.ts:25](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L25)

***

### initFn()?

> `optional` **initFn**: () => `any`

Defined in: [src/async-semaphore.ts:22](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L22)

#### Returns

`any`

***

### pauseFn()?

> `optional` **pauseFn**: () => `void`

Defined in: [src/async-semaphore.ts:23](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L23)

#### Returns

`void`

***

### resumeFn()?

> `optional` **resumeFn**: () => `void`

Defined in: [src/async-semaphore.ts:24](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L24)

#### Returns

`void`
