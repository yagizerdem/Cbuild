import { IR } from "@src/compiler/ir.js";
import { compile, parseBuildFile } from "@src/frontend.js";

export function compileBuildFile(buildFile: string): IR[] {
  const root = parseBuildFile(buildFile);
  const instructions = compile(root);
  return instructions;
}
