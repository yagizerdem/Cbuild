import os
import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.process import ProcessRunner, default_shell
from cbuild_compiler.ir import FunctionIR


class ShellRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        command = self._value_expansion_engine.expand(function_ir.args[0])
        shell = default_shell()
        shell_variable = self._context.get_variable_recursive("SHELL")

        if shell_variable is not None:
            shell_path = self._value_expansion_engine.expand(shell_variable.value).strip()

            if shell_path != "":
                shell["executable"] = shell_path

        exported_vars_map: dict[str, str] = {}
        for identifier, variable in self._context.get_exported_variables().items():
            exported_vars_map[identifier] = self._value_expansion_engine.expand(
                variable.value,
            )

        result = ProcessRunner().run_sync(
            command,
            {
                "shell": shell,
                "cwd": os.getcwd(),
                "env": {**os.environ, **exported_vars_map},
                "output": "capture",
                "ignore_errors": True,
            },
        )

        self._context.set_raw_variable(
            ".SHELLSTATUS",
            "" if result.exit_code is None else str(result.exit_code),
            "automatic",
        )

        return re.sub(
            r"\n",
            " ",
            re.sub(r"\n+$", "", result.stdout.replace("\r\n", "\n")),
        )
