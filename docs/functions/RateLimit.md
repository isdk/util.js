[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / RateLimit

# Function: RateLimit()

> **RateLimit**(`rps`, `__namedParameters?`): () => `Promise`\<`void`\>

Defined in: [src/async-semaphore.ts:488](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L488)

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
