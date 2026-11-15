# codex generated

import re
import sys
from collections.abc import Callable, Sequence
from typing import NotRequired, TypedDict, cast

from cbuild_backend.env import Env, SymbolTableVariable
from cbuild_backend.model import ImplicitPatterRule, NormalRule, VpathRule
from cbuild_compiler.ir import IR, ConditionalIR, RecipeIR, ValueIR, ValuePart


class DatabasePrinterData(TypedDict):
    context: Env
    # Supply all normalized rules, not only the selected target's subgraph.
    explicit_rules: Sequence[NormalRule]
    implicit_rules: NotRequired[Sequence[ImplicitPatterRule]]
    vpaths: NotRequired[Sequence[VpathRule]]


type DatabaseWriter = Callable[[str], None]


def _default_writer(text: str) -> None:
    sys.stdout.write(text)


class DatabasePrinter:
    """
    Formats the evaluated build database without expanding values, executing IR,
    or changing build state. This is diagnostic output, not a lossless buildfile.
    Call after evaluation and normalization; printing does not stop the build.
    Source filenames and variable definition locations are not stored by the
    current models, so only known rule locations are included.
    """

    def __init__(self, write: DatabaseWriter = _default_writer) -> None:
        self._write = write

    def print_if_enabled(self, data: DatabasePrinterData) -> bool:
        """Checks --print-data-base. Returns whether a database was printed."""
        if not data["context"].cli_options.print_data_base:
            return False
        self.print(data)
        return True

    def print(self, data: DatabasePrinterData) -> None:
        """Writes the complete database once, including its trailing newline."""
        self._write(self.format(data))

    def format(self, data: DatabasePrinterData) -> str:
        """Returns a stable textual snapshot without writing to stdout."""
        return "\n\n".join(
            [
                "# CBuild database",
                self.format_variables(data["context"]),
                self.format_implicit_rules(data.get("implicit_rules") or []),
                self.format_explicit_rules(data["explicit_rules"]),
                self.format_vpaths(data.get("vpaths") or []),
                "# End of database\n",
            ]
        )

    def format_variables(self, context: Env) -> str:
        # Sort a copy; never reorder the environment's symbol table.
        entries = sorted(context.variable_entries(), key=lambda entry: entry[0])
        return self._format_section(
            "Variables",
            [self._format_variable(name, variable) for name, variable in entries],
        )

    def format_explicit_rules(self, rules: Sequence[NormalRule]) -> str:
        return self._format_section(
            "Explicit Rules",
            [
                self._format_rule(
                    rule.target,
                    rule.rule_seperator,
                    rule.prerequisites,
                    rule.order_only_prerequisites,
                    rule.evaluated_recipe_irs,
                    rule.rule_ir,
                    rule.stem,
                )
                for rule in rules
            ],
        )

    def format_implicit_rules(self, rules: Sequence[ImplicitPatterRule]) -> str:
        # Declaration order can affect implicit rule selection: preserve it.
        return self._format_section(
            "Implicit Rules",
            [
                self._format_rule(
                    rule.target_pattern,
                    rule.rule_ir.separator,
                    rule.prerequisites,
                    rule.order_only_prerequisites,
                    rule.evaluated_recipe_irs,
                    rule.rule_ir,
                )
                for rule in rules
            ],
        )

    def format_vpaths(self, rules: Sequence[VpathRule]) -> str:
        return self._format_section(
            "VPATH Search Paths",
            [" ".join([f"vpath {rule.pattern}", *rule.dirs]) for rule in rules],
        )

    def _format_section(self, title: str, entries: Sequence[str]) -> str:
        return f"# {title}\n\n{'\n\n'.join(entries) if len(entries) else '# (none)'}"

    def _format_variable(self, name: str, variable: SymbolTableVariable) -> str:
        metadata = f"# origin: {variable.origin}, flavor: {variable.flavor}, exported: {'true' if variable.is_exported else 'false'}"
        operator = "=" if variable.flavor == "recursive" else ":="
        prefix = "export " if variable.is_exported else ""
        value = self._format_value(variable.value)

        if re.search(r"[\r\n]", value):
            return f"{metadata}\n{prefix}define {name} {operator}\n{value}\nendef"

        return f"{metadata}\n{prefix}{name} {operator} {value}"

    def _format_rule(
        self,
        target: str,
        separator: str,
        prerequisites: Sequence[str],
        order_only_prerequisites: Sequence[str],
        recipes: Sequence[RecipeIR],
        source: IR,
        stem: str | None = None,
    ) -> str:
        lines: list[str] = []
        if source.row > 0:
            lines.append(f"# definition line: {source.row}, column: {source.col}")
        if stem is not None:
            lines.append(f"# stem: {stem}")

        header = f"{target}{separator}"
        if len(prerequisites):
            header += f" {' '.join(prerequisites)}"
        if len(order_only_prerequisites):
            header += f" | {' '.join(order_only_prerequisites)}"
        lines.append(header)
        for recipe in recipes:
            lines.extend(self._format_recipe(recipe))
        return "\n".join(lines)

    def _format_value(self, value: ValueIR) -> str:
        return "".join(self._format_value_part(part) for part in value.parts)

    def _format_value_part(self, part: ValuePart) -> str:
        match part.kind:
            case "text":
                return part.lexeme
            case "variable-reference":
                name = self._format_value(part.name_expr)
                if part.paren_type == "{":
                    return f"${{{name}}}"
                if part.paren_type == "(":
                    return f"$({name})"
                return f"${name}" if len(name) == 1 else f"$({name})"
            case "function-call":
                args = [self._format_value(arg) for arg in part.function.args]
                return f"$({part.function.name}{f' {",".join(args)}' if len(args) else ''})"

    def _format_recipe(self, ir: RecipeIR) -> list[str]:
        recipe = ir.recipe
        match recipe.kind:
            case "command":
                return [
                    f"\t{line}"
                    for line in re.split(r"\r\n|\n|\r", self._format_value(recipe.command))
                ]
            case "comment":
                return [
                    f"\t{line if line.lstrip().startswith('#') else f'# {line}'}"
                    for line in re.split(r"\r\n|\n|\r", recipe.comment)
                ]
            case "empty-line":
                return [""]
            case "conditional":
                return self._format_conditional(recipe.conditional)

    def _format_conditional(self, ir: ConditionalIR) -> list[str]:
        if not ir.condition:
            raise TypeError("Cannot print a conditional recipe without a condition")
        left = self._format_value(ir.condition.left)
        right = self._format_value(ir.condition.right) if ir.condition.right else ""
        condition = (
            f"({left},{right})" if ir.kind == "ifeq" or ir.kind == "ifneq" else left
        )
        lines = [
            f"{ir.kind} {condition}",
            *self._format_recipe_branch(ir.then_branch),
        ]
        if len(ir.else_branch):
            lines.extend(["else", *self._format_recipe_branch(ir.else_branch)])
        lines.append("endif")
        return lines

    def _format_recipe_branch(self, branch: Sequence[IR]) -> list[str]:
        result: list[str] = []
        for node in branch:
            if not hasattr(node, "recipe"):
                raise TypeError("Expected RecipeIR in a conditional recipe branch")
            result.extend(self._format_recipe(cast(RecipeIR, node)))
        return result
