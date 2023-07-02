export function codeGenerator(node: any) {
  switch (node.type) {
    case "NumberLiteral":
      return node.value;
    case "CallExpression":
      return (
        node.callee.name +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );
    case "ExpressionStatement":
      return codeGenerator(node.expression) + ";";
    case "Program":
      return node.body.map(codeGenerator).join("");
  }
}
