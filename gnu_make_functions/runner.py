from typing import Protocol, override

from cbuild_compiler.ir import FunctionIR


class FnRunner(Protocol):
    def subst_fn(self, ir: FunctionIR) -> str: ...
    def patsubst_fn(self, ir: FunctionIR) -> str: ...
    def strip_fn(self, ir: FunctionIR) -> str: ...
    def findstring_fn(self, ir: FunctionIR) -> str: ...
    def filter_fn(self, ir: FunctionIR) -> str: ...
    def filter_out_fn(self, ir: FunctionIR) -> str: ...
    def sort_fn(self, ir: FunctionIR) -> str: ...
    def word_fn(self, ir: FunctionIR) -> str: ...
    def words_fn(self, ir: FunctionIR) -> str: ...
    def wordlist_fn(self, ir: FunctionIR) -> str: ...
    def firstword_fn(self, ir: FunctionIR) -> str: ...
    def lastword_fn(self, ir: FunctionIR) -> str: ...
    def dir_fn(self, ir: FunctionIR) -> str: ...
    def not_dir_fn(self, ir: FunctionIR) -> str: ...
    def suffix_fn(self, ir: FunctionIR) -> str: ...
    def basename_fn(self, ir: FunctionIR) -> str: ...
    def addsuffix_fn(self, ir: FunctionIR) -> str: ...
    def addprefix_fn(self, ir: FunctionIR) -> str: ...
    def join_fn(self, ir: FunctionIR) -> str: ...
    def wildcard_fn(self, ir: FunctionIR) -> str: ...
    def realpath_fn(self, ir: FunctionIR) -> str: ...
    def abspath_fn(self, ir: FunctionIR) -> str: ...
    def error_fn(self, ir: FunctionIR) -> str: ...
    def warning_fn(self, ir: FunctionIR) -> str: ...
    def shell_fn(self, ir: FunctionIR) -> str: ...
    def origin_fn(self, ir: FunctionIR) -> str: ...
    def flavor_fn(self, ir: FunctionIR) -> str: ...
    def foreach_fn(self, ir: FunctionIR) -> str: ...
    def if_fn(self, ir: FunctionIR) -> str: ...
    def or_fn(self, ir: FunctionIR) -> str: ...
    def and_fn(self, ir: FunctionIR) -> str: ...
    def call_fn(self, ir: FunctionIR) -> str: ...
    def eval_fn(self, ir: FunctionIR) -> str: ...
    def file_fn(self, ir: FunctionIR) -> str: ...
    def value_fn(self, ir: FunctionIR) -> str: ...


class AbstractFnRunner(FnRunner):
    def subst_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("substFn not implemented.")

    def patsubst_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("patsubstFn not implemented.")

    def strip_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("stripFn not implemented.")

    def findstring_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("findstringFn not implemented.")

    def filter_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("filterFn not implemented.")

    def filter_out_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("filterOutFn not implemented.")

    def sort_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("sortFn not implemented.")

    def word_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("wordFn not implemented.")

    def words_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("wordsFn not implemented.")

    def wordlist_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("wordlistFn not implemented.")

    def firstword_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("firstwordFn not implemented.")

    def lastword_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("lastwordFn not implemented.")

    def not_dir_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("notDirFn not implemented.")

    def dir_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("dirFn not implemented.")

    def suffix_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("suffixFn not implemented.")

    def basename_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("basenameFn not implemented.")

    def addsuffix_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("addsuffixFn not implemented.")

    def addprefix_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("addprefixFn not implemented.")

    def join_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("joinFn not implemented.")

    def wildcard_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("wildcardFn not implemented.")

    def realpath_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("realpathFn not implemented.")

    def abspath_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("abspathFn not implemented.")

    def error_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("errorFn not implemented.")

    def warning_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("warningFn not implemented.")

    def shell_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("shellFn not implemented.")

    def origin_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("originFn not implemented.")

    def flavor_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("flavorFn not implemented.")

    def foreach_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("foreachFn not implemented.")

    def if_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("ifFn not implemented.")

    def or_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("orFn not implemented.")

    def and_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("andFn not implemented.")

    def call_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("callFn not implemented.")

    def eval_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("evalFn not implemented.")

    def file_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("fileFn not implemented.")

    def value_fn(self, ir: FunctionIR) -> str:
        raise NotImplementedError("valueFn not implemented.")


class BaseFnRunner(AbstractFnRunner):
    @override
    def subst_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def patsubst_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def strip_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def findstring_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def filter_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def filter_out_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def sort_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def word_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def words_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def wordlist_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def firstword_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def lastword_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def dir_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def not_dir_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def suffix_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def basename_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def addsuffix_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def addprefix_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def join_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def wildcard_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def realpath_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def abspath_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def error_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def warning_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def shell_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def origin_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def flavor_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def foreach_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def if_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def or_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def and_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def call_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def eval_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def file_fn(self, ir: FunctionIR) -> str:
        return ""

    @override
    def value_fn(self, ir: FunctionIR) -> str:
        return ""
