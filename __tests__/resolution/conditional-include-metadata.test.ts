import { afterEach, describe, expect, test, vi } from "vitest";
import { frontend } from "@src/frontend.js";
import BuildFileEvaluator from "@src/cbuild-backend/evaluator/core/buildfile-evaluator.js";
import { NormalRule } from "@src/cbuild-backend/model.js";
import { ErrorType, MachineCode } from "@src/cbuild-exception.js";
import {
  cleanupFixtures,
  commands,
  environment,
  evaluate,
  expand,
  fixture,
  value,
} from "./helpers.js";
import { ValueExpansionEngine } from "@src/cbuild-backend/expansion.js";

afterEach(cleanupFixtures);

describe("conditional assignment and recipe selection", () => {
  test.each([
    ["ifeq ($(MODE),debug)", "debug", "then"],
    ["ifeq ($(MODE),debug)", "release", "else"],
    ["ifneq ($(MODE),debug)", "release", "then"],
    ["ifneq ($(MODE),debug)", "debug", "else"],
    ["ifdef MODE", "defined", "then"],
    ["ifdef MODE", "", "else"],
    ["ifndef MODE", "", "then"],
    ["ifndef MODE", "defined", "else"],
  ])(
    "%s with MODE='%s' selects the expected branch",
    async (condition, mode, expected) => {
      const { env } = await evaluate(
        `MODE =${mode ? ` ${mode}` : ""}\n${condition}\nRESULT := then\nelse\nRESULT := else\nendif\n`,
      );
      expect(expand("$(RESULT)", env)).toBe(expected);
      expect(env.variableCount).toBe(2);
    },
  );

  test("nested conditionals evaluate only the selected assignments", async () => {
    const { env } = await evaluate(
      "MODE = debug\nifeq ($(MODE),debug)\nifdef MODE\nRESULT := selected\nelse\nRESULT := $(error inner-inactive)\nendif\nelse\nRESULT := $(error outer-inactive)\nendif\n",
    );
    expect(expand("$(RESULT)", env)).toBe("selected");
  });

  test("a missing else branch performs no assignment", async () => {
    const { env } = await evaluate("ifeq (no,yes)\nUNUSED := bad\nendif\n");
    expect(env.variableCount).toBe(0);
  });

  test.each(["debug", "release"])(
    "conditional recipe selects the %s command",
    async (mode) => {
      const { env, rules } = await evaluate(
        `MODE = ${mode}\nall:\nifeq ($(MODE),debug)\n\techo debug\nelse\n\techo release\nendif\n`,
      );
      expect(commands(rules[0]!, env)).toEqual([`echo ${mode}`]);
      expect(rules[0]!.evaluatedRecipeIRs).toHaveLength(1);
    },
  );

  test("conditional recipe selection precedes later variable reassignment", async () => {
    const { env, rules } = await evaluate(
      "MODE = debug\nall:\nifeq ($(MODE),debug)\n\techo selected $(MODE)\nelse\n\techo wrong\nendif\nMODE = release\n",
    );
    expect(commands(rules[0]!, env)).toEqual(["echo selected release"]);
  });

  test("nested recipe conditionals resolve to flat command recipes", async () => {
    const { env, rules } = await evaluate(
      "MODE = yes\nall:\nifdef MODE\nifeq ($(MODE),yes)\n\techo nested\nelse\n\techo wrong\nendif\nelse\n\techo wrong-outer\nendif\n",
    );
    expect(commands(rules[0]!, env)).toEqual(["echo nested"]);
    expect(
      rules[0]!.evaluatedRecipeIRs.every((ir) => ir.recipe.kind === "command"),
    ).toBe(true);
  });

  test("undefined lookup warning uses the computed symbol name", async () => {
    const env = environment({ warnUndefinedVariables: true });
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    await evaluate("KEY = ABSENT\nRESULT := before[$($(KEY))]after\n", env);
    expect(expand("$(RESULT)", env)).toBe("before[]after");
    expect(warning.mock.calls).toEqual([
      ["cbuild: warning: undefined variable 'ABSENT'"],
    ]);
    expect(env.hasVariable("ABSENT")).toBe(false);
  });

  test("successful and failed expansions preserve existing symbol-table identities", async () => {
    const { env } = await evaluate(
      "A = value\nB = $(A)\nBAD = $(error expansion-failed)\n",
    );
    const before = [...env.variableEntries()];
    const engine = new ValueExpansionEngine(env);
    expect(engine.expand(value("$(B)"))).toBe("value");
    expect(() => engine.expand(value("$(BAD)"))).toThrow(
      expect.objectContaining({ machineCode: MachineCode.ERROR_FN }),
    );
    expect([...env.variableEntries()]).toEqual(before);
    for (const [name, symbol] of before)
      expect(env.requireVariable(name)).toBe(symbol);
  });
});

describe("include lookup and build-file metadata", () => {
  test.each(["-include", "sinclude"])(
    "%s ignores a missing include and continues assignments",
    async (directive) => {
      const disk = fixture();
      disk.useAsCwd();
      const { env } = await evaluate(
        `${directive} missing.mk\nRESULT := continued\n`,
      );
      expect(env.requireRawVariable("RESULT")).toBe("continued");
    },
  );

  test("mandatory missing include rejects with its process machine code", async () => {
    const disk = fixture();
    disk.useAsCwd();
    await expect(evaluate("include missing.mk\n")).rejects.toMatchObject({
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.INCLUDE_FILE_NOT_FOUND,
    });
  });

  test("include path expansion loads assignments into the same symbol table", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("settings.mk", "VALUE = from-include\n");
    const { env } = await evaluate(
      "FILE = settings.mk\ninclude $(FILE)\nRESULT := $(VALUE)\n",
    );
    expect(env.requireRawVariable("RESULT")).toBe("from-include");
    expect(env.requireVariable("VALUE").origin).toBe("file");
  });

  test("cwd include takes precedence over an includeDir file with the same name", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("settings.mk", "VALUE = local\n");
    disk.write("includes/settings.mk", "VALUE = search-dir\n");
    const { env } = await evaluate(
      "include settings.mk\n",
      environment({ includeDir: ["includes"] }),
    );
    expect(expand("$(VALUE)", env)).toBe("local");
  });

  test("includeDir search finds an include absent from cwd", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("includes/settings.mk", "VALUE = search-dir\n");
    const { env } = await evaluate(
      "include settings.mk\n",
      environment({ includeDir: ["missing", "includes"] }),
    );
    expect(expand("$(VALUE)", env)).toBe("search-dir");
  });

  test("multiple expanded include paths apply assignments in listed order", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("first.mk", "VALUE = first\n");
    disk.write("second.mk", "VALUE = second\n");
    const { env } = await evaluate(
      "FILES = first.mk second.mk\ninclude $(FILES)\n",
    );
    expect(expand("$(VALUE)", env)).toBe("second");
  });

  test("frontend metadata is retained by the resolved rule IR", async () => {
    const disk = fixture();
    const rawContent = "NAME = generated\n$(NAME): source\n\techo $(NAME)\n";
    const meta = {
      name: "Buildfile",
      relativePath: "Buildfile",
      absolutePath: disk.path("Buildfile"),
      size: Buffer.byteLength(rawContent),
      rawContent,
    };
    const irs = frontend(meta);
    expect(irs.every((ir) => ir.buildFileMeta === meta)).toBe(true);
    const models = await new BuildFileEvaluator(environment(), irs, {
      resolvedModels: [],
      vpaths: [],
      includeGuard: [],
    }).evaluateAsync();
    const rule = models.find(
      (model): model is NormalRule => model instanceof NormalRule,
    )!;
    expect(rule.ruleIR.buildFileMeta).toBe(meta);
    expect(rule.target).toBe("generated");
    expect(rule.prerequisites).toEqual(["source"]);
  });
});
