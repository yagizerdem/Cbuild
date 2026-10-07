import { BaseNode } from "@tinymake-backend/node-types.js";
import { LineParser, LineReader } from "@tinymake-backend/read-line.js";

export function parseTinyMake(program: string) {
  const parsedNodes: BaseNode[] = [];

  const lineReader = new LineReader(program);
  const classifiedLines = lineReader.read();
  const lineParser = new LineParser(classifiedLines);
  const AST = lineParser.parse();
  parsedNodes.push(...AST);

  return parsedNodes;
}
