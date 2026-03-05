[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / RateLimit

# Function: RateLimit()

> **RateLimit**(`rps`, `__namedParameters?`): () => `Promise`\<`void`\>

Defined in: [src/async-semaphore.ts:488](https://github.com/isdk/util.js/blob/2279f0b4363625d4cd214e9bab0415d49b594498/src/async-semaphore.ts#L488)

Creates a rate limiter function that blocks with a promise whenever the rate limit is hit and resolves the promise once the call rate is within the limit set by rps. The second argument is optional.

## Parameters

### rps

`number`

### \_\_namedParameters?

#### timeUnit?

`number` = `1000`

#### uniformDistribution?

`boolean` = `false`

## Returns

> (): `Promise`\<`void`\>

### Returns

`Promise`\<`void`\>
