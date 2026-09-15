import { describe, expect, test } from "vitest";
import { Env, Settings } from "@src/cbuild-backend/env.js";
import { ExpansionEngine, ValueExpansionEngine, expandValue } from "@src/cbuild-backend/expansion.js";
import { FunctionIR, ValueIR, type ValuePart, functionCallPart, textPart, varRefPart } from "@src/compiler/ir.js";

const value = (...parts: (string | ValuePart)[]) => new ValueIR(parts.map(p => typeof p === "string" ? textPart(p) : p));
const ref = (name: string | ValueIR) => varRefPart(typeof name === "string" ? value(name) : name);
const env = () => new Env(new Settings(true, 1, ".", "cbuild", true));

describe("literal and raw variable expansion", () => {
  test.each(["", "plain", "  leading and trailing  ", "\t\r\n", "Türkçe 🛠", "$(NAME) ${NAME} $$ $@", "'quoted' \\\path ; & | > #"])("preserves literal %j exactly", text => {
    expect(expandValue(value(text), env())).toBe(text);
  });

  test("empty IR and adjacent parts do not introduce separators", () => {
    expect(expandValue(value(), env())).toBe("");
    expect(expandValue(value("a", "", "b", " ", "c"), env())).toBe("ab c");
  });

  test.each(["", "0", "false", "  x\n", "$(OTHER)", "${OTHER}", "$$", "a;b && c"])("inserts raw value %j without reparsing or escaping", raw => {
    const context = env();
    context.setRawVariable("RAW", raw);
    context.setRawVariable("OTHER", "expanded");
    expect(expandValue(value("<", ref("RAW"), ">", ref("RAW")), context)).toBe(`<${raw}>${raw}`);
  });

  test("missing references disappear without defining variables", () => {
    const context = env();
    expect(expandValue(value("a", ref("MISSING"), "b", ref("MISSING")), context)).toBe("ab");
    expect(context.variableCount).toBe(0);
  });

  test("lookup is case-sensitive and does not trim names", () => {
    const context = env();
    context.setRawVariable("A", "upper");
    context.setRawVariable("a", "lower");
    context.setRawVariable(" A ", "spaced");
    expect(expandValue(value(ref("A"), "/", ref("a"), "/", ref(" A "), "/", ref("A ")), context)).toBe("upper/lower/spaced/");
  });

  test("a reused engine observes raw replacement, deletion and definition", () => {
    const context = env();
    const engine = new ExpansionEngine(context);
    const input = value(ref("A"));
    expect(engine.expand(input)).toBe("");
    context.setRawVariable("A", "one");
    expect(engine.expand(input)).toBe("one");
    context.setRawVariable("A", "two");
    expect(engine.expand(input)).toBe("two");
    context.deleteVariable("A");
    expect(engine.expand(input)).toBe("");
  });

  test("expansion leaves the input and symbol objects unchanged", () => {
    const context = env();
    context.setRawVariable("A", "answer");
    const input = value("[", ref("A"), "]");
    const before = JSON.stringify(input);
    const symbol = context.requireVariable("A");
    expect(expandValue(input, context)).toBe("[answer]");
    expect(JSON.stringify(input)).toBe(before);
    expect(context.requireVariable("A")).toBe(symbol);
    expect(context.variableCount).toBe(1);
  });
});

describe("computed reference names", () => {
  test("combines literal prefixes, multiple references and suffixes", () => {
    const context = env();
    context.setRawVariable("OS", "win");
    context.setRawVariable("ARCH", "64");
    context.setRawVariable("tool_win_64_path", "clang.exe");
    expect(expandValue(value(ref(value("tool_", ref("OS"), "_", ref("ARCH"), "_path"))), context)).toBe("clang.exe");
  });

  test("resolves several levels of nested name indirection", () => {
    const context = env();
    context.setRawVariable("first", "second");
    context.setRawVariable("second", "third");
    context.setRawVariable("third", "result");
    expect(expandValue(value(ref(value(ref(value(ref("first")))))), context)).toBe("result");
  });

  test("missing name components are empty and the remaining name is looked up", () => {
    const context = env();
    context.setRawVariable("prefix_suffix", "found");
    expect(expandValue(value(ref(value("prefix_", ref("missing"), "suffix"))), context)).toBe("found");
    expect(expandValue(value(ref(value()), ref(value(ref("missing")))) , context)).toBe("");
  });

  test("raw self-reference text is literal, not a recursion", () => {
    const context = env();
    context.setRawVariable("A", "$(A)");
    expect(expandValue(value(ref("A")), context)).toBe("$(A)");
  });
});

describe("current function-part behavior", () => {
  test("embedded function calls are skipped in values and computed names", () => {
    const context = env();
    const call = functionCallPart(new FunctionIR("unsupported"));
    context.setRawVariable("AB", "found");
    expect(expandValue(value("a", call, "b"), context)).toBe("ab");
    expect(expandValue(value(call), context)).toBe("");
    expect(expandValue(value(ref(value("A", call, "B"))), context)).toBe("found");
  });

  test("standalone function parts are rejected by both engines", () => {
    const call = functionCallPart(new FunctionIR("unsupported"));
    expect(() => new ExpansionEngine(env()).expand(call)).toThrow("Unsupported IR node for expansion");
    expect(() => new ValueExpansionEngine(env()).expand(call)).toThrow("Unsupported IR node or ValuePart for cbuild backend");
  });
});
