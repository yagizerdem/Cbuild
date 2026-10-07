import { TinyMakeEnv } from "@tinymake-backend/env.js";
import { ValueNode } from "@tinymake-backend/node-types.js";
import { VarRefPart } from "@tinymake-backend/node-types.js";

export class TinyMakeExpansionEngine {
  private readonly env: TinyMakeEnv;
  private readonly activeVariables = new Set<string>();
  constructor(env: TinyMakeEnv) {
    this.env = env;
  }

  public expand(valueNode: ValueNode) {
    let builder = "";
    for (const part of valueNode.parts) {
      // var ref part
      if ("value" in part) {
        const ref = this.expandVarRef(part);
        const symbolTableEntry = this.env.getVariableRecursiveOrDefault(
          ref,
          "",
        );

        if (symbolTableEntry) {
          if (symbolTableEntry.value.kind === "deffered") {
            if (this.activeVariables.has(ref)) {
              throw new Error(`Recursive variable reference: ${ref}`);
            }
            this.activeVariables.add(ref);
            try {
              builder += this.expand(symbolTableEntry.value.value);
            } finally {
              this.activeVariables.delete(ref);
            }
          } else {
            builder += symbolTableEntry.value.value;
          }
        }
      } else {
        builder += part.lexeme;
      }
    }
    return builder;
  }

  public expandVarRef(varRefPart: VarRefPart): string {
    return this.expand(varRefPart.value);
  }
}
