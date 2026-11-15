import json
import re
from collections.abc import Callable, Iterator
from typing import Final, Literal

from cbuild_compiler.ir import RecipeIR, TextPart, ValueIR, ValuePart
from cli.cli import CBuildOptions

type VariableFlavor = Literal["raw", "recursive"]
type VariableOrigin = Literal[
    "default",
    "environment",
    "environment-overridden",
    "file",
    "command-line",
    "override",
    "automatic",
]

VARIABLE_ORIGIN_PRIORITY_MAP: Final[dict[VariableOrigin, int]] = {
    "default": 2,
    "environment": 3,
    "file": 4,
    "environment-overridden": 5,
    "command-line": 6,
    "override": 7,
    "automatic": 1,
}


class SymbolTableVariable:
    def __init__(
        self,
        value: ValueIR,
        flavor: VariableFlavor,
        origin: VariableOrigin = "file",
        is_exported: bool = False,
    ) -> None:
        self.value = value
        self.flavor: Final = flavor
        self.origin = origin
        self.is_exported = is_exported

    @staticmethod
    def raw_variable(
        raw_value: str,
        origin: VariableOrigin = "file",
        is_exported: bool = False,
    ) -> SymbolTableVariable:
        return SymbolTableVariable(
            ValueIR([TextPart(raw_value)]),
            "raw",
            origin,
            is_exported,
        )

    @staticmethod
    def deferred_variable(
        deferred_value: ValueIR,
        origin: VariableOrigin = "file",
        is_exported: bool = False,
    ) -> SymbolTableVariable:
        return SymbolTableVariable(
            deferred_value,
            "recursive",
            origin,
            is_exported,
        )

    def get_raw_value(self) -> str | None:
        # shoudl only contiain text parts if its in not recursive variable
        if next((x for x in self.value.parts if x.kind != "text"), None):
            return None

        if self.flavor != "raw":
            return None

        raw_value = ""
        for part in self.value.parts:
            if part.kind == "text":
                raw_value += part.lexeme
        return raw_value

    def get_deferred_value(self) -> ValueIR:
        return self.value

    def is_deferred(self) -> bool:
        return self.flavor == "recursive"

    def append_values(
        self,
        value: ValueIR | ValuePart | list[ValuePart],
    ) -> SymbolTableVariable:
        self.value = ValueIR(
            [
                *self.value.parts,
                *(
                    value.parts
                    if isinstance(value, ValueIR)
                    else value
                    if isinstance(value, list)
                    else [value]
                ),
            ]
        )
        return self

    def __str__(self) -> str:
        return str(self.value) if self.value is not None else json.dumps(self.value)


class Env:
    def __init__(self, cli_options: CBuildOptions) -> None:
        self._symbol_table: Final[dict[str, SymbolTableVariable]] = {}
        self.cli_options: Final = cli_options
        self.enclosing_env: Env | None = None
        self.target_envs: dict[str, Env] = {}
        self.islate_positional_variables: bool = False
        self.phony_targets: set[str] = set()
        self.default_recipes: list[RecipeIR] = []

    @property
    def enclosing(self) -> Env | None:
        return self.enclosing_env

    @enclosing.setter
    def enclosing(self, env: Env | None) -> None:
        self.enclosing_env = env

    @property
    def has_enclosing(self) -> bool:
        return self.enclosing_env is not None

    @property
    def variable_count(self) -> int:
        return len(self._symbol_table)

    def has_variable_recursive(self, name: str) -> bool:
        if self.has_variable(name):
            return True

        if self.islate_positional_variables and re.fullmatch(r"\d+", name):
            return False

        if self.enclosing_env:
            return self.enclosing_env.has_variable_recursive(name)

        return False

    def get_variable_recursive(self, name: str) -> SymbolTableVariable | None:
        variable = self.get_variable(name)
        if variable is not None:
            return variable

        if self.islate_positional_variables and re.fullmatch(r"\d+", name):
            return None

        if self.enclosing_env:
            return self.enclosing_env.get_variable_recursive(name)

        return None

    def get_variable_or_default_recursive[T](
        self,
        name: str,
        default_value: T,
    ) -> SymbolTableVariable | T:
        variable = self.get_variable_recursive(name)
        return variable if variable is not None else default_value

    def has_variable(self, name: str) -> bool:
        return name in self._symbol_table

    def get_variable(self, name: str) -> SymbolTableVariable | None:
        return self._symbol_table.get(name)

    def require_variable_recursive(self, name: str) -> SymbolTableVariable:
        variable = self.get_variable_recursive(name)

        if variable is None:
            raise Exception(f"Undefined variable: {name}")

        return variable

    def require_variable(self, name: str) -> SymbolTableVariable:
        variable = self.get_variable(name)

        if variable is None:
            raise Exception(f"Undefined variable: {name}")

        return variable

    def get_variable_or_default[T](
        self,
        name: str,
        default_value: T,
    ) -> SymbolTableVariable | T:
        variable = self.get_variable(name)
        return variable if variable is not None else default_value

    def get_or_create_variable(
        self,
        name: str,
        factory: Callable[[], SymbolTableVariable],
    ) -> SymbolTableVariable:
        existing = self.get_variable(name)

        if existing is not None:
            return existing

        variable = factory()
        self.set_variable(name, variable)
        return variable

    def set_variable(self, name: str, variable: SymbolTableVariable) -> None:
        self._validate_entry(name, variable)
        self._symbol_table[name] = variable

    def define_variable(self, name: str, variable: SymbolTableVariable) -> None:
        self._validate_entry(name, variable)

        if self.has_variable(name):
            raise Exception(f"Variable already exists: {name}")

        self._symbol_table[name] = variable

    def define_variable_if_absent(
        self,
        name: str,
        variable: SymbolTableVariable,
    ) -> bool:
        self._validate_entry(name, variable)

        if self.has_variable(name):
            return False

        self._symbol_table[name] = variable
        return True

    def replace_variable(
        self,
        name: str,
        variable: SymbolTableVariable,
    ) -> SymbolTableVariable:
        self._validate_entry(name, variable)

        previous = self.require_variable(name)
        self._symbol_table[name] = variable

        return previous

    def update_variable(
        self,
        name: str,
        updater: Callable[[SymbolTableVariable], SymbolTableVariable],
    ) -> SymbolTableVariable:
        current = self.require_variable(name)
        next = updater(current)

        self.set_variable(name, next)
        return next

    def delete_variable(self, name: str) -> bool:
        return self._symbol_table.pop(name, None) is not None

    def remove_variable(self, name: str) -> SymbolTableVariable:
        removed = self.require_variable(name)
        del self._symbol_table[name]
        return removed

    def clear_variables(self) -> None:
        self._symbol_table.clear()

    def get_raw_variable(self, name: str) -> str | None:
        variable = self.get_variable(name)
        return variable.get_raw_value() if variable is not None else None

    def require_raw_variable(self, name: str) -> str:
        value = self.require_variable(name).get_raw_value()

        if value is None:
            raise Exception(f"Variable has no raw value: {name}")

        return value

    def get_raw_variable_or_default(self, name: str, default_value: str) -> str:
        value = self.get_raw_variable(name)
        return value if value is not None else default_value

    def get_deferred_variable(self, name: str) -> ValueIR | None:
        variable = self.get_variable(name)
        return variable.get_deferred_value() if variable is not None else None

    def require_deferred_variable(self, name: str) -> ValueIR:
        value = self.require_variable(name).get_deferred_value()

        if value is None:
            raise Exception(f"Variable has no deferred value: {name}")

        return value

    def set_raw_variable(
        self,
        name: str,
        value: str,
        origin: VariableOrigin = "file",
        is_exported: bool = False,
    ) -> None:
        if value is None:
            raise TypeError(f"Raw value cannot be null or undefined: {name}")

        self.set_variable(
            name,
            SymbolTableVariable.raw_variable(value, origin, is_exported),
        )

    def set_deferred_variable(
        self,
        name: str,
        value: ValueIR,
        origin: VariableOrigin = "file",
        is_exported: bool = False,
    ) -> None:
        if value is None:
            raise TypeError(f"Deferred value cannot be null or undefined: {name}")

        self.set_variable(
            name,
            SymbolTableVariable.deferred_variable(value, origin, is_exported),
        )

    def variable_entries(self) -> Iterator[tuple[str, SymbolTableVariable]]:
        return iter(self._symbol_table.items())

    def print_symbol_table(self) -> None:
        print("=== Symbol Table ===")

        if self.variable_count == 0:
            print("(empty)")
        else:
            for name, variable in self.variable_entries():
                print(f"{name} -> {variable}")

        print("====================")

    def _validate_entry(self, name: str, variable: SymbolTableVariable) -> None:
        if not isinstance(name, str) or len(name) == 0:
            raise TypeError("Variable name must be a non-empty string")

        if variable is None:
            raise TypeError(f"Variable cannot be null or undefined: {name}")

    def get_variable_priority(self, variable: SymbolTableVariable | str) -> int:
        symbol_table_entry = (
            variable
            if isinstance(variable, SymbolTableVariable)
            else self.get_variable(variable)
        )
        if not symbol_table_entry:
            return -1

        return VARIABLE_ORIGIN_PRIORITY_MAP.get(symbol_table_entry.origin, -1)

    def set_variable_origin(
        self,
        variable: SymbolTableVariable | str,
        origin: VariableOrigin,
    ) -> None:
        symbol_table_entry = (
            variable
            if isinstance(variable, SymbolTableVariable)
            else self.get_variable(variable)
        )
        if not symbol_table_entry:
            return

        symbol_table_entry.origin = origin

    def set_variable_exported(
        self,
        variable: SymbolTableVariable | str,
        is_exported: bool,
    ) -> None:
        symbol_table_entry = (
            variable
            if isinstance(variable, SymbolTableVariable)
            else self.get_variable(variable)
        )
        if not symbol_table_entry:
            return

        symbol_table_entry.is_exported = is_exported

    def get_exported_variables(self) -> dict[str, SymbolTableVariable]:
        exported_variables: dict[str, SymbolTableVariable] = {}
        for name, variable in self.variable_entries():
            if variable.is_exported:
                exported_variables[name] = variable
        return exported_variables

    def merge(self, env: Env) -> None:
        for name, variable in env.variable_entries():
            self.set_variable(name, variable)


def compare_var_priority(
    origin1: VariableOrigin,
    origin2: VariableOrigin,
) -> int:
    result = VARIABLE_ORIGIN_PRIORITY_MAP.get(
        origin1, 0
    ) - VARIABLE_ORIGIN_PRIORITY_MAP.get(origin2, 0)
    return 1 if result > 0 else 0 if result == 0 else -1
