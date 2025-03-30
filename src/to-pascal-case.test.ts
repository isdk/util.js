import { toPascalCase } from "./to-pascal-case";

describe("toPascalCase", () => {
  test("converts a simple string to PascalCase", () => {
    expect(toPascalCase("hello world")).toBe("HelloWorld");
  });

  test("converts a string with multiple spaces to PascalCase", () => {
    expect(toPascalCase("hello   world")).toBe("HelloWorld");
  });

  test("converts a string with hyphens to PascalCase", () => {
    expect(toPascalCase("hello-world")).toBe("HelloWorld");
  });

  test("converts a string with underscores to PascalCase", () => {
    expect(toPascalCase("hello_world")).toBe("HelloWorld");
  });

  test("converts a string with mixed cases to PascalCase", () => {
    expect(toPascalCase("hElLo wOrLd")).toBe("HElLoWOrLd");
  });

  test("converts an already PascalCase string to PascalCase", () => {
    expect(toPascalCase("HelloWorld")).toBe("HelloWorld");
  });

  test("converts an empty string to an empty string", () => {
    expect(toPascalCase("")).toBe("");
  });

  test("converts a single word to PascalCase", () => {
    expect(toPascalCase("hello")).toBe("Hello");
  });

  test("converts a string with numbers to PascalCase", () => {
    expect(toPascalCase("hello123 world456")).toBe("Hello123World456");
  });
});
