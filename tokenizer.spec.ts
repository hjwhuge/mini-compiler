import { test, expect, describe } from "vitest";
import { tokenizer } from "./tokenizer";
import { TokenTypes } from "./ast";

describe("tokenizer", () => {
  test("main", () => {
    const code = "(add 2 (subtract 4 2))";
    const tokens = [
      { type: TokenTypes.paren, value: "(" },
      { type: TokenTypes.name, value: "add" },
      { type: TokenTypes.number, value: "2" },
      { type: TokenTypes.paren, value: "(" },
      { type: TokenTypes.name, value: "subtract" },
      { type: TokenTypes.number, value: "4" },
      { type: TokenTypes.number, value: "2" },
      { type: TokenTypes.paren, value: ")" },
      { type: TokenTypes.paren, value: ")" },
    ];

    expect(tokenizer(code)).toEqual(tokens);
  });

  test("left paren", () => {
    const code = "(";
    const tokens = [{ type: TokenTypes.paren, value: "(" }];

    expect(tokenizer(code)).toEqual(tokens);
  });

  test("right paren", () => {
    const code = ")";
    const tokens = [{ type: TokenTypes.paren, value: ")" }];

    expect(tokenizer(code)).toEqual(tokens);
  });

  test("name", () => {
    const code = "add";
    const tokens = [{ type: TokenTypes.name, value: "add" }];

    expect(tokenizer(code)).toEqual(tokens);
  });

  test("number", () => {
    const code = "12";
    const tokens = [{ type: TokenTypes.number, value: "12" }];

    expect(tokenizer(code)).toEqual(tokens);
  });

  test("combination", () => {
    const code = "(add 2 1)";
    const tokens = [
      { type: TokenTypes.paren, value: "(" },
      { type: TokenTypes.name, value: "add" },
      { type: TokenTypes.number, value: "2" },
      { type: TokenTypes.number, value: "1" },
      { type: TokenTypes.paren, value: ")" },
    ];

    expect(tokenizer(code)).toEqual(tokens);
  });
});
