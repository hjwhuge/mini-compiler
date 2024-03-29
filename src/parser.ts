import {
  Token,
  TokenTypes,
  NodeTypes,
  RootNode,
  NumberNode,
  CallExpressionNode,
} from "../type/ast";

export function parser(tokens: Token[]) {
  const rootNode: RootNode = {
    type: NodeTypes.Program,
    body: [],
  };
  let current = 0;

  function walk() {
    let token = tokens[current];
    if (token.type === TokenTypes.number) {
      current++;
      const numberNode: NumberNode = {
        type: NodeTypes.NumberLiteral,
        value: token.value,
      };
      return numberNode;
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

    throw new Error(`do not recognize${token}`);
  }

  while (current < tokens.length) {
    rootNode.body.push(walk());
  }

  return rootNode;
}
