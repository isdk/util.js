[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / SemaphoreTaskItem

# Interface: SemaphoreTaskItem

Defined in: [src/async-semaphore.ts:52](https://github.com/isdk/util.js/blob/1244ecc63e69dca791e24e154694c362d05c92c5/src/async-semaphore.ts#L52)

## Extends

- [`BinarySemaphoreAcquireOptions`](BinarySemaphoreAcquireOptions.md)

## Indexable

\[`n`: `string`\]: `any`

## Properties

### reject()

> **reject**: (`reason?`) => `void`

Defined in: [src/async-semaphore.ts:54](https://github.com/isdk/util.js/blob/1244ecc63e69dca791e24e154694c362d05c92c5/src/async-semaphore.ts#L54)

#### Parameters

##### reason?

`any`

#### Returns

`void`

***

### resolve()

> **resolve**: (`value`) => `void`

Defined in: [src/async-semaphore.ts:53](https://github.com/isdk/util.js/blob/1244ecc63e69dca791e24e154694c362d05c92c5/src/async-semaphore.ts#L53)

#### Parameters

##### value

`any`

#### Returns

`void`

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [src/async-semaphore.ts:29](https://github.com/isdk/util.js/blob/1244ecc63e69dca791e24e154694c362d05c92c5/src/async-semaphore.ts#L29)

#### Inherited from

[`BinarySemaphoreAcquireOptions`](BinarySemaphoreAcquireOptions.md).[`signal`](BinarySemaphoreAcquireOptions.md#signal)

***

### token?

> `optional` **token**: `any`

Defined in: [src/async-semaphore.ts:55](https://github.com/isdk/util.js/blob/1244ecc63e69dca791e24e154694c362d05c92c5/src/async-semaphore.ts#L55)
