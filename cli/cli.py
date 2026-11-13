import argparse
from collections.abc import Sequence
from typing import Any, cast


def _collect(value: str, previous: list[str]) -> list[str]:
    return previous + [value]


class _CollectAction(argparse.Action):
    def __call__(
        self,
        parser: argparse.ArgumentParser,
        namespace: argparse.Namespace,
        values: str | Sequence[Any] | None,
        option_string: str | None = None,
    ) -> None:
        setattr(
            namespace,
            self.dest,
            _collect(cast(str, values), getattr(namespace, self.dest)),
        )


cli: argparse.ArgumentParser = argparse.ArgumentParser()

cli.add_argument("--sequential", action="store_true", default=None)
cli.add_argument("--backend", metavar="string")
cli.add_argument(
    "-j",
    "--jobs",
    metavar="number",
    help="Number of jobs to run concurrently",
    type=int,
)
cli.add_argument(
    "-C",
    "--directory",
    metavar="dir",
    help="Change directory",
    action=_CollectAction,
    default=[],
)
cli.add_argument(
    "-d", action="store_true", default=None, help="Print all debugging information"
)
cli.add_argument(
    "--debug",
    metavar="options",
    nargs="?",
    const=True,
    help="Print debugging information",
)
cli.add_argument(
    "-e",
    "--environment-overrides",
    action="store_true",
    default=None,
    help="Give environment variables precedence over variables from build files",
)

cli.add_argument(
    "-f",
    "--file",
    metavar="file",
    help="Read the specified file as a build file",
    action=_CollectAction,
    default=[],
)
cli.add_argument(
    "--buildfile",
    metavar="file",
    help="Read the specified file as a build file",
    action=_CollectAction,
    default=[],
)

cli.add_argument(
    "-i",
    "--ignore-errors",
    action="store_true",
    default=None,
    help="Ignore all errors in commands executed to rebuild targets",
)
cli.add_argument(
    "-I",
    "--include-dir",
    metavar="dir",
    help="Specify a directory to search for included build files",
    action=_CollectAction,
    default=[],
)
cli.add_argument(
    "-k",
    "--keep-going",
    action="store_true",
    default=None,
    help="Continue as much as possible after an error",
)

cli.add_argument(
    "-l",
    "--load-average",
    metavar="load",
    nargs="?",
    const=True,
    type=int,
    help="Do not start new jobs if the system load average is at least the specified value",
)
cli.add_argument(
    "--max-load",
    metavar="load",
    nargs="?",
    const=True,
    type=int,
    help="Do not start new jobs if the system load average is at least the specified value",
)

cli.add_argument(
    "-n",
    "--dry-run",
    action="store_true",
    default=None,
    help="Print commands that would be executed without executing them",
)
cli.add_argument(
    "--just-print",
    action="store_true",
    default=None,
    help="Print commands that would be executed without executing them",
)
cli.add_argument(
    "--recon",
    action="store_true",
    default=None,
    help="Print commands that would be executed without executing them",
)

cli.add_argument(
    "-o",
    "--old-file",
    metavar="file",
    help="Do not rebuild the specified file and treat it as very old",
    action=_CollectAction,
    default=[],
)
cli.add_argument(
    "--assume-old",
    metavar="file",
    help="Do not rebuild the specified file and treat it as very old",
    action=_CollectAction,
    default=[],
)

cli.add_argument(
    "-p",
    "--print-data-base",
    action="store_true",
    default=None,
    help="Print the database of rules and variable values after reading the build files",
)

cli.add_argument(
    "-q",
    "--question",
    action="store_true",
    default=None,
    help="Do not run commands; exit with status 0 if targets are up to date, 1 if rebuilding is required, or 2 on error",
)

cli.add_argument(
    "-r",
    "--no-builtin-rules",
    dest="builtin_rules",
    action="store_false",
    default=True,
    help="Disable the built-in implicit rules",
)

cli.add_argument(
    "-R",
    "--no-builtin-variables",
    dest="builtin_variables",
    action="store_false",
    default=True,
    help="Disable the built-in variables and built-in implicit rules",
)

cli.add_argument(
    "-s",
    "--silent",
    action="store_true",
    default=None,
    help="Do not print commands as they are executed",
)
cli.add_argument(
    "--quiet",
    action="store_true",
    default=None,
    help="Do not print commands as they are executed",
)

cli.add_argument(
    "-S",
    "--no-keep-going",
    dest="keep_going",
    action="store_false",
    default=None,
    help="Cancel the effect of --keep-going and stop after an error",
)
cli.add_argument(
    "--stop",
    action="store_true",
    default=None,
    help="Cancel the effect of --keep-going and stop after an error",
)

cli.add_argument(
    "-t",
    "--touch",
    action="store_true",
    default=None,
    help="Touch targets instead of running their commands",
)

cli.add_argument(
    "-v",
    "--version",
    action="store_true",
    default=None,
    help="Print version information and exit",
)

cli.add_argument(
    "-w",
    "--print-directory",
    action="store_true",
    default=None,
    help="Print the working directory before and after processing",
)

cli.add_argument(
    "--no-print-directory",
    dest="print_directory",
    action="store_false",
    default=None,
    help="Disable printing of the working directory",
)

cli.add_argument(
    "-W",
    "--what-if",
    metavar="file",
    help="Pretend that the specified file has just been modified",
    action=_CollectAction,
    default=[],
)
cli.add_argument(
    "--new-file",
    metavar="file",
    help="Pretend that the specified file has just been modified",
    action=_CollectAction,
    default=[],
)
cli.add_argument(
    "--assume-new",
    metavar="file",
    help="Pretend that the specified file has just been modified",
    action=_CollectAction,
    default=[],
)

cli.add_argument(
    "--warn-undefined-variables",
    action="store_true",
    default=None,
    help="Warn when an undefined variable is referenced",
)

cli.add_argument("args", nargs="*")


class CBuildOptions(argparse.Namespace):
    sequential: bool | None
    jobs: int | None

    directory: list[str]

    d: bool | None
    debug: str | bool | None

    environment_overrides: bool | None

    file: list[str] | None
    buildfile: list[str] | None

    ignore_errors: bool | None

    include_dir: list[str]

    load_average: int | None
    max_load: int | None

    dry_run: bool | None
    just_print: bool | None
    recon: bool | None

    old_file: list[str]
    assume_old: list[str]

    print_data_base: bool | None
    question: bool | None

    builtin_rules: bool | None
    builtin_variables: bool | None

    silent: bool | None
    quiet: bool | None

    keep_going: bool | None
    stop: bool | None

    touch: bool | None
    version: bool | None

    print_directory: bool | None

    what_if: list[str]
    new_file: list[str]
    assume_new: list[str]

    warn_undefined_variables: bool | None
