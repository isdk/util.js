[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / registerYamlTag

# Function: registerYamlTag()

> **registerYamlTag**(`tags`): `void`

Defined in: [yaml.ts:23](https://github.com/isdk/util.js/blob/79fcdde5490ce675c34a8f772113e8a202beea65/src/yaml.ts#L23)

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
