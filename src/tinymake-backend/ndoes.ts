export interface VarRefPart {
  values: ValueNode;
}

export interface TextPart {
  identifier: string;
}

export interface ValueNode {
  parts: (VarRefPart | TextPart)[];
}

export interface Rule {
  targets: ValueNode[];
  prerequisites: ValueNode[];
  recipe: ValueNode[];
}

export interface Assignment {
  identifier: ValueNode;
  value: ValueNode;
}
