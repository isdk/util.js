[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / registerYamlTag

# Function: registerYamlTag()

> **registerYamlTag**(`tags`): `void`

Defined in: [yaml.ts:23](https://github.com/isdk/util.js/blob/d56ec17a58f2c8d32fa62a973286199a24a5c2c7/src/yaml.ts#L23)

Registers custom YAML tags to be used in parsing and stringifying YAML content.

## Parameters

### tags

`any`

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
