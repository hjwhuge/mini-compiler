import { NodeTypes, RootNode, ChildNode, ParentNode, Visitor } from "../type/ast";

export function traverse(rootNode: RootNode, visitor: Visitor) {
  // 1. depth-first
  // 2. Visitor

  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent);
    });
  }
  function traverseNode(node: ChildNode | RootNode, parent?: ParentNode) {
    // enter
    const visitorObj = visitor[node.type];
    if (visitorObj) {
      visitorObj.enter(node, parent);
    }
    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
    }
    // exit
    if (visitorObj && visitorObj.exit) {
      visitorObj.exit(node, parent);
    }
  }
  traverseNode(rootNode);
}
