[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / SemaphoreTaskItem

# Interface: SemaphoreTaskItem

Defined in: [src/async-semaphore.ts:126](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L126)

内部等待任务项的结构定义。

## Extends

- [`BinarySemaphoreAcquireOptions`](BinarySemaphoreAcquireOptions.md)

## Indexable

> \[`n`: `string`\]: `any`

允许扩展其他自定义选项。

## Properties

### reject

> **reject**: (`reason?`) => `void`

Defined in: [src/async-semaphore.ts:134](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L134)

当获取失败（如被中止）时调用的拒绝函数。

#### Parameters

##### reason?

`any`

#### Returns

`void`

***

### resolve

> **resolve**: (`value`) => `void`

Defined in: [src/async-semaphore.ts:130](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L130)

当获取成功时调用的解析函数，接收释放函数作为参数。

#### Parameters

##### value

`any`

#### Returns

`void`

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/async-semaphore.ts:75](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L75)

可选的 AbortSignal，用于取消获取操作。
如果在获取到令牌前信号被中止，`acquire` 返回的 Promise 将被拒绝并抛出 `AbortError`。

#### Inherited from

[`BinarySemaphoreAcquireOptions`](BinarySemaphoreAcquireOptions.md).[`signal`](BinarySemaphoreAcquireOptions.md#signal)

***

### token?

> `optional` **token?**: `any`

Defined in: [src/async-semaphore.ts:138](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L138)

与此任务关联的令牌。
