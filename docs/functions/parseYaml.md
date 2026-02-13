[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / parseYaml

# Function: parseYaml()

> **parseYaml**(`content`, `options?`): `any`

Defined in: [src/yaml.ts:51](https://github.com/isdk/util.js/blob/61856e5b1bbb9d976eeb1fdfe1a4d88a26997dec/src/yaml.ts#L51)

Parses a YAML string into a JavaScript object with optional custom tags.

## Parameters

### content

`string`

The YAML string to parse.

### options?

`ParseOptions` & `DocumentOptions` & `SchemaOptions` & `ToJSOptions`

Optional parsing options, including custom tags.

## Returns

`any`

The parsed JavaScript object.

## Example

```typescript
import { parseYaml } from './yaml';

const yamlContent = `
  example: !custom value
`;
const result = parseYaml(yamlContent);
console.log(result); // { example: 'resolved-value' }
```
