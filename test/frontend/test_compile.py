import unittest
from typing import cast

from cbuild_compiler.ir import (
    IR,
    AssignmentIR,
    AssignmentPrefix,
    AssignmentType,
    ConditionalIR,
    ConditionKind,
    DefineIR,
    ExportIR,
    FunctionIR,
    GlobalExportIR,
    GlobalUnexportIR,
    HookIR,
    IncludeIR,
    NormalRuleIR,
    RecipeIR,
    RuleSeparator,
    StaticPatternRuleIR,
    TargetRuleIR,
    UndefineIR,
    ValueIR,
    ValuePart,
    VpathIR,
)
from core.frontend import compile, parse_build_file
from preprocessor.preprocessor import p_char_buffer_to_string, preprocess
from type.cbuild_exception import CbuildException, ErrorType


def _compile(build_file: str) -> list[IR]:
    processed = p_char_buffer_to_string(preprocess(build_file))
    return compile(parse_build_file(processed))


def _render_part(part: ValuePart) -> str:
    if part.kind == "text":
        return part.lexeme
    if part.kind == "variable-reference":
        # Paren style is checked separately; render every reference as $(...)
        return f"$({_render(part.name_expr)})"
    args = ",".join(_render(arg) for arg in part.function.args)
    return f"$({part.function.name} {args})"


def _render(value: ValueIR | None) -> str:
    """Render a compiled value back to make-like source text."""
    if value is None:
        return ""
    return "".join(_render_part(part) for part in value.parts)


def _renders(values: list[ValueIR]) -> list[str]:
    return [_render(value) for value in values]


def _dump(obj: object) -> object:
    """Generic structural dump, so tests notice any IR field."""
    if isinstance(obj, list):
        return [_dump(item) for item in obj]
    if hasattr(obj, "__dict__"):
        return {
            key: _dump(value)
            for key, value in vars(obj).items()
            if key not in ("row", "col", "build_file_meta")
        }
    return obj


def _commands(recipes: list[RecipeIR]) -> list[str]:
    commands: list[str] = []
    for recipe_ir in recipes:
        recipe = recipe_ir.recipe
        if recipe.kind == "command":
            commands.append(_render(recipe.command))
    return commands


def _only_function(value: ValueIR | None) -> FunctionIR:
    assert value is not None
    parts = [
        part
        for part in value.parts
        if not (part.kind == "text" and part.lexeme.strip() == "")
    ]
    if len(parts) != 1 or parts[0].kind != "function-call":
        raise AssertionError(f"expected a single function call, got {_render(value)!r}")
    return parts[0].function


class CompileFrontendTest(unittest.TestCase):
    def _single[T](self, build_file: str, ir_type: type[T]) -> T:
        irs = _compile(build_file)
        self.assertEqual(len(irs), 1, [type(ir).__name__ for ir in irs])
        self.assertIsInstance(irs[0], ir_type)
        return cast(T, irs[0])

    def _assert_compile_error(
        self,
        build_file: str,
        message: str,
        row: int,
        error_type: ErrorType = ErrorType.SYNTAX,
    ) -> None:
        with self.assertRaises(CbuildException) as caught:
            _compile(build_file)

        error = caught.exception
        self.assertIn(message, error.message)
        self.assertTrue(error.message.rstrip().endswith("Stop."), error.message)
        self.assertEqual(error.row, row)
        self.assertEqual(error.error_type, error_type)

    # ----------------------------------------------------------------- basics

    def test_simple_hello_world(self) -> None:
        build_file = """\
hello:
\t echo "Hello, World"
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(_renders(rule.targets), ["hello"])
        self.assertEqual(rule.prerequisites, [])
        self.assertEqual(rule.separator, RuleSeparator.SINGLE_COLON)
        self.assertEqual(_commands(rule.recipes), ['echo "Hello, World"'])

    def test_empty_build_file(self) -> None:
        self.assertEqual(_compile(""), [])

    def test_comments_and_blank_lines_only(self) -> None:
        build_file = """\
# first comment

   # indented comment

"""

        self.assertEqual(_compile(build_file), [])

    def test_statement_order_is_preserved(self) -> None:
        build_file = """\
A = 1
all: dep
\techo $(A)
include extra.mk
B := 2
"""

        irs = _compile(build_file)
        self.assertEqual(
            [type(ir) for ir in irs],
            [AssignmentIR, NormalRuleIR, IncludeIR, AssignmentIR],
        )

    # ------------------------------------------------------------ assignments

    def test_assignment_operators(self) -> None:
        cases = {
            "=": AssignmentType.RECURSIVE,
            ":=": AssignmentType.SIMPLE,
            "::=": AssignmentType.POSIX_SIMPLE,
            ":::=": AssignmentType.IMMEDIATE_ESCAPED,
            "?=": AssignmentType.CONDITIONAL,
            "+=": AssignmentType.APPEND,
            "!=": AssignmentType.SHELL,
        }

        for operator, expected in cases.items():
            with self.subTest(operator=operator):
                assignment = self._single(f"VAR {operator} value\n", AssignmentIR)
                self.assertEqual(assignment.type, expected)
                self.assertIsNone(assignment.prefix)
                self.assertEqual(_render(assignment.left), "VAR")
                self.assertEqual(_render(assignment.right), "value")

    def test_assignment_without_spaces_around_operator(self) -> None:
        assignment = self._single("CC=gcc\n", AssignmentIR)
        self.assertEqual(assignment.type, AssignmentType.RECURSIVE)
        self.assertEqual(_render(assignment.left), "CC")
        self.assertEqual(_render(assignment.right), "gcc")

    def test_shell_assignment_keeps_command_text(self) -> None:
        assignment = self._single("FILES != ls -1 src | sort\n", AssignmentIR)
        self.assertEqual(assignment.type, AssignmentType.SHELL)
        self.assertEqual(_render(assignment.right), "ls -1 src | sort")

    def test_empty_assignment(self) -> None:
        for build_file in ("nullstring =\n", "empty:=\n"):
            with self.subTest(build_file=build_file):
                assignment = self._single(build_file, AssignmentIR)
                self.assertEqual(_render(assignment.right), "")

    def test_assignment_value_keeps_inner_whitespace(self) -> None:
        assignment = self._single("objects = main.o   kbd.o command.o\n", AssignmentIR)
        self.assertEqual(_render(assignment.right), "main.o   kbd.o command.o")

    def test_assignment_strips_comment_but_keeps_trailing_whitespace(self) -> None:
        # GNU make keeps the whitespace that precedes an inline comment.
        assignment = self._single("CC = gcc # Flag for implicit rules\n", AssignmentIR)
        self.assertEqual(_render(assignment.right), "gcc ")
        self.assertNotIn("#", _render(assignment.right))

    def test_assignment_prefixes(self) -> None:
        cases = {
            "override": AssignmentPrefix.OVERRIDE,
            "export": AssignmentPrefix.EXPORT,
            "unexport": AssignmentPrefix.UNEXPORT,
            "override export": AssignmentPrefix.OVERRIDE_EXPORT,
            "export override": AssignmentPrefix.EXPORT_OVERRIDE,
        }

        for prefix, expected in cases.items():
            with self.subTest(prefix=prefix):
                assignment = self._single(f"{prefix} VAR := value\n", AssignmentIR)
                self.assertEqual(assignment.prefix, expected)
                self.assertEqual(assignment.type, AssignmentType.SIMPLE)
                self.assertEqual(_render(assignment.left), "VAR")
                self.assertEqual(_render(assignment.right), "value")

    def test_export_assignment_with_shell_function(self) -> None:
        assignment = self._single("export HOST_UID=$(shell id -u)\n", AssignmentIR)
        self.assertEqual(assignment.prefix, AssignmentPrefix.EXPORT)
        self.assertEqual(_render(assignment.left), "HOST_UID")
        function = _only_function(assignment.right)
        self.assertEqual(function.name, "shell")
        self.assertEqual(_renders(function.args), ["id -u"])

    def test_double_dollar_escapes_to_single_dollar(self) -> None:
        assignment = self._single("one = export blah=1; echo $$blah\n", AssignmentIR)
        self.assertEqual(_render(assignment.right), "export blah=1; echo $blah")
        self.assertTrue(all(part.kind == "text" for part in assignment.right.parts))

    def test_variable_reference_styles(self) -> None:
        assignment = self._single("X = $(A) ${B} $C\n", AssignmentIR)
        references = [
            part
            for part in assignment.right.parts
            if part.kind == "variable-reference"
        ]

        self.assertEqual([_render(ref.name_expr) for ref in references], ["A", "B", "C"])
        self.assertEqual(references[0].paren_type, "(")
        self.assertEqual(references[1].paren_type, "{")

    def test_adjacent_variable_references(self) -> None:
        assignment = self._single("after = $(with_spaces)there$(A)$(B)\n", AssignmentIR)
        self.assertEqual(_render(assignment.right), "$(with_spaces)there$(A)$(B)")
        self.assertEqual(
            [part.kind for part in assignment.right.parts],
            ["variable-reference", "text", "variable-reference", "variable-reference"],
        )

    def test_computed_variable_name(self) -> None:
        assignment = self._single("X = $($(A)_name)\n", AssignmentIR)
        self.assertEqual(len(assignment.right.parts), 1)
        reference = assignment.right.parts[0]
        assert reference.kind == "variable-reference"
        self.assertEqual(
            [part.kind for part in reference.name_expr.parts],
            ["variable-reference", "text"],
        )
        self.assertEqual(_render(reference.name_expr), "$(A)_name")

    def test_variable_reference_in_assignment_name(self) -> None:
        assignment = self._single("$(PREFIX)_FLAGS := -O2\n", AssignmentIR)
        self.assertEqual(_render(assignment.left), "$(PREFIX)_FLAGS")
        self.assertEqual(_render(assignment.right), "-O2")

    def test_recursive_and_simple_variables_reference_later_variable(self) -> None:
        build_file = """\
one = one ${later_variable}
two := two ${later_variable}

later_variable = later
"""

        one, two, later = cast(list[AssignmentIR], _compile(build_file))
        self.assertEqual(one.type, AssignmentType.RECURSIVE)
        self.assertEqual(two.type, AssignmentType.SIMPLE)
        self.assertEqual(_render(one.right), "one $(later_variable)")
        self.assertEqual(_render(two.right), "two $(later_variable)")
        self.assertEqual(_render(later.left), "later_variable")

    def test_assignment_value_can_contain_special_characters(self) -> None:
        assignment = self._single(
            "INCS =-I\"./include\" a=b c:d (x) {y} |z\n", AssignmentIR
        )
        self.assertEqual(_render(assignment.right), "-I\"./include\" a=b c:d (x) {y} |z")

    # ------------------------------------------------------------------ rules

    def test_rule_with_targets_prerequisites_and_order_only(self) -> None:
        build_file = """\
a b: c d | e f
\techo $@
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(_renders(rule.targets), ["a", "b"])
        self.assertEqual(_renders(rule.prerequisites), ["c", "d"])
        self.assertEqual(_renders(rule.order_only_prerequisites), ["e", "f"])
        self.assertEqual(_commands(rule.recipes), ["echo $(@)"])

    def test_rule_without_prerequisites_or_recipe(self) -> None:
        rule = self._single("all:\n", NormalRuleIR)
        self.assertEqual(_renders(rule.targets), ["all"])
        self.assertEqual(rule.prerequisites, [])
        self.assertEqual(rule.order_only_prerequisites, [])
        self.assertEqual(rule.recipes, [])

    def test_rule_with_only_order_only_prerequisites(self) -> None:
        rule = self._single("all: | build\n", NormalRuleIR)
        self.assertEqual(rule.prerequisites, [])
        self.assertEqual(_renders(rule.order_only_prerequisites), ["build"])

    def test_rule_separators(self) -> None:
        cases = {
            ":": RuleSeparator.SINGLE_COLON,
            "::": RuleSeparator.DOUBLE_COLON,
            "&:": RuleSeparator.GROUPED_COLON,
            "&::": RuleSeparator.GROUPED_DOUBLE_COLON,
        }

        for separator, expected in cases.items():
            with self.subTest(separator=separator):
                rule = self._single(f"a b {separator} c\n\ttouch a b\n", NormalRuleIR)
                self.assertEqual(rule.separator, expected)
                self.assertEqual(_renders(rule.targets), ["a", "b"])
                self.assertEqual(_renders(rule.prerequisites), ["c"])

    def test_double_colon_rules_stay_separate(self) -> None:
        build_file = """\
blah::
\techo "hello"

blah::
\techo "hello again"
"""

        first, second = cast(list[NormalRuleIR], _compile(build_file))
        self.assertEqual(first.separator, RuleSeparator.DOUBLE_COLON)
        self.assertEqual(second.separator, RuleSeparator.DOUBLE_COLON)
        self.assertEqual(_commands(first.recipes), ['echo "hello"'])
        self.assertEqual(_commands(second.recipes), ['echo "hello again"'])

    def test_multiple_rules_keep_their_own_recipes(self) -> None:
        build_file = """\
all: one two

one:
\ttouch one
two:
\ttouch two
"""

        all_rule, one, two = cast(list[NormalRuleIR], _compile(build_file))
        self.assertEqual(_renders(all_rule.prerequisites), ["one", "two"])
        self.assertEqual(all_rule.recipes, [])
        self.assertEqual(_commands(one.recipes), ["touch one"])
        self.assertEqual(_commands(two.recipes), ["touch two"])

    def test_pattern_rule(self) -> None:
        build_file = """\
%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(_renders(rule.targets), ["%.o"])
        self.assertEqual(_renders(rule.prerequisites), ["%.c"])
        self.assertEqual(_commands(rule.recipes), ["$(CC) $(CFLAGS) -c $(<) -o $(@)"])

    def test_multiple_pattern_targets(self) -> None:
        rule = self._single("%.c %.raw:\n\ttouch $@\n", NormalRuleIR)
        self.assertEqual(_renders(rule.targets), ["%.c", "%.raw"])

    def test_match_anything_rule(self) -> None:
        rule = self._single("%:\n\texport $@ && $(MAKE) app -j4\n", NormalRuleIR)
        self.assertEqual(_renders(rule.targets), ["%"])
        self.assertEqual(_commands(rule.recipes), ["export $(@) && $(MAKE) app -j4"])

    def test_special_targets_are_normal_rules(self) -> None:
        cases = {
            ".PHONY: all clean\n": [".PHONY", ["all", "clean"]],
            ".EXPORT_ALL_VARIABLES:\n": [".EXPORT_ALL_VARIABLES", []],
            ".DELETE_ON_ERROR:\n": [".DELETE_ON_ERROR", []],
            ".SUFFIXES:\n": [".SUFFIXES", []],
        }

        for build_file, (target, prerequisites) in cases.items():
            with self.subTest(build_file=build_file):
                rule = self._single(build_file, NormalRuleIR)
                self.assertEqual(_renders(rule.targets), [target])
                self.assertEqual(_renders(rule.prerequisites), prerequisites)

    def test_variable_and_function_in_targets_and_prerequisites(self) -> None:
        build_file = """\
$(BUILD_DIR)/$(TARGET_EXEC): $(OBJS) $(wildcard *.h)
\t$(CXX) $(OBJS) -o $@ $(LDFLAGS)
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(_renders(rule.targets), ["$(BUILD_DIR)/$(TARGET_EXEC)"])
        self.assertEqual(
            _renders(rule.prerequisites), ["$(OBJS)", "$(wildcard *.h)"]
        )
        self.assertEqual(rule.prerequisites[1].parts[0].kind, "function-call")

    def test_rule_without_recipe_adds_prerequisites(self) -> None:
        build_file = """\
$(objects): defs.h
kbd.o command.o files.o: command.h
"""

        first, second = cast(list[NormalRuleIR], _compile(build_file))
        self.assertEqual(_renders(first.targets), ["$(objects)"])
        self.assertEqual(_renders(first.prerequisites), ["defs.h"])
        self.assertEqual(_renders(second.targets), ["kbd.o", "command.o", "files.o"])
        self.assertEqual(first.recipes, [])
        self.assertEqual(second.recipes, [])

    # ---------------------------------------------------------------- recipes

    def test_automatic_variables_in_recipe(self) -> None:
        build_file = """\
a: b
\techo $@ $< $^ $? $* $+ $|
"""

        rule = self._single(build_file, NormalRuleIR)
        command = rule.recipes[0].recipe
        assert command.kind == "command"
        references = [
            _render(part.name_expr)
            for part in command.command.parts
            if part.kind == "variable-reference"
        ]
        self.assertEqual(references, ["@", "<", "^", "?", "*", "+", "|"])

    def test_recipe_prefixes_are_kept_in_command(self) -> None:
        build_file = """\
all:
\t@echo silent
\t-rm missing
\t+$(MAKE) sub
\t@-false
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(
            _commands(rule.recipes),
            ["@echo silent", "-rm missing", "+$(MAKE) sub", "@-false"],
        )

    def test_recipe_ignores_blank_lines(self) -> None:
        build_file = """\
hey: one two
\techo $@

\techo $?

\ttouch hey
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(
            _commands(rule.recipes), ["echo $(@)", "echo $(?)", "touch hey"]
        )

    def test_tab_prefixed_comment_is_passed_to_the_shell(self) -> None:
        # GNU make hands tab-prefixed comment lines to the shell.
        build_file = """\
all:
\t# Outputs the target name
\techo $@
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(
            _commands(rule.recipes), ["# Outputs the target name", "echo $(@)"]
        )

    def test_recipe_keeps_shell_syntax(self) -> None:
        build_file = """\
all:
\tsh_var='I am a shell variable'; echo $$sh_var
\tprintf "a,b" | sed -e 's/^ //' > out && cat out
\tcd subdir && $(MAKE)
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(
            _commands(rule.recipes),
            [
                "sh_var='I am a shell variable'; echo $sh_var",
                "printf \"a,b\" | sed -e 's/^ //' > out && cat out",
                "cd subdir && $(MAKE)",
            ],
        )

    def test_recipe_with_function_calls(self) -> None:
        build_file = """\
all:
\t$(CC) -c -o $(OBJDIR)/$(notdir $@) $^
"""

        rule = self._single(build_file, NormalRuleIR)
        command = rule.recipes[0].recipe
        assert command.kind == "command"
        functions = [
            part.function.name
            for part in command.command.parts
            if part.kind == "function-call"
        ]
        self.assertEqual(functions, ["notdir"])
        self.assertEqual(
            _commands(rule.recipes), ["$(CC) -c -o $(OBJDIR)/$(notdir $(@)) $(^)"]
        )

    def test_recipe_line_continuation_is_one_command(self) -> None:
        build_file = """\
some_file:
\techo This line is too long, so \\
        it is broken up into multiple lines
"""

        rule = self._single(build_file, NormalRuleIR)
        commands = _commands(rule.recipes)
        self.assertEqual(len(commands), 1)
        self.assertEqual(
            commands[0].split(),
            "echo This line is too long, so it is broken up into multiple lines".split(),
        )

    # ------------------------------------------------- static pattern rules

    def test_static_pattern_rule(self) -> None:
        build_file = """\
$(objects): %.o: %.c
\t$(CC) -c $^ -o $@
"""

        rule = self._single(build_file, StaticPatternRuleIR)
        self.assertEqual(_renders(rule.targets), ["$(objects)"])
        self.assertEqual(_render(rule.target_pattern), "%.o")
        self.assertEqual(_renders(rule.prerequisites), ["%.c"])
        self.assertEqual(rule.order_only_prerequisites, [])
        self.assertEqual(rule.separator, RuleSeparator.SINGLE_COLON)
        self.assertEqual(_commands(rule.recipes), ["$(CC) -c $(^) -o $(@)"])

    def test_static_pattern_rule_with_order_only_prerequisites(self) -> None:
        build_file = """\
foo.o bar.o: %.o: %.c defs.h | build
\techo $<
"""

        rule = self._single(build_file, StaticPatternRuleIR)
        self.assertEqual(_renders(rule.targets), ["foo.o", "bar.o"])
        self.assertEqual(_render(rule.target_pattern), "%.o")
        self.assertEqual(_renders(rule.prerequisites), ["%.c", "defs.h"])
        self.assertEqual(_renders(rule.order_only_prerequisites), ["build"])

    def test_static_pattern_rule_with_filtered_targets(self) -> None:
        build_file = """\
$(filter %.result,$(obj_files)): %.result: %.raw
\techo "target: $@ prereq: $<"
"""

        rule = self._single(build_file, StaticPatternRuleIR)
        target = _only_function(rule.targets[0])
        self.assertEqual(target.name, "filter")
        self.assertEqual(_renders(target.args), ["%.result", "$(obj_files)"])
        self.assertEqual(_render(rule.target_pattern), "%.result")
        self.assertEqual(_renders(rule.prerequisites), ["%.raw"])

    # ------------------------------------------- target-specific variables

    def test_target_specific_variable(self) -> None:
        rule = self._single("all: CFLAGS += -g\n", TargetRuleIR)
        self.assertEqual(_renders(rule.targets), ["all"])
        self.assertEqual(rule.separator, RuleSeparator.SINGLE_COLON)
        assert rule.assignment is not None
        self.assertEqual(rule.assignment.type, AssignmentType.APPEND)
        self.assertEqual(_render(rule.assignment.left), "CFLAGS")
        self.assertEqual(_render(rule.assignment.right), "-g")
        self.assertEqual(rule.recipes, [])

    def test_target_specific_variable_with_prefix(self) -> None:
        for prefix, expected in (
            ("override", AssignmentPrefix.OVERRIDE),
            ("export", AssignmentPrefix.EXPORT),
        ):
            with self.subTest(prefix=prefix):
                rule = self._single(f"all: {prefix} X = 1\n", TargetRuleIR)
                assert rule.assignment is not None
                self.assertEqual(rule.assignment.prefix, expected)
                self.assertEqual(_render(rule.assignment.left), "X")
                self.assertEqual(_render(rule.assignment.right), "1")

    def test_target_specific_variable_for_multiple_targets(self) -> None:
        rule = self._single("foo bar: X := 1\n", TargetRuleIR)
        self.assertEqual(_renders(rule.targets), ["foo", "bar"])
        assert rule.assignment is not None
        self.assertEqual(rule.assignment.type, AssignmentType.SIMPLE)

    def test_pattern_specific_variable(self) -> None:
        build_file = """\
%.c: one = cool

blah.c:
\techo one is defined: $(one)
"""

        pattern_rule, rule = _compile(build_file)
        assert isinstance(pattern_rule, TargetRuleIR)
        assert isinstance(rule, NormalRuleIR)
        self.assertEqual(_renders(pattern_rule.targets), ["%.c"])
        assert pattern_rule.assignment is not None
        self.assertEqual(_render(pattern_rule.assignment.right), "cool")
        self.assertEqual(_commands(rule.recipes), ["echo one is defined: $(one)"])

    # ----------------------------------------------------------- conditionals

    def test_ifeq_and_ifneq(self) -> None:
        for keyword, kind in (("ifeq", ConditionKind.IFEQ), ("ifneq", ConditionKind.IFNEQ)):
            with self.subTest(keyword=keyword):
                build_file = f"""\
{keyword} ($(MODE),debug)
CFLAGS += -g
endif
"""

                conditional = self._single(build_file, ConditionalIR)
                self.assertEqual(conditional.kind, kind)
                assert conditional.condition is not None
                self.assertEqual(_render(conditional.condition.left), "$(MODE)")
                self.assertEqual(_render(conditional.condition.right), "debug")
                self.assertEqual(len(conditional.then_branch), 1)
                self.assertIsInstance(conditional.then_branch[0], AssignmentIR)
                self.assertEqual(conditional.else_branch, [])

    def test_ifeq_with_else(self) -> None:
        build_file = """\
ifeq ($(MODE), debug)
CFLAGS += -g
else
CFLAGS += -DNDEBUG
endif
"""

        conditional = self._single(build_file, ConditionalIR)
        assert conditional.condition is not None
        # GNU make ignores whitespace after the comma.
        self.assertEqual(_render(conditional.condition.right).strip(), "debug")
        then_ir, else_ir = conditional.then_branch[0], conditional.else_branch[0]
        assert isinstance(then_ir, AssignmentIR)
        assert isinstance(else_ir, AssignmentIR)
        self.assertEqual(_render(then_ir.right), "-g")
        self.assertEqual(_render(else_ir.right), "-DNDEBUG")

    def test_ifeq_with_empty_arguments(self) -> None:
        cases = {
            "ifeq ($(foo),)\n": ("$(foo)", ""),
            "ifneq (,$(foo))\n": ("", "$(foo)"),
            "ifeq (,)\n": ("", ""),
        }

        for header, (left, right) in cases.items():
            with self.subTest(header=header):
                conditional = self._single(f"{header}X = 1\nendif\n", ConditionalIR)
                assert conditional.condition is not None
                self.assertEqual(_render(conditional.condition.left), left)
                self.assertEqual(_render(conditional.condition.right), right)

    def test_ifeq_with_function_in_condition(self) -> None:
        build_file = """\
ifneq (,$(findstring i, $(MAKEFLAGS)))
X = 1
endif
"""

        conditional = self._single(build_file, ConditionalIR)
        assert conditional.condition is not None
        function = _only_function(conditional.condition.right)
        self.assertEqual(function.name, "findstring")
        self.assertEqual(len(function.args), 2)
        self.assertEqual(_render(function.args[0]), "i")
        self.assertEqual(_render(function.args[1]).strip(), "$(MAKEFLAGS)")

    def test_ifdef_and_ifndef(self) -> None:
        for keyword, kind in (("ifdef", ConditionKind.IFDEF), ("ifndef", ConditionKind.IFNDEF)):
            with self.subTest(keyword=keyword):
                build_file = f"""\
{keyword} DEBUG
X = 1
else
X = 2
endif
"""

                conditional = self._single(build_file, ConditionalIR)
                self.assertEqual(conditional.kind, kind)
                assert conditional.condition is not None
                self.assertEqual(_render(conditional.condition.left), "DEBUG")
                self.assertIsNone(conditional.condition.right)
                self.assertEqual(len(conditional.then_branch), 1)
                self.assertEqual(len(conditional.else_branch), 1)

    def test_ifdef_with_computed_name(self) -> None:
        conditional = self._single("ifdef $(NAME)_FLAGS\nX = 1\nendif\n", ConditionalIR)
        assert conditional.condition is not None
        self.assertEqual(_render(conditional.condition.left), "$(NAME)_FLAGS")

    def test_else_if_chain(self) -> None:
        build_file = """\
ifeq ($(A),1)
X = 1
else ifdef B
X = 2
else ifneq ($(C),3)
X = 3
else
X = 4
endif
"""

        first = self._single(build_file, ConditionalIR)
        self.assertEqual(first.kind, ConditionKind.IFEQ)
        self.assertEqual(len(first.else_branch), 1)

        second = first.else_branch[0]
        assert isinstance(second, ConditionalIR)
        self.assertEqual(second.kind, ConditionKind.IFDEF)
        self.assertEqual(len(second.else_branch), 1)

        third = second.else_branch[0]
        assert isinstance(third, ConditionalIR)
        self.assertEqual(third.kind, ConditionKind.IFNEQ)

        last = third.else_branch[0]
        assert isinstance(last, AssignmentIR)
        self.assertEqual(_render(last.right), "4")

    def test_nested_conditionals(self) -> None:
        build_file = """\
ifdef A
ifdef B
X = 1
endif
Y = 2
endif
"""

        outer = self._single(build_file, ConditionalIR)
        self.assertEqual(len(outer.then_branch), 2)
        inner = outer.then_branch[0]
        assert isinstance(inner, ConditionalIR)
        self.assertEqual(len(inner.then_branch), 1)
        self.assertIsInstance(outer.then_branch[1], AssignmentIR)

    def test_conditional_with_rules_inside(self) -> None:
        build_file = """\
ifeq ($(OS),Windows_NT)
clean:
\tdel /q build
else
clean:
\trm -rf build
endif
"""

        conditional = self._single(build_file, ConditionalIR)
        then_rule, else_rule = conditional.then_branch[0], conditional.else_branch[0]
        assert isinstance(then_rule, NormalRuleIR)
        assert isinstance(else_rule, NormalRuleIR)
        self.assertEqual(_commands(then_rule.recipes), ["del /q build"])
        self.assertEqual(_commands(else_rule.recipes), ["rm -rf build"])

    def test_empty_conditional(self) -> None:
        conditional = self._single("ifeq (a,b)\nendif\n", ConditionalIR)
        self.assertEqual(conditional.then_branch, [])
        self.assertEqual(conditional.else_branch, [])

    def test_conditional_inside_recipe(self) -> None:
        build_file = """\
all:
ifeq ($(foo),ok)
\techo "foo equals ok"
else
\techo "nope"
endif
\techo after
"""

        rule = self._single(build_file, NormalRuleIR)
        self.assertEqual(len(rule.recipes), 2)

        recipe = rule.recipes[0].recipe
        assert recipe.kind == "conditional"
        conditional = recipe.conditional
        self.assertEqual(conditional.kind, ConditionKind.IFEQ)
        self.assertEqual(
            _commands(cast(list[RecipeIR], conditional.then_branch)), ['echo "foo equals ok"']
        )
        self.assertEqual(
            _commands(cast(list[RecipeIR], conditional.else_branch)), ['echo "nope"']
        )
        self.assertEqual(_commands(rule.recipes[1:]), ["echo after"])

    def test_ifdef_inside_recipe(self) -> None:
        build_file = """\
all:
ifdef foo
\techo "foo is defined"
endif
ifndef bar
\techo "but bar is not"
endif
"""

        rule = self._single(build_file, NormalRuleIR)
        kinds = []
        for recipe_ir in rule.recipes:
            recipe = recipe_ir.recipe
            assert recipe.kind == "conditional"
            kinds.append(recipe.conditional.kind)
            assert recipe.conditional.condition is not None
            self.assertIsNone(recipe.conditional.condition.right)
        self.assertEqual(kinds, [ConditionKind.IFDEF, ConditionKind.IFNDEF])

    def test_else_if_chain_inside_recipe(self) -> None:
        build_file = """\
all:
ifeq ($(A),1)
\techo one
else
ifeq ($(A),2)
\techo two
endif
endif
"""

        rule = self._single(build_file, NormalRuleIR)
        recipe = rule.recipes[0].recipe
        assert recipe.kind == "conditional"
        self.assertEqual(_commands(cast(list[RecipeIR], recipe.conditional.then_branch)), ["echo one"])
        self.assertEqual(len(recipe.conditional.else_branch), 1)

    # ----------------------------------------------------------------- define

    def test_define_multiline_variable(self) -> None:
        build_file = """\
define two
export blah="I was set!"
echo $$blah
endef
"""

        define = self._single(build_file, DefineIR)
        self.assertIsNone(define.specifiers)
        self.assertIsNone(define.assignment_type)
        self.assertEqual(_render(define.name), "two")
        self.assertEqual(
            _render(define.value), 'export blah="I was set!"\necho $blah'
        )

    def test_define_with_assignment_operator(self) -> None:
        for operator, expected in (
            ("=", AssignmentType.RECURSIVE),
            (":=", AssignmentType.SIMPLE),
            ("::=", AssignmentType.POSIX_SIMPLE),
            ("?=", AssignmentType.CONDITIONAL),
            ("+=", AssignmentType.APPEND),
        ):
            with self.subTest(operator=operator):
                define = self._single(
                    f"define X {operator}\na $(B)\nendef\n", DefineIR
                )
                self.assertEqual(define.assignment_type, expected)
                self.assertEqual(_render(define.value), "a $(B)")

    def test_define_body_keeps_references_and_keywords(self) -> None:
        build_file = """\
define RULE_TEMPLATE
$(1): $(2) $$(CC)
ifdef DEBUG
override export include
endef
"""

        define = self._single(build_file, DefineIR)
        value = define.value
        assert value is not None
        self.assertIn("variable-reference", [part.kind for part in value.parts])
        self.assertEqual(
            _render(value).split("\n"),
            ["$(1): $(2) $(CC)", "ifdef DEBUG", "override export include"],
        )

    @unittest.expectedFailure
    def test_define_body_with_tab_prefixed_recipe_line(self) -> None:
        # Known gap: canned recipes and $(eval) templates put tab-prefixed
        # recipe lines inside define, which currently fails with
        # "missing separator".
        build_file = """\
define RULE_TEMPLATE
$(1): $(2)
\t$$(CC) -o $$@ $$^
endef
"""

        define = self._single(build_file, DefineIR)
        self.assertEqual(
            _render(define.value).split("\n"),
            ["$(1): $(2)", "\t$(CC) -o $@ $^"],
        )

    def test_empty_define(self) -> None:
        define = self._single("define EMPTY\nendef\n", DefineIR)
        self.assertEqual(_render(define.name), "EMPTY")
        self.assertEqual(_render(define.value), "")

    def test_nested_define_is_kept_as_text(self) -> None:
        build_file = """\
define outer
define inner
x
endef
endef
"""

        define = self._single(build_file, DefineIR)
        self.assertEqual(_render(define.name), "outer")
        self.assertIn("define inner", _render(define.value))
        self.assertIn("endef", _render(define.value))

    @unittest.expectedFailure
    def test_define_with_specifier(self) -> None:
        # Known gap: the grammar accepts `override define` / `export define`,
        # but parsing currently fails with "missing separator".
        for specifier, expected in (
            ("override", AssignmentPrefix.OVERRIDE),
            ("export", AssignmentPrefix.EXPORT),
        ):
            with self.subTest(specifier=specifier):
                define = self._single(f"{specifier} define X\na\nendef\n", DefineIR)
                self.assertEqual(define.specifiers, expected)

    # ------------------------------------------------------------- directives

    def test_include_directives(self) -> None:
        cases = {
            "include": "include",
            "-include": "-include",
            "sinclude": "sinclude",
        }

        for keyword, expected in cases.items():
            with self.subTest(keyword=keyword):
                include = self._single(f"{keyword} a.mk $(DEPS)\n", IncludeIR)
                self.assertEqual(include.include, expected)
                self.assertEqual(_render(include.includepath).split(), ["a.mk", "$(DEPS)"])

    def test_vpath_set_pattern(self) -> None:
        vpath_ir = self._single("vpath %.h ../headers ../other-directory\n", VpathIR)
        vpath = vpath_ir.vpath
        assert vpath.type == "set-pattern"
        self.assertEqual(_render(vpath.pattern), "%.h")
        self.assertEqual(_renders(vpath.directories), ["../headers", "../other-directory"])

    def test_vpath_with_variable_directories(self) -> None:
        vpath_ir = self._single("vpath %.c $(SRC_DIR) lib\n", VpathIR)
        vpath = vpath_ir.vpath
        assert vpath.type == "set-pattern"
        self.assertEqual(_renders(vpath.directories), ["$(SRC_DIR)", "lib"])

    def test_vpath_clear_pattern(self) -> None:
        vpath_ir = self._single("vpath %.c\n", VpathIR)
        vpath = vpath_ir.vpath
        assert vpath.type == "clear-pattern"
        self.assertEqual(_render(vpath.pattern), "%.c")

    def test_vpath_clear_all(self) -> None:
        vpath_ir = self._single("vpath\n", VpathIR)
        self.assertEqual(vpath_ir.vpath.type, "clear-all")

    def test_global_export_and_unexport(self) -> None:
        self._single("export\n", GlobalExportIR)
        self._single("unexport\n", GlobalUnexportIR)

    def test_export_and_unexport_variable(self) -> None:
        for keyword in ("export", "unexport"):
            with self.subTest(keyword=keyword):
                export = self._single(f"{keyword} shell_env_var\n", ExportIR)
                self.assertEqual(export.prefix, keyword)
                self.assertEqual(_render(export.identifier), "shell_env_var")

    def test_export_after_assignment(self) -> None:
        build_file = """\
cooly = "The subdirectory can see me!"
export cooly
"""

        assignment, export = _compile(build_file)
        assert isinstance(assignment, AssignmentIR)
        assert isinstance(export, ExportIR)
        self.assertEqual(_render(assignment.right), '"The subdirectory can see me!"')
        self.assertEqual(_render(export.identifier), "cooly")

    def test_undefine(self) -> None:
        for prefix in ("undefine", "override undefine"):
            with self.subTest(prefix=prefix):
                undefine = self._single(f"{prefix} FOO\n", UndefineIR)
                self.assertEqual(undefine.prefix, prefix)
                self.assertEqual(_render(undefine.identifier), "FOO")

    def test_hook(self) -> None:
        build_file = """\
hook {
  local x = { a = 1 }
  print("}")
}
all:
\techo done
"""

        hook, rule = _compile(build_file)
        assert isinstance(hook, HookIR)
        assert isinstance(rule, NormalRuleIR)
        self.assertEqual(
            hook.hook_program, 'local x = { a = 1 }\n  print("}")'
        )
        self.assertEqual(_commands(rule.recipes), ["echo done"])

    # -------------------------------------------------------------- functions

    def test_gnu_make_functions(self) -> None:
        cases = {
            "$(subst ee,EE,feet on the street)": ("subst", ["ee", "EE", "feet on the street"]),
            "$(patsubst %.c,%.o,a.c b.c)": ("patsubst", ["%.c", "%.o", "a.c b.c"]),
            "$(strip a b)": ("strip", ["a b"]),
            "$(findstring a,a b c)": ("findstring", ["a", "a b c"]),
            "$(filter %.c %.h,$(files))": ("filter", ["%.c %.h", "$(files)"]),
            "$(filter-out %.h,$(files))": ("filter-out", ["%.h", "$(files)"]),
            "$(sort foo bar lose)": ("sort", ["foo bar lose"]),
            "$(word 2,foo bar baz)": ("word", ["2", "foo bar baz"]),
            "$(words foo bar)": ("words", ["foo bar"]),
            "$(wordlist 2,3,foo bar baz)": ("wordlist", ["2", "3", "foo bar baz"]),
            "$(firstword foo bar)": ("firstword", ["foo bar"]),
            "$(lastword foo bar)": ("lastword", ["foo bar"]),
            "$(dir src/foo.c hacks)": ("dir", ["src/foo.c hacks"]),
            "$(notdir src/foo.c hacks)": ("notdir", ["src/foo.c hacks"]),
            "$(suffix src/foo.c)": ("suffix", ["src/foo.c"]),
            "$(basename src/foo.c)": ("basename", ["src/foo.c"]),
            "$(addsuffix .c,foo bar)": ("addsuffix", [".c", "foo bar"]),
            "$(addprefix src/,foo bar)": ("addprefix", ["src/", "foo bar"]),
            "$(join a b,.c .o)": ("join", ["a b", ".c .o"]),
            "$(wildcard *.c src/*.c)": ("wildcard", ["*.c src/*.c"]),
            "$(realpath .)": ("realpath", ["."]),
            "$(abspath ./src)": ("abspath", ["./src"]),
            "$(shell echo hi)": ("shell", ["echo hi"]),
            "$(origin CC)": ("origin", ["CC"]),
            "$(flavor CC)": ("flavor", ["CC"]),
            "$(foreach w,$(list),$(w)!)": ("foreach", ["w", "$(list)", "$(w)!"]),
            "$(if $(A),yes,no)": ("if", ["$(A)", "yes", "no"]),
            "$(if $(A),yes)": ("if", ["$(A)", "yes"]),
            "$(or $(A),$(B))": ("or", ["$(A)", "$(B)"]),
            "$(and $(A),$(B))": ("and", ["$(A)", "$(B)"]),
            "$(call fn,a,b)": ("call", ["fn", "a", "b"]),
            "$(value FOO)": ("value", ["FOO"]),
            "$(file < in.txt)": ("file", ["< in.txt"]),
        }

        for source, (name, args) in cases.items():
            with self.subTest(source=source):
                assignment = self._single(f"X := {source}\n", AssignmentIR)
                function = _only_function(assignment.right)
                self.assertEqual(function.name, name)
                self.assertEqual(_renders(function.args), args)

    def test_function_with_curly_braces(self) -> None:
        assignment = self._single('bar := ${subst not,"totally", "I am not superman"}\n', AssignmentIR)
        function = _only_function(assignment.right)
        self.assertEqual(function.name, "subst")
        self.assertEqual(len(function.args), 3)
        self.assertEqual(_render(function.args[0]), "not")
        self.assertEqual(_render(function.args[1]), '"totally"')
        self.assertEqual(_render(function.args[2]).strip(), '"I am not superman"')

    def test_function_arguments_keep_spaces(self) -> None:
        # GNU make keeps whitespace inside function arguments verbatim.
        assignment = self._single("bar := $(subst $(space), $(comma) , $(foo))\n", AssignmentIR)
        function = _only_function(assignment.right)
        self.assertEqual(len(function.args), 3)
        self.assertEqual(_render(function.args[0]), "$(space)")
        self.assertEqual(_render(function.args[1]).strip(), "$(comma)")
        self.assertEqual(_render(function.args[2]).strip(), "$(foo)")

    def test_nested_function_calls(self) -> None:
        assignment = self._single(
            "filtered = $(filter %.o,$(filter-out test%,$(objects)))\n", AssignmentIR
        )
        outer = _only_function(assignment.right)
        self.assertEqual(outer.name, "filter")
        inner = _only_function(outer.args[1])
        self.assertEqual(inner.name, "filter-out")
        self.assertEqual(_renders(inner.args), ["test%", "$(objects)"])

    def test_function_inside_text(self) -> None:
        assignment = self._single("INC_FLAGS := -I$(dir $(SRC))/include\n", AssignmentIR)
        self.assertEqual(
            [part.kind for part in assignment.right.parts],
            ["text", "function-call", "text"],
        )
        self.assertEqual(_render(assignment.right), "-I$(dir $(SRC))/include")

    def test_function_call_as_statement(self) -> None:
        cases = {
            "$(error boom)\n": ("error", ["boom"]),
            "$(warning careful)\n": ("warning", ["careful"]),
            "$(eval X = 1)\n": ("eval", ["X = 1"]),
        }

        for build_file, (name, args) in cases.items():
            with self.subTest(build_file=build_file):
                value = self._single(build_file, ValueIR)
                function = _only_function(value)
                self.assertEqual(function.name, name)
                self.assertEqual(_renders(function.args), args)

    def test_call_with_user_defined_function(self) -> None:
        build_file = """\
sweet_new_fn = Variable Name: $(0) First: $(1) Second: $(2)

all:
\t@echo $(call sweet_new_fn, go, tigers)
"""

        assignment, rule = _compile(build_file)
        assert isinstance(assignment, AssignmentIR)
        assert isinstance(rule, NormalRuleIR)
        references = [
            _render(part.name_expr)
            for part in assignment.right.parts
            if part.kind == "variable-reference"
        ]
        self.assertEqual(references, ["0", "1", "2"])

        command = rule.recipes[0].recipe
        assert command.kind == "command"
        function = next(
            part.function for part in command.command.parts if part.kind == "function-call"
        )
        self.assertEqual(function.name, "call")
        self.assertEqual([_render(arg).strip() for arg in function.args], ["sweet_new_fn", "go", "tigers"])

    def test_function_name_without_whitespace_is_variable_reference(self) -> None:
        # In GNU make `$(subst)` refers to a variable called "subst".
        for name in ("subst", "words", "lastword"):
            with self.subTest(name=name):
                assignment = self._single(f"X = $({name})\n", AssignmentIR)
                self.assertEqual(len(assignment.right.parts), 1)
                reference = assignment.right.parts[0]
                self.assertEqual(reference.kind, "variable-reference")
                assert reference.kind == "variable-reference"
                self.assertEqual(_render(reference.name_expr), name)

    def test_function_with_too_few_arguments(self) -> None:
        for source, name in (
            ("$(subst a,b)", "subst"),
            ("$(word 1)", "word"),
        ):
            with self.subTest(source=source):
                self._assert_compile_error(
                    f"X = {source}\n",
                    f"insufficient arguments to function '{name}'",
                    row=1,
                    error_type=ErrorType.SEMANTIC,
                )

    @unittest.expectedFailure
    def test_substitution_reference(self) -> None:
        # Known gap: `$(foo:.o=.c)` currently compiles to the same IR as `$(foo)`,
        # so the substitution is lost.
        plain = self._single("X := $(foo)\n", AssignmentIR)
        for source in ("$(foo:.o=.c)", "$(foo:%.o=%.c)", "${foo:.o=.c}"):
            with self.subTest(source=source):
                substituted = self._single(f"X := {source}\n", AssignmentIR)
                self.assertNotEqual(_dump(substituted.right), _dump(plain.right))

    @unittest.expectedFailure
    def test_info_function(self) -> None:
        # Known gap: `info` is not registered in the function dispatcher, so
        # `$(info hello)` compiles to a reference to a variable named "info".
        value = self._single("$(info hello)\n", ValueIR)
        function = _only_function(value)
        self.assertEqual(function.name, "info")
        self.assertEqual(_renders(function.args), ["hello"])

    # ----------------------------------------------------------------- errors

    def test_rule_without_colon_is_missing_separator(self) -> None:
        self._assert_compile_error("all\n\techo\n", "missing separator", row=1)

    def test_bare_word_after_rule_is_missing_separator(self) -> None:
        self._assert_compile_error("a:\n\techo\n\nb\n", "missing separator", row=4)

    def test_recipe_before_first_target(self) -> None:
        for build_file, row in (
            ("\techo orphan\n", 1),
            ("a = 1\n\techo orphan\n", 2),
            ("ifeq ($(foo),)\n\tX = 1\nendif\n", 2),
        ):
            with self.subTest(build_file=build_file):
                self._assert_compile_error(
                    build_file, "recipe commences before first target", row=row
                )

    def test_unterminated_variable_reference(self) -> None:
        self._assert_compile_error("X = $(A\n", "Unterminated variable reference", row=1)

    def test_unbalanced_conditionals(self) -> None:
        for build_file in (
            "ifeq ($(A),1)\nX = 1\n",
            "ifdef A\nX = 1\nelse\nX = 2\n",
            "endif\n",
            "else\n",
        ):
            with self.subTest(build_file=build_file):
                with self.assertRaises(CbuildException) as caught:
                    _compile(build_file)
                self.assertEqual(caught.exception.error_type, ErrorType.SYNTAX)

    def test_unterminated_define(self) -> None:
        with self.assertRaises(CbuildException) as caught:
            _compile("define X\nabc\n")
        self.assertEqual(caught.exception.error_type, ErrorType.SYNTAX)

    # ------------------------------------------------------- whole makefiles

    def test_complex_makefile(self) -> None:
        build_file = """\
# Compiler settings
CC := gcc
CFLAGS := -Wall -Wextra -O2
objects = main.o kbd.o

ifeq ($(MODE), debug)
CFLAGS += -g
else
CFLAGS += -DNDEBUG
endif

edit: $(objects)
\t$(CC) $(objects) -o edit $(LDFLAGS)

$(objects): defs.h

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean
clean:
\trm -f edit $(objects)
"""

        irs = _compile(build_file)
        self.assertEqual(
            [type(ir) for ir in irs],
            [
                AssignmentIR,
                AssignmentIR,
                AssignmentIR,
                ConditionalIR,
                NormalRuleIR,
                NormalRuleIR,
                NormalRuleIR,
                NormalRuleIR,
                NormalRuleIR,
            ],
        )
        edit = cast(NormalRuleIR, irs[4])
        self.assertEqual(_renders(edit.prerequisites), ["$(objects)"])
        self.assertEqual(_commands(edit.recipes), ["$(CC) $(objects) -o edit $(LDFLAGS)"])
        phony = cast(NormalRuleIR, irs[7])
        self.assertEqual(_renders(phony.targets), [".PHONY"])
        self.assertEqual(_renders(phony.prerequisites), ["clean"])

    def test_cookbook_makefile(self) -> None:
        build_file = """\
TARGET_EXEC := final_program
BUILD_DIR := ./build
SRC_DIRS := ./src
SRCS := $(shell find $(SRC_DIRS) -name '*.cpp' -or -name '*.c')
OBJS := $(SRCS:%=$(BUILD_DIR)/%.o)
DEPS := $(OBJS:.o=.d)
INC_DIRS := $(shell find $(SRC_DIRS) -type d)
INC_FLAGS := $(addprefix -I,$(INC_DIRS))
CPPFLAGS := $(INC_FLAGS) -MMD -MP

$(BUILD_DIR)/$(TARGET_EXEC): $(OBJS)
\t$(CXX) $(OBJS) -o $@ $(LDFLAGS)

$(BUILD_DIR)/%.c.o: %.c
\tmkdir -p $(dir $@)
\t$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

.PHONY: clean
clean:
\trm -r $(BUILD_DIR)

-include $(DEPS)
"""

        irs = _compile(build_file)
        self.assertEqual(sum(isinstance(ir, AssignmentIR) for ir in irs), 9)
        self.assertEqual(sum(isinstance(ir, NormalRuleIR) for ir in irs), 4)
        self.assertIsInstance(irs[-1], IncludeIR)

        inc_flags = cast(AssignmentIR, irs[7])
        function = _only_function(inc_flags.right)
        self.assertEqual(function.name, "addprefix")
        self.assertEqual(_renders(function.args), ["-I", "$(INC_DIRS)"])

        object_rule = cast(NormalRuleIR, irs[10])
        self.assertEqual(_renders(object_rule.targets), ["$(BUILD_DIR)/%.c.o"])
        self.assertEqual(
            _commands(object_rule.recipes),
            ["mkdir -p $(dir $(@))", "$(CC) $(CPPFLAGS) $(CFLAGS) -c $(<) -o $(@)"],
        )


if __name__ == "__main__":
    unittest.main()
