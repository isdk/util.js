[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / registerYamlTag

# Function: registerYamlTag()

> **registerYamlTag**(`tags`): `void`

Defined in: [yaml.ts:23](https://github.com/isdk/util.js/blob/37cf8e647afe115375188dc281429b45345985c4/src/yaml.ts#L23)

Registers custom YAML tags to be used in parsing and stringifying YAML content.

## Parameters

### tags

A single tag or an array of tags to register.

`Tags` | `ScalarTag` | `CollectionTag` | `"binary"` | `"bool"` | `"float"` | `"floatExp"` | `"floatNaN"` | `"floatTime"` | `"int"` | `"intHex"` | `"intOct"` | `"intTime"` | `"map"` | `"merge"` | `"null"` | `"omap"` | `"pairs"` | `"seq"` | `"set"` | `"timestamp"`

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
