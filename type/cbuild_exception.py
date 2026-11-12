from __future__ import annotations

from enum import IntEnum
from typing import Final, NotRequired, TypedDict


class ErrorType(IntEnum):
    SYNTAX = 0
    SEMANTIC = 1
    PROCESS = 2


class MachineCode(IntEnum):
    # compilation
    COMPILATION_ERROR = 0
    FUNCTION_COMPILATION_ERROR = 1

    # semantic
    UNSUPPORTED_IR = 2
    INVALID_RULE_SEPERATOR = 3

    # process
    FILE_NOT_FOUND = 4
    DEPQ_NOT_FOUND = 5
    INCLUDE_FILE_NOT_FOUND = 6
    STEM_RESOLUTION_FAILED = 7
    ERROR_FN = 8
    FUNCTION_RUNTIME_ERROR = 9
    BUILD_FAILED = 10

    # depq graph
    NO_TARGET_FOUND = 11
    CIRCULAR_DEPQ = 12
    CIRCULAR_INCLUDE = 13

    # command
    SHELL_COMMAND_FAILED = 14
    SHELL_COMMAND_ABORTED = 15
    INVALID_SHELL_PATH = 16

    BUILD_FILE_NOT_FOUND = 17

    # -q flag
    REBUILD_REQUIRED = 18

    UNSUPPORTED = 19


class CbuildExceptionOptions(TypedDict):
    message: str
    error_type: ErrorType
    machine_code: MachineCode
    row: int
    column: int
    exit_code: NotRequired[int | None]


class CbuildException(Exception):
    def __init__(
        self,
        message: str,
        error_type: ErrorType,
        machine_code: MachineCode,
        row: int,
        column: int,
        exit_code: int | None = None,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.error_type: Final = error_type
        self.machine_code: Final = machine_code
        self.row: Final = row
        self.column: Final = column
        self.exit_code = exit_code

    @staticmethod
    def from_(options: CbuildExceptionOptions) -> CbuildException:
        return CbuildException(
            options["message"],
            options["error_type"],
            options["machine_code"],
            options["row"],
            options["column"],
            options.get("exit_code"),
        )
