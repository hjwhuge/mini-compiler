import { test, expect, describe } from "vitest";
import { NodeTypes, RootNode } from "../type/ast";
import { transformer } from "../src/transformer";

describe("transformer", () => {
  test("main", () => {
    const ast: RootNode = {
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
    const newAst = {
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

    expect(transformer(ast)).toEqual(newAst);
  });
});
