import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";

export function createProcessEnv(
  context: Env,
  expansionEngine: ValueExpansionEngine,
): NodeJS.ProcessEnv {
  const result: NodeJS.ProcessEnv = {
    ...process.env,
  };

  const exportedVariablesEntries = context.getExportedVariables();
  const exportedVarsMap: Record<string, string> = {};
  for (const [identifier, exportedVariable] of exportedVariablesEntries) {
    const expandedVariable = expansionEngine.expand(exportedVariable.value);
    exportedVarsMap[identifier] = expandedVariable;
  }

  return {
    ...result,
    ...exportedVarsMap,
  };
}
