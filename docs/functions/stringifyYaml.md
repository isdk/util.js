[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / stringifyYaml

# Function: stringifyYaml()

> **stringifyYaml**(`content`, `options?`): `string`

Defined in: [src/yaml.ts:85](https://github.com/isdk/util.js/blob/40caefda2d376f288af37d8babc9da0357d94056/src/yaml.ts#L85)

Converts a JavaScript object into a YAML string with optional custom tags.

## Parameters

### content

`any`

The JavaScript object to convert to YAML.

### options?

`DocumentOptions` & `SchemaOptions` & `ParseOptions` & `CreateNodeOptions` & `ToStringOptions`

Optional stringification options, including custom tags.

## Returns

`string`

The YAML string representation of the input object.

## Example

```typescript
import { stringifyYaml } from './yaml';

const data = {
  example: 'value',
};
const yamlString = stringifyYaml(data);
console.log(yamlString); // "example: value\n"
```
