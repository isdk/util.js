import { vi } from 'vitest';
import { ConfigFile } from './config-file';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import path from 'path';

// Mock dependencies
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

describe('ConfigFile', () => {
  const mockFilePath = './mock/config.yaml';
  const mockContent = { key: 'value' };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('register', () => {
    it('should register parser and stringifier for a single extension', () => {
      const mockParser = (content: string) => ({ parsed: content });
      const mockStringify = (obj: any) => JSON.stringify(obj);

      ConfigFile.register('.test', mockParser, mockStringify);

      expect(ConfigFile.stringifys['.test']).toBe(mockStringify);
    });

    it('should register parser and stringifier for multiple extensions', () => {
      const mockParser = (content: string) => ({ parsed: content });
      const mockStringify = (obj: any) => JSON.stringify(obj);

      ConfigFile.register(['.test1', '.test2'], mockParser, mockStringify);

      expect(ConfigFile.stringifys['.test1']).toBe(mockStringify);
      expect(ConfigFile.stringifys['.test2']).toBe(mockStringify);
    });
  });

  describe('save', () => {
    it('should save a file with the correct content and extension', () => {
      (existsSync as any).mockReturnValue(true);

      const savedFile = ConfigFile.saveSync(mockFilePath, mockContent);

      expect(savedFile).toBe(mockFilePath);
      expect(writeFileSync).toHaveBeenCalledWith(
        mockFilePath,
        ConfigFile.stringifys['.yaml'](mockContent),
        { encoding: 'utf8' }
      );
    });

    it('should create directories if they do not exist', () => {
      (existsSync as any).mockReturnValue(false);

      ConfigFile.saveSync(mockFilePath, mockContent);

      expect(mkdirSync).toHaveBeenCalledWith(path.dirname(mockFilePath), { recursive: true });
    });

    it('should throw an error for unsupported file types', () => {
      const invalidFilePath = './mock/unsupported.xyz';

      expect(() => ConfigFile.saveSync(invalidFilePath, mockContent)).toThrow(
        `${invalidFilePath} unsupported mime type: .xyz`
      );
    });
  });

  describe('load', () => {
    it('should load a configuration file successfully', () => {
      const mockParsedData = { key: 'loadedValue' };
      (existsSync as any).mockReturnValue(true);
      vi.spyOn(ConfigFile, 'loadSync').mockImplementation(() => mockParsedData);

      const result = ConfigFile.loadSync(mockFilePath);

      expect(result).toEqual(mockParsedData);
    });

    it('should fallback to external file if main file is not found', () => {
      const externalFilePath = './mock/README.md';
      const mockExternalData = { key: 'externalValue' };
      (existsSync as any).mockImplementation((filePath) => filePath === path.join(externalFilePath));
      (readFileSync as any).mockReturnValue('---\nkey: externalValue\n---');

      const result = ConfigFile.loadSync(mockFilePath, { externalFile: 'README.md' });

      expect(result).toEqual(mockExternalData);
    });

    it('should return undefined if neither main file nor external file is found', () => {
      (readFileSync as any).mockReturnValue(undefined);
      const result = ConfigFile.loadSync(mockFilePath, { externalFile: 'README.md' });

      expect(result).toBeUndefined();
    });
  });
});