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

export type TNode = "rule" | "assignment";
export type AssignmentFlavour = "simple" | "deffered";

export interface BaseNode {
  type: TNode;
}

export interface RuleNode extends BaseNode {
  targets: ValueNode;
  prerequisites: ValueNode;
  recipes: ValueNode[];
}

export interface AssignmentNode extends BaseNode {
  identifier: ValueNode;
  value: ValueNode;
  flavour: AssignmentFlavour;
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
    type: "rule",
  };
}

export function createAssignmentNode(
  identifier: ValueNode,
  value: ValueNode,
  flavour: AssignmentFlavour,
): AssignmentNode {
  return {
    identifier,
    value,
    type: "assignment",
    flavour,
  };
}
