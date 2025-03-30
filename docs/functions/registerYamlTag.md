[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / registerYamlTag

# Function: registerYamlTag()

> **registerYamlTag**(`tags`): `void`

Defined in: [yaml.ts:23](https://github.com/isdk/util.js/blob/f467c507a8cfd31890519496ac9059c8ad3f8d03/src/yaml.ts#L23)

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
