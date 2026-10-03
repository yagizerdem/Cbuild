import { expect, test, vi } from "vitest";
import {
  AssignmentIR,
  FunctionIR,
  NormalRuleIR,
  RecipeIR,
  ValueIR,
} from "@src/compiler/ir.js";
import {
  ExpansionEngine,
  RecursiveVariableExpansionException,
  ValueExpansionEngine,
} from "@src/cbuild-backend/expansion.js";
import { Env, SymbolTableVariable } from "@src/cbuild-backend/env.js";
import { CBuildOptions } from "@src/cli.js";
import AssignmentIREvaluator from "@src/cbuild-backend/evaluator/assignment-evaluator.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";
import {
  PreqResolution,
  TargetResolution,
} from "@src/cbuild-backend/execution/preq-resolution/type.js";
import { NormalRule } from "@src/cbuild-backend/model.js";
import { ProcessRunner } from "@src/cbuild-backend/process.js";
import { MachineCode } from "@src/cbuild-exception.js";
import { compile } from "@src/test-util/compile.js";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

test("plain text remains unchanged", () => {
  const value: ValueIR = new ValueIR([
    { kind: "text", lexeme: "hello, world!" },
  ]);

  const context = new Env({} as CBuildOptions);

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("hello, world!");
});

test("raw variable expansion", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("alpha"));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("alpha");
});

test("undefined variable expands to an empty string", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "missing" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("empty variable expands to an empty string", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable(""));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("adjacent references expand without added whitespace", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "B" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("alpha"));
  context.setVariable("B", SymbolTableVariable.rawVariable("beta"));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("alphabeta");
});

test("text surrounds a variable reference", () => {
  const value: ValueIR = new ValueIR([
    { kind: "text", lexeme: "before:" },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
    { kind: "text", lexeme: ":after" },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("alpha"));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("before:alpha:after");
});

test("empty ValueIR expands to an empty string", () => {
  const value: ValueIR = new ValueIR([]);

  const context = new Env({} as CBuildOptions);

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("consecutive empty expansions preserve surrounding text", () => {
  const value: ValueIR = new ValueIR([
    { kind: "text", lexeme: "<" },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "missing" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "B" }]),
    },
    { kind: "text", lexeme: ">" },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable(""));
  context.setVariable("B", SymbolTableVariable.rawVariable(""));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("<>");
});

test("spaces are preserved", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("   "));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("   ");
});

test("tabs are preserved", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("\t\t"));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("\t\t");
});

test("newlines are preserved", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("\n\r\n"));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("\n\r\n");
});

test("leading and trailing whitespace are preserved", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable(" \thello\n "));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(" \thello\n ");
});

test("whitespace-only variable are preserved", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable(" \t\n "));

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(" \t\n ");
});

test("immediate assignment retains its dependency value", async () => {
  const assignment: AssignmentIR = new AssignmentIR(
    ":=",
    new ValueIR([{ kind: "text", lexeme: "result" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "dependency" }]),
      },
    ]),
  );
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "result" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("dependency", SymbolTableVariable.rawVariable("before"));
  await new AssignmentIREvaluator(context, assignment).evaluate();

  const engine = new ExpansionEngine(context);
  const expanded_before = engine.expand(value);

  context.setVariable("dependency", SymbolTableVariable.rawVariable("after"));
  const expanded_after = engine.expand(value);

  expect(expanded_before).toEqual("before");
  expect(expanded_after).toEqual("before");
  expect(context.getVariable("result")?.isDeferred()).toEqual(false);
});

test("POSIX immediate assignment retains its dependency value", async () => {
  const assignment: AssignmentIR = new AssignmentIR(
    "::=",
    new ValueIR([{ kind: "text", lexeme: "result" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "dependency" }]),
      },
    ]),
  );
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "result" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("dependency", SymbolTableVariable.rawVariable("before"));
  await new AssignmentIREvaluator(context, assignment).evaluate();

  const engine = new ExpansionEngine(context);
  const expanded_before = engine.expand(value);

  context.setVariable("dependency", SymbolTableVariable.rawVariable("after"));
  const expanded_after = engine.expand(value);

  expect(expanded_before).toEqual("before");
  expect(expanded_after).toEqual("before");
  expect(context.getVariable("result")?.isDeferred()).toEqual(false);
});

test("immediate escaped assignment retains its dependency value", async () => {
  const assignment: AssignmentIR = new AssignmentIR(
    ":::=",
    new ValueIR([{ kind: "text", lexeme: "result" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "dependency" }]),
      },
    ]),
  );
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "result" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("dependency", SymbolTableVariable.rawVariable("before"));
  await new AssignmentIREvaluator(context, assignment).evaluate();

  const engine = new ExpansionEngine(context);
  const expanded_before = engine.expand(value);

  context.setVariable("dependency", SymbolTableVariable.rawVariable("after"));
  const expanded_after = engine.expand(value);

  expect(expanded_before).toEqual("before");
  expect(expanded_after).toEqual("before");
  expect(context.getVariable("result")?.isDeferred()).toEqual(true);
});

test("deferred assignment reevaluates its dependency value", async () => {
  const assignment: AssignmentIR = new AssignmentIR(
    "=",
    new ValueIR([{ kind: "text", lexeme: "result" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "dependency" }]),
      },
    ]),
  );
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "result" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("dependency", SymbolTableVariable.rawVariable("before"));
  await new AssignmentIREvaluator(context, assignment).evaluate();

  const engine = new ExpansionEngine(context);
  const expanded_before = engine.expand(value);

  context.setVariable("dependency", SymbolTableVariable.rawVariable("after"));
  const expanded_after = engine.expand(value);

  expect(expanded_before).toEqual("before");
  expect(expanded_after).toEqual("after");
  expect(context.getVariable("result")?.isDeferred()).toEqual(true);
});

test("raw values containing references are never reparsed", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "raw" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable("raw", SymbolTableVariable.rawVariable("$(X) $$HOME"));
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("$(X) $$HOME");
  context.setVariable("X", SymbolTableVariable.rawVariable("changed"));
  expect(engine.expand(value)).toEqual("$(X) $$HOME");
});

test("subst normal input", () => {
  const fn: FunctionIR = new FunctionIR("subst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "a" }]),
    new ValueIR([{ kind: "text", lexeme: "x" }]),
    new ValueIR([{ kind: "text", lexeme: "banana" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("bxnxnx");
});

test("subst empty input", () => {
  const fn: FunctionIR = new FunctionIR("subst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "a" }]),
    new ValueIR([{ kind: "text", lexeme: "x" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("subst whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("subst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "a" }]),
    new ValueIR([{ kind: "text", lexeme: "x" }]),
    new ValueIR([{ kind: "text", lexeme: " a\t a\n" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(" x\t x\n");
});

test("subst nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   banana " }]));

  const fn: FunctionIR = new FunctionIR("subst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "a" }]),
    new ValueIR([{ kind: "text", lexeme: "x" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("x bxnxnx");
});

test("patsubst normal input", () => {
  const fn: FunctionIR = new FunctionIR("patsubst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "%.o" }]),
    new ValueIR([{ kind: "text", lexeme: "main.c util.c notes" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("main.o util.o notes");
});

test("patsubst empty input", () => {
  const fn: FunctionIR = new FunctionIR("patsubst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "%.o" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("patsubst whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("patsubst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " %.c\t" }]),
    new ValueIR([{ kind: "text", lexeme: " %.o\n" }]),
    new ValueIR([{ kind: "text", lexeme: " main.c\t util.c\n" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("main.o util.o");
});

test("patsubst nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(
    new ValueIR([{ kind: "text", lexeme: " main.c   util.c " }]),
  );

  const fn: FunctionIR = new FunctionIR("patsubst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "%.o" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("main.o util.o");
});

test("strip normal input", () => {
  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " a  b " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a b");
});

test("strip empty input", () => {
  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("strip whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \ta\n  b \t" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a b");
});

test("strip nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b " }]));

  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a b");
});

test("findstring normal input", () => {
  const fn: FunctionIR = new FunctionIR("findstring");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "bc" }]),
    new ValueIR([{ kind: "text", lexeme: "abcd" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("bc");
});

test("findstring empty input", () => {
  const fn: FunctionIR = new FunctionIR("findstring");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "bc" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("findstring whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("findstring");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "\t" }]),
    new ValueIR([{ kind: "text", lexeme: "a\tb" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("\t");
});

test("findstring nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   bc " }]));

  const fn: FunctionIR = new FunctionIR("findstring");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "bc" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("bc");
});

test("filter normal input", () => {
  const fn: FunctionIR = new FunctionIR("filter");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "a.c b.o c.c" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.c c.c");
});

test("filter empty input", () => {
  const fn: FunctionIR = new FunctionIR("filter");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("filter whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("filter");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " %.c\t" }]),
    new ValueIR([{ kind: "text", lexeme: " a.c\t b.o\n c.c " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.c c.c");
});

test("filter nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a.c   b.o c.c " }]));

  const fn: FunctionIR = new FunctionIR("filter");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.c c.c");
});

test("filter-out normal input", () => {
  const fn: FunctionIR = new FunctionIR("filter-out");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "a.c b.o c.c" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b.o");
});

test("filter-out empty input", () => {
  const fn: FunctionIR = new FunctionIR("filter-out");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("filter-out whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("filter-out");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " %.c\t" }]),
    new ValueIR([{ kind: "text", lexeme: " a.c\t b.o\n c.c " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b.o");
});

test("filter-out nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a.c   b.o c.c " }]));

  const fn: FunctionIR = new FunctionIR("filter-out");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b.o");
});

test("sort normal input", () => {
  const fn: FunctionIR = new FunctionIR("sort");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "b a b c" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a b c");
});

test("sort empty input", () => {
  const fn: FunctionIR = new FunctionIR("sort");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("sort whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("sort");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \tb\n a\t b c " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a b c");
});

test("sort nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " b   a b c " }]));

  const fn: FunctionIR = new FunctionIR("sort");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a b c");
});

test("word normal input", () => {
  const fn: FunctionIR = new FunctionIR("word");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "2" }]),
    new ValueIR([{ kind: "text", lexeme: "a b c" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b");
});

test("word empty input", () => {
  const fn: FunctionIR = new FunctionIR("word");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "2" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("word whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("word");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " 2\t" }]),
    new ValueIR([{ kind: "text", lexeme: " a\t b\n c " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b");
});

test("word nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b c " }]));

  const fn: FunctionIR = new FunctionIR("word");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "2" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b");
});

test("words normal input", () => {
  const fn: FunctionIR = new FunctionIR("words");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "a b c" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("3");
});

test("words empty input", () => {
  const fn: FunctionIR = new FunctionIR("words");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("0");
});

test("words whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("words");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \ta\n b\t c " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("3");
});

test("words nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b c " }]));

  const fn: FunctionIR = new FunctionIR("words");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("3");
});

test("wordlist normal input", () => {
  const fn: FunctionIR = new FunctionIR("wordlist");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "2" }]),
    new ValueIR([{ kind: "text", lexeme: "3" }]),
    new ValueIR([{ kind: "text", lexeme: "a b c d" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b c");
});

test("wordlist empty input", () => {
  const fn: FunctionIR = new FunctionIR("wordlist");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "1" }]),
    new ValueIR([{ kind: "text", lexeme: "2" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("wordlist whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("wordlist");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " 2\t" }]),
    new ValueIR([{ kind: "text", lexeme: " 3\n" }]),
    new ValueIR([{ kind: "text", lexeme: " a\t b\n c d " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b c");
});

test("wordlist nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b c d " }]));

  const fn: FunctionIR = new FunctionIR("wordlist");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "2" }]),
    new ValueIR([{ kind: "text", lexeme: "3" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("b c");
});

test("firstword normal input", () => {
  const fn: FunctionIR = new FunctionIR("firstword");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "a b c" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a");
});

test("firstword empty input", () => {
  const fn: FunctionIR = new FunctionIR("firstword");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("firstword whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("firstword");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \ta\n b\t c " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a");
});

test("firstword nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b c " }]));

  const fn: FunctionIR = new FunctionIR("firstword");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a");
});

test("lastword normal input", () => {
  const fn: FunctionIR = new FunctionIR("lastword");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "a b c" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("c");
});

test("lastword empty input", () => {
  const fn: FunctionIR = new FunctionIR("lastword");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("lastword whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("lastword");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \ta\n b\t c " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("c");
});

test("lastword nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b c " }]));

  const fn: FunctionIR = new FunctionIR("lastword");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("c");
});

test("dir normal input", () => {
  const fn: FunctionIR = new FunctionIR("dir");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "src/a.c b.c" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("src/ ./");
});

test("dir empty input", () => {
  const fn: FunctionIR = new FunctionIR("dir");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("dir whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("dir");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \tsrc/a.c\n b.c " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("src/ ./");
});

test("dir nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " src/a.c   b.c " }]));

  const fn: FunctionIR = new FunctionIR("dir");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("src/ ./");
});

test("suffix normal input", () => {
  const fn: FunctionIR = new FunctionIR("suffix");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "src/a.c b.o notes" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(".c .o");
});

test("suffix empty input", () => {
  const fn: FunctionIR = new FunctionIR("suffix");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("suffix whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("suffix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/a.c\n b.o notes " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(".c .o");
});

test("suffix nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(
    new ValueIR([{ kind: "text", lexeme: " src/a.c   b.o notes " }]),
  );

  const fn: FunctionIR = new FunctionIR("suffix");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(".c .o");
});

test("basename normal input", () => {
  const fn: FunctionIR = new FunctionIR("basename");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "src/a.c b.o notes" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("src/a b notes");
});

test("basename empty input", () => {
  const fn: FunctionIR = new FunctionIR("basename");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("basename whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("basename");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/a.c\n b.o notes " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("src/a b notes");
});

test("basename nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(
    new ValueIR([{ kind: "text", lexeme: " src/a.c   b.o notes " }]),
  );

  const fn: FunctionIR = new FunctionIR("basename");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("src/a b notes");
});

test("addprefix normal input", () => {
  const fn: FunctionIR = new FunctionIR("addprefix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "build/" }]),
    new ValueIR([{ kind: "text", lexeme: "a.o b.o" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("build/a.o build/b.o");
});

test("addprefix empty input", () => {
  const fn: FunctionIR = new FunctionIR("addprefix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "build/" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("addprefix whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("addprefix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "build/" }]),
    new ValueIR([{ kind: "text", lexeme: " \ta.o\n b.o " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("build/a.o build/b.o");
});

test("addprefix nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a.o   b.o " }]));

  const fn: FunctionIR = new FunctionIR("addprefix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "build/" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("build/a.o build/b.o");
});

test("addsuffix normal input", () => {
  const fn: FunctionIR = new FunctionIR("addsuffix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: ".o" }]),
    new ValueIR([{ kind: "text", lexeme: "a b" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.o b.o");
});

test("addsuffix empty input", () => {
  const fn: FunctionIR = new FunctionIR("addsuffix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: ".o" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("addsuffix whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("addsuffix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: ".o" }]),
    new ValueIR([{ kind: "text", lexeme: " \ta\n b " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.o b.o");
});

test("addsuffix nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b " }]));

  const fn: FunctionIR = new FunctionIR("addsuffix");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: ".o" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.o b.o");
});

test("join normal input", () => {
  const fn: FunctionIR = new FunctionIR("join");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "a b c" }]),
    new ValueIR([{ kind: "text", lexeme: ".o .a" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.o b.a c");
});

test("join empty input", () => {
  const fn: FunctionIR = new FunctionIR("join");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("join whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("join");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \ta\n b c " }]),
    new ValueIR([{ kind: "text", lexeme: " .o\t .a " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.o b.a c");
});

test("join nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " a   b c " }]));

  const fn: FunctionIR = new FunctionIR("join");
  fn.args.push(
    new ValueIR([{ kind: "function-call", function: nested }]),
    new ValueIR([{ kind: "text", lexeme: ".o .a" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("a.o b.a c");
});

test("if normal input", () => {
  const fn: FunctionIR = new FunctionIR("if");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "yes" }]),
    new ValueIR([{ kind: "text", lexeme: "chosen" }]),
    new ValueIR([{ kind: "text", lexeme: "other" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("chosen");
});

test("if empty input", () => {
  const fn: FunctionIR = new FunctionIR("if");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([{ kind: "text", lexeme: "chosen" }]),
    new ValueIR([{ kind: "text", lexeme: "other" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("other");
});

test("if whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("if");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \t" }]),
    new ValueIR([{ kind: "text", lexeme: "chosen" }]),
    new ValueIR([{ kind: "text", lexeme: "other" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("chosen");
});

test("if nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " \t " }]));

  const fn: FunctionIR = new FunctionIR("if");
  fn.args.push(
    new ValueIR([{ kind: "function-call", function: nested }]),
    new ValueIR([{ kind: "text", lexeme: "chosen" }]),
    new ValueIR([{ kind: "text", lexeme: "other" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("other");
});

test("or normal input", () => {
  const fn: FunctionIR = new FunctionIR("or");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([{ kind: "text", lexeme: "chosen" }]),
    new ValueIR([{ kind: "text", lexeme: "other" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("chosen");
});

test("or empty input", () => {
  const fn: FunctionIR = new FunctionIR("or");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("or whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("or");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([{ kind: "text", lexeme: " \t" }]),
    new ValueIR([{ kind: "text", lexeme: "other" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(" \t");
});

test("or nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " chosen   value " }]));

  const fn: FunctionIR = new FunctionIR("or");
  fn.args.push(
    new ValueIR([{ kind: "function-call", function: nested }]),
    new ValueIR([{ kind: "text", lexeme: "other" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("chosen value");
});

test("and normal input", () => {
  const fn: FunctionIR = new FunctionIR("and");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "yes" }]),
    new ValueIR([{ kind: "text", lexeme: "chosen" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("chosen");
});

test("and empty input", () => {
  const fn: FunctionIR = new FunctionIR("and");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "yes" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("");
});

test("and whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("and");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \t" }]),
    new ValueIR([{ kind: "text", lexeme: " value\t " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual(" value\t ");
});

test("and nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " yes   value " }]));

  const fn: FunctionIR = new FunctionIR("and");
  fn.args.push(
    new ValueIR([{ kind: "function-call", function: nested }]),
    new ValueIR([{ kind: "text", lexeme: "chosen" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);

  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);

  expect(expanded_value).toEqual("chosen");
});

test("abspath normal input", () => {
  const fn: FunctionIR = new FunctionIR("abspath");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "src/compiler/ir.ts" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(path.resolve("src/compiler/ir.ts"));
});

test("abspath empty input", () => {
  const fn: FunctionIR = new FunctionIR("abspath");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
});

test("abspath whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("abspath");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/compiler/ir.ts\n " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(path.resolve("src/compiler/ir.ts"));
});

test("abspath nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/compiler/ir.ts  " }]),
  );
  const fn: FunctionIR = new FunctionIR("abspath");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(path.resolve("src/compiler/ir.ts"));
});

test("realpath normal input", () => {
  const fn: FunctionIR = new FunctionIR("realpath");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "src/compiler/ir.ts" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(realpathSync("src/compiler/ir.ts"));
});

test("realpath empty input", () => {
  const fn: FunctionIR = new FunctionIR("realpath");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
});

test("realpath whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("realpath");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/compiler/ir.ts\n " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(realpathSync("src/compiler/ir.ts"));
});

test("realpath nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/compiler/ir.ts  " }]),
  );
  const fn: FunctionIR = new FunctionIR("realpath");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(realpathSync("src/compiler/ir.ts"));
});

test("wildcard normal input", () => {
  const fn: FunctionIR = new FunctionIR("wildcard");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "src/compiler/ir.ts" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(path.join("src", "compiler", "ir.ts"));
});

test("wildcard empty input", () => {
  const fn: FunctionIR = new FunctionIR("wildcard");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
});

test("wildcard whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("wildcard");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/compiler/ir.ts\n " }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(path.join("src", "compiler", "ir.ts"));
});

test("wildcard nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(
    new ValueIR([{ kind: "text", lexeme: " \tsrc/compiler/ir.ts  " }]),
  );
  const fn: FunctionIR = new FunctionIR("wildcard");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(path.join("src", "compiler", "ir.ts"));
});

test("value normal input", () => {
  const fn: FunctionIR = new FunctionIR("value");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "item" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("$(X)");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("value empty input", () => {
  const fn: FunctionIR = new FunctionIR("value");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("value whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("value");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \titem\n " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("$(X)");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("value nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " \titem  " }]));
  const fn: FunctionIR = new FunctionIR("value");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("$(X)");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("flavor normal input", () => {
  const fn: FunctionIR = new FunctionIR("flavor");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "item" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("recursive");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("flavor empty input", () => {
  const fn: FunctionIR = new FunctionIR("flavor");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("undefined");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("flavor whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("flavor");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \titem\n " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("recursive");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("flavor nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " \titem  " }]));
  const fn: FunctionIR = new FunctionIR("flavor");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("recursive");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("origin normal input", () => {
  const fn: FunctionIR = new FunctionIR("origin");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "item" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("command line");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("origin empty input", () => {
  const fn: FunctionIR = new FunctionIR("origin");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("undefined");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("origin whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("origin");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \titem\n " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("command line");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("origin nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " \titem  " }]));
  const fn: FunctionIR = new FunctionIR("origin");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "item",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
      "command-line",
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("command line");
  expect(context.getVariable("item")?.isDeferred()).toEqual(true);
});

test("foreach normal input", () => {
  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "a b" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("a b");
  expect(context.hasVariable("item")).toEqual(false);
});

test("foreach empty input", () => {
  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
  expect(context.hasVariable("item")).toEqual(false);
});

test("foreach whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: " item\t" }]),
    new ValueIR([{ kind: "text", lexeme: " \ta\n b " }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("a b");
  expect(context.hasVariable("item")).toEqual(false);
});

test("foreach nested function input", () => {
  const nested: FunctionIR = new FunctionIR("sort");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " b a b " }]));
  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "function-call", function: nested }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("a b");
  expect(context.hasVariable("item")).toEqual(false);
});

test("call normal input", () => {
  const fn: FunctionIR = new FunctionIR("call");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "format" }]),
    new ValueIR([{ kind: "text", lexeme: "A" }]),
    new ValueIR([{ kind: "text", lexeme: "B" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "format",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "-" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("A-B");
  expect(context.hasVariable("1")).toEqual(false);
  expect(context.hasVariable("2")).toEqual(false);
});

test("call empty input", () => {
  const fn: FunctionIR = new FunctionIR("call");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([{ kind: "text", lexeme: "A" }]),
    new ValueIR([{ kind: "text", lexeme: "B" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "format",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "-" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
  expect(context.hasVariable("1")).toEqual(false);
  expect(context.hasVariable("2")).toEqual(false);
});

test("call whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("call");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "format" }]),
    new ValueIR([{ kind: "text", lexeme: " A " }]),
    new ValueIR([{ kind: "text", lexeme: " B\t" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "format",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "-" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(" A - B\t");
  expect(context.hasVariable("1")).toEqual(false);
  expect(context.hasVariable("2")).toEqual(false);
});

test("call nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " format " }]));
  const fn: FunctionIR = new FunctionIR("call");
  fn.args.push(
    new ValueIR([{ kind: "function-call", function: nested }]),
    new ValueIR([{ kind: "text", lexeme: "A" }]),
    new ValueIR([{ kind: "text", lexeme: "B" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "format",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "-" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("A-B");
  expect(context.hasVariable("1")).toEqual(false);
  expect(context.hasVariable("2")).toEqual(false);
});

test("error normal input", () => {
  const fn: FunctionIR = new FunctionIR("error");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "message" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      message: "message",
      machineCode: MachineCode.ERROR_FN,
    }),
  );
});

test("error empty input", () => {
  const fn: FunctionIR = new FunctionIR("error");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      message: "",
      machineCode: MachineCode.ERROR_FN,
    }),
  );
});

test("error whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("error");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \tmessage\n " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      message: " \tmessage\n ",
      machineCode: MachineCode.ERROR_FN,
    }),
  );
});

test("error nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " message  " }]));
  const fn: FunctionIR = new FunctionIR("error");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      message: "message",
      machineCode: MachineCode.ERROR_FN,
    }),
  );
});

test("warning normal input", () => {
  const fn: FunctionIR = new FunctionIR("warning");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "message" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("");
    expect(warning).toHaveBeenCalledExactlyOnceWith("message");
  } finally {
    warning.mockRestore();
  }
});

test("warning empty input", () => {
  const fn: FunctionIR = new FunctionIR("warning");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("");
    expect(warning).toHaveBeenCalledExactlyOnceWith("");
  } finally {
    warning.mockRestore();
  }
});

test("warning whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("warning");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \tmessage\n " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("");
    expect(warning).toHaveBeenCalledExactlyOnceWith(" \tmessage\n ");
  } finally {
    warning.mockRestore();
  }
});

test("warning nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " message  " }]));
  const fn: FunctionIR = new FunctionIR("warning");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("");
    expect(warning).toHaveBeenCalledExactlyOnceWith("message");
  } finally {
    warning.mockRestore();
  }
});

test("shell normal input", () => {
  const fn: FunctionIR = new FunctionIR("shell");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "echo hello" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const run = vi.spyOn(ProcessRunner.prototype, "runSync").mockReturnValue({
    command: "echo hello",
    exitCode: 0,
    signal: null,
    stdout: "hello\r\nworld\n\n",
    stderr: "",
  });
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("hello world");
    expect(run).toHaveBeenCalledExactlyOnceWith(
      "echo hello",
      expect.objectContaining({
        cwd: process.cwd(),
        output: "capture",
        ignoreErrors: true,
      }),
    );
    expect(context.getRawVariable(".SHELLSTATUS")).toEqual("0");
  } finally {
    run.mockRestore();
  }
});

test("shell empty input", () => {
  const fn: FunctionIR = new FunctionIR("shell");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const run = vi.spyOn(ProcessRunner.prototype, "runSync").mockReturnValue({
    command: "",
    exitCode: 0,
    signal: null,
    stdout: "",
    stderr: "",
  });
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("");
    expect(run).toHaveBeenCalledExactlyOnceWith(
      "",
      expect.objectContaining({
        cwd: process.cwd(),
        output: "capture",
        ignoreErrors: true,
      }),
    );
    expect(context.getRawVariable(".SHELLSTATUS")).toEqual("0");
  } finally {
    run.mockRestore();
  }
});

test("shell whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("shell");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \techo hello  " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const run = vi.spyOn(ProcessRunner.prototype, "runSync").mockReturnValue({
    command: " \techo hello  ",
    exitCode: 0,
    signal: null,
    stdout: "hello\r\nworld\n\n",
    stderr: "",
  });
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("hello world");
    expect(run).toHaveBeenCalledExactlyOnceWith(
      " \techo hello  ",
      expect.objectContaining({
        cwd: process.cwd(),
        output: "capture",
        ignoreErrors: true,
      }),
    );
    expect(context.getRawVariable(".SHELLSTATUS")).toEqual("0");
  } finally {
    run.mockRestore();
  }
});

test("shell nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(new ValueIR([{ kind: "text", lexeme: " echo   hello " }]));
  const fn: FunctionIR = new FunctionIR("shell");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const run = vi.spyOn(ProcessRunner.prototype, "runSync").mockReturnValue({
    command: "echo hello",
    exitCode: 0,
    signal: null,
    stdout: "hello\r\nworld\n\n",
    stderr: "",
  });
  try {
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("hello world");
    expect(run).toHaveBeenCalledExactlyOnceWith(
      "echo hello",
      expect.objectContaining({
        cwd: process.cwd(),
        output: "capture",
        ignoreErrors: true,
      }),
    );
    expect(context.getRawVariable(".SHELLSTATUS")).toEqual("0");
  } finally {
    run.mockRestore();
  }
});

test("file normal input", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "cbuild-expansion-"));
  const filename = path.join(directory, "input.txt");
  try {
    writeFileSync(filename, "message\n");
    const fn: FunctionIR = new FunctionIR("file");
    fn.args.push(new ValueIR([{ kind: "text", lexeme: "<" + filename }]));

    const value: ValueIR = new ValueIR([
      { kind: "function-call", function: fn },
    ]);
    const context = new Env({} as CBuildOptions);
    const engine = new ExpansionEngine(context);
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("message");
  } finally {
    if (existsSync(filename)) unlinkSync(filename);
    rmdirSync(directory);
  }
});

test("file empty input", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "cbuild-expansion-"));
  const filename = path.join(directory, "input.txt");
  try {
    writeFileSync(filename, "");
    const fn: FunctionIR = new FunctionIR("file");
    fn.args.push(new ValueIR([{ kind: "text", lexeme: "<" + filename }]));

    const value: ValueIR = new ValueIR([
      { kind: "function-call", function: fn },
    ]);
    const context = new Env({} as CBuildOptions);
    const engine = new ExpansionEngine(context);
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("");
  } finally {
    if (existsSync(filename)) unlinkSync(filename);
    rmdirSync(directory);
  }
});

test("file whitespace input", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "cbuild-expansion-"));
  const filename = path.join(directory, "input.txt");
  try {
    writeFileSync(filename, " \tmessage\n \n");
    const fn: FunctionIR = new FunctionIR("file");
    fn.args.push(
      new ValueIR([{ kind: "text", lexeme: "  < " + filename + "  " }]),
    );

    const value: ValueIR = new ValueIR([
      { kind: "function-call", function: fn },
    ]);
    const context = new Env({} as CBuildOptions);
    const engine = new ExpansionEngine(context);
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual(" \tmessage\n ");
  } finally {
    if (existsSync(filename)) unlinkSync(filename);
    rmdirSync(directory);
  }
});

test("file nested function input", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "cbuild-expansion-"));
  const filename = path.join(directory, "input.txt");
  try {
    writeFileSync(filename, "message\n");
    const nested: FunctionIR = new FunctionIR("if");
    nested.args.push(
      new ValueIR([{ kind: "text", lexeme: "yes" }]),
      new ValueIR([{ kind: "text", lexeme: "<" + filename }]),
      new ValueIR([{ kind: "text", lexeme: "<missing" }]),
    );
    const fn: FunctionIR = new FunctionIR("file");
    fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

    const value: ValueIR = new ValueIR([
      { kind: "function-call", function: fn },
    ]);
    const context = new Env({} as CBuildOptions);
    const engine = new ExpansionEngine(context);
    const expanded_value = engine.expand(value);
    expect(expanded_value).toEqual("message");
  } finally {
    if (existsSync(filename)) unlinkSync(filename);
    rmdirSync(directory);
  }
});

test("eval rejects unsupported normal input", () => {
  const fn: FunctionIR = new FunctionIR("eval");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "CREATED = value\n" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  // EvalRunner declares eval unsupported; silent success loses the input.
  expect(() => engine.expand(value)).toThrowError(/not supported|unsupported/i);
  expect(context.hasVariable("CREATED")).toEqual(false);
});

test("eval rejects unsupported empty input", () => {
  const fn: FunctionIR = new FunctionIR("eval");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  // EvalRunner declares eval unsupported; silent success loses the input.
  expect(() => engine.expand(value)).toThrowError(/not supported|unsupported/i);
  expect(context.hasVariable("CREATED")).toEqual(false);
});

test("eval rejects unsupported whitespace input", () => {
  const fn: FunctionIR = new FunctionIR("eval");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \t\n " }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  // EvalRunner declares eval unsupported; silent success loses the input.
  expect(() => engine.expand(value)).toThrowError(/not supported|unsupported/i);
  expect(context.hasVariable("CREATED")).toEqual(false);
});

test("eval rejects unsupported nested function input", () => {
  const nested: FunctionIR = new FunctionIR("strip");
  nested.args.push(
    new ValueIR([{ kind: "text", lexeme: " CREATED = value " }]),
  );
  const fn: FunctionIR = new FunctionIR("eval");
  fn.args.push(new ValueIR([{ kind: "function-call", function: nested }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);

  // EvalRunner declares eval unsupported; silent success loses the input.
  expect(() => engine.expand(value)).toThrowError(/not supported|unsupported/i);
  expect(context.hasVariable("CREATED")).toEqual(false);
});

test("compiled dollar escaping $$", () => {
  const [assignment] = compile("value = $$\n");
  expect(assignment).toBeInstanceOf(AssignmentIR);
  const value: ValueIR = (assignment as AssignmentIR).right!;
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("$");
});

test("recipe dollar escaping $$", () => {
  const [rule] = compile("all:\n\techo $$\n");
  expect(rule).toBeInstanceOf(NormalRuleIR);
  const recipe: RecipeIR = (rule as NormalRuleIR).recipes[0];
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_recipe = engine.expand(recipe);
  expect(expanded_recipe).toEqual("echo $");
});

test("compiled dollar escaping $$HOME", () => {
  const [assignment] = compile("value = $$HOME\n");
  expect(assignment).toBeInstanceOf(AssignmentIR);
  const value: ValueIR = (assignment as AssignmentIR).right!;
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("$HOME");
});

test("recipe dollar escaping $$HOME", () => {
  const [rule] = compile("all:\n\techo $$HOME\n");
  expect(rule).toBeInstanceOf(NormalRuleIR);
  const recipe: RecipeIR = (rule as NormalRuleIR).recipes[0];
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_recipe = engine.expand(recipe);
  expect(expanded_recipe).toEqual("echo $HOME");
});

test("compiled dollar escaping $$$$", () => {
  const [assignment] = compile("value = $$$$\n");
  expect(assignment).toBeInstanceOf(AssignmentIR);
  const value: ValueIR = (assignment as AssignmentIR).right!;
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("$$");
});

test("recipe dollar escaping $$$$", () => {
  const [rule] = compile("all:\n\techo $$$$\n");
  expect(rule).toBeInstanceOf(NormalRuleIR);
  const recipe: RecipeIR = (rule as NormalRuleIR).recipes[0];
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_recipe = engine.expand(recipe);
  expect(expanded_recipe).toEqual("echo $$");
});

test("compiled dollar escaping foo$$bar", () => {
  const [assignment] = compile("value = foo$$bar\n");
  expect(assignment).toBeInstanceOf(AssignmentIR);
  const value: ValueIR = (assignment as AssignmentIR).right!;
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("foo$bar");
});

test("recipe dollar escaping foo$$bar", () => {
  const [rule] = compile("all:\n\techo foo$$bar\n");
  expect(rule).toBeInstanceOf(NormalRuleIR);
  const recipe: RecipeIR = (rule as NormalRuleIR).recipes[0];
  const context = new Env({} as CBuildOptions);
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  const expanded_recipe = engine.expand(recipe);
  expect(expanded_recipe).toEqual("echo foo$bar");
});

// cbuild currenlty does not support $@
// test("automatic variable expansion $@", () => {
//   const [assignment] = compile("value = $@\n");
//   const value: ValueIR = (assignment as AssignmentIR).right!;

//   const rule = new NormalRule({
//     target: "build/app",
//     prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
//     orderOnlyPrerequisites: ["cache", "generated", "cache"],
//     shellCommands: [],
//     recipeIRs: [],
//     evaluatedRecipeIRs: [],
//     ruleIR: new NormalRuleIR(),
//     ruleSeperator: ":",
//   });
//   const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
//     (preqName) => ({
//       preqName,
//       vpathRules: [],
//       origin: { type: "target-rule" },
//     }),
//   );
//   const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
//     (preqName) => ({
//       preqName,
//       vpathRules: [],
//       origin: { type: "target-rule" },
//     }),
//   );
//   const target: TargetResolution = {
//     targetName: rule.target,
//     vpathRules: [],
//     origin: { type: "not-found" },
//   };
//   const parent_context = new Env({} as CBuildOptions);
//   const context = new AutomaticVariableEnv(
//     rule,
//     parent_context,
//     target,
//     resolved_prequisites,
//     order_only,
//     {
//       resolvedTarget: target,
//       resolvedPreqs: resolved_prequisites,
//       isTargetOutOfDate: true,
//       outOfDatePreqs: [
//         resolved_prequisites[1],
//         resolved_prequisites[2],
//         resolved_prequisites[1],
//       ],
//     },
//   ).generate();

//   const engine = new ExpansionEngine(context);
//   const expanded_value = engine.expand(value);
//   expect(expanded_value).toEqual("build/app");
// });

test("automatic variable expansion $<", () => {
  const [assignment] = compile("value = $<\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("src/main.o");
});

test("automatic variable expansion $?", () => {
  const [assignment] = compile("value = $?\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("lib/util.o src/main.o");
});

test("automatic variable expansion $^", () => {
  const [assignment] = compile("value = $^\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("src/main.o lib/util.o standalone.o");
});

test("automatic variable expansion $+", () => {
  const [assignment] = compile("value = $+\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual(
    "src/main.o lib/util.o src/main.o standalone.o",
  );
});

test("automatic variable expansion $|", () => {
  const [assignment] = compile("value = $|\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("cache generated");
});

test("automatic variable expansion $(@D)", () => {
  const [assignment] = compile("value = $(@D)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("build");
});

test("automatic variable expansion $(@F)", () => {
  const [assignment] = compile("value = $(@F)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("app");
});

test("automatic variable expansion $(<D)", () => {
  const [assignment] = compile("value = $(<D)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("src");
});

test("automatic variable expansion $(<F)", () => {
  const [assignment] = compile("value = $(<F)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("main.o");
});

test("automatic variable expansion $(^D)", () => {
  const [assignment] = compile("value = $(^D)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("src lib .");
});

test("automatic variable expansion $(^F)", () => {
  const [assignment] = compile("value = $(^F)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("main.o util.o standalone.o");
});

test("automatic variable expansion $(+D)", () => {
  const [assignment] = compile("value = $(+D)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("src lib src .");
});

test("automatic variable expansion $(+F)", () => {
  const [assignment] = compile("value = $(+F)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("main.o util.o main.o standalone.o");
});

test("automatic variable expansion $(?D)", () => {
  const [assignment] = compile("value = $(?D)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("lib src");
});

test("automatic variable expansion $(?F)", () => {
  const [assignment] = compile("value = $(?F)\n");
  const value: ValueIR = (assignment as AssignmentIR).right!;

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("util.o main.o");
});

test("automatic $^ removes duplicates", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "^" }]),
    },
  ]);

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand<string>(value);
  expect(expanded_value.split(" ")).toEqual([
    "src/main.o",
    "lib/util.o",
    "standalone.o",
  ]);
});

test("automatic $+ preserves duplicates", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "+" }]),
    },
  ]);

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand<string>(value);
  expect(expanded_value.split(" ")).toEqual([
    "src/main.o",
    "lib/util.o",
    "src/main.o",
    "standalone.o",
  ]);
});

test("automatic variables are empty when prerequisites are absent", () => {
  const parent_context = new Env({} as CBuildOptions);
  const rule = new NormalRule({
    target: "app",
    prerequisites: [],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    null,
    [],
    [],
    null,
  ).generate();
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "<" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "?" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "^" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "+" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "|" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "<D" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "<F" }]),
    },
  ]);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("");
  expect(context.getRawVariable("@D")).toEqual(".");
  expect(context.getRawVariable("@F")).toEqual("app");
});

test("computed reference $($(A))", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("B"));
  context.setVariable("B", SymbolTableVariable.rawVariable("value"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("value");
});

test("computed reference $($($(A)))", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([
            {
              kind: "variable-reference",
              nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
            },
          ]),
        },
      ]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("B"));
  context.setVariable("B", SymbolTableVariable.rawVariable("C"));
  context.setVariable("C", SymbolTableVariable.rawVariable("value"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("value");
});

test("computed reference empty computed name", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable(""));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
});

test("computed reference undefined computed name", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("missing"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
});

test("computed reference undefined inner computed reference", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([
            {
              kind: "variable-reference",
              nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
            },
          ]),
        },
      ]),
    },
  ]);
  const context = new Env({} as CBuildOptions);

  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("");
});

test("computed reference many layers of computed references", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([
            {
              kind: "variable-reference",
              nameExpr: new ValueIR([
                {
                  kind: "variable-reference",
                  nameExpr: new ValueIR([
                    {
                      kind: "variable-reference",
                      nameExpr: new ValueIR([
                        {
                          kind: "variable-reference",
                          nameExpr: new ValueIR([
                            {
                              kind: "variable-reference",
                              nameExpr: new ValueIR([
                                {
                                  kind: "variable-reference",
                                  nameExpr: new ValueIR([
                                    { kind: "text", lexeme: "A" },
                                  ]),
                                },
                              ]),
                            },
                          ]),
                        },
                      ]),
                    },
                  ]),
                },
              ]),
            },
          ]),
        },
      ]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("A", SymbolTableVariable.rawVariable("key_1"));
  context.setVariable("key_1", SymbolTableVariable.rawVariable("key_2"));
  context.setVariable("key_2", SymbolTableVariable.rawVariable("key_3"));
  context.setVariable("key_3", SymbolTableVariable.rawVariable("key_4"));
  context.setVariable("key_4", SymbolTableVariable.rawVariable("key_5"));
  context.setVariable("key_5", SymbolTableVariable.rawVariable("key_6"));
  context.setVariable("key_6", SymbolTableVariable.rawVariable("key_7"));
  context.setVariable("key_7", SymbolTableVariable.rawVariable("value"));
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand(value);
  expect(expanded_value).toEqual("value");
});

test("nested functions compute variable reference names", () => {
  const strip: FunctionIR = new FunctionIR("strip");
  strip.args.push(new ValueIR([{ kind: "text", lexeme: " PROFILE " }]));

  const prefix: FunctionIR = new FunctionIR("addprefix");
  prefix.args.push(
    new ValueIR([{ kind: "text", lexeme: "debug_" }]),
    new ValueIR([{ kind: "function-call", function: strip }]),
  );

  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "function-call", function: prefix }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "debug_PROFILE",
    SymbolTableVariable.rawVariable("selected"),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("selected");
});

test("subst zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("subst");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("patsubst zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("patsubst");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("strip zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("strip");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("findstring zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("findstring");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("filter zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("filter");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("filter-out zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("filter-out");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("sort zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("sort");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("word zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("word");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("words zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("words");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("wordlist zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("wordlist");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("firstword zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("firstword");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("lastword zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("lastword");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("dir zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("dir");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("");
});

test("suffix zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("suffix");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("basename zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("basename");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("addprefix zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("addprefix");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("addsuffix zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("addsuffix");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("join zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("join");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("if zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("if");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("or zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("or");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("");
});

test("and zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("and");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("");
});

test("abspath zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("abspath");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("realpath zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("realpath");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("wildcard zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("wildcard");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("value zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("value");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("flavor zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("flavor");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("origin zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("origin");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("foreach zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("foreach");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("call zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("call");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("");
});

test("error zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("error");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("warning zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("warning");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("shell zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("shell");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("file zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("file");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("eval zero argument behavior", () => {
  const fn: FunctionIR = new FunctionIR("eval");

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(/not supported|unsupported/i);
});

test("subst rejects missing required arguments", () => {
  const fn: FunctionIR = new FunctionIR("subst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "a" }]),
    new ValueIR([{ kind: "text", lexeme: "b" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("patsubst rejects missing required arguments", () => {
  const fn: FunctionIR = new FunctionIR("patsubst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "%.o" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("join rejects missing required arguments", () => {
  const fn: FunctionIR = new FunctionIR("join");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "a" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("wordlist rejects missing required arguments", () => {
  const fn: FunctionIR = new FunctionIR("wordlist");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "1" }]),
    new ValueIR([{ kind: "text", lexeme: "2" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("if rejects missing required arguments", () => {
  const fn: FunctionIR = new FunctionIR("if");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "yes" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("foreach rejects missing required arguments", () => {
  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "a b" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError();
});

test("if evaluates its condition before only the selected branch", () => {
  const condition_warning: FunctionIR = new FunctionIR("warning");
  condition_warning.args.push(
    new ValueIR([{ kind: "text", lexeme: "condition" }]),
  );

  const then_warning: FunctionIR = new FunctionIR("warning");
  then_warning.args.push(new ValueIR([{ kind: "text", lexeme: "then" }]));

  const else_warning: FunctionIR = new FunctionIR("warning");
  else_warning.args.push(new ValueIR([{ kind: "text", lexeme: "else" }]));

  const fn: FunctionIR = new FunctionIR("if");
  fn.args.push(
    new ValueIR([
      { kind: "function-call", function: condition_warning },
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "enabled" }]),
      },
    ]),
    new ValueIR([
      { kind: "function-call", function: then_warning },
      { kind: "text", lexeme: "selected" },
    ]),
    new ValueIR([
      { kind: "function-call", function: else_warning },
      { kind: "text", lexeme: "fallback" },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("enabled", SymbolTableVariable.rawVariable("yes"));
  const engine = new ExpansionEngine(context);
  const warnings: string[] = [];
  const warning = vi.spyOn(console, "warn").mockImplementation((message) => {
    warnings.push(message);
  });
  try {
    expect(engine.expand(value)).toEqual("selected");
    context.setVariable("enabled", SymbolTableVariable.rawVariable(""));
    expect(engine.expand(value)).toEqual("fallback");
    expect(warnings).toEqual(["condition", "then", "condition", "else"]);
  } finally {
    warning.mockRestore();
  }
});

test("foreach expands its list once before creating temporary bindings", () => {
  const list_warning: FunctionIR = new FunctionIR("warning");
  list_warning.args.push(new ValueIR([{ kind: "text", lexeme: "list" }]));

  const body_warning: FunctionIR = new FunctionIR("warning");
  body_warning.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([
      { kind: "function-call", function: list_warning },
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
    new ValueIR([
      { kind: "function-call", function: body_warning },
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const original_item = SymbolTableVariable.rawVariable("first second");
  context.setVariable("item", original_item);
  const engine = new ExpansionEngine(context);
  const warnings: string[] = [];
  const warning = vi.spyOn(console, "warn").mockImplementation((message) => {
    warnings.push(message);
  });
  try {
    expect(engine.expand(value)).toEqual("first second");
    expect(warnings).toEqual(["list", "first", "second"]);
    expect(context.getVariable("item")).toBe(original_item);
  } finally {
    warning.mockRestore();
  }
});

test("nested function arguments expand from left to right", () => {
  const from_warning: FunctionIR = new FunctionIR("warning");
  from_warning.args.push(new ValueIR([{ kind: "text", lexeme: "from" }]));
  const to_warning: FunctionIR = new FunctionIR("warning");
  to_warning.args.push(new ValueIR([{ kind: "text", lexeme: "to" }]));
  const left_warning: FunctionIR = new FunctionIR("warning");
  left_warning.args.push(new ValueIR([{ kind: "text", lexeme: "left" }]));
  const right_warning: FunctionIR = new FunctionIR("warning");
  right_warning.args.push(new ValueIR([{ kind: "text", lexeme: "right" }]));

  const nested: FunctionIR = new FunctionIR("join");
  nested.args.push(
    new ValueIR([
      { kind: "function-call", function: left_warning },
      { kind: "text", lexeme: "a" },
    ]),
    new ValueIR([
      { kind: "function-call", function: right_warning },
      { kind: "text", lexeme: "c" },
    ]),
  );

  const fn: FunctionIR = new FunctionIR("subst");
  fn.args.push(
    new ValueIR([
      { kind: "function-call", function: from_warning },
      { kind: "text", lexeme: "a" },
    ]),
    new ValueIR([
      { kind: "function-call", function: to_warning },
      { kind: "text", lexeme: "b" },
    ]),
    new ValueIR([{ kind: "function-call", function: nested }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const warnings: string[] = [];
  const warning = vi.spyOn(console, "warn").mockImplementation((message) => {
    warnings.push(message);
  });
  try {
    expect(engine.expand(value)).toEqual("bc");
    expect(warnings).toEqual(["from", "to", "left", "right"]);
  } finally {
    warning.mockRestore();
  }
});

test("or ignores recursion after short circuiting", () => {
  const fn: FunctionIR = new FunctionIR("or");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "selected" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "cycle" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "cycle",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "cycle" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("selected");
});

test("and ignores recursion after short circuiting", () => {
  const fn: FunctionIR = new FunctionIR("and");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "cycle" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "cycle",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "cycle" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("");
});

test("if ignores recursion in its unselected branch", () => {
  const fn: FunctionIR = new FunctionIR("if");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "yes" }]),
    new ValueIR([{ kind: "text", lexeme: "selected" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "cycle" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "cycle",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "cycle" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("selected");
});

test("nested call restores outer and global positional arguments", () => {
  const inner_call: FunctionIR = new FunctionIR("call");
  inner_call.args.push(
    new ValueIR([{ kind: "text", lexeme: "inner" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
      },
    ]),
    new ValueIR([{ kind: "text", lexeme: "inner-second" }]),
  );

  const outer_call: FunctionIR = new FunctionIR("call");
  outer_call.args.push(
    new ValueIR([{ kind: "text", lexeme: "outer" }]),
    new ValueIR([{ kind: "text", lexeme: "outer-first" }]),
    new ValueIR([{ kind: "text", lexeme: "outer-second" }]),
  );

  const value: ValueIR = new ValueIR([
    { kind: "function-call", function: outer_call },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("1", SymbolTableVariable.rawVariable("global-first"));
  context.setVariable("2", SymbolTableVariable.rawVariable("global-second"));
  context.setVariable(
    "inner",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "-" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "outer",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: ":" },
        { kind: "function-call", function: inner_call },
        { kind: "text", lexeme: ":" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "," },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual(
    "outer-first:outer-second-inner-second:outer-first,outer-second",
  );
  expect(context.getRawVariable("1")).toEqual("global-first");
  expect(context.getRawVariable("2")).toEqual("global-second");
  expect(context.hasVariable("0")).toEqual(false);
});

test("nested call leaves omitted positional arguments empty", () => {
  const inner_call: FunctionIR = new FunctionIR("call");
  inner_call.args.push(
    new ValueIR([{ kind: "text", lexeme: "inner" }]),
    new ValueIR([{ kind: "text", lexeme: "inner-first" }]),
  );

  const outer_call: FunctionIR = new FunctionIR("call");
  outer_call.args.push(
    new ValueIR([{ kind: "text", lexeme: "outer" }]),
    new ValueIR([{ kind: "text", lexeme: "outer-first" }]),
    new ValueIR([{ kind: "text", lexeme: "outer-second" }]),
  );

  const value: ValueIR = new ValueIR([
    { kind: "function-call", function: outer_call },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "inner",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "-" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "outer",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        { kind: "function-call", function: inner_call },
        { kind: "text", lexeme: ":" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("inner-first-:outer-second");
  expect(context.hasVariable("1")).toEqual(false);
  expect(context.hasVariable("2")).toEqual(false);
});

test("child raw variable shadows a raw parent variable", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "VALUE" }]),
    },
  ]);
  const parent_context = new Env({} as CBuildOptions);
  parent_context.setVariable("BASE", SymbolTableVariable.rawVariable("parent"));
  parent_context.setVariable(
    "VALUE",
    SymbolTableVariable.rawVariable("parent"),
  );
  const context = new Env({} as CBuildOptions);
  context.enclosing = parent_context;
  context.setVariable("VALUE", SymbolTableVariable.rawVariable("child"));
  const engine = new ExpansionEngine(context);
  const parent_engine = new ExpansionEngine(parent_context);
  expect(engine.expand(value)).toEqual("child");
  expect(parent_engine.expand(value)).toEqual("parent");
  expect(context.variableCount).toEqual(1);
});

test("child raw variable shadows a deferred parent variable", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "VALUE" }]),
    },
  ]);
  const parent_context = new Env({} as CBuildOptions);
  parent_context.setVariable("BASE", SymbolTableVariable.rawVariable("parent"));
  parent_context.setVariable(
    "VALUE",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "BASE" }]),
        },
      ]),
    ),
  );
  const context = new Env({} as CBuildOptions);
  context.enclosing = parent_context;
  context.setVariable("VALUE", SymbolTableVariable.rawVariable("child"));
  const engine = new ExpansionEngine(context);
  const parent_engine = new ExpansionEngine(parent_context);
  expect(engine.expand(value)).toEqual("child");
  expect(parent_engine.expand(value)).toEqual("parent");
  expect(context.variableCount).toEqual(1);
});

test("foreach shadows a parent binding and deletes its temporary local binding", () => {
  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "a b" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([
    { kind: "function-call", function: fn },
    { kind: "text", lexeme: ":" },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
    },
  ]);
  const parent_context = new Env({} as CBuildOptions);
  parent_context.setVariable("item", SymbolTableVariable.rawVariable("parent"));
  const context = new Env({} as CBuildOptions);
  context.enclosing = parent_context;
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("a b:parent");
  expect(context.hasVariable("item")).toEqual(false);
  expect(parent_context.getRawVariable("item")).toEqual("parent");
});

test("nested foreach and call preserve enclosing and positional bindings", () => {
  const pair_call: FunctionIR = new FunctionIR("call");
  pair_call.args.push(
    new ValueIR([{ kind: "text", lexeme: "pair" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
      },
    ]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const inner_foreach: FunctionIR = new FunctionIR("foreach");
  inner_foreach.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "x y" }]),
    new ValueIR([{ kind: "function-call", function: pair_call }]),
  );

  const format_call: FunctionIR = new FunctionIR("call");
  format_call.args.push(
    new ValueIR([{ kind: "text", lexeme: "format" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const outer_foreach: FunctionIR = new FunctionIR("foreach");
  outer_foreach.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "a b" }]),
    new ValueIR([{ kind: "function-call", function: format_call }]),
  );

  const value: ValueIR = new ValueIR([
    { kind: "function-call", function: outer_foreach },
  ]);
  const parent_context = new Env({} as CBuildOptions);
  parent_context.setVariable("item", SymbolTableVariable.rawVariable("parent"));
  const context = new Env({} as CBuildOptions);
  context.enclosing = parent_context;
  context.setVariable("1", SymbolTableVariable.rawVariable("global"));
  context.setVariable(
    "pair",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: ":" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "format",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        { kind: "text", lexeme: "[" },
        { kind: "function-call", function: inner_foreach },
        { kind: "text", lexeme: "]" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("a[a:x a:y]a b[b:x b:y]b");
  expect(context.getRawVariable("1")).toEqual("global");
  expect(context.hasVariable("2")).toEqual(false);
  expect(context.hasVariable("item")).toEqual(false);
  expect(parent_context.getRawVariable("item")).toEqual("parent");
});

test("direct deferred recursion is rejected", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("A"),
  );
});

test("indirect deferred recursion is rejected", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "B" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "B",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("A"),
  );
});

test("long deferred recursion is rejected", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "B" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "B",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "C" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "C",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "D" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "D",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("A"),
  );
});

test("computed variable names participate in recursive cycle detection", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("key", SymbolTableVariable.rawVariable("A"));
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([
            {
              kind: "variable-reference",
              nameExpr: new ValueIR([{ kind: "text", lexeme: "key" }]),
            },
          ]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("A"),
  );
});

test("function arguments participate in recursive cycle detection", () => {
  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([{ kind: "function-call", function: fn }]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("A"),
  );
});

test("repeated deferred dependencies do not produce false cycles", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "B" }]),
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("ROOT", SymbolTableVariable.rawVariable("x"));
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "ROOT" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "B",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("xxxxx");
  expect(engine.expand(value)).toEqual("xxxxx");
  context.setVariable("ROOT", SymbolTableVariable.rawVariable("y"));
  expect(engine.expand(value)).toEqual("yyyyy");
});

test("same engine can expand a failed variable after raw repair", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    RecursiveVariableExpansionException,
  );
  context.setVariable("A", SymbolTableVariable.rawVariable("fixed"));
  expect(engine.expand(value)).toEqual("fixed");
  expect(engine.expand(value)).toEqual("fixed");
});

test("same engine can expand a failed variable after deferred repair", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    RecursiveVariableExpansionException,
  );
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([{ kind: "text", lexeme: "fixed" }]),
    ),
  );
  expect(engine.expand(value)).toEqual("fixed");
  expect(engine.expand(value)).toEqual("fixed");
});

test("same engine can expand an indirect cycle after repairing its leaf", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "B" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "B",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    RecursiveVariableExpansionException,
  );
  context.setVariable("B", SymbolTableVariable.rawVariable("fixed"));
  expect(engine.expand(value)).toEqual("fixed");
});

test("active recursive lookups are empty after an expansion exception", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  const active_lookups = new Set<string>();
  const engine = new ValueExpansionEngine(context, active_lookups);
  expect(() => engine.expand(value)).toThrowError(
    RecursiveVariableExpansionException,
  );
  expect(active_lookups.size).toEqual(0);
});

test("function exceptions also clean up deferred lookup state", () => {
  const fn: FunctionIR = new FunctionIR("error");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "failed" }]));

  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([{ kind: "function-call", function: fn }]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError("failed");

  context.setVariable("A", SymbolTableVariable.rawVariable("fixed"));
  expect(engine.expand(value)).toEqual("fixed");
});

test("foreach restores its binding after a body exception", () => {
  const failure: FunctionIR = new FunctionIR("error");
  failure.args.push(new ValueIR([{ kind: "text", lexeme: "body failed" }]));

  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "a b" }]),
    new ValueIR([{ kind: "function-call", function: failure }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const original_item = SymbolTableVariable.rawVariable("saved");
  context.setVariable("item", original_item);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError("body failed");
  expect(context.getVariable("item")).toBe(original_item);
});

test("foreach removes its binding after a body exception", () => {
  const failure: FunctionIR = new FunctionIR("error");
  failure.args.push(new ValueIR([{ kind: "text", lexeme: "body failed" }]));

  const fn: FunctionIR = new FunctionIR("foreach");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "a b" }]),
    new ValueIR([{ kind: "function-call", function: failure }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);

  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError("body failed");
  expect(context.hasVariable("item")).toEqual(false);
  expect(context.variableCount).toEqual(0);
});

test("recipe normal variable expansion", () => {
  const recipe: RecipeIR = RecipeIR.command(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "RAW" }]),
      },
    ]),
  );
  const context = new Env({} as CBuildOptions);
  context.setVariable("RAW", SymbolTableVariable.rawVariable("hello"));
  const engine = new ExpansionEngine(context);
  expect(engine.expand(recipe)).toEqual("hello");
});

test("recipe deferred variable expansion", () => {
  const recipe: RecipeIR = RecipeIR.command(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "DEFERRED" }]),
      },
    ]),
  );
  const context = new Env({} as CBuildOptions);
  context.setVariable("BASE", SymbolTableVariable.rawVariable("hello"));
  context.setVariable(
    "DEFERRED",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "BASE" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(recipe)).toEqual("hello");
});

test("recipe automatic variable expansion", () => {
  const recipe: RecipeIR = RecipeIR.command(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "<" }]),
      },
    ]),
  );
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "<",
    SymbolTableVariable.rawVariable("main.c", "automatic"),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(recipe)).toEqual("main.c");
});

test("recipe function expansion", () => {
  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "  a\t b  " }]));

  const recipe: RecipeIR = RecipeIR.command(
    new ValueIR([{ kind: "function-call", function: fn }]),
  );
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(recipe)).toEqual("a b");
});

test("recipe preserves command whitespace around expansions", () => {
  const recipe: RecipeIR = RecipeIR.command(
    new ValueIR([
      { kind: "text", lexeme: " \t echo  " },
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "CONTENT" }]),
      },
      { kind: "text", lexeme: "\t\n  end \t" },
    ]),
  );
  const context = new Env({} as CBuildOptions);
  context.setVariable("CONTENT", SymbolTableVariable.rawVariable(" a\t b\n "));
  const engine = new ExpansionEngine(context);
  expect(engine.expand(recipe)).toEqual(" \t echo   a\t b\n \t\n  end \t");
});

test("compiled recipe combines variables, functions and escaped dollars", () => {
  const [rule] = compile(
    "all:\n\techo $(RAW) $(DEFERRED) $< $(strip a  b) $$HOME\n",
  );
  const recipe: RecipeIR = (rule as NormalRuleIR).recipes[0];
  const context = new Env({} as CBuildOptions);
  context.setVariable("RAW", SymbolTableVariable.rawVariable("raw"));
  context.setVariable("BASE", SymbolTableVariable.rawVariable("deferred"));
  context.setVariable(
    "DEFERRED",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "BASE" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "<",
    SymbolTableVariable.rawVariable("main.c", "automatic"),
  );
  context.setVariable("HOME", SymbolTableVariable.rawVariable("make-home"));
  const engine = new ExpansionEngine(context);
  expect(engine.expand(recipe)).toEqual("echo raw deferred main.c a b $HOME");
});

test("compiled recipe preserves interior and trailing command whitespace", () => {
  const [rule] = compile("all:\n\t  echo\t$(VALUE)  \n");
  const recipe: RecipeIR = (rule as NormalRuleIR).recipes[0];
  const context = new Env({} as CBuildOptions);
  context.setVariable("VALUE", SymbolTableVariable.rawVariable(" a\tb "));
  const engine = new ExpansionEngine(context);
  // The parser consumes indentation before the command.
  expect(engine.expand(recipe)).toEqual("echo\t a\tb   ");
});

test("empty function output expands to an empty string", () => {
  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("");
});

test("adjacent empty functions and references add no whitespace", () => {
  const fn: FunctionIR = new FunctionIR("strip");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: " \t\n " }]));

  const value: ValueIR = new ValueIR([
    { kind: "text", lexeme: "[" },
    { kind: "function-call", function: fn },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "missing" }]),
    },
    { kind: "function-call", function: fn },
    { kind: "text", lexeme: "]" },
  ]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("[]");
});

test("subst results containing variable syntax remain literal", () => {
  const fn: FunctionIR = new FunctionIR("subst");
  fn.args.push(
    new ValueIR([{ kind: "text", lexeme: "TOKEN" }]),
    new ValueIR([{ kind: "text", lexeme: "$(X)" }]),
    new ValueIR([{ kind: "text", lexeme: "TOKEN" }]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "LITERAL",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("$(X)");
  context.setVariable("X", SymbolTableVariable.rawVariable("changed"));
  expect(engine.expand(value)).toEqual("$(X)");
});

test("value results containing variable syntax remain literal", () => {
  const fn: FunctionIR = new FunctionIR("value");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "LITERAL" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  context.setVariable(
    "LITERAL",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "X" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("$(X)");
  context.setVariable("X", SymbolTableVariable.rawVariable("changed"));
  expect(engine.expand(value)).toEqual("$(X)");
});

test("shell results containing variable syntax remain literal", () => {
  const fn: FunctionIR = new FunctionIR("shell");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "command" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
  const engine = new ExpansionEngine(context);
  const run = vi.spyOn(ProcessRunner.prototype, "runSync").mockReturnValue({
    command: "command",
    exitCode: 0,
    signal: null,
    stdout: "$(X)\n",
    stderr: "",
  });
  try {
    expect(engine.expand(value)).toEqual("$(X)");
  } finally {
    run.mockRestore();
  }
});

test("file results containing variable syntax remain literal", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "cbuild-expansion-"));
  const filename = path.join(directory, "input.txt");
  try {
    writeFileSync(filename, "$(X)\n");
    const fn: FunctionIR = new FunctionIR("file");
    fn.args.push(new ValueIR([{ kind: "text", lexeme: "<" + filename }]));

    const value: ValueIR = new ValueIR([
      { kind: "function-call", function: fn },
    ]);
    const context = new Env({} as CBuildOptions);
    context.setVariable("X", SymbolTableVariable.rawVariable("expanded"));
    const engine = new ExpansionEngine(context);
    expect(engine.expand(value)).toEqual("$(X)");
  } finally {
    if (existsSync(filename)) unlinkSync(filename);
    rmdirSync(directory);
  }
});

test("file writes and appends expanded contents", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "cbuild-expansion-"));
  const filename = path.join(directory, "output.txt");
  try {
    const write: FunctionIR = new FunctionIR("file");
    write.args.push(
      new ValueIR([{ kind: "text", lexeme: ">" + filename }]),
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "CONTENT" }]),
        },
      ]),
    );

    const append: FunctionIR = new FunctionIR("file");
    append.args.push(
      new ValueIR([{ kind: "text", lexeme: ">>" + filename }]),
      new ValueIR([{ kind: "text", lexeme: "tail" }]),
    );

    const read: FunctionIR = new FunctionIR("file");
    read.args.push(new ValueIR([{ kind: "text", lexeme: "<" + filename }]));

    const context = new Env({} as CBuildOptions);
    context.setVariable("CONTENT", SymbolTableVariable.rawVariable("first"));
    const engine = new ExpansionEngine(context);
    expect(
      engine.expand(new ValueIR([{ kind: "function-call", function: write }])),
    ).toEqual("");
    expect(readFileSync(filename, "utf8")).toEqual("first\n");
    expect(
      engine.expand(new ValueIR([{ kind: "function-call", function: append }])),
    ).toEqual("");
    expect(
      engine.expand(new ValueIR([{ kind: "function-call", function: read }])),
    ).toEqual("first\ntail");
  } finally {
    if (existsSync(filename)) unlinkSync(filename);
    rmdirSync(directory);
  }
});

test("file write without a text argument creates an empty line", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "cbuild-expansion-"));
  const filename = path.join(directory, "output.txt");
  try {
    const fn: FunctionIR = new FunctionIR("file");
    fn.args.push(new ValueIR([{ kind: "text", lexeme: ">" + filename }]));

    const context = new Env({} as CBuildOptions);
    const engine = new ExpansionEngine(context);
    expect(
      engine.expand(new ValueIR([{ kind: "function-call", function: fn }])),
    ).toEqual("");
    expect(readFileSync(filename, "utf8")).toEqual("\n");
  } finally {
    if (existsSync(filename)) unlinkSync(filename);
    rmdirSync(directory);
  }
});

test('file rejects invalid operation ""', () => {
  const fn: FunctionIR = new FunctionIR("file");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
    }),
  );
});

test('file rejects invalid operation ">"', () => {
  const fn: FunctionIR = new FunctionIR("file");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: ">" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
    }),
  );
});

test('file rejects invalid operation ">>"', () => {
  const fn: FunctionIR = new FunctionIR("file");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: ">>" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
    }),
  );
});

test('file rejects invalid operation "<"', () => {
  const fn: FunctionIR = new FunctionIR("file");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "<" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
    }),
  );
});

test('file rejects invalid operation "invalid"', () => {
  const fn: FunctionIR = new FunctionIR("file");
  fn.args.push(new ValueIR([{ kind: "text", lexeme: "invalid" }]));

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(value)).toThrowError(
    expect.objectContaining({
      machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
    }),
  );
});

test("wildcard supports multiple whitespace separated patterns", () => {
  const fn: FunctionIR = new FunctionIR("wildcard");
  fn.args.push(
    new ValueIR([
      { kind: "text", lexeme: "src/compiler/ir.ts\tsrc/cbuild-backend/env.ts" },
    ]),
  );

  const value: ValueIR = new ValueIR([{ kind: "function-call", function: fn }]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_value = engine.expand<string>(value);
  expect(expanded_value.split(" ").sort()).toEqual(
    [
      path.join("src", "cbuild-backend", "env.ts"),
      path.join("src", "compiler", "ir.ts"),
    ].sort(),
  );
});

test("direct automatic variable expansion +D", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "+D" }]),
    },
  ]);

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("src lib src .");
});

test("direct automatic variable expansion +F", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "+F" }]),
    },
  ]);

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("main.o util.o main.o standalone.o");
});

test("direct automatic variable expansion ?D", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "?D" }]),
    },
  ]);

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("lib src");
});

test("direct automatic variable expansion ?F", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "?F" }]),
    },
  ]);

  const rule = new NormalRule({
    target: "build/app",
    prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    orderOnlyPrerequisites: ["cache", "generated", "cache"],
    shellCommands: [],
    recipeIRs: [],
    evaluatedRecipeIRs: [],
    ruleIR: new NormalRuleIR(),
    ruleSeperator: ":",
  });
  const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    (preqName) => ({
      preqName,
      vpathRules: [],
      origin: { type: "target-rule" },
    }),
  );
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "not-found" },
  };
  const parent_context = new Env({} as CBuildOptions);
  const context = new AutomaticVariableEnv(
    rule,
    parent_context,
    target,
    resolved_prequisites,
    order_only,
    {
      resolvedTarget: target,
      resolvedPreqs: resolved_prequisites,
      isTargetOutOfDate: true,
      outOfDatePreqs: [
        resolved_prequisites[1],
        resolved_prequisites[2],
        resolved_prequisites[1],
      ],
    },
  ).generate();

  const engine = new ExpansionEngine(context);
  expect(engine.expand(value)).toEqual("util.o main.o");
});

test("same engine can expand unrelated values after recursion fails", () => {
  const broken: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
    },
  ]);
  const safe: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "SAFE" }]),
    },
  ]);
  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "A",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "A" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "SAFE",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "ROOT" }]),
        },
      ]),
    ),
  );
  context.setVariable("ROOT", SymbolTableVariable.rawVariable("safe"));
  const engine = new ExpansionEngine(context);
  expect(() => engine.expand(broken)).toThrowError(
    RecursiveVariableExpansionException,
  );
  expect(engine.expand(safe)).toEqual("safe");
});
