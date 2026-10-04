import { afterEach, describe, expect, test } from "vitest";
import { Core } from "@src/cbuild-backend/core.js";
import type { VariableOrigin } from "@src/cbuild-backend/env.js";
import {
  RecursiveVariableExpansionException,
  ValueExpansionEngine,
} from "@src/cbuild-backend/expansion.js";
import {
  cleanup,
  environment,
  evaluate,
  expand,
  value,
} from "./case-support.js";

afterEach(cleanup);

describe("E01-E05 assignment flavors and conditional scope", () => {
  test("E01 recursive append stores RHS references for later expansion", async () => {
    const { env } = await evaluate(
      "BASE = before\nLIST = $(BASE)\nLIST += $(BASE)\nBASE = after\n",
    );
    expect(env.requireVariable("LIST").flavor).toBe("recursive");
    expect(expand("$(LIST)", env)).toBe("after after");
  });

  test("E02 raw append expands RHS immediately and keeps text-only storage", async () => {
    const { env } = await evaluate(
      "BASE = before\nLIST := initial\nLIST += $(BASE)\nBASE = after\n",
    );
    expect(env.requireVariable("LIST").flavor).toBe("raw");
    expect(
      env
        .requireVariable("LIST")
        .value.parts.every((part) => part.kind === "text"),
    ).toBe(true);
    expect(env.requireRawVariable("LIST")).toBe("initial before");
    expect(expand("$(LIST)", env)).toBe("initial before");
  });

  test("E03 undefined append creates a recursive variable", async () => {
    const { env } = await evaluate("LIST += $(BASE)\nBASE = after\n");
    expect(env.requireVariable("LIST")).toMatchObject({
      flavor: "recursive",
      origin: "file",
    });
    expect(expand("$(LIST)", env)).toBe("after");
  });

  test.each(["parent", ""])(
    "E04 parent definition '%s' blocks conditional local assignment",
    async (parentValue) => {
      const parent = environment();
      parent.setRawVariable("FLAGS", parentValue);
      const child = environment({}, parent);
      await evaluate("FLAGS ?= fallback\n", child);
      expect(child.hasVariable("FLAGS")).toBe(false);
      expect(expand("$(FLAGS)", child)).toBe(parentValue);
    },
  );

  test.each(["=", ":="])(
    "E05 an existing empty %s variable blocks ?=",
    async (operator) => {
      const { env } = await evaluate(`FLAGS ${operator}\nFLAGS ?= fallback\n`);
      expect(env.hasVariable("FLAGS")).toBe(true);
      expect(expand("$(FLAGS)", env)).toBe("");
    },
  );
});

describe("E06 explicit origin priority matrix", () => {
  // Independent, explicit expectation order rather than importing the production map.
  const origins: VariableOrigin[] = [
    "automatic",
    "default",
    "environment",
    "file",
    "environment-overridden",
    "command-line",
    "override",
  ];
  for (const prefix of ["", "override "]) {
    test.each(origins)(
      `${prefix || "ordinary "}assignment against existing %s`,
      async (origin) => {
        const env = environment();
        env.setRawVariable("FLAGS", "original", origin);
        const rank = origins.indexOf(origin);
        const wins = rank <= (prefix ? 6 : 3);
        await evaluate(`${prefix}FLAGS := replacement\n`, env);
        expect(expand("$(FLAGS)", env)).toBe(wins ? "replacement" : "original");
        expect(env.requireVariable("FLAGS").origin).toBe(
          wins ? (prefix ? "override" : "file") : origin,
        );
      },
    );
  }

  test.each(origins)("CLI merge against %s", (origin) => {
    const env = environment();
    env.setRawVariable("FLAGS", "original", origin);
    new Core(env).mergeCliVars([{ key: "FLAGS", value: "cli" }]);
    expect(expand("$(FLAGS)", env)).toBe(
      origins.indexOf(origin) < 5 ? "cli" : "original",
    );
  });

  for (const environmentOverrides of [false, true]) {
    test.each(origins)(
      `environment merge with overrides=${environmentOverrides} against %s`,
      (origin) => {
        const env = environment({ environmentOverrides });
        env.setRawVariable("FLAGS", "original", origin);
        new Core(env).mergeEnvVars([{ key: "FLAGS", value: "environment" }]);
        const rank = environmentOverrides ? 4 : 2;
        expect(expand("$(FLAGS)", env)).toBe(
          origins.indexOf(origin) < rank ? "environment" : "original",
        );
      },
    );
  }
});

describe("E07-E12 deletion, metadata and invalid computed names", () => {
  test("E07 undefine local symbol reveals the parent definition", async () => {
    const parent = environment();
    parent.setRawVariable("FLAGS", "parent");
    const child = environment({}, parent);
    child.setRawVariable("FLAGS", "local");
    await evaluate("undefine FLAGS\n", child);
    expect(child.hasVariable("FLAGS")).toBe(false);
    expect(expand("$(FLAGS)", child)).toBe("parent");
  });

  test.each(["environment", "file", "command-line", "override"] as const)(
    "E08 override undefine removes %s origin",
    async (origin) => {
      const env = environment();
      env.setRawVariable("FLAGS", "value", origin);
      await evaluate("override undefine FLAGS\n", env);
      expect(env.hasVariable("FLAGS")).toBe(false);
    },
  );

  test.each(["command-line", "override"] as const)(
    "ordinary undefine protects %s origin",
    async (origin) => {
      const env = environment();
      env.setRawVariable("FLAGS", "value", origin);
      await evaluate("undefine FLAGS\n", env);
      expect(env.requireVariable("FLAGS").origin).toBe(origin);
    },
  );

  test.each(["=", ":=", "+="])(
    "E09 exported metadata survives an ordinary %s replacement/append until unexport",
    async (operator) => {
      const { env } = await evaluate(
        `export FLAGS = first\nFLAGS ${operator} second\n`,
      );
      expect(env.requireVariable("FLAGS").isExported).toBe(true);
      expect(env.getExportedVariables().has("FLAGS")).toBe(true);
      await evaluate("unexport FLAGS\n", env);
      expect(env.requireVariable("FLAGS").isExported).toBe(false);
    },
  );

  test("E10 recursion exception releases lookup state and permits later recovery", async () => {
    const { env } = await evaluate("A = $(B)\nB = $(A)\nGOOD = valid\n");
    const active = new Set<string>();
    const engine = new ValueExpansionEngine(env, active);
    expect(() => engine.expand(value("$(A)"))).toThrow(
      RecursiveVariableExpansionException,
    );
    expect(active.size).toBe(0);
    env.setRawVariable("B", "recovered");
    expect(engine.expand(value("$(A)|$(GOOD)"))).toBe("recovered|valid");
    expect(active.size).toBe(0);
  });

  test("E11 empty computed assignment name rejects without inserting a symbol", async () => {
    const env = environment();
    await expect(evaluate("$(UNDEFINED) := value\n", env)).rejects.toThrow(
      TypeError,
    );
    expect(env.variableCount).toBe(0);
  });

  test("E12 current CBuild contract: computed multi-word assignment name is one symbol, not a list", async () => {
    const { env } = await evaluate("KEY = FIRST SECOND\n$(KEY) := value\n");
    expect(env.requireRawVariable("FIRST SECOND")).toBe("value");
    expect(env.hasVariable("FIRST")).toBe(false);
    expect(env.hasVariable("SECOND")).toBe(false);
    expect(expand("$($(KEY))", env)).toBe("value");
  });
});
