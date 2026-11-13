from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class CallRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        if len(function_ir.args) == 0:
            return ""
        base_identifier = function_ir.args[0]  # exprsssion before expansion
        expanded_base_identifier = self._value_expansion_engine.expand(base_identifier)

        # should expand this expression with new environment
        base_variable = self._context.get_variable_recursive(
            expanded_base_identifier,
        )
        base_expression = base_variable.value if base_variable is not None else None

        if not base_expression:
            return ""

        env_vars: list[str] = []
        for i in range(1, len(function_ir.args)):
            arg = function_ir.args[i]
            if arg:
                env_vars.append(self._value_expansion_engine.expand(arg))
        env: Env = Env(self._context.cli_options)
        env.enclosing = self._context
        env.islate_positional_variables = True

        # $(0) identifier name
        env.set_raw_variable("0", expanded_base_identifier, "automatic", False)

        # supplied args $(1) $(2) $(3) ...
        for i in range(len(env_vars)):
            env.set_raw_variable(str(i + 1), env_vars[i], "automatic", False)

        # create new expansion engine with active lookups
        value_expansion_engine = ValueExpansionEngine(
            env,
            self._active_lookups,
        )

        result = value_expansion_engine.expand(base_expression)
        return result
