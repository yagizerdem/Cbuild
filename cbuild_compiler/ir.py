import re
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import StrEnum
from typing import Literal, NotRequired, Protocol, TypedDict
from type.buildfile_meta import BuildFileMeta


class Executor(Protocol):
    def exec[T](self, node: IR) -> T: ...


class IR(Protocol):
    row: int
    col: int
    build_file_meta: BuildFileMeta | None

    def exec[T](self, executor: Executor) -> T: ...


class BaseIR(ABC):
    def __init__(self, row: int = 0, col: int = 0) -> None:
        self.row = row
        self.col = col
        self.build_file_meta: BuildFileMeta | None = None

    @abstractmethod
    def exec[T](self, executor: Executor) -> T: ...


@dataclass
class TextPart:
    lexeme: str
    kind: Literal["text"] = field(default="text", init=False)


@dataclass
class VariableReferencePart:
    name_expr: ValueIR
    paren_type: Literal["(", "{"] | None = None
    kind: Literal["variable-reference"] = field(
        default="variable-reference", init=False
    )


@dataclass
class FunctionCallPart:
    function: FunctionIR
    kind: Literal["function-call"] = field(default="function-call", init=False)


type ValuePart = TextPart | VariableReferencePart | FunctionCallPart


def text_part(lexeme: str) -> ValuePart:
    return TextPart(lexeme)


def var_ref_part(
    name_expr: ValueIR,
    paren_type: Literal["(", "{"] | None = None,
) -> ValuePart:
    return VariableReferencePart(name_expr, paren_type)


def function_call_part(func: FunctionIR) -> ValuePart:
    return FunctionCallPart(func)


class ValueIR(BaseIR):
    def __init__(self, parts: list[ValuePart] | None = None) -> None:
        super().__init__()
        self.parts: list[ValuePart] = parts if parts is not None else []

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class FunctionIR(BaseIR):
    def __init__(self, name: str) -> None:
        super().__init__()
        self.name = name
        self.args: list[ValueIR] = []

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class AssignmentType(StrEnum):
    RECURSIVE = "="
    SIMPLE = ":="
    POSIX_SIMPLE = "::="
    IMMEDIATE_ESCAPED = ":::="
    CONDITIONAL = "?="
    APPEND = "+="
    SHELL = "!="


def assignment_type_from_symbol(symbol: str) -> AssignmentType:
    normalized = _normalize_symbol(symbol, "Assignment type")
    result = next((v for v in AssignmentType if v == normalized), None)

    if result is None:
        raise ValueError(f"Unknown assignment type: {symbol}")

    return result


class AssignmentPrefix(StrEnum):
    OVERRIDE = "override"
    EXPORT = "export"
    UNEXPORT = "unexport"
    OVERRIDE_EXPORT = "override export"
    EXPORT_OVERRIDE = "export override"


def assignment_prefix_from_symbol(symbol: str) -> AssignmentPrefix:
    normalized = _normalize_symbol(symbol, "Assignment prefix")
    result = next((v for v in AssignmentPrefix if v == normalized), None)

    if result is None:
        raise ValueError(f"Unknown assignment prefix: {symbol}")

    return result


def _normalize_symbol(symbol: str, name: str) -> str:
    if symbol is None:
        raise ValueError(f"{name} cannot be null")

    return re.sub(r"\s+", " ", symbol.strip())


class AssignmentIR(BaseIR):
    def __init__(
        self,
        type: AssignmentType,
        left: ValueIR | None = None,
        right: ValueIR | None = None,
        prefix: AssignmentPrefix | None = None,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        self.type = type
        self.left = left
        self.right = right
        self.prefix = prefix

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class ConditionKind(StrEnum):
    IFEQ = "ifeq"
    IFNEQ = "ifneq"
    IFDEF = "ifdef"
    IFNDEF = "ifndef"


def condition_kind_from_keyword(keyword: str) -> ConditionKind:
    if keyword is None or keyword.strip() == "":
        raise ValueError("Condition keyword cannot be null or blank")

    normalized = keyword.strip().lower()
    result = next((v for v in ConditionKind if v == normalized), None)

    if result is None:
        raise ValueError(f"Unknown condition keyword: {keyword}")

    return result


@dataclass
class Condition:
    left: ValueIR  # left must be present even in ifdef identifier
    right: ValueIR | None = None


class ConditionalIR(BaseIR):
    def __init__(
        self,
        kind: ConditionKind,
        condition: Condition,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        self.then_branch: list[IR] = []
        self.else_branch: list[IR] = []
        self.kind = kind
        self.condition: Condition | None = condition

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class Rule(IR, Protocol):
    targets: list[ValueIR]
    recipes: list[RecipeIR]


class RuleSeparator(StrEnum):
    SINGLE_COLON = ":"
    DOUBLE_COLON = "::"
    GROUPED_COLON = "&:"
    GROUPED_DOUBLE_COLON = "&::"


def rule_separator_from_symbol(symbol: str) -> RuleSeparator:
    if symbol is None or symbol.strip() == "":
        raise ValueError("Rule separator cannot be null or blank")

    normalized = symbol.strip()
    result = next((v for v in RuleSeparator if v == normalized), None)

    if result is None:
        raise ValueError(f"Unknown rule separator: {symbol}")

    return result


class NormalRuleOptions(TypedDict, total=False):
    targets: list[ValueIR]
    prerequisites: list[ValueIR]
    order_only_prerequisites: list[ValueIR]
    separator: RuleSeparator
    recipes: list[RecipeIR]


class NormalRuleIR(BaseIR):
    def __init__(
        self,
        options: NormalRuleOptions | None = None,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        options = options or {}
        self.targets: list[ValueIR] = options.get("targets", [])
        self.prerequisites: list[ValueIR] = options.get("prerequisites", [])
        self.order_only_prerequisites: list[ValueIR] = options.get(
            "order_only_prerequisites", []
        )
        self.separator: RuleSeparator = options.get(
            "separator", RuleSeparator.SINGLE_COLON
        )
        self.recipes: list[RecipeIR] = options.get("recipes", [])

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class TargetRuleOptions(TypedDict, total=False):
    targets: list[ValueIR]
    assignment: AssignmentIR
    separator: RuleSeparator


class TargetRuleIR(BaseIR):
    def __init__(
        self,
        options: TargetRuleOptions | None = None,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        options = options or {}
        self.targets: list[ValueIR] = options.get("targets", [])
        self.assignment: AssignmentIR | None = options.get("assignment")
        self.separator: RuleSeparator | None = options.get("separator")
        self.recipes: list[RecipeIR] = []

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class StaticPatternRuleOptions(TypedDict):
    targets: list[ValueIR]
    target_pattern: ValueIR
    prerequisites: NotRequired[list[ValueIR]]
    order_only_prerequisites: NotRequired[list[ValueIR]]
    recipes: NotRequired[list[RecipeIR]]
    separator: NotRequired[RuleSeparator]


class StaticPatternRuleIR(BaseIR):
    def __init__(
        self,
        options: StaticPatternRuleOptions,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        self.targets: list[ValueIR] = options.get("targets") or []
        self.target_pattern: ValueIR = options["target_pattern"]
        self.prerequisites: list[ValueIR] = options.get("prerequisites", [])
        self.order_only_prerequisites: list[ValueIR] = options.get(
            "order_only_prerequisites", []
        )
        self.recipes: list[RecipeIR] = options.get("recipes", [])
        self.separator: RuleSeparator = options.get(
            "separator", RuleSeparator.SINGLE_COLON
        )

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


@dataclass
class CommandRecipe:
    command: ValueIR
    kind: Literal["command"] = field(default="command", init=False)


@dataclass
class CommentRecipe:
    comment: str
    kind: Literal["comment"] = field(default="comment", init=False)


@dataclass
class EmptyLineRecipe:
    kind: Literal["empty-line"] = field(default="empty-line", init=False)


@dataclass
class ConditionalRecipe:
    conditional: ConditionalIR
    kind: Literal["conditional"] = field(default="conditional", init=False)


type Recipe = CommandRecipe | CommentRecipe | EmptyLineRecipe | ConditionalRecipe


class RecipeIR(BaseIR):
    # Private constructor by convention: use the static factories below
    def __init__(self, recipe: Recipe, row: int = 0, col: int = 0) -> None:
        super().__init__(row, col)
        self.recipe = recipe

    @staticmethod
    def command(command: ValueIR) -> RecipeIR:
        return RecipeIR(CommandRecipe(command))

    @staticmethod
    def comment(comment: str) -> RecipeIR:
        return RecipeIR(CommentRecipe(comment))

    @staticmethod
    def empty_line() -> RecipeIR:
        return RecipeIR(EmptyLineRecipe())

    @staticmethod
    def conditional(conditional: ConditionalIR) -> RecipeIR:
        return RecipeIR(ConditionalRecipe(conditional))

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class DefineIR(BaseIR):
    def __init__(
        self,
        specifiers: AssignmentPrefix | None = None,
        name: ValueIR | None = None,
        assignment_type: AssignmentType | None = None,
        value: ValueIR | None = None,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        self.specifiers = specifiers
        self.name = name
        self.assignment_type = assignment_type
        self.value = value

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


@dataclass
class ClearAllVpath:
    type: Literal["clear-all"] = field(default="clear-all", init=False)


@dataclass
class ClearPatternVpath:
    pattern: ValueIR
    type: Literal["clear-pattern"] = field(default="clear-pattern", init=False)


@dataclass
class SetPatternVpath:
    pattern: ValueIR
    directories: list[ValueIR]
    type: Literal["set-pattern"] = field(default="set-pattern", init=False)


type Vpath = ClearAllVpath | ClearPatternVpath | SetPatternVpath


class VpathIR(BaseIR):
    # Private constructor by convention: use the static factories below
    def __init__(self, vpath: Vpath, row: int = 0, col: int = 0) -> None:
        super().__init__(row, col)
        self.vpath = vpath

    @staticmethod
    def clear_all() -> VpathIR:
        return VpathIR(ClearAllVpath())

    @staticmethod
    def clear_pattern(pattern: ValueIR) -> VpathIR:
        return VpathIR(ClearPatternVpath(pattern))

    @staticmethod
    def set_pattern(pattern: ValueIR, directories: list[ValueIR]) -> VpathIR:
        return VpathIR(SetPatternVpath(pattern, directories))

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


type Include = Literal["include", "sinclude", "-include"]


class IncludeIR(BaseIR):
    def __init__(
        self,
        includepath: ValueIR,
        include: Include,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        self.includepath = includepath
        self.include = include

    @staticmethod
    def include_(includepath: ValueIR, row: int = 0, col: int = 0) -> IncludeIR:
        return IncludeIR(includepath, "include", row, col)

    @staticmethod
    def sinclude(includepath: ValueIR, row: int = 0, col: int = 0) -> IncludeIR:
        return IncludeIR(includepath, "sinclude", row, col)

    @staticmethod
    def dash_include(
        includepath: ValueIR,
        row: int = 0,
        col: int = 0,
    ) -> IncludeIR:
        return IncludeIR(includepath, "-include", row, col)

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class HookIR(BaseIR):
    def __init__(self, hook_program: str, row: int = 0, col: int = 0) -> None:
        super().__init__(row, col)
        self.hook_program = hook_program

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


type UndefineSpecifier = Literal["undefine", "override undefine"]


class UndefineIR(BaseIR):
    def __init__(
        self,
        identifier: ValueIR,
        prefix: UndefineSpecifier,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        self.prefix = prefix
        self.identifier = identifier

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


type ExportSpecifier = Literal["export", "unexport"]


class ExportIR(BaseIR):
    def __init__(
        self,
        identifier: ValueIR,
        prefix: ExportSpecifier,
        row: int = 0,
        col: int = 0,
    ) -> None:
        super().__init__(row, col)
        self.prefix = prefix
        self.identifier = identifier

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class GlobalExportIR(BaseIR):
    def __init__(self, row: int = 0, col: int = 0) -> None:
        super().__init__(row, col)

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)


class GlobalUnexportIR(BaseIR):
    def __init__(self, row: int = 0, col: int = 0) -> None:
        super().__init__(row, col)

    def exec[T](self, executor: Executor) -> T:
        return executor.exec(self)
