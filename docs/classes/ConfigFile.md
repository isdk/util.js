[**@isdk/util**](../README.md)

***

[@isdk/util](../globals.md) / ConfigFile

# Class: ConfigFile

Defined in: [src/config-file.ts:46](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/config-file.ts#L46)

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
ConfigFile.saveSync('config.custom', { key: 'value' });

// Load a configuration file
const config = ConfigFile.loadSync('config.custom');
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

Defined in: [src/config-file.ts:50](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/config-file.ts#L50)

A record of registered stringify functions for different file extensions.

## Methods

### existsSync()

> `static` **existsSync**(`filename`, `options`?): `boolean`

Defined in: [src/config-file.ts:132](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/config-file.ts#L132)

Checks if a configuration file exists at the specified path.

This method normalizes the filename by removing the extension (if present) and then delegates
to the underlying LoadConfigFile utility to perform the existence check. The normalization
ensures consistent handling of files regardless of whether they include extensions in the
provided filename.

#### Parameters

##### filename

`string`

The path to the configuration file to check for existence.
                 This can include or omit the file extension.

##### options?

[`LoadConfigFileOptions`](../interfaces/LoadConfigFileOptions.md)

Optional configuration options that may affect how the file existence
                is checked, including extension level handling.

#### Returns

`boolean`

`true` if the configuration file exists, `false` otherwise.

#### Example

```typescript
// Check if a YAML config file exists
const exists = ConfigFile.existsSync('config.yaml');
console.log(exists); // true or false

// Check with options
const existsWithExt = ConfigFile.existsSync('config', { extLevel: 2 });
console.log(existsWithExt); // true or false
```

***

### loadSync()

> `static` **loadSync**(`filename`, `options`?): `any`

Defined in: [src/config-file.ts:85](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/config-file.ts#L85)

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
const config = ConfigFile.loadSync('config.yaml');
console.log(config); // Output: { key: 'value' }
```

***

### register()

> `static` **register**(`extname`, `parser`, `stringify`): `void`

Defined in: [src/config-file.ts:64](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/config-file.ts#L64)

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

### saveSync()

> `static` **saveSync**(`filename`, `config`, `options`?): `string`

Defined in: [src/config-file.ts:102](https://github.com/isdk/util.js/blob/f6ac1e1b241d01211870dd55d000c1e9d4daa404/src/config-file.ts#L102)

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
ConfigFile.saveSync('config.json', { key: 'value' });
```
