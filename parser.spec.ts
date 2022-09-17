import { test, expect, describe } from "vitest";
import { parser } from "./parser";
import { TokenTypes, NodeTypes } from "./ast";

describe("parser", () => {
  test("main", () => {
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

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.CallExpression,
              name: "subtract",
              params: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: "4",
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: "2",
                },
              ],
            },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  test("NumberLiteral", () => {
    const tokens = [{ type: TokenTypes.number, value: "2" }];

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.NumberLiteral,
          value: "2",
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  test("CallExpression", () => {
    const tokens = [
      { type: TokenTypes.paren, value: "(" },
      { type: TokenTypes.name, value: "add" },
      { type: TokenTypes.number, value: "2" },
      { type: TokenTypes.number, value: "4" },
      { type: TokenTypes.paren, value: ")" },
    ];

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.NumberLiteral,
              value: "4",
            },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  test("Two CallExpression", () => {
    const tokens = [
      { type: TokenTypes.paren, value: "(" },
      { type: TokenTypes.name, value: "add" },
      { type: TokenTypes.number, value: "2" },
      { type: TokenTypes.number, value: "4" },
      { type: TokenTypes.paren, value: ")" },
      { type: TokenTypes.paren, value: "(" },
      { type: TokenTypes.name, value: "add" },
      { type: TokenTypes.number, value: "1" },
      { type: TokenTypes.number, value: "3" },
      { type: TokenTypes.paren, value: ")" },
    ];

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.NumberLiteral,
              value: "4",
            },
          ],
        },
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "1",
            },
            {
              type: NodeTypes.NumberLiteral,
              value: "3",
            },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });
});
