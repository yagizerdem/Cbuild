import { ValueNode } from "@tinymake-backend/node-types.js";
import { stdout } from "node:process";

export function debugPrintValue(valueNode: ValueNode) {
  console.log(JSON.stringify(valueNode));
}
