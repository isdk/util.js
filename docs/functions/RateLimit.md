[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / RateLimit

# Function: RateLimit()

> **RateLimit**(`rps`, `__namedParameters`): () => `Promise`\<`void`\>

Defined in: [src/async-semaphore.ts:476](https://github.com/isdk/util.js/blob/1244ecc63e69dca791e24e154694c362d05c92c5/src/async-semaphore.ts#L476)

Creates a rate limiter function that blocks with a promise whenever the rate limit is hit and resolves the promise once the call rate is within the limit set by rps. The second argument is optional.

## Parameters

### rps

`number`

### \_\_namedParameters

#### timeUnit?

`number` = `1000`

#### uniformDistribution?

`boolean` = `false`

## Returns

> (): `Promise`\<`void`\>

### Returns

`Promise`\<`void`\>
