from collections.abc import Callable
from typing import TYPE_CHECKING, Final, Protocol

from cbuild_compiler.ir import FunctionIR
from cbuild_parser.cbuildParser import cbuildParser
from gnu_make_functions.compiler.overwrite.compile_subst import compile_subst
from gnu_make_functions.compiler.overwrite.compile_patsubst import compile_patsubst
from gnu_make_functions.compiler.overwrite.compile_strip import compile_strip
from gnu_make_functions.compiler.overwrite.compile_findstring import compile_findstring
from gnu_make_functions.compiler.overwrite.compile_filter import compile_filter
from gnu_make_functions.compiler.overwrite.compile_filter_out import compile_filter_out
from gnu_make_functions.compiler.overwrite.compile_sort import compile_sort
from gnu_make_functions.compiler.overwrite.compile_word import compile_word
from gnu_make_functions.compiler.overwrite.compile_words import compile_words
from gnu_make_functions.compiler.overwrite.compile_wordlist import compile_wordlist
from gnu_make_functions.compiler.overwrite.compile_firstword import compile_firstword
from gnu_make_functions.compiler.overwrite.compile_lastword import compile_lastword
from gnu_make_functions.compiler.overwrite.compile_dir import compile_dir
from gnu_make_functions.compiler.overwrite.compile_suffix import compile_suffix
from gnu_make_functions.compiler.overwrite.compile_basename import compile_basename
from gnu_make_functions.compiler.overwrite.compile_addsuffix import compile_addsuffix
from gnu_make_functions.compiler.overwrite.compile_addprefix import compile_addprefix
from gnu_make_functions.compiler.overwrite.compile_join import compile_join
from gnu_make_functions.compiler.overwrite.compile_wildcard import compile_wildcard
from gnu_make_functions.compiler.overwrite.compile_realpath import compile_realpath
from gnu_make_functions.compiler.overwrite.compile_abspath import compile_abspath
from gnu_make_functions.compiler.overwrite.compile_error import compile_error
from gnu_make_functions.compiler.overwrite.compile_warning import compile_warning
from gnu_make_functions.compiler.overwrite.compile_shell import compile_shell
from gnu_make_functions.compiler.overwrite.compile_origin import compile_origin
from gnu_make_functions.compiler.overwrite.compile_flavor import compile_flavor
from gnu_make_functions.compiler.overwrite.compile_foreach import compile_foreach
from gnu_make_functions.compiler.overwrite.compile_if import compile_if
from gnu_make_functions.compiler.overwrite.compile_or import compile_or
from gnu_make_functions.compiler.overwrite.compile_and import compile_and
from gnu_make_functions.compiler.overwrite.compile_call import compile_call
from gnu_make_functions.compiler.overwrite.compile_eval import compile_eval
from gnu_make_functions.compiler.overwrite.compile_file import compile_file
from gnu_make_functions.compiler.overwrite.compile_value import compile_value
from gnu_make_functions.compiler.overwrite.compile_notdir import compile_notdir

if TYPE_CHECKING:
    from gnu_make_functions.runner import FnRunner


class MakeFunctionHandler(Protocol):
    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR: ...
    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]: ...
    def arity(self) -> int: ...


class MakeFunction(MakeFunctionHandler, Protocol):
    def get_fn_name(self) -> str: ...


class substFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_subst] = compile_subst()

    def get_fn_name(self) -> str:
        return "subst"

    def arity(self) -> int:
        return 3

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.subst_fn(ir)


class patsubstFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_patsubst] = compile_patsubst()

    def get_fn_name(self) -> str:
        return "patsubst"

    def arity(self) -> int:
        return 3

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.patsubst_fn(ir)


class stripFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_strip] = compile_strip()

    def get_fn_name(self) -> str:
        return "strip"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.strip_fn(ir)


class findstringFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_findstring] = compile_findstring()

    def get_fn_name(self) -> str:
        return "findstring"

    def arity(self) -> int:
        return 2

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.findstring_fn(ir)


class filterFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_filter] = compile_filter()

    def get_fn_name(self) -> str:
        return "filter"

    def arity(self) -> int:
        return 2

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.filter_fn(ir)


class filterOutFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_filter_out] = compile_filter_out()

    def get_fn_name(self) -> str:
        return "filter-out"

    def arity(self) -> int:
        return 2

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.filter_out_fn(ir)


class sortFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_sort] = compile_sort()

    def get_fn_name(self) -> str:
        return "sort"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.sort_fn(ir)


class wordFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_word] = compile_word()

    def get_fn_name(self) -> str:
        return "word"

    def arity(self) -> int:
        return 2

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.word_fn(ir)


class wordsFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_words] = compile_words()

    def get_fn_name(self) -> str:
        return "words"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.words_fn(ir)


class wordlistFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_wordlist] = compile_wordlist()

    def get_fn_name(self) -> str:
        return "wordlist"

    def arity(self) -> int:
        return 3

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.wordlist_fn(ir)


class firstwordFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_firstword] = compile_firstword()

    def get_fn_name(self) -> str:
        return "firstword"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.firstword_fn(ir)


class lastwordFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_lastword] = compile_lastword()

    def get_fn_name(self) -> str:
        return "lastword"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.lastword_fn(ir)


class notDirFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_notdir] = compile_notdir()

    def get_fn_name(self) -> str:
        return "notdir"

    def arity(self) -> int:
        return -1  # takes 0 or 1 argument, check at compiler override function

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.not_dir_fn(ir)


class dirFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_dir] = compile_dir()

    def get_fn_name(self) -> str:
        return "dir"

    def arity(self) -> int:
        return -1  # takes 0 or 1 argument, check at compiler override function

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.dir_fn(ir)


class suffixFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_suffix] = compile_suffix()

    def get_fn_name(self) -> str:
        return "suffix"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.suffix_fn(ir)


class basenameFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_basename] = compile_basename()

    def get_fn_name(self) -> str:
        return "basename"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.basename_fn(ir)


class addsuffixFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_addsuffix] = compile_addsuffix()

    def get_fn_name(self) -> str:
        return "addsuffix"

    def arity(self) -> int:
        return 2

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.addsuffix_fn(ir)


class addprefixFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_addprefix] = compile_addprefix()

    def get_fn_name(self) -> str:
        return "addprefix"

    def arity(self) -> int:
        return 2

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.addprefix_fn(ir)


class joinFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_join] = compile_join()

    def get_fn_name(self) -> str:
        return "join"

    def arity(self) -> int:
        return 2

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.join_fn(ir)


class wildcardFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_wildcard] = compile_wildcard()

    def get_fn_name(self) -> str:
        return "wildcard"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.wildcard_fn(ir)


class realpathFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_realpath] = compile_realpath()

    def get_fn_name(self) -> str:
        return "realpath"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.realpath_fn(ir)


class abspathFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_abspath] = compile_abspath()

    def get_fn_name(self) -> str:
        return "abspath"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.abspath_fn(ir)


class errorFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_error] = compile_error()

    def get_fn_name(self) -> str:
        return "error"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.error_fn(ir)


class warningFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_warning] = compile_warning()

    def get_fn_name(self) -> str:
        return "warning"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.warning_fn(ir)


class shellFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_shell] = compile_shell()

    def get_fn_name(self) -> str:
        return "shell"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.shell_fn(ir)


class originFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_origin] = compile_origin()

    def get_fn_name(self) -> str:
        return "origin"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.origin_fn(ir)


class flavorFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_flavor] = compile_flavor()

    def get_fn_name(self) -> str:
        return "flavor"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.flavor_fn(ir)


class foreachFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_foreach] = compile_foreach()

    def get_fn_name(self) -> str:
        return "foreach"

    def arity(self) -> int:
        return 3

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.foreach_fn(ir)


class ifFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_if] = compile_if()

    def get_fn_name(self) -> str:
        return "if"

    def arity(self) -> int:
        return -1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.if_fn(ir)


class orFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_or] = compile_or()

    def get_fn_name(self) -> str:
        return "or"

    def arity(self) -> int:
        return -1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.or_fn(ir)


class andFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_and] = compile_and()

    def get_fn_name(self) -> str:
        return "and"

    def arity(self) -> int:
        return -1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.and_fn(ir)


class callFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_call] = compile_call()

    def get_fn_name(self) -> str:
        return "call"

    def arity(self) -> int:
        return -1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.call_fn(ir)


class evalFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_eval] = compile_eval()

    def get_fn_name(self) -> str:
        return "eval"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.eval_fn(ir)


class fileFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_file] = compile_file()

    def get_fn_name(self) -> str:
        return "file"

    def arity(self) -> int:
        return -1  # variadic

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.file_fn(ir)


class valueFn(MakeFunction):
    def __init__(self) -> None:
        self._compiler: Final[compile_value] = compile_value()

    def get_fn_name(self) -> str:
        return "value"

    def arity(self) -> int:
        return 1

    def compile(self, ctx: cbuildParser.FunctionContext) -> FunctionIR:
        return self._compiler.compile(ctx, self)

    def resolve_runner(self, runner: FnRunner) -> Callable[[FunctionIR], str]:
        return lambda ir: runner.value_fn(ir)
