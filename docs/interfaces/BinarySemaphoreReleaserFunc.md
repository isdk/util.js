[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / BinarySemaphoreReleaserFunc

# Interface: BinarySemaphoreReleaserFunc()

Defined in: [src/async-semaphore.ts:100](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L100)

信号量释放函数的接口定义。
它本身是一个函数，同时也包含释放选项作为属性。

## Extends

- [`BinarySemaphoreReleaseOptions`](BinarySemaphoreReleaseOptions.md)

> **BinarySemaphoreReleaserFunc**(): `void`

Defined in: [src/async-semaphore.ts:104](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L104)

调用此函数以释放信号量。

## Returns

`void`

## Indexable

> \[`n`: `string`\]: `any`

允许扩展其他自定义选项。

## Properties

### token?

> `optional` **token?**: `any`

Defined in: [src/async-semaphore.ts:89](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L89)

可选的令牌。如果使用了自定义的 `initFn`，释放时应归还对应的令牌。

#### Inherited from

[`BinarySemaphoreReleaseOptions`](BinarySemaphoreReleaseOptions.md).[`token`](BinarySemaphoreReleaseOptions.md#token)
