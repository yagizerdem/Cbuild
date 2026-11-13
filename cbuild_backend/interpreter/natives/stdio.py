import sys
from types import MappingProxyType
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from cbuild_backend.interpreter.interpreter import LuaEngine


def println(stdoutput: str) -> None:
    sys.stdout.write(stdoutput + "\n")


def print_errln(stderror: str) -> None:
    sys.stderr.write(stderror + "\n")


def print_(stdoutput: str) -> None:
    sys.stdout.write(stdoutput)


def print_err(stderror: str) -> None:
    sys.stderr.write(stderror)


def register(engine: LuaEngine) -> None:
    engine.global_.set("println", println)
    engine.global_.set("printErrln", print_errln)
    engine.global_.set("print", print_)
    engine.global_.set("printErr", print_err)

    # stdio namespace
    engine.global_.set(
        "stdio",
        MappingProxyType(
            {
                "println": println,
                "printErrln": print_errln,
                "print": print_,
                "printErr": print_err,
            }
        ),
    )
