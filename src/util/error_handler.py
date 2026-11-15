import os
import sys
import traceback
from typing import NoReturn

from cbuild_backend.env import Env
from type.cbuild_exception import CbuildException, MachineCode


class ErrorHandler:
    def __init__(self, context: Env | None = None) -> None:
        self.context: Env | None = context

    def handle_error(self, error: BaseException) -> NoReturn:
        if isinstance(error, CbuildException):
            self.handle_cbuild_error(error)
        elif isinstance(error, Exception):
            self.handle_base_error(error)
        else:
            self.handle_unknown_error(error)

    def handle_base_error(self, error: Exception) -> NoReturn:
        print(str(error), file=sys.stderr)

        if os.environ.get("DEV_MODE"):
            print("--- Error Details (Base) ---")
            print(repr(error))
            print("--- Stack Trace ---")
            print("".join(traceback.format_exception(error)))

        sys.exit(1)

    def handle_cbuild_error(self, error: CbuildException) -> NoReturn:
        print(error.message, file=sys.stderr)

        if os.environ.get("DEV_MODE"):
            print("--- Error Details (Cbuild) ---")
            print(repr(error))
            print("--- Stack Trace ---")
            print("".join(traceback.format_exception(error)))

        if error.exit_code is not None:
            sys.exit(error.exit_code)

        if error.machine_code == MachineCode.REBUILD_REQUIRED:
            sys.exit(1)

        if self.context is not None and self.context.cli_options.question:
            sys.exit(2)

        sys.exit(1)

    def handle_unknown_error(self, error: object) -> NoReturn:
        print("An unknown error occurred:", file=sys.stderr)

        if os.environ.get("DEV_MODE"):
            print("--- Error Details (Unknown) ---")
            print(repr(error))

        sys.exit(1)
