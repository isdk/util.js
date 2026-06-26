[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / registerYamlTag

# Function: registerYamlTag()

> **registerYamlTag**(`tags`): `void`

Defined in: [src/yaml.ts:34](https://github.com/isdk/util.js/blob/c98bd1bf94d1b1dc8d01c6b9a6fc50b4beec5c62/src/yaml.ts#L34)

Registers custom YAML tags to be used in parsing and stringifying YAML content.

## Parameters

### tags

`"map"` \| `Tags` \| `ScalarTag` \| `CollectionTag` \| `"binary"` \| `"bool"` \| `"float"` \| `"floatExp"` \| `"floatNaN"` \| `"floatTime"` \| `"int"` \| `"intHex"` \| `"intOct"` \| `"intTime"` \| `"merge"` \| `"null"` \| `"omap"` \| `"pairs"` \| `"seq"` \| `"set"` \| `"timestamp"`

A single tag or an array of tags to register.

## Returns

`void`

## Example

```typescript
import { registerYamlTag } from './yaml';

const customTag = {
  tag: '!custom',
  resolve: (value) => `resolved-${value}`,
};
registerYamlTag(customTag);
```
