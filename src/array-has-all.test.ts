import { arrayHasAll } from './array-has-all';

describe('arrayHasAll', () => {
  it('should return true when all elements are present', () => {
    expect(arrayHasAll([1, 2, 3], [2, 3])).toBe(true);
    expect(arrayHasAll(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
  });

  it('should return false when some elements are missing', () => {
    expect(arrayHasAll([1, 2, 3], [2, 4])).toBe(false);
    expect(arrayHasAll(['a', 'b', 'c'], ['x', 'y'])).toBe(false);
  });

  it('should handle empty arrays correctly', () => {
    expect(arrayHasAll([], [])).toBe(true);
    expect(arrayHasAll([1, 2, 3], [])).toBe(true);
    expect(arrayHasAll([], [1, 2])).toBe(false);
  });

  it('should work with duplicate elements in the source array', () => {
    expect(arrayHasAll([1, 1, 2, 3], [1, 2])).toBe(true);
    expect(arrayHasAll([1, 1, 2, 3], [1, 2, 2])).toBe(true);
  });

  it('should work with duplicate elements in the source array are missing', () => {
    expect(arrayHasAll([1, 1, 3], [1, 2])).toBe(false);
    expect(arrayHasAll([1, 1, 1, 3], [1, 2, 2])).toBe(false);
  });

  it('should respect element types (strict equality)', () => {
    expect(arrayHasAll([1, 2, 3], [1, '2'])).toBe(false);
    expect(arrayHasAll(['1', '2'], [1, 2] as any)).toBe(false);
  });
});
