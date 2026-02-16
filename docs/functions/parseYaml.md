[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / parseYaml

# Function: parseYaml()

> **parseYaml**(`content`, `options?`): `any`

Defined in: [src/yaml.ts:66](https://github.com/isdk/util.js/blob/20d48780d60e0a0a6f6a696a3efdfa46d4cb3b1e/src/yaml.ts#L66)

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
