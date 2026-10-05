export interface VarRefPart {
  values: ValueNode;
}

export interface TextPart {
  identifier: string;
}

export interface ValueNode {
  parts: (VarRefPart | TextPart)[];
}

export interface BaseNode {}

export interface Rule extends BaseNode {
  targets: ValueNode[];
  prerequisites: ValueNode[];
  recipe: ValueNode[];
}

export interface Assignment extends BaseNode {
  identifier: ValueNode;
  value: ValueNode;
}
