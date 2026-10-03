import { Env } from "@src/cbuild-backend/env.js";
import { BaseModel, VpathRule } from "@src/cbuild-backend/model.js";
import { TargetRuleIR } from "@src/compiler/ir.js";

export interface BuildFileEvaluationState {
  vpaths: VpathRule[];
  resolvedModels: BaseModel[];
}

export interface TargetRuleEvaluationState {
  evaluatedTargetRuleIR: TargetRuleIR;
  targetRawName: string;
  evaluatedContext: Env;
}
