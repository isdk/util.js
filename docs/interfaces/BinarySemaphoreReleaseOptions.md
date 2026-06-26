[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / BinarySemaphoreReleaseOptions

# Interface: BinarySemaphoreReleaseOptions

Defined in: [src/async-semaphore.ts:85](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L85)

释放信号量时的选项。

## Extended by

- [`BinarySemaphoreReleaserFunc`](BinarySemaphoreReleaserFunc.md)

## Indexable

> \[`n`: `string`\]: `any`

允许扩展其他自定义选项。

## Properties

### token?

> `optional` **token?**: `any`

Defined in: [src/async-semaphore.ts:89](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L89)

可选的令牌。如果使用了自定义的 `initFn`，释放时应归还对应的令牌。
