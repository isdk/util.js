[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / Semaphore

# Class: Semaphore

Defined in: [src/async-semaphore.ts:377](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L377)

A Semaphore implementation for managing concurrency in asynchronous operations.
Semaphores allow a fixed number of resources to be accessed concurrently.
This class extends BinarySemaphore and adds support for a maximum concurrency limit and an optional readiness check.

Example usage:

```typescript
const semaphore = new Semaphore(5); // Allows 5 concurrent operations.

const semaphore = new Semaphore(
  4, // Allow 4 concurrent async calls
  {
    capacity: 100, // Prealloc space for 100 tokens
    isReadyFn: async () => {
      // Check if the system is ready to handle more requests
      return true;
    },
    pauseFn: () => {
      console.log('Pausing the stream');
    },
    resumeFn: () => {
      console.log('Resuming the stream');
    }
  }
);

async function fetchData(x) {
  await semaphore.acquire()
  try {
    console.log(semaphore.pendingCount() + ' calls to fetch are waiting')
    // ... do some async stuff with x
  } finally {
    semaphore.release();
  }
}

const data = await Promise.all(array.map(fetchData));
```

## Extends

- [`BinarySemaphore`](BinarySemaphore.md)

## Constructors

### Constructor

> **new Semaphore**(`maxConcurrency`, `options?`): `Semaphore`

Defined in: [src/async-semaphore.ts:395](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L395)

Creates a semaphore object. The first argument is the maximum concurrently number and the second argument is optional.

#### Parameters

##### maxConcurrency

The maximum number of callers allowed to acquire the semaphore concurrently.

`number` | [`SemaphoreOptions`](../interfaces/SemaphoreOptions.md)

##### options?

[`SemaphoreOptions`](../interfaces/SemaphoreOptions.md)

#### Returns

`Semaphore`

#### Overrides

[`BinarySemaphore`](BinarySemaphore.md).[`constructor`](BinarySemaphore.md#constructor)

## Properties

### \_activeCount

> `protected` **\_activeCount**: `number`

Defined in: [src/async-semaphore.ts:97](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L97)

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`_activeCount`](BinarySemaphore.md#_activecount)

***

### emitter

> `protected` **emitter**: `EventEmitter`

Defined in: [src/async-semaphore.ts:91](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L91)

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`emitter`](BinarySemaphore.md#emitter)

***

### free

> `protected` **free**: [`Deque`](Deque.md)\<`any`\>

Defined in: [src/async-semaphore.ts:379](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L379)

#### Overrides

[`BinarySemaphore`](BinarySemaphore.md).[`free`](BinarySemaphore.md#free)

***

### initTokenFn()

> `protected` **initTokenFn**: (`token?`) => `void`

Defined in: [src/async-semaphore.ts:95](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L95)

#### Parameters

##### token?

`any`

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`initTokenFn`](BinarySemaphore.md#inittokenfn)

***

### maxConcurrency

> `readonly` **maxConcurrency**: `number`

Defined in: [src/async-semaphore.ts:378](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L378)

***

### paused

> `protected` **paused**: `boolean`

Defined in: [src/async-semaphore.ts:96](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L96)

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`paused`](BinarySemaphore.md#paused)

***

### pauseFn()?

> `protected` `optional` **pauseFn**: () => `void`

Defined in: [src/async-semaphore.ts:93](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L93)

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`pauseFn`](BinarySemaphore.md#pausefn)

***

### resumeFn()?

> `protected` `optional` **resumeFn**: () => `void`

Defined in: [src/async-semaphore.ts:94](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L94)

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`resumeFn`](BinarySemaphore.md#resumefn)

***

### useDefaultTokens

> `protected` **useDefaultTokens**: `boolean`

Defined in: [src/async-semaphore.ts:92](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L92)

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`useDefaultTokens`](BinarySemaphore.md#usedefaulttokens)

***

### waiting

> `readonly` **waiting**: [`Deque`](Deque.md)\<[`SemaphoreTaskItem`](../interfaces/SemaphoreTaskItem.md) \| `undefined`\>

Defined in: [src/async-semaphore.ts:89](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L89)

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`waiting`](BinarySemaphore.md#waiting)

## Accessors

### activeCount

#### Get Signature

> **get** **activeCount**(): `number`

Defined in: [src/async-semaphore.ts:323](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L323)

Get the total count of all active operations.

This method returns the number of operations that are either:
- Waiting in the queue to acquire the semaphore (`pendingCount`).
- Already acquired the semaphore but have not yet released it.

##### Returns

`number`

The total count of active operations, including both waiting and ongoing tasks.

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`activeCount`](BinarySemaphore.md#activecount)

***

### pendingCount

#### Get Signature

> **get** **pendingCount**(): `number`

Defined in: [src/async-semaphore.ts:332](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L332)

Get the number of callers waiting on the semaphore, i.e. the number of pending promises.

##### Returns

`number`

The number of waiters in the waiting list.

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`pendingCount`](BinarySemaphore.md#pendingcount)

## Methods

### \_dispatchTask()

> **\_dispatchTask**(`task`, `options?`): `void`

Defined in: [src/async-semaphore.ts:210](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L210)

#### Parameters

##### task

[`SemaphoreTaskItem`](../interfaces/SemaphoreTaskItem.md)

##### options?

[`BinarySemaphoreReleaseOptions`](../interfaces/BinarySemaphoreReleaseOptions.md)

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`_dispatchTask`](BinarySemaphore.md#_dispatchtask)

***

### \_newReleaser()

> **\_newReleaser**(`options?`): [`BinarySemaphoreReleaserFunc`](../interfaces/BinarySemaphoreReleaserFunc.md)

Defined in: [src/async-semaphore.ts:195](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L195)

#### Parameters

##### options?

[`BinarySemaphoreReleaseOptions`](../interfaces/BinarySemaphoreReleaseOptions.md)

#### Returns

[`BinarySemaphoreReleaserFunc`](../interfaces/BinarySemaphoreReleaserFunc.md)

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`_newReleaser`](BinarySemaphore.md#_newreleaser)

***

### abort()

> **abort**(`reason?`): `void`

Defined in: [src/async-semaphore.ts:306](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L306)

#### Parameters

##### reason?

`any`

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`abort`](BinarySemaphore.md#abort)

***

### acquire()

> **acquire**(`options?`): `Promise`\<[`BinarySemaphoreReleaserFunc`](../interfaces/BinarySemaphoreReleaserFunc.md)\>

Defined in: [src/async-semaphore.ts:244](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L244)

Acquire a token from the semaphore, thus decrement the number of available execution slots. If initFn is not used then the return value of the function can be discarded.

#### Parameters

##### options?

[`BinarySemaphoreAcquireOptions`](../interfaces/BinarySemaphoreAcquireOptions.md)

#### Returns

`Promise`\<[`BinarySemaphoreReleaserFunc`](../interfaces/BinarySemaphoreReleaserFunc.md)\>

A promise that resolves to a release function when a token is acquired. If the semaphore is full, the caller will be added to a waiting queue.

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`acquire`](BinarySemaphore.md#acquire)

***

### drain()

> **drain**(): `Promise`\<`any`[]\>

Defined in: [src/async-semaphore.ts:451](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L451)

Drains the semaphore and returns all the initialized tokens in an array. Draining is an ideal way to ensure there are no pending async tasks, for example before a process will terminate.

#### Returns

`Promise`\<`any`[]\>

#### Overrides

[`BinarySemaphore`](BinarySemaphore.md).[`drain`](BinarySemaphore.md#drain)

***

### init()

> **init**(`options`): `void`

Defined in: [src/async-semaphore.ts:189](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L189)

#### Parameters

##### options

[`BinarySemaphoreOptions`](../interfaces/BinarySemaphoreOptions.md)

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`init`](BinarySemaphore.md#init)

***

### initFree()

> **initFree**(`options`): `void`

Defined in: [src/async-semaphore.ts:413](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L413)

#### Parameters

##### options

[`SemaphoreOptions`](../interfaces/SemaphoreOptions.md)

#### Returns

`void`

#### Overrides

[`BinarySemaphore`](BinarySemaphore.md).[`initFree`](BinarySemaphore.md#initfree)

***

### lock()

> **lock**(`options?`): `any`

Defined in: [src/async-semaphore.ts:447](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L447)

#### Parameters

##### options?

[`BinarySemaphoreAcquireOptions`](../interfaces/BinarySemaphoreAcquireOptions.md)

#### Returns

`any`

#### Overrides

[`BinarySemaphore`](BinarySemaphore.md).[`lock`](BinarySemaphore.md#lock)

***

### onReleased()

> **onReleased**(`options?`): `void`

Defined in: [src/async-semaphore.ts:173](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L173)

#### Parameters

##### options?

[`BinarySemaphoreReleaseOptions`](../interfaces/BinarySemaphoreReleaseOptions.md)

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`onReleased`](BinarySemaphore.md#onreleased)

***

### release()

> **release**(`options?`): `void`

Defined in: [src/async-semaphore.ts:293](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L293)

Releases the semaphore, incrementing the number of free execution slots. If there are tasks in the waiting queue, the next task will be dispatched.

#### Parameters

##### options?

[`BinarySemaphoreReleaseOptions`](../interfaces/BinarySemaphoreReleaseOptions.md)

#### Returns

`void`

#### Inherited from

[`BinarySemaphore`](BinarySemaphore.md).[`release`](BinarySemaphore.md#release)

***

### tryAcquire()

> **tryAcquire**(`options?`): `any`

Defined in: [src/async-semaphore.ts:424](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L424)

Attempt to acquire a token from the semaphore, if one is available immediately. Otherwise, return undefined.

#### Parameters

##### options?

[`BinarySemaphoreAcquireOptions`](../interfaces/BinarySemaphoreAcquireOptions.md)

#### Returns

`any`

Returns a token if the semaphore is not full; otherwise, returns `undefined`.

#### Overrides

[`BinarySemaphore`](BinarySemaphore.md).[`tryAcquire`](BinarySemaphore.md#tryacquire)

***

### unlock()

> **unlock**(`token?`): `void`

Defined in: [src/async-semaphore.ts:443](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/async-semaphore.ts#L443)

#### Parameters

##### token?

`any`

#### Returns

`void`

#### Overrides

[`BinarySemaphore`](BinarySemaphore.md).[`unlock`](BinarySemaphore.md#unlock)
