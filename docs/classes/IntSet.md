[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / IntSet

# Class: IntSet

Defined in: [src/intset.ts:6](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L6)

Represents a set of integers using a bit field.
Each bit in the bit field represents an integer starting from 0,
where the flag value 0 represents the 0th bit, 1 represents the 1st bit, and so on.

## Constructors

### Constructor

> **new IntSet**(`bitField`): `IntSet`

Defined in: [src/intset.ts:21](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L21)

#### Parameters

##### bitField

`number` = `0`

#### Returns

`IntSet`

## Methods

### add()

> **add**(`flag`): `IntSet`

Defined in: [src/intset.ts:29](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L29)

Adds an element to the set.

#### Parameters

##### flag

`number`

The flag value representing the bit position to set.
             Note: the flag value 0 represents the 0th bit, and so on.

#### Returns

`IntSet`

***

### clear()

> **clear**(): `IntSet`

Defined in: [src/intset.ts:57](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L57)

Clears all elements from the set.

#### Returns

`IntSet`

***

### delete()

> **delete**(`flag`): `IntSet`

Defined in: [src/intset.ts:39](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L39)

Removes an element from the set.

#### Parameters

##### flag

`number`

The flag value representing the bit position to set. 0 represents the 0th bit

#### Returns

`IntSet`

***

### has()

> **has**(`flag`): `boolean`

Defined in: [src/intset.ts:50](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L50)

Determines whether an element is in the set.

#### Parameters

##### flag

`number`

The flag value representing the bit position to set. 0 represents the 0th bit

#### Returns

`boolean`

true if the element is in the set; otherwise, false.

***

### toJSON()

> **toJSON**(): `number`

Defined in: [src/intset.ts:70](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L70)

#### Returns

`number`

***

### toString()

> **toString**(): `string`

Defined in: [src/intset.ts:66](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L66)

#### Returns

`string`

***

### valueOf()

> **valueOf**(): `number`

Defined in: [src/intset.ts:62](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L62)

#### Returns

`number`

***

### add()

> `static` **add**(`bitField`, `flag`): `number`

Defined in: [src/intset.ts:12](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L12)

#### Parameters

##### bitField

`number`

##### flag

`number`

#### Returns

`number`

***

### delete()

> `static` **delete**(`bitField`, `flag`): `number`

Defined in: [src/intset.ts:16](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L16)

#### Parameters

##### bitField

`number`

##### flag

`number`

#### Returns

`number`

***

### has()

> `static` **has**(`bitField`, `flag`): `boolean`

Defined in: [src/intset.ts:8](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/intset.ts#L8)

#### Parameters

##### bitField

`number`

##### flag

`number`

#### Returns

`boolean`
