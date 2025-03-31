import { parse, stringify } from 'yaml'

import type { CollectionTag, CreateNodeOptions, DocumentOptions, ParseOptions, ScalarTag, SchemaOptions, TagId, Tags, ToJSOptions, ToStringOptions } from 'yaml'

const YamlTags: Tags = []

/**
 * Registers custom YAML tags to be used in parsing and stringifying YAML content.
 *
 * @param tags - A single tag or an array of tags to register.
 *
 * @example
 * ```typescript
 * import { registerYamlTag } from './yaml';
 *
 * const customTag = {
 *   tag: '!custom',
 *   resolve: (value) => `resolved-${value}`,
 * };
 * registerYamlTag(customTag);
 * ```
 */
export function registerYamlTag(tags: ScalarTag | CollectionTag | TagId | Tags) {
  if (!Array.isArray(tags)) {
    tags = [tags]
  }
  for (const tag of tags) {
    const result = YamlTags.indexOf(tag) === -1
    if (result) { YamlTags.push(tag) }
  }
}

/**
 * Parses a YAML string into a JavaScript object with optional custom tags.
 *
 * @param content - The YAML string to parse.
 * @param options - Optional parsing options, including custom tags.
 * @returns The parsed JavaScript object.
 *
 * @example
 * ```typescript
 * import { parseYaml } from './yaml';
 *
 * const yamlContent = `
 *   example: !custom value
 * `;
 * const result = parseYaml(yamlContent);
 * console.log(result); // { example: 'resolved-value' }
 * ```
 */
export function parseYaml(content: string, options?: ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions) {
  if (!options) {
    options = {customTags: YamlTags}
  } else {
    if (!options.customTags) {
      options.customTags = YamlTags
    } else if (Array.isArray(options.customTags)) {
      options.customTags = YamlTags.concat(options.customTags)
    } else if (typeof options.customTags === 'function') {
      const customTags = options.customTags
      options.customTags = (tags)=> customTags(YamlTags.concat(tags))
    }
  }
  return parse(content, options)
}

/**
 * Converts a JavaScript object into a YAML string with optional custom tags.
 *
 * @param content - The JavaScript object to convert to YAML.
 * @param options - Optional stringification options, including custom tags.
 * @returns The YAML string representation of the input object.
 *
 * @example
 * ```typescript
 * import { stringifyYaml } from './yaml';
 *
 * const data = {
 *   example: 'value',
 * };
 * const yamlString = stringifyYaml(data);
 * console.log(yamlString); // "example: value\n"
 * ```
 */
export function stringifyYaml(content: any, options?: DocumentOptions & SchemaOptions & ParseOptions & CreateNodeOptions & ToStringOptions) {
  if (!options) {
    options = {customTags: YamlTags}
  } else {
    if (!options.customTags) {
      options.customTags = YamlTags
    } else if (Array.isArray(options.customTags)) {
      options.customTags = YamlTags.concat(options.customTags)
    } else if (typeof options.customTags === 'function') {
      const customTags = options.customTags
      options.customTags = (tags)=> customTags(YamlTags.concat(tags))
    }
  }
  return stringify(content, options)
}
