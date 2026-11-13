from typing import Any, cast

from cli.cli import CBuildOptions


class _EmptyCBuildOptions:
    # Mirrors `{} as CBuildOptions`: every option that was never set reads as None.
    def __getattr__(self, name: str) -> Any:
        return None


def empty_cli_options() -> CBuildOptions:
    return cast(CBuildOptions, _EmptyCBuildOptions())
