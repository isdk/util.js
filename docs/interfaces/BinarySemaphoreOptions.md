[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / BinarySemaphoreOptions

# Interface: BinarySemaphoreOptions

Defined in: [src/async-semaphore.ts:21](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/async-semaphore.ts#L21)

## Extended by

- [`SemaphoreOptions`](SemaphoreOptions.md)

## Properties

### capacity?

> `optional` **capacity**: `number`

Defined in: [src/async-semaphore.ts:25](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/async-semaphore.ts#L25)

***

### initFn()?

> `optional` **initFn**: () => `any`

Defined in: [src/async-semaphore.ts:22](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/async-semaphore.ts#L22)

#### Returns

`any`

***

### pauseFn()?

> `optional` **pauseFn**: () => `void`

Defined in: [src/async-semaphore.ts:23](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/async-semaphore.ts#L23)

#### Returns

`void`

***

### resumeFn()?

> `optional` **resumeFn**: () => `void`

Defined in: [src/async-semaphore.ts:24](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/async-semaphore.ts#L24)

#### Returns

`void`
