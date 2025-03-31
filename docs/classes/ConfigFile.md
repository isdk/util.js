[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / ConfigFile

# Class: ConfigFile

Defined in: [config-file.ts:46](https://github.com/isdk/util.js/blob/337b47688186bc271c622eb5b7ca550ac681e127/src/config-file.ts#L46)

Represents a configuration file utility class that provides methods to load and save configuration files.
It supports multiple file formats such as YAML, JSON, etc., by registering corresponding parsers and stringifiers.

## Example

```typescript
// Register a custom file type handler
ConfigFile.register('.custom', (content) => {
  return { data: content.toUpperCase() }; // Example parser
}, (obj) => {
  return obj.data.toLowerCase(); // Example stringifier
});

// Save a configuration file
ConfigFile.save('config.custom', { key: 'value' });

// Load a configuration file
const config = ConfigFile.load('config.custom');
console.log(config); // Output: { key: 'value' }
```

## Constructors

### Constructor

> **new ConfigFile**(): `ConfigFile`

#### Returns

`ConfigFile`

## Properties

### stringifys

> `static` **stringifys**: `Record`\<`string`, [`StringifyFunc`](../type-aliases/StringifyFunc.md)\> = `{}`

Defined in: [config-file.ts:50](https://github.com/isdk/util.js/blob/337b47688186bc271c622eb5b7ca550ac681e127/src/config-file.ts#L50)

A record of registered stringify functions for different file extensions.

## Methods

### load()

> `static` **load**(`filename`, `options`?): `any`

Defined in: [config-file.ts:85](https://github.com/isdk/util.js/blob/337b47688186bc271c622eb5b7ca550ac681e127/src/config-file.ts#L85)

Loads a configuration file based on the provided filename and options.

#### Parameters

##### filename

`string`

The path to the configuration file.

##### options?

[`LoadConfigFileOptions`](../interfaces/LoadConfigFileOptions.md)

Additional options for loading the configuration file.

#### Returns

`any`

The parsed configuration object.

#### Example

```typescript
const config = ConfigFile.load('config.yaml');
console.log(config); // Output: { key: 'value' }
```

***

### register()

> `static` **register**(`extname`, `parser`, `stringify`): `void`

Defined in: [config-file.ts:64](https://github.com/isdk/util.js/blob/337b47688186bc271c622eb5b7ca550ac681e127/src/config-file.ts#L64)

Registers a parser and stringifier for specific file extensions.

#### Parameters

##### extname

The file extension(s) to register the parser and stringifier for.

`string` | `string`[]

##### parser

(`content`) => `any`

A function that parses the file content into an object.

##### stringify

[`StringifyFunc`](../type-aliases/StringifyFunc.md)

A function that converts an object back into file content.

#### Returns

`void`

#### Example

```typescript
ConfigFile.register(['.json'], JSON.parse, (obj) => JSON.stringify(obj, null, 2));
```

***

### save()

> `static` **save**(`filename`, `config`, `options`?): `string`

Defined in: [config-file.ts:102](https://github.com/isdk/util.js/blob/337b47688186bc271c622eb5b7ca550ac681e127/src/config-file.ts#L102)

Saves a configuration object to a file with the specified filename and options.

#### Parameters

##### filename

`string`

The path where the configuration file should be saved.

##### config

`any`

The configuration object to save.

##### options?

[`LoadConfigFileOptions`](../interfaces/LoadConfigFileOptions.md)

Additional options for saving the configuration file.

#### Returns

`string`

The final filename where the configuration was saved.

#### Example

```typescript
ConfigFile.save('config.json', { key: 'value' });
```
