import { BaseModel, VpathRule } from "@src/cbuild-backend/model.js";

export interface BuildFileEvaluationState {
  vpaths: VpathRule[];
  resolvedModels: BaseModel[];
}
