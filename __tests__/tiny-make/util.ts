import { BuildFileMeta } from "@src/type/buildfile-meta.js";
import { BaseNode } from "@tinymake-backend/node-types.js";
import { LineParser, LineReader } from "@tinymake-backend/read-line.js";

export function parseTinyMake(program: string) {
  const parsedNodes: BaseNode[] = [];

  const lineReader = new LineReader(program, {
    name: "testfile",
  } as BuildFileMeta);
  const classifiedLines = lineReader.read();
  const lineParser = new LineParser(classifiedLines, {
    name: "testfile",
  } as BuildFileMeta);
  const AST = lineParser.parse();
  parsedNodes.push(...AST);

  return parsedNodes;
}
