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

export interface RootNode {
  type: NodeTypes.Program;
  body: ChildNode[];
}
export interface NumberNode {
  type: NodeTypes.NumberLiteral;
  value: string;
}
export interface CallExpressionNode {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
}

interface VisitorOption {
  enter: (
    node: ChildNode | RootNode,
    parent: ChildNode | RootNode | undefined
  ) => void;
  exit: (
    node: ChildNode | RootNode,
    parent: ChildNode | RootNode | undefined
  ) => void;
}
export interface Visitor {
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption;
}
