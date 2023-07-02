import { test, expect, describe } from "vitest";
import { codeGenerator } from "../src/codeGenerator";

describe("codeGenerator", () => {
  test("main", () => {
    const ast: any = {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2",
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract",
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4",
                  },
                  {
                    type: "NumberLiteral",
                    value: "2",
                  },
                ],
              },
            ],
          },
        },
      ],
    };
    const code = "add(2, subtract(4, 2));";

    expect(codeGenerator(ast)).toEqual(code);
  });

  test("two ExpressionStatement", () => {
    const ast: any = {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2",
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract",
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4",
                  },
                  {
                    type: "NumberLiteral",
                    value: "2",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2",
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract",
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4",
                  },
                  {
                    type: "NumberLiteral",
                    value: "2",
                  },
                ],
              },
            ],
          },
        },
      ],
    };
    const code = "add(2, subtract(4, 2));add(2, subtract(4, 2));";

    expect(codeGenerator(ast)).toEqual(code);
  });
});
