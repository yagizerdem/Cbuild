import { describe, expect, test } from "vitest";
import { Env, Settings } from "@src/cbuild-backend/env.js";
import {
  BaseExpansionEngine,
  Expansion,
  ExpansionEngine,
  RecipeExpansionEngine,
  RecursiveVariableExpansionException,
  ValueExpansionEngine,
  expandRecipe,
  expandValue,
} from "@src/cbuild-backend/expansion.js";
import {
  AssignmentIR,
  AssignmentType,
  ConditionalIR,
  ConditionKind,
  DefineIR,
  FunctionIR,
  HookIR,
  IncludeIR,
  NormalRuleIR,
  RecipeIR,
  StaticPatternRuleIR,
  TargetRuleIR,
  ValueIR,
  VpathIR,
  textPart,
  varRefPart,
} from "@src/compiler/ir.js";
import { compile } from "@tests/util/compile.js";

const literal = (text: string) => new ValueIR([textPart(text)]);
const reference = (name: string) => new ValueIR([varRefPart(literal(name))]);
const env = () => new Env(new Settings(true, 1, ".", "cbuild", true));

describe("command recipes", () => {
  test.each([
    "",
    "echo hello",
    "  @-echo 'a b' | cat > out && echo $$HOME\n",
    "echo $(LITERAL)",
  ])("preserves command text %j", (command) => {
    expect(expandRecipe(RecipeIR.command(literal(command)), env())).toBe(
      command,
    );
  });

  test("interpolates raw, deferred and missing variables without quoting", () => {
    const context = env();
    context.setRawVariable("CC", "clang");
    context.setDeferredVariable("FLAGS", literal("-O2 -g"));
    const command = new ValueIR([
      varRefPart(literal("CC")),
      textPart(" "),
      varRefPart(literal("FLAGS")),
      textPart(" "),
      varRefPart(literal("MISSING")),
      textPart("a.c"),
    ]);
    expect(expandRecipe(RecipeIR.command(command), context)).toBe(
      "clang -O2 -g a.c",
    );
    expect(context.requireVariable("FLAGS").isDeferred()).toBe(true);
    expect(context.hasVariable("MISSING")).toBe(false);
  });

  test.each(["helper", "recipe engine", "facade"])(
    "%s starts fresh lookup state for every recipe",
    (entry) => {
      const context = env();
      context.setDeferredVariable("A", reference("B"));
      context.setRawVariable("B", "first");
      const recipe = RecipeIR.command(reference("A"));
      const engine = new RecipeExpansionEngine(context);
      const facade = new ExpansionEngine(context);
      const run = () =>
        entry === "helper"
          ? expandRecipe(recipe, context)
          : entry === "recipe engine"
            ? engine.exec(recipe)
            : facade.expand(recipe);
      expect(run()).toBe("first");
      context.setRawVariable("B", "second");
      expect(run()).toBe("second");
    },
  );

  test("recipe expansion remains independent of facade value lookup state", () => {
    const context = env();
    context.setDeferredVariable("A", literal("ok"));
    const engine = new ExpansionEngine(context);
    expect(engine.expand(reference("A"))).toBe("ok");
    expect(engine.expand(RecipeIR.command(reference("A")))).toBe("ok");
    expect(() => engine.expand(reference("A"))).toThrow(
      RecursiveVariableExpansionException,
    );
  });

  test("repeated deferred references within one recipe currently throw", () => {
    const context = env();
    context.setDeferredVariable("A", literal("ok"));
    const command = new ValueIR([
      ...reference("A").parts,
      ...reference("A").parts,
    ]);
    expect(() => expandRecipe(RecipeIR.command(command), context)).toThrow(
      "Recursive variable expansion: A",
    );
  });

  test.each([
    ["comment", RecipeIR.comment("ignored?")],
    ["empty line", RecipeIR.emptyLine()],
    [
      "conditional",
      RecipeIR.conditional(
        new ConditionalIR(ConditionKind.IFDEF, { left: literal("A") }),
      ),
    ],
  ] as const)("rejects %s recipes", (_name, recipe) => {
    const context = env();
    const message = "RecipeIR only support command recipes for cbuild backend";
    expect(() => expandRecipe(recipe, context)).toThrow(message);
    expect(() => new ExpansionEngine(context).expand(recipe)).toThrow(message);
  });
});

describe("public entry points", () => {
  test("value dispatch, IR execution, helpers and standalone parts agree", async () => {
    const context = env();
    context.setRawVariable("A", "answer");
    const input = reference("A");
    const engine = new ExpansionEngine(context);
    const values = new ValueExpansionEngine(context);
    expect(engine.expand(input)).toBe("answer");
    expect(engine.expand(input.parts[0]!)).toBe("answer");
    expect(engine.expand(textPart("text"))).toBe("text");
    expect(values.expand(textPart("text"))).toBe("text");
    expect(input.exec(engine)).toBe("answer");
    expect(input.exec(values)).toBe("answer");
    expect(expandValue(input, context)).toBe("answer");
    expect(new Expansion().expandValue(input, context)).toBe("answer");
    await expect(input.execAsync(engine)).resolves.toBe("answer");
    await expect(input.execAsync(values)).resolves.toBe("answer");
  });

  test("recipe sync and async execution agree", async () => {
    const context = env();
    const recipe = RecipeIR.command(literal("echo hello"));
    expect(recipe.exec(new ExpansionEngine(context))).toBe("echo hello");
    await expect(recipe.execAsync(new ExpansionEngine(context))).resolves.toBe(
      "echo hello",
    );
    await expect(
      recipe.execAsync(new RecipeExpansionEngine(context)),
    ).resolves.toBe("echo hello");
  });

  test("async entry points currently throw expansion errors synchronously", () => {
    const context = env();
    context.setDeferredVariable("A", reference("A"));
    expect(() =>
      reference("A").execAsync(new ValueExpansionEngine(context)),
    ).toThrow(RecursiveVariableExpansionException);
    expect(() =>
      reference("A").execAsync(new ExpansionEngine(context)),
    ).toThrow(RecursiveVariableExpansionException);
    expect(() =>
      RecipeIR.command(reference("A")).execAsync(
        new RecipeExpansionEngine(context),
      ),
    ).toThrow(RecursiveVariableExpansionException);
  });

  test.each([
    [
      "assignment",
      new AssignmentIR(AssignmentType.SIMPLE, literal("A"), literal("B")),
    ],
    ["function", new FunctionIR("shell")],
    [
      "conditional",
      new ConditionalIR(ConditionKind.IFDEF, { left: new ValueIR() }),
    ],
    ["normal rule", new NormalRuleIR()],
    ["target rule", new TargetRuleIR()],
    ["static pattern rule", new StaticPatternRuleIR()],
    ["define", new DefineIR()],
    ["include", IncludeIR.include(literal("file"))],
    ["vpath", VpathIR.clearAll()],
    ["hook", new HookIR("print('hello')")],
  ] as const)(
    "rejects unsupported %s IR without changing the environment",
    (_name, input) => {
      const context = env();
      const engine = new ExpansionEngine(context);
      expect(() => input.exec(engine)).toThrow(
        "Unsupported IR node for expansion",
      );
      expect(() => input.execAsync(engine)).toThrow(
        "Unsupported IR node for expansion",
      );
      expect(context.variableCount).toBe(0);
    },
  );

  test("base executor returns null synchronously and asynchronously", async () => {
    const engine = new BaseExpansionEngine();
    const input = literal("unused");
    expect(input.exec(engine)).toBeNull();
    await expect(input.execAsync(engine)).resolves.toBeNull();
  });

  test("Expansion.expand discards results for a single node or an array", () => {
    const context = env();
    const expansion = new Expansion();
    expect(expansion.expand(literal("one"), context)).toBeUndefined();
    expect(expansion.expand([], context)).toBeUndefined();
    expect(
      expansion.expand(
        [literal("one"), RecipeIR.command(literal("two"))],
        context,
      ),
    ).toBeUndefined();
  });

  test("Expansion.expand shares value lookup state within a batch but not across calls", () => {
    const context = env();
    context.setDeferredVariable("A", literal("ok"));
    const expansion = new Expansion();
    expect(() =>
      expansion.expand([reference("A"), reference("A")], context),
    ).toThrow("Recursive variable expansion: A");
    expect(() => expansion.expand(reference("A"), context)).not.toThrow();
    expect(() => expansion.expand(reference("A"), context)).not.toThrow();
    expect(() =>
      expansion.expand(
        [RecipeIR.command(reference("A")), RecipeIR.command(reference("A"))],
        context,
      ),
    ).not.toThrow();
  });
});

describe("compiled source to expansion", () => {
  test.each([
    ["hello", "hello"],
    ["$(NAME)", "world"],
    ["${NAME}", "world"],
    ["before$(MISSING)after", "beforeafter"],
    ["$($(KEY))", "world"],
  ])("expands compiled assignment RHS %s", (source, expected) => {
    const context = env();
    context.setRawVariable("NAME", "world");
    context.setRawVariable("KEY", "NAME");
    const program = compile(`RESULT = ${source}\n`);
    expect(program).toHaveLength(1);
    expect(program[0]).toBeInstanceOf(AssignmentIR);
    const assignment = program[0] as AssignmentIR;
    expect(assignment.right).toBeInstanceOf(ValueIR);
    expect(expandValue(assignment.right!, context)).toBe(expected);
  });

  test.each([
    ['echo "$(NAME)"', 'echo "$(NAME)"'],
    ["echo $(NAME)", "echo world"],
    ["echo ${NAME}", "echo world"],
  ])("characterizes compiled command expansion: %s", (command, expected) => {
    const context = env();
    context.setRawVariable("NAME", "world");
    const program = compile(`hello:\n\t${command}\n`);
    expect(program).toHaveLength(1);
    expect(program[0]).toBeInstanceOf(NormalRuleIR);
    const rule = program[0] as NormalRuleIR;
    expect(rule.recipes).toHaveLength(1);
    expect(expandRecipe(rule.recipes[0]!, context)).toBe(expected);
  });
});
