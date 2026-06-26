[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / SemaphoreIsReadyFuncType

# Type Alias: SemaphoreIsReadyFuncType

> **SemaphoreIsReadyFuncType** = () => `Promise`\<`boolean`\> \| `boolean`

Defined in: [src/async-semaphore.ts:19](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/async-semaphore.ts#L19)

就绪检查函数的类型定义。
可以是同步或异步函数。返回 `true` 表示信号量已准备好接受新请求。

## Returns

`Promise`\<`boolean`\> \| `boolean`
