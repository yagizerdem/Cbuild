import { Env, SymbolTableVariable } from "@src/cbuild-backend/env.js";
import { ValueIR } from "@src/compiler/ir.js";
import type { LuaEngine } from "wasmoon";

type ExportOptions = {
  isDeferred?: boolean;
  defineIfAbsent?: boolean;
};

function contains(context: Env, identifier: string): boolean {
  return context.hasVariable(identifier);
}

function _export(
  context: Env,
  identifier: string,
  value: string,
  options?: ExportOptions,
): void {
  const { isDeferred = false, defineIfAbsent = false } = options ?? {};

  const entry = isDeferred
    ? new SymbolTableVariable(
        null,
        new ValueIR([{ kind: "text", lexeme: value }]),
        "recursive",
      )
    : new SymbolTableVariable(value, null, "raw");

  if (defineIfAbsent) {
    context.defineVariableIfAbsent(identifier, entry);
  } else {
    context.defineVariable(identifier, entry);
  }
}

export default function register(engine: LuaEngine, context: Env): void {
  engine.global.set(
    "context",
    Object.freeze({
      contains: contains,
      export: _export,
    }),
  );
}
