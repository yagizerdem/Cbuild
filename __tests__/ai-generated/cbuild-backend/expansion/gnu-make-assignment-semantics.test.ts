import { describe, expect, test } from "vitest";
import { compile } from "@tests/util/compile.js";
import { Env, Settings } from "@src/cbuild-backend/env.js";
import firstPass from "@src/cbuild-backend/first-pass.js";
import { expandValue, RecursiveVariableExpansionException } from "@src/cbuild-backend/expansion.js";
import { AssignmentIR, AssignmentType, ValueIR, textPart, varRefPart } from "@src/compiler/ir.js";

// Normative GNU Make tests, NOT snapshots of current cbuild behavior.
// Only '=' and ':=' assignments; no functions, shell commands or other operators.
// https://www.gnu.org/software/make/manual/html_node/Recursive-Assignment.html
// https://www.gnu.org/software/make/manual/html_node/Simple-Assignment.html
// Known incompatibilities intentionally fail ordinary tests (no skip/test.fails).
async function evaluate(source: string): Promise<Env> {
  const program = compile(source + "\n");
  expect(program.length).toBeGreaterThan(0);
  for (const node of program) {
    expect(node).toBeInstanceOf(AssignmentIR);
    expect([AssignmentType.RECURSIVE, AssignmentType.SIMPLE]).toContain((node as AssignmentIR).type);
  }
  const context = new Env(new Settings(true, 1, ".", "cbuild", true));
  await firstPass(program, context);
  return context;
}

// The output probe adds no assignment and therefore does not change evaluation timing.
function read(context: Env, name: string): string {
  return expandValue(new ValueIR([varRefPart(new ValueIR([textPart(name)]))]), context);
}

describe("GNU Make assignment timing and redefinition", () => {
  test.each([
    { name: "recursive forward reference", source: "RESULT = $(LATER)\nLATER = ready", expected: "ready" },
    { name: "simple forward reference is empty", source: "RESULT := $(LATER)\nLATER = ready", expected: "" },
    { name: "recursive sees final value", source: "BASE = old\nRESULT = $(BASE)\nBASE = new", expected: "new" },
    { name: "simple captures value at assignment", source: "BASE = old\nRESULT := $(BASE)\nBASE = new", expected: "old" },
    { name: "recursive forward chain", source: "RESULT = $(A)\nA = $(B)\nB = end", expected: "end" },
    { name: "simple freezes a recursive dependency", source: "BASE = old\nALIAS = $(BASE)\nRESULT := $(ALIAS)\nBASE = new", expected: "old" },
    { name: "recursive uses a simple dependency unchanged", source: "BASE = old\nSNAP := $(BASE)\nBASE = new\nRESULT = $(SNAP)", expected: "old" },
    { name: "simple freezes an unresolved recursive dependency", source: "ALIAS = $(LATER)\nRESULT := $(ALIAS)\nLATER = new", expected: "" },
    { name: "recursive to simple replacement", source: "BASE = old\nRESULT = $(BASE)\nRESULT := frozen\nBASE = new", expected: "frozen" },
    { name: "simple to recursive replacement", source: "BASE = old\nRESULT := $(BASE)\nRESULT = $(BASE)\nBASE = new", expected: "new" },
    { name: "last recursive assignment wins", source: "RESULT = first\nRESULT = last", expected: "last" },
    { name: "last simple assignment wins", source: "RESULT := first\nRESULT := last", expected: "last" },
    { name: "simple self-extension uses previous raw value", source: "RESULT := first\nRESULT := $(RESULT) second", expected: "first second" },
    { name: "simple self-extension uses previous recursive value", source: "BASE = first\nRESULT = $(BASE)\nRESULT := $(RESULT) second\nBASE = changed", expected: "first second" },
    { name: "simple undefined self-reference is empty", source: "RESULT := $(RESULT)end", expected: "end" },
    { name: "several simple self-extensions", source: "RESULT := a\nRESULT := $(RESULT)b\nRESULT := $(RESULT)c", expected: "abc" },
    { name: "unused recursive cycle is harmless", source: "LOOP = $(LOOP)\nRESULT := safe", expected: "safe" },
    { name: "overwriting a cycle before use repairs it", source: "RESULT = $(RESULT)\nRESULT = repaired", expected: "repaired" },
    { name: "empty recursive assignment replaces old value", source: "RESULT = old\nRESULT =", expected: "" },
    { name: "empty simple assignment replaces old value", source: "RESULT = old\nRESULT :=", expected: "" },
    { name: "undefined references disappear in recursive values", source: "RESULT = a$(MISSING)b", expected: "ab" },
    { name: "undefined references disappear in simple values", source: "RESULT := a$(MISSING)b", expected: "ab" },
  ])("$name", async ({ source, expected }) => {
    const context = await evaluate(source);
    expect(context.hasVariable("RESULT")).toBe(true);
    expect(read(context, "RESULT")).toBe(expected);
  });

  test("recursive is reevaluated while simple stays frozen across assignments", async () => {
    const context = await evaluate("BASE = old\nLIVE = $(BASE)\nFROZEN := $(BASE)");
    expect(read(context, "LIVE")).toBe("old");
    expect(read(context, "FROZEN")).toBe("old");
    await firstPass(compile("BASE = new\n"), context);
    expect(read(context, "LIVE")).toBe("new");
    expect(read(context, "FROZEN")).toBe("old");
  });
});

describe("GNU Make repeated expansion is not recursion", () => {
  test.each([
    { name: "same recursive variable twice", source: "A = ok\nRESULT = $(A)$(A)", expected: "okok" },
    { name: "same recursive variable twice in simple RHS", source: "A = ok\nRESULT := $(A)$(A)", expected: "okok" },
    { name: "same simple variable twice", source: "A := ok\nRESULT = $(A)$(A)", expected: "okok" },
    { name: "empty recursive variable twice", source: "A =\nRESULT = x$(A)y$(A)z", expected: "xyz" },
    { name: "diamond sharing a recursive leaf", source: "LEAF = x\nLEFT = L$(LEAF)\nRIGHT = R$(LEAF)\nRESULT = $(LEFT)-$(RIGHT)", expected: "Lx-Rx" },
    { name: "diamond sharing a simple leaf", source: "LEAF := x\nLEFT = L$(LEAF)\nRIGHT = R$(LEAF)\nRESULT = $(LEFT)-$(RIGHT)", expected: "Lx-Rx" },
    { name: "recursive variable reused across simple assignments", source: "A = x\nFIRST := $(A)\nSECOND := $(A)\nRESULT := $(FIRST)$(SECOND)", expected: "xx" },
    { name: "recursive dependency reevaluated after replacement", source: "BASE = old\nALIAS = $(BASE)\nFIRST := $(ALIAS)\nBASE = new\nSECOND := $(ALIAS)\nRESULT := $(FIRST)/$(SECOND)", expected: "old/new" },
  ])("$name", async ({ source, expected }) => {
    expect(read(await evaluate(source), "RESULT")).toBe(expected);
  });
});

describe("GNU Make actual recursion errors and their timing", () => {
  test.each([
    ["direct", "RESULT = $(RESULT)"],
    ["mutual", "RESULT = $(A)\nA = $(RESULT)"],
    ["longer", "RESULT = $(A)\nA = $(B)\nB = $(RESULT)"],
    ["self-append using equals", "RESULT = old\nRESULT = $(RESULT) more"],
  ])("%s cycle is accepted at definition and rejected on use", async (_name, source) => {
    const context = await evaluate(source);
    expect(() => read(context, "RESULT")).toThrow(RecursiveVariableExpansionException);
  });

  test("simple assignment forces a recursive cycle immediately", async () => {
    // Parse separately so a syntax error cannot masquerade as a recursion failure.
    const program = compile("LOOP = $(LOOP)\nRESULT := $(LOOP)\n");
    const context = new Env(new Settings(true, 1, ".", "cbuild", true));
    await expect(firstPass(program, context)).rejects.toBeInstanceOf(RecursiveVariableExpansionException);
  });

  test("a simple assignment can break a formerly mutual dependency", async () => {
    const context = await evaluate("A = $(B)\nB = $(A)\nB := fixed\nRESULT = $(A)");
    expect(read(context, "RESULT")).toBe("fixed");
  });
});
