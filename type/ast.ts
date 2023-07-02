export enum TokenTypes {
  paren,
  name,
  number,
}

export interface Token {
  type: TokenTypes;
  value: string;
}

export enum NodeTypes {
  Program = "Program",
  CallExpression = "CallExpression",
  NumberLiteral = "NumberLiteral",
}

export type ChildNode = NumberNode | CallExpressionNode;
export type ParentNode = RootNode | CallExpressionNode | undefined;

export interface RootNode {
  type: NodeTypes.Program;
  body: ChildNode[];
  context?: ChildNode[];
}
export interface NumberNode {
  type: NodeTypes.NumberLiteral;
  value: string;
}
export interface CallExpressionNode {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
  context?: ChildNode[];
}

interface VisitorOption {
  enter: (node: ChildNode | RootNode, parent: ParentNode) => void;
  exit?: (node: ChildNode | RootNode, parent: ParentNode) => void;
}
export interface Visitor {
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption;
}
