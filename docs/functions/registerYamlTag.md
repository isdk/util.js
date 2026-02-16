[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / registerYamlTag

# Function: registerYamlTag()

> **registerYamlTag**(`tags`): `void`

Defined in: [src/yaml.ts:34](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/yaml.ts#L34)

Registers custom YAML tags to be used in parsing and stringifying YAML content.

## Parameters

### tags

A single tag or an array of tags to register.

`"map"` | `Tags` | `ScalarTag` | `CollectionTag` | `"binary"` | `"bool"` | `"float"` | `"floatExp"` | `"floatNaN"` | `"floatTime"` | `"int"` | `"intHex"` | `"intOct"` | `"intTime"` | `"merge"` | `"null"` | `"omap"` | `"pairs"` | `"seq"` | `"set"` | `"timestamp"`

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
