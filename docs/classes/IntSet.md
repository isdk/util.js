[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / IntSet

# Class: IntSet

Defined in: [src/intset.ts:6](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L6)

Represents a set of integers using a bit field.
Each bit in the bit field represents an integer starting from 0,
where the flag value 0 represents the 0th bit, 1 represents the 1st bit, and so on.

## Constructors

### Constructor

> **new IntSet**(`bitField?`): `IntSet`

Defined in: [src/intset.ts:20](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L20)

#### Parameters

##### bitField?

`number` = `0`

#### Returns

`IntSet`

## Methods

### add()

> **add**(`flag`): `IntSet`

Defined in: [src/intset.ts:28](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L28)

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

Defined in: [src/intset.ts:56](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L56)

Clears all elements from the set.

#### Returns

`IntSet`

***

### delete()

> **delete**(`flag`): `IntSet`

Defined in: [src/intset.ts:38](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L38)

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

Defined in: [src/intset.ts:49](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L49)

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

Defined in: [src/intset.ts:69](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L69)

#### Returns

`number`

***

### toString()

> **toString**(): `string`

Defined in: [src/intset.ts:65](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L65)

#### Returns

`string`

***

### valueOf()

> **valueOf**(): `number`

Defined in: [src/intset.ts:61](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L61)

#### Returns

`number`

***

### add()

> `static` **add**(`bitField`, `flag`): `number`

Defined in: [src/intset.ts:11](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L11)

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

Defined in: [src/intset.ts:15](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L15)

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

Defined in: [src/intset.ts:7](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/intset.ts#L7)

#### Parameters

##### bitField

`number`

##### flag

`number`

#### Returns

`boolean`
