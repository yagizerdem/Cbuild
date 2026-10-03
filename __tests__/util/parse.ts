import { parseBuildFile } from "@src/frontend.js";
import { CbuildfileContext } from "@src/parser/cbuildParser.js";

export function runBuildFile(buildFile: string): CbuildfileContext {
  const root = parseBuildFile(buildFile);
  return root;
}
