import { toCapitalCase } from './to-capital-case'

describe('toCapitalCase', () => {
  it('should return an empty string when given an empty string', () => {
    expect(toCapitalCase('')).toBe('')
  })

  it('should capitalize the first letter of a single word', () => {
    expect(toCapitalCase('hello')).toBe('Hello')
    expect(toCapitalCase('WORLD')).toBe('World')
    expect(toCapitalCase('test')).toBe('Test')
  })

  it('should capitalize the first letter of each word separated by spaces', () => {
    expect(toCapitalCase('hello world')).toBe('Hello World')
    expect(toCapitalCase('HELLO WORLD')).toBe('Hello World')
    expect(toCapitalCase('test case')).toBe('Test Case')
  })

  it('should capitalize the first letter of each word separated by underscores', () => {
    expect(toCapitalCase('hello_world')).toBe('Hello World')
    expect(toCapitalCase('HELLO_WORLD')).toBe('Hello World')
    expect(toCapitalCase('test_case')).toBe('Test Case')
  })

  it('should capitalize the first letter of each word separated by hyphens', () => {
    expect(toCapitalCase('hello-world')).toBe('Hello World')
    expect(toCapitalCase('HELLO-WORLD')).toBe('Hello World')
    expect(toCapitalCase('test-case')).toBe('Test Case')
  })

  it('should handle mixed case words correctly', () => {
    expect(toCapitalCase('helloWorld')).toBe('Hello World')
    expect(toCapitalCase('HELLOworld')).toBe('Helloworld')
    expect(toCapitalCase('hELLOwORLD')).toBe('H Ellow Orld')
  })

  it('should handle multiple separators in a single string', () => {
    expect(toCapitalCase('hello_world-test case')).toBe('Hello World Test Case')
    expect(toCapitalCase('HELLO-WORLD_test-case')).toBe('Hello World Test Case')
    expect(toCapitalCase('hElLo_wOrLd-TeSt cAsE')).toBe(
      'H El Lo W Or Ld Te St C As E'
    )
  })
})
