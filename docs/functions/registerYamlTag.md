[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / registerYamlTag

# Function: registerYamlTag()

> **registerYamlTag**(`tags`): `void`

Defined in: [yaml.ts:23](https://github.com/isdk/util.js/blob/337b47688186bc271c622eb5b7ca550ac681e127/src/yaml.ts#L23)

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
