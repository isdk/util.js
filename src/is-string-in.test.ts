import { isStringIn } from './is-string-in';

describe('isStringIn', () => {
  // 测试字符串在数组中的情况
  it('should return true when the string exists in an array', () => {
    const result = isStringIn('apple', ['banana', 'apple', 'cherry']);
    expect(result).toBe(true);
  });

  // 测试字符串不在数组中的情况
  it('should return false when the string does not exist in an array', () => {
    const result = isStringIn('grape', ['banana', 'apple', 'cherry']);
    expect(result).toBe(false);
  });

  // 测试字符串与单个字符串匹配的情况
  it('should return true when the string matches a single string', () => {
    const result = isStringIn('hello', 'hello');
    expect(result).toBe(true);
  });

  // 测试字符串与单个字符串不匹配的情况
  it('should return false when the string does not match a single string', () => {
    const result = isStringIn('world', 'hello');
    expect(result).toBe(false);
  });

  // 测试空数组的情况
  it('should return false when the array is empty', () => {
    const result = isStringIn('apple', []);
    expect(result).toBe(false);
  });

  // 测试空字符串的情况
  it('should return true when searching for an empty string in an array containing an empty string', () => {
    const result = isStringIn('', ['banana', '', 'cherry']);
    expect(result).toBe(true);
  });

  // 测试空字符串与单个空字符串匹配的情况
  it('should return true when searching for an empty string in a single empty string', () => {
    const result = isStringIn('', '');
    expect(result).toBe(true);
  });

  // 测试非空字符串在包含空字符串的数组中的情况
  it('should return false when searching for a non-empty string in an array containing only an empty string', () => {
    const result = isStringIn('apple', '');
    expect(result).toBe(false);
  });
});
