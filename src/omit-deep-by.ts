import { isEmpty, isNil, isObject, isPlainObject } from 'lodash-es';

/**
 * Recursively removes properties from an object or array that satisfy the given predicate condition.
 *
 * This function traverses the input value deeply and omits any property or element that causes the
 * predicate function to return `true`. The operation is performed recursively on nested objects and arrays.
 *
 * For arrays:
 * - Each element is processed recursively through omitDeepBy
 * - Elements that satisfy the predicate are filtered out
 * - If the resulting array is empty, returns `undefined`
 *
 * For plain objects:
 * - Each property is processed recursively through omitDeepBy
 * - Properties that satisfy the predicate are omitted
 * - Supports both string and symbol keys via `Reflect.ownKeys`
 * - If the resulting object is empty, returns `undefined`
 *
 * For primitive values:
 * - Returns the value unchanged
 *
 * Special handling:
 * - Circular references are properly handled using a WeakMap cache
 * - Non-plain objects (Date, RegExp, etc.) are preserved as-is
 * - Empty results (after filtering) return `undefined`
 *
 * @template T The type of the input value
 * @param value - The data structure to process. Can be any type including objects, arrays, or primitives.
 * @param predicate - A function that determines whether a property should be removed.
 *                    The function receives two parameters:
 *                    - `v`: The current value being evaluated
 *                    - `k`: The key/index of the current value in its parent container
 *                    Returns `true` to indicate the item should be removed, `false` to keep it.
 * @param cache - Internal WeakMap for handling circular references. Should not be provided by callers.
 * @returns A new data structure with matching properties removed, or `undefined` if the result would be empty.
 *          The returned type matches the input type but with some properties potentially omitted.
 *
 * @example
 * ```ts
 * // Remove all null and undefined values
 * const obj = { a: 1, b: null, c: { d: undefined, e: 2 } };
 * const result = omitDeepBy(obj, (v) => v == null);
 * // Result: { a: 1, c: { e: 2 } }
 * ```
 *
 * @example
 * ```ts
 * // Remove array elements with specific value
 * const arr = [1, 2, null, 3, undefined];
 * const result = omitDeepBy(arr, (v) => v == null);
 * // Result: [1, 2, 3]
 * ```
 *
 * @example
 * ```ts
 * // Remove properties based on custom conditions
 * const data = {
 *   name: 'John',
 *   age: 0,
 *   address: {
 *     street: '',
 *     city: 'NYC',
 *     zip: null
 *   },
 *   hobbies: ['reading', '', 'swimming']
 * };
 *
 * const cleaned = omitDeepBy(data, (value, key) => {
 *   // Remove falsy values except 0 and false
 *   if (key === 'age') return false; // Keep age even if 0
 *   return !value && value !== 0 && value !== false;
 * });
 *
 * // Result: {
 * //   name: 'John',
 * //   age: 0,
 * //   address: { city: 'NYC' },
 * //   hobbies: ['reading', 'swimming']
 * // }
 * ```
 *
 * @example
 * ```ts
 * // Handle circular references safely
 * const circular: any = { a: 1 };
 * circular.self = circular;
 * const result = omitDeepBy(circular, (v) => v === 1);
 * // Result: { self: [Circular] } where self points to the same object
 * ```
 */
export function omitDeepBy<T>(
  value: T,
  predicate: (v: any, k: string | symbol) => boolean,
  cache = new WeakMap<object, any>()
): any {
  // 1. 基本类型直接返回
  if (!isObject(value) || isNil(value)) {
    return value;
  }

  // 2. 处理循环引用：如果已处理过该对象，直接返回缓存结果
  if (cache.has(value as object)) {
    return cache.get(value as object);
  }

  let result: any;

  // 3. 处理数组
  if (Array.isArray(value)) {
    result = [];
    cache.set(value, result); // 必须在递归前存入缓存

    const cleanedArray = value
      .map((item) => omitDeepBy(item, predicate, cache))
      .filter((item, index) => !predicate(item, index.toString()));

    Object.assign(result, cleanedArray);
    return result.length > 0 ? result : undefined;
  }

  // 4. 处理纯对象
  if (isPlainObject(value)) {
    result = {};
    cache.set(value as object, result);

    const keys = Reflect.ownKeys(value as object) as Array<string | symbol>;

    for (const key of keys) {
      const subValue = (value as any)[key];
      const processed = omitDeepBy(subValue, predicate, cache);

      if (!predicate(processed, key)) {
        result[key] = processed;
      }
    }

    return isEmpty(result) ? undefined : result;
  }

  // 5. 其他特殊对象（Date, RegExp 等）直接返回原引用
  return value;
};
