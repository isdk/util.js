import { describe, it, expect } from 'vitest';
import { omitEmptyDeep } from './omit-empty-deep';

describe('omitEmptyDeep', () => {
  it('should remove null, undefined, and empty string values', () => {
    const input = {
      a: 1,
      b: null,
      c: undefined,
      d: '',
      e: 'value'
    };

    const expected = {
      a: 1,
      e: 'value'
    };

    expect(omitEmptyDeep(input)).toEqual(expected);
  });

  it('should remove empty arrays', () => {
    const input = {
      a: [1, 2, 3],
      b: [],
      c: [null, undefined]
    };

    const expected = {
      a: [1, 2, 3],
    };

    expect(omitEmptyDeep(input)).toEqual(expected);
  });

  it('should remove empty objects', () => {
    const input = {
      a: { x: 1 },
      b: {},
      c: { y: null }
    };

    const expected = {
      a: { x: 1 }
    };

    expect(omitEmptyDeep(input)).toEqual(expected);
  });

  it('should handle deeply nested objects', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            a: 0,
            b: null,
            c: undefined,
            d: '',
            e: false,
            f: 'valid',
            g: {
              h: [],
              i: [1, 2, 3],
              j: {}
            }
          }
        }
      }
    };

    const expected = {
      level1: {
        level2: {
          level3: {
            a: 0, // 0 is falsy but not considered empty
            e: false, // false is falsy but not considered empty
            f: 'valid',
            g: {
              i: [1, 2, 3],
            }
          }
        }
      }
    };

    expect(omitEmptyDeep(input)).toEqual(expected);
  });

  it('should preserve zero and boolean values', () => {
    const input = {
      a: 0,
      b: -0,
      c: NaN,
      d: false,
      e: true,
      f: ''
    };

    const expected = {
      a: 0,
      b: -0,
      c: NaN,
      d: false,
      e: true
    };

    expect(omitEmptyDeep(input)).toEqual(expected);
  });

  it('should handle arrays with mixed content', () => {
    const input = [
      1,
      null,
      2,
      undefined,
      '',
      'value',
      { a: 5, b: null },
      []
    ];

    const expected = [
      1,
      2,
      'value',
      { a: 5 }, // Object inside array should have empty values removed too
    ];

    expect(omitEmptyDeep(input)).toEqual(expected);
  });

  it('should handle primitive values', () => {
    expect(omitEmptyDeep(null)).toBeNull();
    expect(omitEmptyDeep(undefined)).toBeUndefined();
    expect(omitEmptyDeep('')).toBe('');
    expect(omitEmptyDeep(42)).toBe(42);
    expect(omitEmptyDeep(true)).toBe(true);
  });

  it('should handle edge cases with complex nesting', () => {
    const input = {
      a: {
        b: {
          c: {
            d: {
              e: {
                emptyObj: {},
                emptyArr: [],
                emptyStr: '',
                nullVal: null,
                valid: 'data',
                arrWithObjects: [
                  { x: null, y: 1 },
                  { x: 2, y: null },
                  {}
                ]
              }
            }
          }
        }
      }
    };

    const expected = {
      a: {
        b: {
          c: {
            d: {
              e: {
                valid: 'data',
                arrWithObjects: [
                  { y: 1 },
                  { x: 2 },
                ]
              }
            }
          }
        }
      }
    };

    expect(omitEmptyDeep(input)).toEqual(expected);
  });

  it('should return the same type as input for primitives', () => {
    expect(typeof omitEmptyDeep(42)).toBe('number');
    expect(typeof omitEmptyDeep('string')).toBe('string');
    expect(typeof omitEmptyDeep(true)).toBe('boolean');
    expect(omitEmptyDeep(null)).toBeNull();
    expect(omitEmptyDeep(undefined)).toBeUndefined();
  });

  it('should handle objects with symbol keys', () => {
    const sym = Symbol('test');
    const input = {
      [sym]: 'symbol value',
      regular: 'regular value',
      empty: null
    };

    const result = omitEmptyDeep(input);
    expect(result[sym]).toBe('symbol value');
    expect(result.regular).toBe('regular value');
    expect(result.empty).toBeUndefined();
  });
});