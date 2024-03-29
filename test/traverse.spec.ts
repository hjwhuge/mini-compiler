import { test, expect, describe } from "vitest";
import { NodeTypes, RootNode, Visitor } from "../type/ast";
import { traverse } from "../src/traverse";

describe("traverse", () => {
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

    const callArr: Array<string>[] = [];
    const visitor: Visitor = {
      Program: {
        enter(node, parent) {
          callArr.push(["program-enter", node.type, ""]);
        },
        exit(node, parent) {
          callArr.push(["program-exit", node.type, ""]);
        },
      },
      CallExpression: {
        enter(node, parent) {
          callArr.push(["callExpression-enter", node.type, parent!.type]);
        },
        exit(node, parent) {
          callArr.push(["callExpression-exit", node.type, parent!.type]);
        },
      },
      NumberLiteral: {
        enter(node, parent) {
          callArr.push(["numberLiteral-enter", node.type, parent!.type]);
        },
        exit(node, parent) {
          callArr.push(["numberLiteral-exit", node.type, parent!.type]);
        },
      },
    };

    traverse(ast, visitor);

    const resArr = [
      ["program-enter", NodeTypes.Program, ""],
      ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.Program],
      [
        "numberLiteral-enter",
        NodeTypes.NumberLiteral,
        NodeTypes.CallExpression,
      ],
      ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
      [
        "callExpression-enter",
        NodeTypes.CallExpression,
        NodeTypes.CallExpression,
      ],
      [
        "numberLiteral-enter",
        NodeTypes.NumberLiteral,
        NodeTypes.CallExpression,
      ],
      ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
      [
        "numberLiteral-enter",
        NodeTypes.NumberLiteral,
        NodeTypes.CallExpression,
      ],
      ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
      [
        "callExpression-exit",
        NodeTypes.CallExpression,
        NodeTypes.CallExpression,
      ],
      ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.Program],
      ["program-exit", NodeTypes.Program, ""],
    ];

    expect(callArr).toEqual(resArr);
  });
});
