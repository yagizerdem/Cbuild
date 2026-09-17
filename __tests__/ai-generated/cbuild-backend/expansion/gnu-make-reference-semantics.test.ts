import { describe, expect, test } from "vitest";
import { compile } from "@tests/util/compile.js";
import { Env, Settings } from "@src/cbuild-backend/env.js";
import { evaluateBuildFile } from "@src/cbuild-backend/buildfile-evaluator.js";
import { expandRecipe, expandValue } from "@src/cbuild-backend/expansion.js";
import {
  AssignmentIR,
  NormalRuleIR,
  ValueIR,
  textPart,
  varRefPart,
} from "@src/compiler/ir.js";

// GNU Make compatibility expectations; existing backend quirks are not the oracle.
// https://www.gnu.org/software/make/manual/html_node/Computed-Names.html
// https://www.gnu.org/software/make/manual/html_node/Reference.html
// https://www.gnu.org/software/make/manual/html_node/Simple-Assignment.html
// https://www.gnu.org/software/make/manual/html_node/Variables-in-Recipes.html
// Scope: references/escaping/whitespace used with '=' and ':=' only.
async function evaluate(source: string): Promise<Env> {
  const program = compile(source + "\n");
  expect(program.length).toBeGreaterThan(0);
  for (const node of program) expect(node).toBeInstanceOf(AssignmentIR);
  const context = new Env(new Settings(true, 1, ".", "cbuild", true));
  await evaluateBuildFile(program, context);
  return context;
}

function read(context: Env, name: string): string {
  return expandValue(
    new ValueIR([varRefPart(new ValueIR([textPart(name)]))]),
    context,
  );
}

describe.each(["=", ":="] as const)(
  "GNU Make reference syntax with %s",
  (operator) => {
    test.each([
      ["parentheses", "$(BASE)", "hello"],
      ["braces", "${BASE}", "hello"],
      ["single-character shorthand", "$B", "short"],
      ["shorthand consumes one character", "$BASE", "shortASE"],
      ["double quotes do not inhibit make expansion", '\\"$(BASE)"', '"hello"'],
      ["single quotes do not inhibit make expansion", "\\'$(BASE)'", "'hello'"],
      ["escaped dollar", "$$", "$"],
      ["escaped reference remains literal", "$$(BASE)", "$(BASE)"],
      ["escaped brace reference remains literal", "$${BASE}", "${BASE}"],
      ["dollar followed by a real reference", "$$$(BASE)", "$hello"],
      ["four dollars become two", "$$$$", "$$"],
      ["case-sensitive names", "$(base)/$(BASE)", "/hello"],
    ])("%s", async (_name, expression, expected) => {
      const context = await evaluate(
        `BASE := hello\nB := short\nRESULT ${operator} ${expression}`,
      );
      expect(read(context, "RESULT")).toBe(expected);
    });

    test.each([
      ["leading assignment spaces are discarded", "   word", "word"],
      ["trailing spaces are retained", "word   ", "word   "],
      ["internal whitespace is retained", "a  b", "a  b"],
      [
        "comment is removed but preceding spaces remain",
        "word  # comment",
        "word  ",
      ],
      ["a reference can introduce a leading space", "$(EMPTY) word", " word"],
    ])("%s", async (_name, rhs, expected) => {
      const context = await evaluate(`EMPTY :=\nRESULT ${operator} ${rhs}`);
      expect(read(context, "RESULT")).toBe(expected);
    });
  },
);

describe("GNU Make computed names and expansion boundaries", () => {
  test.each([
    {
      name: "nested name",
      source: "KEY := BASE\nBASE := found\nRESULT = $($(KEY))",
      expected: "found",
    },
    {
      name: "mixed braces and parentheses",
      source: "KEY := BASE\nBASE := found\nRESULT = ${$(KEY)}",
      expected: "found",
    },
    {
      name: "computed prefix and suffix",
      source:
        "OS := win\nARCH := 64\ntool_win_64 := clang\nRESULT = $(tool_$(OS)_$(ARCH))",
      expected: "clang",
    },
    {
      name: "recursive computed reference uses final selector",
      source: "KEY := A\nA := first\nB := second\nRESULT = $($(KEY))\nKEY := B",
      expected: "second",
    },
    {
      name: "simple computed reference freezes selector",
      source:
        "KEY := A\nA := first\nB := second\nRESULT := $($(KEY))\nKEY := B",
      expected: "first",
    },
    {
      name: "repeated selector in a computed name",
      source: "KEY = x\nxx := found\nRESULT = $($(KEY)$(KEY))",
      expected: "found",
    },
    {
      name: "computed assignment name is immediate even for equals",
      source: "KEY := A\n$(KEY) = yes\nKEY := B\nRESULT = $(A)/$(B)",
      expected: "yes/",
    },
    {
      name: "computed assignment name is immediate for colon-equals",
      source: "KEY := A\n$(KEY) := yes\nKEY := B\nRESULT = $(A)/$(B)",
      expected: "yes/",
    },
    {
      name: "same recursive name selector used in multiple assignments",
      source: "KEY = A\n$(KEY) := first\n$(KEY) := second\nRESULT = $(A)",
      expected: "second",
    },
    {
      name: "same deferred variable used in assignment name and value",
      source: "KEY = RESULT\n$(KEY) := $(KEY)",
      expected: "RESULT",
    },
    {
      name: "simple escaped value is never expanded again",
      source: "BASE := hello\nLITERAL := $$(BASE)\nRESULT = $(LITERAL)",
      expected: "$(BASE)",
    },
    {
      name: "recursive escaped value is not rescanned after insertion",
      source: "BASE := hello\nLITERAL = $$(BASE)\nRESULT := $(LITERAL)",
      expected: "$(BASE)",
    },
    {
      name: "dollar assembled with text does not form a new reference",
      source: "BASE := hello\nDOLLAR := $$\nRESULT = $(DOLLAR)(BASE)",
      expected: "$(BASE)",
    },
  ])("$name", async ({ source, expected }) => {
    expect(read(await evaluate(source), "RESULT")).toBe(expected);
  });
});

describe("GNU Make assignment values used in compiled recipes", () => {
  test.each([
    ["unquoted", "echo $(LIVE) $(FROZEN)", "echo new old"],
    ["double quoted", 'echo \\"$(LIVE) $(FROZEN)\\"', 'echo "new old"'],
    ["single quoted", "echo \\'$(LIVE) $(FROZEN)\\'", "echo 'new old'"],
    ["repeated recursive value", "echo $(LIVE) $(LIVE)", "echo new new"],
    ["shell dollar escaping", "echo $$HOME $(FROZEN)", "echo $HOME old"],
  ])("%s", async (_name, command, expected) => {
    const program = compile(
      `BASE = old\nLIVE = $(BASE)\nFROZEN := $(BASE)\nBASE = new\nall:\n\t${command}\n`,
    );
    expect(program).toHaveLength(5);
    const assignments = program.slice(0, 4);
    for (const node of assignments) expect(node).toBeInstanceOf(AssignmentIR);
    expect(program[4]).toBeInstanceOf(NormalRuleIR);
    const rule = program[4] as NormalRuleIR;
    expect(rule.recipes).toHaveLength(1);
    const context = new Env(new Settings(true, 1, ".", "cbuild", true));
    await evaluateBuildFile(assignments, context);
    // Only inspect expanded command text: no shell is executed.
    expect(expandRecipe(rule.recipes[0]!, context)).toBe(expected);
  });
});
