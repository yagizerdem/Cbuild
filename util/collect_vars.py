import os

from cbuild_backend.core import CliVar, EnvVar
from cli.cli import CBuildOptions


def collect_env_vars(options: CBuildOptions) -> list[EnvVar]:
    avoid = ["SHELL"]
    env_vars: list[EnvVar] = []
    for key in os.environ:
        value = os.environ[key]
        if value:
            # avoid env SHELL var for better UX
            if key in avoid:
                continue

            env_vars.append(
                EnvVar(
                    key=key,
                    value=value,
                )
            )

    return env_vars


def get_assignment_args(args: list[str]) -> list[str]:
    return [arg for arg in args if "=" in arg]


def get_target_args(args: list[str]) -> list[str]:
    return [arg for arg in args if "=" not in arg]


def collect_cli_vars(args: list[str]) -> list[CliVar]:
    cli_vars: list[CliVar] = []
    assignment_args = get_assignment_args(args)
    for arg in assignment_args:
        key, value = (
            arg[: arg.index("=")],
            arg[arg.index("=") + 1 :],
        )

        cli_vars.append(
            CliVar(
                key=key,
                value=value,
            )
        )

    return cli_vars
