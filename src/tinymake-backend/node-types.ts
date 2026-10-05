export interface VarRefPart {
  value: ValueNode;
  name: string;
}

export interface TextPart {
  lexeme: string;
  name: string;
}

export interface ValueNode {
  parts: (VarRefPart | TextPart)[];
}

export interface BaseNode {}

export interface RuleNode extends BaseNode {
  targets: ValueNode;
  prerequisites: ValueNode;
  recipes: ValueNode[];
}

export interface AssignmentNode extends BaseNode {
  identifier: ValueNode;
  value: ValueNode;
}

export function createVarRefPart(value: ValueNode): VarRefPart {
  return {
    value,
    name: "varref-part",
  };
}

export function createTextPart(lexeme: string): TextPart {
  return {
    lexeme,
    name: "text-part",
  };
}

export function createValueNode(
  parts: (VarRefPart | TextPart)[] = [],
): ValueNode {
  return {
    parts,
  };
}

export function createRuleNode(
  targets: ValueNode,
  prerequisites: ValueNode,
  recipes: ValueNode[],
): RuleNode {
  return {
    targets,
    prerequisites,
    recipes,
  };
}

export function createAssignmentNode(
  identifier: ValueNode,
  value: ValueNode,
): AssignmentNode {
  return {
    identifier,
    value,
  };
}
