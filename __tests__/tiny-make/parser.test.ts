import { describe, expect, test } from "vitest";
import type {
  AssignmentNode,
  BaseNode,
  RuleNode,
  ValueNode,
  VarRefPart,
} from "@tinymake-backend/node-types.js";
import { LineReader } from "@tinymake-backend/read-line.js";
import { parseTinyMake } from "./util.js";
import { BuildFileMeta } from "@src/type/buildfile-meta.js";

// Expected ASTs are built independently of the parser's node factories.
function value(...parts: (string | VarRefPart)[]): ValueNode {
  const result: ValueNode = { parts: [] };
  for (const part of parts) {
    if (typeof part !== "string") {
      result.parts.push(part);
    } else if (part.length > 0) {
      const previous = result.parts.at(-1);
      if (previous?.name === "text-part") {
        previous.lexeme += part;
      } else {
        result.parts.push({ name: "text-part", lexeme: part });
      }
    }
  }
  return result;
}

function reference(...parts: (string | VarRefPart)[]): VarRefPart {
  return { name: "varref-part", value: value(...parts) };
}

function assignment(identifier: ValueNode, contents = value()): AssignmentNode {
  return {
    type: "assignment",
    identifier,
    value: contents,
    flavour: "deffered",
  };
}

function rule(
  targets: ValueNode,
  prerequisites = value(),
  recipes: ValueNode[] = [],
): RuleNode {
  return { type: "rule", targets, prerequisites, recipes };
}

// Literal token boundaries and empty text parts have no syntactic meaning.
// Normalize only those details; keep reference nesting, text and node order.
function comparableValue(node: ValueNode): ValueNode {
  return value(
    ...node.parts.map((part) =>
      part.name === "text-part"
        ? part.lexeme
        : { ...part, value: comparableValue(part.value) },
    ),
  );
}

function parseAst(program: string): BaseNode[] {
  return parseTinyMake(program).map((node) => {
    if (node.type === "assignment") {
      const parsed = node as AssignmentNode;
      return {
        ...parsed,
        identifier: comparableValue(parsed.identifier),
        value: comparableValue(parsed.value),
      };
    }
    const parsed = node as RuleNode;
    return {
      ...parsed,
      targets: comparableValue(parsed.targets),
      prerequisites: comparableValue(parsed.prerequisites),
      recipes: parsed.recipes.map(comparableValue),
    };
  });
}

describe("tinyMake parser", () => {
  test("basic: parses rules and nested variable references into an AST", () => {
    const buildFile = [
      "",
      "app: app.o",
      "\techo build app",
      "",
      "app.o: app.c bar.o",
      "\techo app.o",
      "",
      "a = 10",
      "B = 20",
      "c = $(a$(B))B$(B)",
      "D = part1 part2",
      "",
    ].join("\n");

    expect(parseAst(buildFile)).toEqual([
      rule(value("app"), value(" ", "app.o"), [
        value("\t", "echo", " ", "build", " ", "app"),
      ]),
      rule(value("app.o"), value(" ", "app.c", " ", "bar.o"), [
        value("\t", "echo", " ", "app.o"),
      ]),
      assignment(value("a"), value("10")),
      assignment(value("B"), value("20")),
      assignment(
        value("c"),
        value(reference("a", reference("B")), "B", reference("B")),
      ),
      assignment(value("D"), value("part1", " ", "part2")),
    ]);
  });

  describe("rule headers and recipe ownership", () => {
    test("keeps multiple targets and prerequisites in source order", () => {
      expect(parseAst("app library.a test-bin: main.o utils.o test.o")).toEqual(
        [
          rule(
            value("app", " ", "library.a", " ", "test-bin"),
            value(" ", "main.o", " ", "utils.o", " ", "test.o"),
          ),
        ],
      );
    });

    test("preserves mixed whitespace until target and prerequisite expansion", () => {
      expect(parseAst("  app\t library.a  :\tmain.o   utils.o\t")).toEqual([
        rule(
          value("  ", "app", "\t ", "library.a", "  "),
          value("\t", "main.o", "   ", "utils.o", "\t"),
        ),
      ]);
    });

    test.each(["app:", "app:   "])(
      "allows a rule without prerequisites or recipes: %s",
      (buildFile) => {
        const prerequisites = buildFile === "app:" ? value() : value("   ");
        expect(parseAst(buildFile)).toEqual([
          rule(value("app"), prerequisites),
        ]);
      },
    );

    test("preserves path, dot, dash and underscore characters in names", () => {
      const buildFile =
        "build/my_app-v2.out: ./src/main.c ../include/config.h .config";

      expect(parseAst(buildFile)).toEqual([
        rule(
          value("build/my_app-v2.out"),
          value(
            " ",
            "./src/main.c",
            " ",
            "../include/config.h",
            " ",
            ".config",
          ),
        ),
      ]);
    });

    test("keeps adjacent recipe-free rules separate", () => {
      expect(parseAst("all: app tests\napp: main.o\ntests: test.o")).toEqual([
        rule(value("all"), value(" ", "app", " ", "tests")),
        rule(value("app"), value(" ", "main.o")),
        rule(value("tests"), value(" ", "test.o")),
      ]);
    });

    test("attaches ordered recipe lines to the correct rule", () => {
      const buildFile = [
        "app debug: main.o utils.o",
        "\techo first",
        "\techo second",
        "clean:",
        "\trm app debug",
        "dist: app",
      ].join("\n");

      expect(parseAst(buildFile)).toEqual([
        rule(value("app", " ", "debug"), value(" ", "main.o", " ", "utils.o"), [
          value("\t", "echo", " ", "first"),
          value("\t", "echo", " ", "second"),
        ]),
        rule(value("clean"), value(), [
          value("\t", "rm", " ", "app", " ", "debug"),
        ]),
        rule(value("dist"), value(" ", "app")),
      ]);
    });

    test("flushes a pending rule before an assignment and resets its recipes", () => {
      const buildFile =
        "app: main.o\n\techo app\nCC = gcc\nclean:\n\techo clean";

      expect(parseAst(buildFile)).toEqual([
        rule(value("app"), value(" ", "main.o"), [
          value("\t", "echo", " ", "app"),
        ]),
        assignment(value("CC"), value("gcc")),
        rule(value("clean"), value(), [value("\t", "echo", " ", "clean")]),
      ]);
    });

    test("flushes a recipe-free rule before a final assignment", () => {
      expect(parseAst("app: main.o\nCC = gcc")).toEqual([
        rule(value("app"), value(" ", "main.o")),
        assignment(value("CC"), value("gcc")),
      ]);
    });

    test("retains duplicate target rules for the later resolution phase", () => {
      const buildFile =
        "app: main.o\napp: utils.o\n\tgcc main.o utils.o -o app\napp: config.h";

      expect(parseAst(buildFile)).toEqual([
        rule(value("app"), value(" ", "main.o")),
        rule(value("app"), value(" ", "utils.o"), [
          value(
            "\t",
            "gcc",
            " ",
            "main.o",
            " ",
            "utils.o",
            " ",
            "-o",
            " ",
            "app",
          ),
        ]),
        rule(value("app"), value(" ", "config.h")),
      ]);
    });

    test("preserves overlapping multi-target rules without merging their ASTs", () => {
      expect(
        parseAst("app debug: common.o\napp release: config.h\n\techo link"),
      ).toEqual([
        rule(value("app", " ", "debug"), value(" ", "common.o")),
        rule(value("app", " ", "release"), value(" ", "config.h"), [
          value("\t", "echo", " ", "link"),
        ]),
      ]);
    });

    test("does not deduplicate prerequisite names during parsing", () => {
      expect(parseAst("app: main.o utils.o main.o")).toEqual([
        rule(value("app"), value(" ", "main.o", " ", "utils.o", " ", "main.o")),
      ]);
    });

    test("keeps an equals sign in a prerequisite name after the rule colon", () => {
      expect(parseAst("app: config=debug main.o")).toEqual([
        rule(value("app"), value(" ", "config=debug", " ", "main.o")),
      ]);
    });
  });

  describe("variable assignments", () => {
    test.each(["CC=gcc", "CC = gcc", "  CC  = gcc", "CC\t=\tgcc"])(
      "ignores surrounding whitespace in the variable name: %s",
      (buildFile) => {
        expect(parseAst(buildFile)).toEqual([
          assignment(value("CC"), value("gcc")),
        ]);
      },
    );

    test.each(["EMPTY=", "EMPTY =", "EMPTY =   "])(
      "allows an empty variable value: %s",
      (buildFile) => {
        expect(parseAst(buildFile)).toEqual([assignment(value("EMPTY"))]);
      },
    );

    test("keeps internal whitespace in a multi-word variable value", () => {
      expect(parseAst("CFLAGS = -Wall  -O2\t-g")).toEqual([
        assignment(value("CFLAGS"), value("-Wall", "  ", "-O2", "\t", "-g")),
      ]);
    });

    test("keeps additional equals signs on the right side of an assignment", () => {
      expect(parseAst("FLAGS = -DNAME=value MODE=debug")).toEqual([
        assignment(value("FLAGS"), value("-DNAME=value", " ", "MODE=debug")),
      ]);
    });

    test("treats a colon in an assignment value as text", () => {
      expect(parseAst("URL = https://example.test:8080/build")).toEqual([
        assignment(value("URL"), value("https://example.test:8080/build")),
      ]);
    });

    test("preserves trailing whitespace in a non-empty variable value", () => {
      // Everything on the right side of '=' belongs to the variable value.
      expect(parseAst("MESSAGE=hello   world  ")).toEqual([
        assignment(value("MESSAGE"), value("hello", "   ", "world", "  ")),
      ]);
    });

    test("keeps repeated variable definitions in source order", () => {
      expect(
        parseAst("CC = gcc\nCC = clang\napp:\n\t$(CC) main.c -o app"),
      ).toEqual([
        assignment(value("CC"), value("gcc")),
        assignment(value("CC"), value("clang")),
        rule(value("app"), value(), [
          value("\t", reference("CC"), " ", "main.c", " ", "-o", " ", "app"),
        ]),
      ]);
    });

    test("allows a variable-generated assignment name", () => {
      expect(parseAst("PREFIX = APP\n$(PREFIX)_FLAGS = $(COMMON) -O2")).toEqual(
        [
          assignment(value("PREFIX"), value("APP")),
          assignment(
            value(reference("PREFIX"), "_FLAGS"),
            value(reference("COMMON"), " ", "-O2"),
          ),
        ],
      );
    });
  });

  describe("symbolic variable references", () => {
    // Expansion, undefined-variable values and dependency-cycle detection belong
    // to later phases. These assertions inspect only the parsed expressions.
    test("preserves references in both targets and prerequisites before word splitting", () => {
      const buildFile =
        "TARGETS = a b\nPREREQS = d e\n$(TARGETS) c: $(PREREQS) f";

      expect(parseAst(buildFile)).toEqual([
        assignment(value("TARGETS"), value("a", " ", "b")),
        assignment(value("PREREQS"), value("d", " ", "e")),
        rule(
          value(reference("TARGETS"), " ", "c"),
          value(" ", reference("PREREQS"), " ", "f"),
        ),
      ]);
    });

    test("keeps references embedded in target and prerequisite paths", () => {
      expect(
        parseAst("$(BUILD)/$(NAME).bin: $(SRC)/main.c $(BUILD)/utils.o"),
      ).toEqual([
        rule(
          value(reference("BUILD"), "/", reference("NAME"), ".bin"),
          value(
            " ",
            reference("SRC"),
            "/main.c",
            " ",
            reference("BUILD"),
            "/utils.o",
          ),
        ),
      ]);
    });

    test("keeps adjacent references distinct from their prefix and suffix", () => {
      expect(parseAst("OUTPUT = pre$(A)$(B)post")).toEqual([
        assignment(
          value("OUTPUT"),
          value("pre", reference("A"), reference("B"), "post"),
        ),
      ]);
    });

    test("parses nested references in assignment names, values and rule headers", () => {
      const buildFile = [
        "PROFILE = release",
        "$(PREFIX_$(PROFILE))_FLAGS = $(FLAGS_$(PROFILE))",
        "$(TARGET_$(PROFILE)): $(OBJECTS_$(PROFILE))",
      ].join("\n");

      expect(parseAst(buildFile)).toEqual([
        assignment(value("PROFILE"), value("release")),
        assignment(
          value(reference("PREFIX_", reference("PROFILE")), "_FLAGS"),
          value(reference("FLAGS_", reference("PROFILE"))),
        ),
        rule(
          value(reference("TARGET_", reference("PROFILE"))),
          value(" ", reference("OBJECTS_", reference("PROFILE"))),
        ),
      ]);
    });

    test("parses several references within a generated variable name", () => {
      expect(parseAst("FLAGS = $(CC_$(ARCH)_$(MODE))")).toEqual([
        assignment(
          value("FLAGS"),
          value(reference("CC_", reference("ARCH"), "_", reference("MODE"))),
        ),
      ]);
    });

    test("handles deeply nested references followed by another reference", () => {
      expect(parseAst("RESULT = $(A$(B$(C$(D))))-$(TAIL)")).toEqual([
        assignment(
          value("RESULT"),
          value(
            reference("A", reference("B", reference("C", reference("D")))),
            "-",
            reference("TAIL"),
          ),
        ),
      ]);
    });

    test("preserves forward references in variable values", () => {
      expect(parseAst("B = $(A) world\nA = hello")).toEqual([
        assignment(value("B"), value(reference("A"), " ", "world")),
        assignment(value("A"), value("hello")),
      ]);
    });

    test("does not erase undefined references while parsing", () => {
      expect(
        parseAst("app: $(MISSING)\n\techo before$(DOES_NOT_EXIST)after"),
      ).toEqual([
        rule(value("app"), value(" ", reference("MISSING")), [
          value(
            "\t",
            "echo",
            " ",
            "before",
            reference("DOES_NOT_EXIST"),
            "after",
          ),
        ]),
      ]);
    });
  });

  describe("recipes and dollar escaping", () => {
    test("leaves recipe variables symbolic even when defined after the rule", () => {
      expect(parseAst("app:\n\techo $(MESSAGE)\nMESSAGE = hello")).toEqual([
        rule(value("app"), value(), [
          value("\t", "echo", " ", reference("MESSAGE")),
        ]),
        assignment(value("MESSAGE"), value("hello")),
      ]);
    });

    test("preserves nested references inside recipes", () => {
      expect(parseAst("app:\n\t$(CC_$(ARCH)) $(FLAGS_$(MODE)) -o app")).toEqual(
        [
          rule(value("app"), value(), [
            value(
              "\t",
              reference("CC_", reference("ARCH")),
              " ",
              reference("FLAGS_", reference("MODE")),
              " ",
              "-o",
              " ",
              "app",
            ),
          ]),
        ],
      );
    });

    test("classifies tab-prefixed colon and equals signs as recipe text", () => {
      expect(parseAst("app:\n\tMODE=debug; echo status:ready")).toEqual([
        rule(value("app"), value(), [
          value("\t", "MODE=debug;", " ", "echo", " ", "status:ready"),
        ]),
      ]);
    });

    test("preserves shell quotes, parentheses, pipes and redirections", () => {
      const buildFile =
        "app:\n\tprintf '%s' '(a=b):' | cat > output.txt && echo done";

      expect(parseAst(buildFile)).toEqual([
        rule(value("app"), value(), [
          value(
            "\t",
            "printf",
            " ",
            "'%s'",
            " ",
            "'(a=b):'",
            " ",
            "|",
            " ",
            "cat",
            " ",
            ">",
            " ",
            "output.txt",
            " ",
            "&&",
            " ",
            "echo",
            " ",
            "done",
          ),
        ]),
      ]);
    });

    test("preserves extra recipe indentation and trailing whitespace", () => {
      expect(parseAst("app:\n\t  echo\tready  ")).toEqual([
        rule(value("app"), value(), [
          value("\t  ", "echo", "\t", "ready", "  "),
        ]),
      ]);
    });

    test("turns an escaped shell dollar into literal text instead of a variable reference", () => {
      expect(parseAst("app:\n\techo $$PATH")).toEqual([
        rule(value("app"), value(), [value("\t", "echo", " ", "$PATH")]),
      ]);
    });

    test("keeps escaped shell command substitution literal beside a Make variable", () => {
      expect(parseAst("app:\n\techo $$(whoami) $(MESSAGE)")).toEqual([
        rule(value("app"), value(), [
          value("\t", "echo", " ", "$(whoami)", " ", reference("MESSAGE")),
        ]),
      ]);
    });

    test("handles consecutive escaped dollars and a subsequent variable reference", () => {
      expect(parseAst("app:\n\techo $$$$ $$$$(NAME) $$$(NAME)")).toEqual([
        rule(value("app"), value(), [
          value(
            "\t",
            "echo",
            " ",
            "$$",
            " ",
            "$$(NAME)",
            " ",
            "$",
            reference("NAME"),
          ),
        ]),
      ]);
    });

    test("supports dollar escaping in assignment values", () => {
      expect(parseAst("MESSAGE = cost:$$10 $(CURRENCY)")).toEqual([
        assignment(
          value("MESSAGE"),
          value("cost:$10", " ", reference("CURRENCY")),
        ),
      ]);
    });

    test("supports dollar escaping in targets and prerequisites beside a reference", () => {
      expect(parseAst("cash$$target: price$$input $(EXTRA)")).toEqual([
        rule(
          value("cash$target"),
          value(" ", "price$input", " ", reference("EXTRA")),
        ),
      ]);
    });

    test("accepts an escaped dollar at the end of the final recipe", () => {
      expect(parseAst("app:\n\techo $$")).toEqual([
        rule(value("app"), value(), [value("\t", "echo", " ", "$")]),
      ]);
    });
  });

  describe("empty input, line boundaries and source positions", () => {
    test.each(["", "\n", "\n\n", "  \n\t\n \t \n", "\r\n\r\n"])(
      "returns an empty AST for blank input %j",
      (buildFile) => {
        expect(parseAst(buildFile)).toEqual([]);
      },
    );

    test("ignores blank lines without detaching recipes from their rule", () => {
      const buildFile =
        "\napp: main.o\n\n\techo first\n  \n\techo second\n\nclean:\n";

      expect(parseAst(buildFile)).toEqual([
        rule(value("app"), value(" ", "main.o"), [
          value("\t", "echo", " ", "first"),
          value("\t", "echo", " ", "second"),
        ]),
        rule(value("clean")),
      ]);
    });

    test.each(["", "\n"])(
      "parses the final recipe with ending %j",
      (ending) => {
        expect(parseAst(`app:\n\techo ready${ending}`)).toEqual([
          rule(value("app"), value(), [value("\t", "echo", " ", "ready")]),
        ]);
      },
    );

    test("treats CRLF line endings as delimiters rather than AST content", () => {
      expect(parseAst("CC = gcc\r\napp: main.o\r\n\techo ready\r\n")).toEqual([
        assignment(value("CC"), value("gcc")),
        rule(value("app"), value(" ", "main.o"), [
          value("\t", "echo", " ", "ready"),
        ]),
      ]);
    });

    test("tracks physical line numbers from one despite skipped blank lines", () => {
      const lines = new LineReader(
        "\nCC = gcc\n  \napp: main.o\n\techo ready\n\nclean:",
        { name: "testfile" } as BuildFileMeta,
      ).read();

      expect(
        lines.map((line) => ({ row: line.row, type: line.parsed.type })),
      ).toEqual([
        { row: 2, type: "recursive-assignment" },
        { row: 4, type: "target-preq" },
        { row: 5, type: "recipe" },
        { row: 7, type: "target-preq" },
      ]);
      for (const line of lines) {
        expect(
          line.processed.every((character) => character.row === line.row),
        ).toBe(true);
      }
    });

    test("does not leak rules, recipes or assignments between separate parses", () => {
      expect(parseAst("CC = gcc\napp:\n\techo app")).toHaveLength(2);
      expect(parseAst("clean:")).toEqual([rule(value("clean"))]);
      expect(parseAst("")).toEqual([]);
    });
  });

  describe("invalid syntax", () => {
    test.each([
      ["bare target", "app main.o"],
      ["bare assignment", "CC gcc"],
      ["unindented command", "app:\necho ready"],
      ["space-indented command", "app:\n    echo ready"],
      ["spaces before the recipe tab", "app:\n  \techo ready"],
    ])("rejects a missing separator: %s", (_name, buildFile) => {
      expect(() => parseTinyMake(buildFile)).toThrow();
    });

    test.each([
      ["first line", "\techo orphan"],
      ["before a rule", "\techo orphan\napp:\n\techo app"],
      ["after an assignment", "CC = gcc\n\techo orphan"],
      [
        "between an assignment and a rule",
        "app:\nCC = gcc\n\techo orphan\nclean:",
      ],
    ])("rejects a recipe without a rule: %s", (_name, buildFile) => {
      expect(() => parseTinyMake(buildFile)).toThrow();
    });

    test.each([": main.o", "  : main.o", ":\n\techo orphan"])(
      "rejects a rule with no target: %j",
      (buildFile) => {
        expect(() => parseTinyMake(buildFile)).toThrow();
      },
    );

    test.each(["= gcc", "  = gcc", "=", "BAD NAME = gcc", "BAD\tNAME = gcc"])(
      "rejects an empty or internally whitespace-separated variable name: %j",
      (buildFile) => {
        expect(() => parseTinyMake(buildFile)).toThrow();
      },
    );

    test.each([
      ["assignment name", "$(NAME = gcc"],
      ["assignment value", "CC = $(COMPILER"],
      ["target", "$(TARGET: main.o"],
      ["prerequisite", "app: $(OBJECTS"],
      ["recipe", "app:\n\techo $(MESSAGE"],
      ["nested reference", "FLAGS = $(FLAGS_$(MODE)"],
    ])("rejects an unterminated reference in a %s", (_name, buildFile) => {
      expect(() => parseTinyMake(buildFile)).toThrow();
    });

    test.each([
      "CC = $(COMPILER}",
      "$(TARGET}: main.o",
      "app: $(OBJECTS}",
      "app:\n\techo $(MESSAGE}",
      "FLAGS = $(FLAGS_$(MODE})",
    ])("rejects a mismatched closing delimiter: %j", (buildFile) => {
      expect(() => parseTinyMake(buildFile)).toThrow();
    });

    test("reports the physical line number and missing-separator description", () => {
      const buildFile = "\nCC = gcc\napp:\n\n    echo ready";

      expect(() => parseTinyMake(buildFile)).toThrow(/\b5\b/);
      expect(() => parseTinyMake(buildFile)).toThrow(/missing separator/i);
    });
  });
});
