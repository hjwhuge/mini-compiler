import { NodeTypes, NumberNode, RootNode } from "../type/ast";
import { traverse } from "./traverse";
export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Program,
    body: [],
  };

  ast.context = newAst.body;

  traverse(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: NodeTypes.CallExpression,
            callee: {
              type: "Identifier",
              name: node.name,
            },
            arguments: [],
          };

          node.context = expression.arguments;

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: "ExpressionStatement",
              expression,
            };
          }

          parent?.context?.push(expression);
        }
      },
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          const numberNode: NumberNode = {
            type: NodeTypes.NumberLiteral,
            value: node.value,
          };
          parent?.context?.push(numberNode);
        }
      },
    },
  });

  return newAst;
}
