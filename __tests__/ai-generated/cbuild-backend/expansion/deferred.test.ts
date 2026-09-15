import { describe, expect, test } from "vitest";
import { Env, Settings } from "@src/cbuild-backend/env.js";
import { Expansion, ExpansionEngine, RecursiveVariableExpansionException, ValueExpansionEngine, expandValue } from "@src/cbuild-backend/expansion.js";
import { ValueIR, type ValuePart, textPart, varRefPart } from "@src/compiler/ir.js";

const value = (...parts: (string | ValuePart)[]) => new ValueIR(parts.map(p => typeof p === "string" ? textPart(p) : p));
const ref = (name: string | ValueIR) => varRefPart(typeof name === "string" ? value(name) : name);
const env = () => new Env(new Settings(true, 1, ".", "cbuild", true));
function expectCycle(action: () => unknown, identifier: string) {
  let caught: unknown;
  try { action(); } catch (error) { caught = error; }
  expect(caught).toBeInstanceOf(RecursiveVariableExpansionException);
  expect(caught).toMatchObject({ name: "RecursiveVariableExpansionException", identifier, message: `Recursive variable expansion: ${identifier}` });
}

describe("deferred values", () => {
  test.each(["", "literal", "$(NOT_REPARSED)", "\n  Türkçe"])("expands deferred literal %j without caching", literal => {
    const context = env();
    const deferred = value(literal);
    context.setDeferredVariable("A", deferred);
    const symbol = context.requireVariable("A");
    expect(expandValue(value(ref("A")), context)).toBe(literal);
    expect(context.requireVariable("A")).toBe(symbol);
    expect(symbol.getDeferredValue()).toBe(deferred);
    expect(symbol.getRawValue()).toBeNull();
    expect(symbol.isDeferred()).toBe(true);
  });

  test("fresh expansions see dependencies replaced, removed and redefined", () => {
    const context = env();
    context.setDeferredVariable("A", value("[", ref("B"), "]"));
    const input = value(ref("A"));
    expect(expandValue(input, context)).toBe("[]");
    context.setRawVariable("B", "one");
    expect(expandValue(input, context)).toBe("[one]");
    context.setRawVariable("B", "two");
    expect(new Expansion().expandValue(input, context)).toBe("[two]");
    context.deleteVariable("B");
    expect(expandValue(input, context)).toBe("[]");
  });

  test("expands a long acyclic chain without altering deferred symbols", () => {
    const context = env();
    context.setRawVariable("N100", "end");
    for (let i = 99; i >= 0; i--) context.setDeferredVariable(`N${i}`, value("x", ref(`N${i + 1}`)));
    expect(expandValue(value(ref("N0")), context)).toBe("x".repeat(100) + "end");
    for (let i = 0; i < 100; i++) expect(context.requireVariable(`N${i}`).isDeferred()).toBe(true);
  });

  test("deferred values can compute a variable name", () => {
    const context = env();
    context.setRawVariable("SUFFIX", "64");
    context.setDeferredVariable("KEY", value("tool", ref("SUFFIX")));
    context.setRawVariable("tool64", "clang");
    expect(expandValue(value(ref(value(ref("KEY")))), context)).toBe("clang");
  });

  test.each([1, 2, 4])("reports the repeated identifier for a cycle of length %i", length => {
    const context = env();
    for (let i = 0; i < length; i++) context.setDeferredVariable(`N${i}`, value(ref(`N${(i + 1) % length}`)));
    expectCycle(() => expandValue(value(ref("N0")), context), "N0");
  });

  test("detects cycles reached through a computed name", () => {
    const context = env();
    context.setRawVariable("KEY", "A");
    context.setDeferredVariable("A", value(ref(value(ref("KEY")))));
    expectCycle(() => expandValue(value(ref("A")), context), "A");
  });
});

// Characterization of current behavior, including known lookup-state limitations.
// A deliberate backend fix should update these expectations explicitly.
describe("current retained lookup state", () => {
  test("two references to the same deferred variable in one value throw", () => {
    const context = env();
    context.setDeferredVariable("A", value("ok"));
    expectCycle(() => expandValue(value(ref("A"), ref("A")), context), "A");
  });

  test("a diamond dependency throws at the shared deferred leaf", () => {
    const context = env();
    context.setDeferredVariable("LEAF", value("ok"));
    context.setDeferredVariable("LEFT", value(ref("LEAF")));
    context.setDeferredVariable("RIGHT", value(ref("LEAF")));
    expectCycle(() => expandValue(value(ref("LEFT"), ref("RIGHT")), context), "LEAF");
  });

  test.each(["value", "facade"])("reusing the %s engine retains successful lookups", kind => {
    const context = env();
    context.setDeferredVariable("A", value("ok"));
    const engine = kind === "value" ? new ValueExpansionEngine(context) : new ExpansionEngine(context);
    expect(engine.expand(value(ref("A")))).toBe("ok");
    expectCycle(() => engine.expand(value(ref("A"))), "A");
  });

  test("clearing lookups allows reevaluation with changed dependencies", () => {
    const context = env();
    context.setRawVariable("B", "before");
    context.setDeferredVariable("A", value(ref("B")));
    const engine = new ValueExpansionEngine(context);
    expect(engine.expand(ref("A"))).toBe("before");
    context.setRawVariable("B", "after");
    engine.clearActiveLookups();
    expect(engine.expand(ref("A"))).toBe("after");
  });

  test("failed lookups stay active until explicitly cleared, even after repair", () => {
    const context = env();
    context.setDeferredVariable("A", value(ref("A")));
    const engine = new ValueExpansionEngine(context);
    expectCycle(() => engine.expand(ref("A")), "A");
    context.setRawVariable("A", "repaired");
    expectCycle(() => engine.expand(ref("A")), "A");
    expect(engine.expand(value("unrelated"))).toBe("unrelated");
    engine.clearActiveLookups();
    expect(engine.expand(ref("A"))).toBe("repaired");
  });

  test("missing and raw references do not retain lookup state", () => {
    const context = env();
    const engine = new ValueExpansionEngine(context);
    expect(engine.expand(ref("A"))).toBe("");
    context.setRawVariable("A", "raw");
    expect(engine.expand(ref("A"))).toBe("raw");
    context.setDeferredVariable("A", value("deferred"));
    expect(engine.expand(ref("A"))).toBe("deferred");
  });
});
