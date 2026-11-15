from cbuild_backend.env import VARIABLE_ORIGIN_PRIORITY_MAP, SymbolTableVariable
from cbuild_backend.env import VariableOrigin
from cbuild_compiler.ir import AssignmentPrefix
from typing import cast
from cbuild_backend.env import Env


def assignment_prefix_to_variable_origin(
        prefix: AssignmentPrefix | None,
    ) -> VariableOrigin:
        match prefix:
            case "export override" | "override" | "override export":
                return "override"
            case _:
                return "file"

def get_prefix_priority(prefix: AssignmentPrefix | None) -> int:
    match prefix:
        case "export override" | "override" | "override export":
            return VARIABLE_ORIGIN_PRIORITY_MAP["override"]
        case _:
            return VARIABLE_ORIGIN_PRIORITY_MAP["file"]

def should_export(
    identifier: str,
    prefix: AssignmentPrefix | None,
    context: Env
) -> bool:
    if prefix == "unexport":
        return False
    if prefix == "export override" or prefix == "export" or prefix == "override export":
        return True
    if (
        context.has_variable(identifier)
        and cast(SymbolTableVariable, context.get_variable(identifier)).is_exported
    ):
        return True
    if prefix is None:
        return False
    return False
