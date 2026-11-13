import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.stem_resolver import StemResolver
from cbuild_compiler.ir import FunctionIR


class PatsubstRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        pattern = self._value_expansion_engine.expand(function_ir.args[0]).strip()
        replacement = self._value_expansion_engine.expand(function_ir.args[1]).strip()
        words = [
            word
            for word in re.split(
                r"\s+", self._value_expansion_engine.expand(function_ir.args[2]).strip()
            )
            if word
        ]
        stem_resolver = StemResolver()

        def substitute(word: str) -> str:
            stem = stem_resolver.resolve_stem(pattern, word)

            if stem is None:
                return word

            return stem_resolver.replace_stem(replacement, stem)

        return " ".join(substitute(word) for word in words)
