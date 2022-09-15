import { token, TokenTypes } from "./tokenizer";

export enum NodeTypes {
  Program,
  CallExpression,
  NumberLiteral,
  StringLiteral,
}

interface Node {
  type: NodeTypes;
}

interface RootNode extends Node {
  body: (NumberNode | CallExpressionNode)[];
}
interface NumberNode extends Node {
  value: string;
}
interface CallExpressionNode extends Node {
  name: string;
  params: (NumberNode | CallExpressionNode)[];
}

export function parser(tokens: token[]) {
  const rootNode: RootNode = {
    type: NodeTypes.Program,
    body: [],
  };
  let current = 0;

  function walk() {
    let token = tokens[current];
    if (token.type === TokenTypes.number) {
      current++;
      return {
        type: NodeTypes.NumberLiteral,
        value: token.value,
      };
    }

    if (token.type === TokenTypes.paren && token.value === "(") {
      token = tokens[++current];
      const node: CallExpressionNode = {
        type: NodeTypes.CallExpression,
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      while (!(token.type === TokenTypes.paren && token.value === ")")) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }

    throw new Error(`不认识的${token}`);
  }

  while (current < tokens.length) {
    rootNode.body.push(walk());
  }

  return rootNode;
}
