import { isArray, isEmpty, isNil, isPlainObject } from 'lodash-es'
import { omitDeepBy } from './omit-deep-by'

/**
 * Recursively checks if a value is "empty".
 * @param value - The value to check
 * @returns true if the value is empty, otherwise false
 */
function isEmptyValue(value: unknown): boolean {
  if (isNil(value)) return true
  if (typeof value === 'string' && value.trim().length === 0) return true
  if (isArray(value) || isPlainObject(value)) return isEmpty(value)
  return false
}

/**
 * Deeply removes empty values from objects or arrays, supporting both string and Symbol keys.
 *
 * @remarks
 * This function uses recursion to clean data. For objects, it handles both `string` keys and `Symbol` keys.
 * If child objects or child arrays become empty after cleaning, their corresponding keys will also be removed from the parent object.
 *
 * @template T - The type of the input value
 * @param value - The original data that needs to be cleaned
 * @returns The cleaned data. If the input value itself is deeply empty, returns undefined.
 *
 * @example
 * ```ts
 * const sym = Symbol('id');
 * omitEmptyDeep({ [sym]: "", a: 1 }) // => { a: 1 }
 * ```
 */
export const omitEmptyDeep = <T>(value: T, omitFunc?: boolean): any =>
  omitDeepBy(
    value,
    (v) => isEmptyValue(v) || (omitFunc! && typeof v === 'function')
  )
