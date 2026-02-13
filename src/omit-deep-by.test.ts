import { describe, it, expect } from 'vitest';
import { omitDeepBy } from './omit-deep-by';

describe('omitDeepBy', () => {
  it('should remove properties with null values', () => {
    const input = { a: 1, b: null, c: { d: null, e: 2 } };
    const result = omitDeepBy(input, (value) => value === null);
    expect(result).toEqual({ a: 1, c: { e: 2 } });
  });

  it('should remove properties with undefined values', () => {
    const input = { a: 1, b: undefined, c: { d: undefined, e: 2 } };
    const result = omitDeepBy(input, (value) => value === undefined);
    expect(result).toEqual({ a: 1, c: { e: 2 } });
  });

  it('should remove empty string values', () => {
    const input = { a: 1, b: '', c: { d: '', e: 2 } };
    const result = omitDeepBy(input, (value) => value === '');
    expect(result).toEqual({ a: 1, c: { e: 2 } });
  });

  it('should remove properties based on custom condition', () => {
    const input = { a: 1, b: 2, c: { d: 3, e: 4 } };
    const result = omitDeepBy(input, (value) => typeof value === 'number' && value > 2);
    expect(result).toEqual({ a: 1, b: 2, c: undefined });
  });

  it('should handle arrays correctly', () => {
    const input = [1, null, 3, undefined, 5];
    const result = omitDeepBy(input, (value) => value == null);
    expect(result).toEqual([1, 3, 5]);
  });

  it('should handle nested arrays', () => {
    const input = { a: [1, null, 3], b: [{ c: null, d: 4 }] };
    const result = omitDeepBy(input, (value) => value === null);
    expect(result).toEqual({ a: [1, 3], b: [{ d: 4 }] });
  });

  it('should not modify the original object', () => {
    const input = { a: 1, b: null };
    const originalInput = JSON.parse(JSON.stringify(input));
    omitDeepBy(input, (value) => value === null);
    expect(input).toEqual(originalInput);
  });

  it('should handle primitive values', () => {
    expect(omitDeepBy(null, () => true)).toBeNull();
    expect(omitDeepBy(undefined, () => true)).toBeUndefined();
    expect(omitDeepBy(42, () => false)).toBe(42);
    expect(omitDeepBy('hello', () => false)).toBe('hello');
  });

  it('should handle circular references', () => {
    const input: any = { a: 1 };
    input.self = input;
    const result = omitDeepBy(input, (value) => value === 1);
    expect(result.a).toBeUndefined();
    expect(result.self).toBe(result);
  });

  it('should handle Date objects', () => {
    const date = new Date();
    const input = { a: date, b: null };
    const result = omitDeepBy(input, (value) => value === null);
    expect(result).toEqual({ a: date });
    expect(result.a).toBeInstanceOf(Date);
  });

  it('should handle RegExp objects', () => {
    const regex = /test/;
    const input = { a: regex, b: null };
    const result = omitDeepBy(input, (value) => value === null);
    expect(result).toEqual({ a: regex });
    expect(result.a).toBeInstanceOf(RegExp);
  });

  it('should handle complex nested structures', () => {
    const input = {
      a: 1,
      b: null,
      c: {
        d: ['', null, 0],
        e: {
          f: undefined,
          g: [1, 2, null]
        }
      },
      h: [
        { i: null, j: 'keep' },
        { k: undefined, l: 'also keep' }
      ]
    };

    const result = omitDeepBy(input, (value) =>
      value === null || value === undefined || value === ''
    );

    expect(result).toEqual({
      a: 1,
      c: {
        d: [0],
        e: {
          g: [1, 2]
        }
      },
      h: [
        { j: 'keep' },
        { l: 'also keep' }
      ]
    });
  });
});