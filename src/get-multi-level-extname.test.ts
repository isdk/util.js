import path from 'path';

import { getMultiLevelExtname } from './get-multi-level-extname';

describe('getMultiLevelExtname', () => {
  it('should return the correct extension for single level', () => {
    const filename = 'testfile.txt';
    expect(getMultiLevelExtname(filename)).toBe('.txt');
  });

  it('should return the correct extension for multiple levels', () => {
    const filename = 'archive.tar.gz';
    expect(getMultiLevelExtname(filename, 2)).toBe('.tar.gz');
  });

  it('should return empty string when no extension exists', () => {
    const filename = 'noext';
    expect(getMultiLevelExtname(filename)).toBe('');
  });

  it('should return empty string when level is 0', () => {
    const filename = 'testfile.txt';
    expect(getMultiLevelExtname(filename, 0)).toBe('');
  });

  it('should not modify the original filename', () => {
    const filename = 'archive.tar.gz';
    getMultiLevelExtname(filename, 2);
    expect(path.extname(filename)).toBe('.gz');
  });

  it('should return full filename when level exceeds actual extension levels', () => {
    const filename = 'file.tar.gz';
    expect(getMultiLevelExtname(filename, 3)).toBe('.tar.gz');
  });
});
