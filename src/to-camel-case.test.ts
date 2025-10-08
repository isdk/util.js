import { toCamelCase } from "./to-camel-case";

describe("toCamelCase", () => {
  test("converts kebab-case to camelCase", () => {
    expect(toCamelCase("some-word")).toBe("someWord");
  });

  test("converts snake_case to camelCase", () => {
    expect(toCamelCase("some_Word")).toBe("someWord");
  });

  test("converts space-separated words to camelCase", () => {
    expect(toCamelCase("Some Word")).toBe("someWord");
  });

  test("converts PascalCase to camelCase", () => {
    expect(toCamelCase("SomeWord")).toBe("someWord");
  });

  test("handles empty string", () => {
    expect(toCamelCase("")).toBe("");
  });

  test("handles mixed separators", () => {
    expect(toCamelCase("some-word_and someWord")).toBe("someWordAndSomeWord");
  });

  test("handles strings with numbers", () => {
    expect(toCamelCase("hello123 world456")).toBe("hello123World456");
  });

  test("handles strings with continuous Uppercase letters", () => {
    expect(toCamelCase("hello123 wORLD456")).toBe("hello123World456");
  });
});
