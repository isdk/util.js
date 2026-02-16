import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { Config as LoadConfigFile } from 'load-config-file'

import { getMultiLevelExtname } from './get-multi-level-extname.js'
import { parseYaml, stringifyYaml } from './yaml.js'
import { parseFrontMatter } from './front-matter.js'

function parseJson(content: string) {
  return JSON.parse(content)
}

// LoadConfigFile.register(['.yml', '.yaml'], parseYaml as any)
// LoadConfigFile.register(['.json'], parseJson)

// export { LoadConfigFile as ConfigFile }

export type StringifyFunc = (content: any) => string

export interface LoadConfigFileOptions {
  extLevel?: number
  externalFile?: string
}

/**
 * Represents a configuration file utility class that provides methods to load and save configuration files.
 * It supports multiple file formats such as YAML, JSON, etc., by registering corresponding parsers and stringifiers.
 *
 * @example
 * ```typescript
 * // Register a custom file type handler
 * ConfigFile.register('.custom', (content) => {
 *   return { data: content.toUpperCase() }; // Example parser
 * }, (obj) => {
 *   return obj.data.toLowerCase(); // Example stringifier
 * });
 *
 * // Save a configuration file
 * ConfigFile.saveSync('config.custom', { key: 'value' });
 *
 * // Load a configuration file
 * const config = ConfigFile.loadSync('config.custom');
 * console.log(config); // Output: { key: 'value' }
 * ```
 */
export class ConfigFile {
  /**
   * A record of registered stringify functions for different file extensions.
   */
  static stringifys: Record<string, StringifyFunc> = {}

  /**
   * Registers a parser and stringifier for specific file extensions.
   *
   * @param extname - The file extension(s) to register the parser and stringifier for.
   * @param parser - A function that parses the file content into an object.
   * @param stringify - A function that converts an object back into file content.
   *
   * @example
   * ```typescript
   * ConfigFile.register(['.json'], JSON.parse, (obj) => JSON.stringify(obj, null, 2));
   * ```
   */
  static register(
    extname: string | string[],
    parser: (content: string) => any,
    stringify: StringifyFunc
  ) {
    LoadConfigFile.register(extname, parser)
    if (typeof extname === 'string') {
      extname = [extname]
    }
    for (const ext of extname) {
      this.stringifys[ext] = stringify
    }
  }

  /**
   * Loads a configuration file based on the provided filename and options.
   *
   * @param filename - The path to the configuration file.
   * @param options - Additional options for loading the configuration file.
   * @returns The parsed configuration object.
   *
   * @example
   * ```typescript
   * const config = ConfigFile.loadSync('config.yaml');
   * console.log(config); // Output: { key: 'value' }
   * ```
   */
  static loadSync(filename: string, options?: LoadConfigFileOptions) {
    return loadConfigFile(filename, options)
  }

  /**
   * Saves a configuration object to a file with the specified filename and options.
   *
   * @param filename - The path where the configuration file should be saved.
   * @param config - The configuration object to save.
   * @param options - Additional options for saving the configuration file.
   * @returns The final filename where the configuration was saved.
   *
   * @example
   * ```typescript
   * ConfigFile.saveSync('config.json', { key: 'value' });
   * ```
   */
  static saveSync(
    filename: string,
    config: any,
    options?: LoadConfigFileOptions
  ) {
    return saveConfigFile(filename, config, options)
  }

  /**
   * Checks if a configuration file exists at the specified path.
   *
   * This method normalizes the filename by removing the extension (if present) and then delegates
   * to the underlying LoadConfigFile utility to perform the existence check. The normalization
   * ensures consistent handling of files regardless of whether they include extensions in the
   * provided filename.
   *
   * @param filename - The path to the configuration file to check for existence.
   *                  This can include or omit the file extension.
   * @param options - Optional configuration options that may affect how the file existence
   *                 is checked, including extension level handling.
   *
   * @returns `true` if the configuration file exists, `false` otherwise.
   *
   * @example
   * ```typescript
   * // Check if a YAML config file exists
   * const exists = ConfigFile.existsSync('config.yaml');
   * console.log(exists); // true or false
   *
   * // Check with options
   * const existsWithExt = ConfigFile.existsSync('config', { extLevel: 2 });
   * console.log(existsWithExt); // true or false
   * ```
   */
  static existsSync(filename: string, options?: LoadConfigFileOptions) {
    filename = normalizeFilenameWithoutExt(filename, options?.extLevel)
    return LoadConfigFile.existsSync(filename, options)
  }
}

ConfigFile.register(['.yml', '.yaml'], parseYaml, stringifyYaml)
ConfigFile.register(['.json'], parseJson, (obj) => JSON.stringify(obj, null, 2))

function normalizeYamlFilename(filename: string, extLevel = 1) {
  if (filename[0] === '.') {
    extLevel++
  }
  let extname = getMultiLevelExtname(filename, extLevel)
  if (!extname || extname.split('.').length <= 1) {
    filename += '.yaml'
    extname = '.yaml'
  }
  const result = new String(filename) as string & { extname: string }
  result.extname = extname
  return result
}

function normalizeFilenameWithoutExt(filename: string, extLevel: number = 1) {
  if (filename[0] === '.') {
    extLevel++
  }
  const extname = getMultiLevelExtname(filename, extLevel)
  if (extname && extname.split('.').length > 1) {
    // remove the extension
    filename = filename.slice(0, -extname.length)
  }
  return filename
}

function saveConfigFile(
  filename: string,
  config: any,
  { extLevel = 1 }: LoadConfigFileOptions = {}
) {
  const _filename = normalizeYamlFilename(filename, extLevel)
  const extname = _filename.extname
  filename = _filename.toString()

  const stringify = ConfigFile.stringifys[extname]
  if (stringify) {
    config = stringify(config)
  } else {
    throw new Error(`${filename} unsupported mime type: ${extname}`)
  }

  const dirname = path.dirname(filename)
  if (!existsSync(dirname)) {
    mkdirSync(dirname, { recursive: true })
  }
  writeFileSync(filename, config, { encoding: 'utf8' })
  return filename
}

function loadConfigFile(
  filename: string,
  { extLevel = 1, externalFile }: LoadConfigFileOptions = {}
) {
  filename = normalizeFilenameWithoutExt(filename, extLevel)

  let result = LoadConfigFile.loadSync(filename)
  if (!result && externalFile) {
    if (!path.isAbsolute(externalFile)) {
      const dirname = path.dirname(filename)
      externalFile = path.join(dirname, externalFile)
    }
    if (existsSync(externalFile)) {
      const data = parseFrontMatter(readFileSync(externalFile, 'utf8')).data
      if (Object.keys(data).length) {
        result = data
      }
    }
  }
  return result
}
