from typing import Final, override

from cbuild_backend.env import Env
from cbuild_backend.gnu_make_functions.runner.abspath_runner import AbspathRunner
from cbuild_backend.gnu_make_functions.runner.addprefix_runner import AddprefixRunner
from cbuild_backend.gnu_make_functions.runner.addsuffix_runner import AddsuffixRunner
from cbuild_backend.gnu_make_functions.runner.and_runner import AndRunner
from cbuild_backend.gnu_make_functions.runner.basname_runner import BasenameRunner
from cbuild_backend.gnu_make_functions.runner.call_runner import CallRunner
from cbuild_backend.gnu_make_functions.runner.dir_runner import DirRunner
from cbuild_backend.gnu_make_functions.runner.error_runner import ErrorRunner
from cbuild_backend.gnu_make_functions.runner.eval_runner import EvalRunner
from cbuild_backend.gnu_make_functions.runner.file_runner import FileRunner
from cbuild_backend.gnu_make_functions.runner.filter_out_runner import FilterOutRunner
from cbuild_backend.gnu_make_functions.runner.filter_runner import FilterRunner
from cbuild_backend.gnu_make_functions.runner.findstring_runner import FindStringRunner
from cbuild_backend.gnu_make_functions.runner.firstword_runner import FirstWordRunner
from cbuild_backend.gnu_make_functions.runner.flavor_runner import FlavorRunner
from cbuild_backend.gnu_make_functions.runner.foreach_runner import ForeachRunner
from cbuild_backend.gnu_make_functions.runner.if_runner import IfRunner
from cbuild_backend.gnu_make_functions.runner.join_runner import JoinRunner
from cbuild_backend.gnu_make_functions.runner.last_word_runner import LastWordRunner
from cbuild_backend.gnu_make_functions.runner.not_dir_runner import NotDirRunner
from cbuild_backend.gnu_make_functions.runner.or_runner import OrRunner
from cbuild_backend.gnu_make_functions.runner.origin_runner import OriginRunner
from cbuild_backend.gnu_make_functions.runner.patsubst_runner import PatsubstRunner
from cbuild_backend.gnu_make_functions.runner.real_path_runner import RealPathRunner
from cbuild_backend.gnu_make_functions.runner.shell_runner import ShellRunner
from cbuild_backend.gnu_make_functions.runner.sort_runner import SortRunner
from cbuild_backend.gnu_make_functions.runner.strip_runner import StripRunner
from cbuild_backend.gnu_make_functions.runner.subst_runner import SubstRunner
from cbuild_backend.gnu_make_functions.runner.suffix_runner import SuffixRunner
from cbuild_backend.gnu_make_functions.runner.value_runner import ValueRunner
from cbuild_backend.gnu_make_functions.runner.warning_runner import WarningRunner
from cbuild_backend.gnu_make_functions.runner.wildcard_runner import WildcardRunner
from cbuild_backend.gnu_make_functions.runner.word_runner import WordRunner
from cbuild_backend.gnu_make_functions.runner.wordlist_runner import WordListRunner
from cbuild_backend.gnu_make_functions.runner.words_runner import WordsRunner
from cbuild_compiler.ir import FunctionIR
from gnu_make_functions.runner import BaseFnRunner


class CbuildFnRunner(BaseFnRunner):
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        super().__init__()
        self._context: Final = context
        self._active_lookups: Final = active_lookups

    @override
    def abspath_fn(self, ir: FunctionIR) -> str:
        abs_path_runner = AbspathRunner(self._context, self._active_lookups)
        return abs_path_runner.run(ir)

    @override
    def addprefix_fn(self, ir: FunctionIR) -> str:
        addprefix_runner = AddprefixRunner(self._context, self._active_lookups)
        return addprefix_runner.run(ir)

    @override
    def addsuffix_fn(self, ir: FunctionIR) -> str:
        addsuffix_runner = AddsuffixRunner(self._context, self._active_lookups)
        return addsuffix_runner.run(ir)

    @override
    def and_fn(self, ir: FunctionIR) -> str:
        and_runner = AndRunner(self._context, self._active_lookups)
        return and_runner.run(ir)

    @override
    def basename_fn(self, ir: FunctionIR) -> str:
        basename_runner = BasenameRunner(self._context, self._active_lookups)
        return basename_runner.run(ir)

    @override
    def call_fn(self, ir: FunctionIR) -> str:
        call_runner = CallRunner(self._context, self._active_lookups)
        return call_runner.run(ir)

    @override
    def dir_fn(self, ir: FunctionIR) -> str:
        dir_runner = DirRunner(self._context, self._active_lookups)
        return dir_runner.run(ir)

    @override
    def error_fn(self, ir: FunctionIR) -> str:
        error_runner = ErrorRunner(self._context, self._active_lookups)
        return error_runner.run(ir)

    @override
    def eval_fn(self, ir: FunctionIR) -> str:
        eval_runner = EvalRunner(self._context, self._active_lookups)
        return eval_runner.run(ir)

    @override
    def file_fn(self, ir: FunctionIR) -> str:
        file_runner = FileRunner(self._context, self._active_lookups)
        return file_runner.run(ir)

    @override
    def filter_out_fn(self, ir: FunctionIR) -> str:
        filter_out_runner = FilterOutRunner(self._context, self._active_lookups)
        return filter_out_runner.run(ir)

    @override
    def filter_fn(self, ir: FunctionIR) -> str:
        filter_runner = FilterRunner(self._context, self._active_lookups)
        return filter_runner.run(ir)

    @override
    def findstring_fn(self, ir: FunctionIR) -> str:
        find_string_runner = FindStringRunner(self._context, self._active_lookups)
        return find_string_runner.run(ir)

    @override
    def firstword_fn(self, ir: FunctionIR) -> str:
        first_word_runner = FirstWordRunner(self._context, self._active_lookups)
        return first_word_runner.run(ir)

    @override
    def flavor_fn(self, ir: FunctionIR) -> str:
        flavor_runner = FlavorRunner(self._context, self._active_lookups)
        return flavor_runner.run(ir)

    @override
    def foreach_fn(self, ir: FunctionIR) -> str:
        foreach_runner = ForeachRunner(self._context, self._active_lookups)
        return foreach_runner.run(ir)

    @override
    def if_fn(self, ir: FunctionIR) -> str:
        if_runner = IfRunner(self._context, self._active_lookups)
        return if_runner.run(ir)

    @override
    def join_fn(self, ir: FunctionIR) -> str:
        join_runner = JoinRunner(self._context, self._active_lookups)
        return join_runner.run(ir)

    @override
    def lastword_fn(self, ir: FunctionIR) -> str:
        last_word_runner = LastWordRunner(self._context, self._active_lookups)
        return last_word_runner.run(ir)

    @override
    def not_dir_fn(self, ir: FunctionIR) -> str:
        not_dir_runner = NotDirRunner(self._context, self._active_lookups)
        return not_dir_runner.run(ir)

    @override
    def or_fn(self, ir: FunctionIR) -> str:
        or_runner = OrRunner(self._context, self._active_lookups)
        return or_runner.run(ir)

    @override
    def origin_fn(self, ir: FunctionIR) -> str:
        origin_runner = OriginRunner(self._context, self._active_lookups)
        return origin_runner.run(ir)

    @override
    def patsubst_fn(self, ir: FunctionIR) -> str:
        patsubst_runner = PatsubstRunner(self._context, self._active_lookups)
        return patsubst_runner.run(ir)

    @override
    def realpath_fn(self, ir: FunctionIR) -> str:
        realpath_runner = RealPathRunner(self._context, self._active_lookups)
        return realpath_runner.run(ir)

    @override
    def shell_fn(self, ir: FunctionIR) -> str:
        shell_runner = ShellRunner(self._context, self._active_lookups)
        return shell_runner.run(ir)

    @override
    def sort_fn(self, ir: FunctionIR) -> str:
        sort_runner = SortRunner(self._context, self._active_lookups)
        return sort_runner.run(ir)

    @override
    def strip_fn(self, ir: FunctionIR) -> str:
        strip_runner = StripRunner(self._context, self._active_lookups)
        return strip_runner.run(ir)

    @override
    def subst_fn(self, ir: FunctionIR) -> str:
        subst_runner = SubstRunner(self._context, self._active_lookups)
        return subst_runner.run(ir)

    @override
    def suffix_fn(self, ir: FunctionIR) -> str:
        suffix_runner = SuffixRunner(self._context, self._active_lookups)
        return suffix_runner.run(ir)

    @override
    def value_fn(self, ir: FunctionIR) -> str:
        value_runner = ValueRunner(self._context, self._active_lookups)
        return value_runner.run(ir)

    @override
    def warning_fn(self, ir: FunctionIR) -> str:
        warning_runner = WarningRunner(self._context, self._active_lookups)
        return warning_runner.run(ir)

    @override
    def wildcard_fn(self, ir: FunctionIR) -> str:
        wildcard_runner = WildcardRunner(self._context, self._active_lookups)
        return wildcard_runner.run(ir)

    @override
    def word_fn(self, ir: FunctionIR) -> str:
        words_runner = WordRunner(self._context, self._active_lookups)
        return words_runner.run(ir)

    @override
    def wordlist_fn(self, ir: FunctionIR) -> str:
        word_list_runner = WordListRunner(self._context, self._active_lookups)
        return word_list_runner.run(ir)

    @override
    def words_fn(self, ir: FunctionIR) -> str:
        words_runner = WordsRunner(self._context, self._active_lookups)
        return words_runner.run(ir)
