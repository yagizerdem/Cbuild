import os

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine


def create_process_env(
    context: Env,
    expansion_engine: ValueExpansionEngine,
) -> dict[str, str]:
    result: dict[str, str] = {
        **os.environ,
    }

    exported_variables_entries = context.get_exported_variables()
    exported_vars_map: dict[str, str] = {}
    for identifier, exported_variable in exported_variables_entries.items():
        expanded_variable = expansion_engine.expand(exported_variable.value)
        exported_vars_map[identifier] = expanded_variable

    return {
        **result,
        **exported_vars_map,
    }
