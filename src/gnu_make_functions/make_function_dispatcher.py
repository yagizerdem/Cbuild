from typing import ClassVar, Final, cast

from gnu_make_functions import type
from gnu_make_functions.type import MakeFunctionHandler


class make_function_dispatcher:
    _handlers: Final[dict[str, MakeFunctionHandler]] = {}

    _initialized: ClassVar[bool] = False

    @staticmethod
    def _initialize() -> None:
        if make_function_dispatcher._initialized:
            return

        make_function_dispatcher._initialized = True
        make_function_dispatcher.register("subst", type.substFn())
        make_function_dispatcher.register("patsubst", type.patsubstFn())
        make_function_dispatcher.register("strip", type.stripFn())
        make_function_dispatcher.register("findstring", type.findstringFn())
        make_function_dispatcher.register("filter", type.filterFn())
        make_function_dispatcher.register("filter-out", type.filterOutFn())
        make_function_dispatcher.register("sort", type.sortFn())
        make_function_dispatcher.register("word", type.wordFn())
        make_function_dispatcher.register("words", type.wordsFn())
        make_function_dispatcher.register("wordlist", type.wordlistFn())
        make_function_dispatcher.register("firstword", type.firstwordFn())
        make_function_dispatcher.register("lastword", type.lastwordFn())
        make_function_dispatcher.register("notdir", type.notDirFn())
        make_function_dispatcher.register("dir", type.dirFn())
        make_function_dispatcher.register("suffix", type.suffixFn())
        make_function_dispatcher.register("basename", type.basenameFn())
        make_function_dispatcher.register("addsuffix", type.addsuffixFn())
        make_function_dispatcher.register("addprefix", type.addprefixFn())
        make_function_dispatcher.register("join", type.joinFn())
        make_function_dispatcher.register("wildcard", type.wildcardFn())
        make_function_dispatcher.register("realpath", type.realpathFn())
        make_function_dispatcher.register("abspath", type.abspathFn())
        make_function_dispatcher.register("error", type.errorFn())
        make_function_dispatcher.register("warning", type.warningFn())
        make_function_dispatcher.register("shell", type.shellFn())
        make_function_dispatcher.register("origin", type.originFn())
        make_function_dispatcher.register("flavor", type.flavorFn())
        make_function_dispatcher.register("foreach", type.foreachFn())
        make_function_dispatcher.register("if", type.ifFn())
        make_function_dispatcher.register("or", type.orFn())
        make_function_dispatcher.register("and", type.andFn())
        make_function_dispatcher.register("call", type.callFn())
        make_function_dispatcher.register("eval", type.evalFn())
        make_function_dispatcher.register("file", type.fileFn())
        make_function_dispatcher.register("value", type.valueFn())

    @staticmethod
    def register(name: str, handler: MakeFunctionHandler) -> None:
        make_function_dispatcher._handlers[name] = handler

    def has(self, name: str) -> bool:
        make_function_dispatcher._initialize()
        return name in make_function_dispatcher._handlers

    def is_gnu_make_function(self, name: str, arg_size: int) -> bool:
        flag = self.has(name)
        if not flag:
            return False
        fn = make_function_dispatcher._handlers.get(name)
        if not fn:
            return False
        if arg_size == 0 and fn.arity() != 0:
            return False

        return flag

    def get_handler(self, name: str) -> MakeFunctionHandler:
        make_function_dispatcher._initialize()
        return cast(MakeFunctionHandler, make_function_dispatcher._handlers.get(name))
