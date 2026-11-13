#!/usr/bin/env python

import os

from cbuild_backend.core import Core
from cbuild_backend.env import Env
from cbuild_compiler.ir import IR
from cli.cli import CBuildOptions, cli
from core.frontend import frontend
from type.buildfile_meta import BuildFileMeta
from util.collect_vars import collect_cli_vars, collect_env_vars, get_target_args
from util.error_handler import ErrorHandler
from util.handle_cli_options import (
    handle_cli_options,
    normalize_options,
    resolve_build_file_path,
)


def read_build_file(build_file_path: str) -> str:
    with open(build_file_path, encoding="utf-8") as file:
        return file.read()


def _main() -> None:
    print("hello")
    options: CBuildOptions = cli.parse_args(namespace=CBuildOptions())
    args: list[str] = options.args

    # normalize and mutate original object
    normalize_options(options)

    _cbuild_backend(options, args)


def _cbuild_backend(options: CBuildOptions, args: list[str]) -> None:
    try:
        context: Env | None = None

        handle_cli_options(options)
        build_file_absolute_paths: list[str] = resolve_build_file_path(options)
        intermediate_representation: list[IR] = []
        for build_file_path in build_file_absolute_paths:
            build_file_content = read_build_file(build_file_path)
            build_file_meta = BuildFileMeta(
                absolute_path=build_file_path,
                raw_content=build_file_content,
                size=os.stat(build_file_path).st_size,
                relative_path=os.path.relpath(build_file_path, os.getcwd()),
                name=os.path.basename(build_file_path),
            )

            ir = frontend(build_file_meta)
            intermediate_representation.extend(ir)

        target_args = get_target_args(args)

        if len(target_args) == 0:
            # auto detect default target by core module

            env_vars = collect_env_vars(options)
            cli_vars = collect_cli_vars(args)
            context = Env(options)
            core = Core(context)
            core.run(
                intermediate_representation,
                {
                    "env_vars": env_vars,
                    "cli_vars": cli_vars,
                },
            )
        else:
            for target_arg in target_args:
                env_vars = collect_env_vars(options)
                cli_vars = collect_cli_vars(args)
                context = Env(options)

                core = Core(context)
                core.run(
                    intermediate_representation,
                    {
                        "env_vars": env_vars,
                        "cli_vars": cli_vars,
                        "default_target_name": target_arg,
                    },
                )
    except Exception as error:
        error_handler = ErrorHandler()
        error_handler.handle_error(error)


if __name__ == "__main__":
    _main()
