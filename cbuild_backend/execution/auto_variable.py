from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.execution.preq_resolution.type import (
    OutOfDateResolution,
    PreqResolution,
    TargetResolution,
)
from cbuild_backend.model import NormalRule
from type.buildfile_meta import BuildFileMeta


class AutomaticVariableEnv:
    def __init__(
        self,
        rule: NormalRule,
        enclosing: Env,
        resolved_target: TargetResolution | None,
        resolved_preqs: list[PreqResolution],
        resolved_order_only_preqs: list[PreqResolution],
        out_of_date_resolution: OutOfDateResolution | None,
        build_file_meta: BuildFileMeta | None = None,
    ) -> None:
        self._rule: Final = rule
        self._enclosing: Final = enclosing
        self._resolved_target: Final = resolved_target
        self._resolved_preqs: Final = resolved_preqs
        self._resolved_order_only_preqs: Final = resolved_order_only_preqs
        self._out_of_date_resolution: Final = out_of_date_resolution
        self._build_file_meta: Final = build_file_meta

    # can accept more spesific enclosing
    def generate(self, enclosing: Env | None = None) -> Env:
        env: Env = Env(self._enclosing.cli_options)
        env.enclosing = enclosing if enclosing is not None else self._enclosing

        env.set_raw_variable("@", self.generate_at_var(), "automatic", False)
        env.set_raw_variable("%", self.generate_percent_var(), "automatic", False)
        env.set_raw_variable("<", self.generate_less_than_var(), "automatic", False)
        env.set_raw_variable("?", self.generate_question_mark_var(), "automatic", False)
        env.set_raw_variable("^", self.generate_caret_var(), "automatic", False)
        env.set_raw_variable("+", self.generate_plus_var(), "automatic", False)
        env.set_raw_variable("|", self.generate_pipe_var(), "automatic", False)
        env.set_raw_variable("@D", self.generate_at_d_var(), "automatic", False)
        env.set_raw_variable("@F", self.generate_at_f_var(), "automatic", False)
        env.set_raw_variable("<D", self.generate_less_than_d_var(), "automatic", False)
        env.set_raw_variable("<F", self.generate_less_than_f_var(), "automatic", False)
        env.set_raw_variable("^D", self.generate_caret_d_var(), "automatic", False)
        env.set_raw_variable("^F", self.generate_caret_f_var(), "automatic", False)
        env.set_raw_variable("+D", self.generate_plus_d_var(), "automatic", False)
        env.set_raw_variable("+F", self.generate_plus_f_var(), "automatic", False)
        env.set_raw_variable("?D", self.generate_question_d_var(), "automatic", False)
        env.set_raw_variable("?F", self.generate_question_f_var(), "automatic", False)

        return env

    def generate_at_var(self) -> str:
        return (
            self._resolved_target.target_name
            if self._resolved_target is not None
            else None
        ) or ""

    # $%
    def generate_percent_var(self) -> str:
        # cbuild does not support archive target
        return ""

    # $<
    def generate_less_than_var(self) -> str:
        first_preq = self._resolved_preqs[0] if len(self._resolved_preqs) else None
        return (first_preq.preq_name if first_preq is not None else None) or ""

    # $?
    def generate_question_mark_var(self) -> str:
        out_of_date_preq_names = (
            [preq.preq_name for preq in self._out_of_date_resolution.out_of_date_preqs]
            if self._out_of_date_resolution is not None
            else []
        )

        # filter duplicates
        unique_out_of_date_preq_names = list(dict.fromkeys(out_of_date_preq_names))
        return " ".join(unique_out_of_date_preq_names)

    # $^
    def generate_caret_var(self) -> str:
        all_preq_names = [preq.preq_name or "" for preq in self._resolved_preqs]
        # filter duplicates
        unique_all_preq_names = list(dict.fromkeys(all_preq_names))
        return " ".join(unique_all_preq_names)

    # $+
    def generate_plus_var(self) -> str:
        all_preq_names = [preq.preq_name or "" for preq in self._resolved_preqs]
        return " ".join(all_preq_names)

    # $|
    def generate_pipe_var(self) -> str:
        all_order_only_preq_names = [
            preq.preq_name or "" for preq in self._resolved_order_only_preqs
        ]
        # filter duplicates
        unique_all_order_only_preq_names = list(
            dict.fromkeys(all_order_only_preq_names)
        )
        return " ".join(unique_all_order_only_preq_names)

    # @D
    def generate_at_d_var(self) -> str:
        target = self._rule.target
        dir = self._dir_part(target)
        return dir

    # @F
    def generate_at_f_var(self) -> str:
        target = self._rule.target
        file = self._file_part(target)
        return file

    # $(<D)
    def generate_less_than_d_var(self) -> str:
        first_preq = self.generate_less_than_var()
        return "" if first_preq == "" else self._dir_part(first_preq)

    # $(<F)
    def generate_less_than_f_var(self) -> str:
        first_preq = self.generate_less_than_var()
        return "" if first_preq == "" else self._file_part(first_preq)

    # $(^D)
    def generate_caret_d_var(self) -> str:
        all_preq_names = [preq.preq_name or "" for preq in self._resolved_preqs]
        # filter duplicates
        unique_all_preq_names = list(dict.fromkeys(all_preq_names))
        return " ".join(self._dir_part(preq) for preq in unique_all_preq_names)

    # $(^F)
    def generate_caret_f_var(self) -> str:
        all_preq_names = [preq.preq_name or "" for preq in self._resolved_preqs]
        # filter duplicates
        unique_all_preq_names = list(dict.fromkeys(all_preq_names))
        return " ".join(self._file_part(preq) for preq in unique_all_preq_names)

    # $(+D)
    def generate_plus_d_var(self) -> str:
        all_preq_names = [preq.preq_name or "" for preq in self._resolved_preqs]
        return " ".join(self._dir_part(preq) for preq in all_preq_names)

    # $(+F)
    def generate_plus_f_var(self) -> str:
        all_preq_names = [preq.preq_name or "" for preq in self._resolved_preqs]
        return " ".join(self._file_part(preq) for preq in all_preq_names)

    # ?D
    def generate_question_d_var(self) -> str:
        out_of_date_preq_names = (
            [preq.preq_name for preq in self._out_of_date_resolution.out_of_date_preqs]
            if self._out_of_date_resolution is not None
            else []
        )

        # filter duplicates
        unique_out_of_date_preq_names = list(dict.fromkeys(out_of_date_preq_names))
        return " ".join(self._dir_part(preq) for preq in unique_out_of_date_preq_names)

    # ?F
    def generate_question_f_var(self) -> str:
        out_of_date_preq_names = (
            [preq.preq_name for preq in self._out_of_date_resolution.out_of_date_preqs]
            if self._out_of_date_resolution is not None
            else []
        )

        # filter duplicates
        unique_out_of_date_preq_names = list(dict.fromkeys(out_of_date_preq_names))
        return " ".join(
            self._file_part(preq) for preq in unique_out_of_date_preq_names
        )

    # gnu make compatible independent from underlying OS path conventions

    def _dir_part(self, file_name: str) -> str:
        last_slash = file_name.rfind("/")

        if last_slash == -1:
            return "."

        return file_name[:last_slash]

    # gnu make compatible independent from underlying OS path conventions
    def _file_part(self, file_name: str) -> str:
        last_slash = file_name.rfind("/")

        if last_slash == -1:
            return file_name

        return file_name[last_slash + 1 :]
