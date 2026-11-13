import os
import sys

from cbuild_backend.os import get_os_info
from cli.cli import CBuildOptions
from type.cbuild_exception import CbuildException, ErrorType, MachineCode
from util.file_util import file_exist_by_absolute_path, resolve_and_get_absolute_path

# "version" field of the TypeScript project's package.json
_VERSION = "1.0.0"


def handle_cli_options(options: CBuildOptions) -> None:
    _handle_version_cli_option(options)
    _handle_directory_cli_option(options)


def _handle_version_cli_option(options: CBuildOptions) -> None:
    if options.version:
        os_info = get_os_info()
        print(f"""CBuild {_VERSION}
Built for {os_info["platform"]}-{os_info["architecture"]["python"]}
Copyright (C) 2026 Yagiz Erdem
License MIT: MIT License
This is free software: you are free to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.""")
        sys.exit(0)


def _handle_directory_cli_option(options: CBuildOptions) -> None:
    if options.directory and len(options.directory) > 0:
        for dir in options.directory:
            # resolve dir to an absolute path
            cwd_abs_path = resolve_and_get_absolute_path(os.getcwd(), dir)
            os.chdir(cwd_abs_path)


def resolve_build_file_path(options: CBuildOptions) -> list[str]:
    build_files = [*(options.file or []), *(options.buildfile or [])]
    resolved_build_file_paths: list[str] = []

    # use default buildFile path
    if len(build_files) == 0:
        default_file_names = ["CBuildfile", "cbuildfile", "Buildfile"]
        for build_file in default_file_names:
            resolved_build_file_path = resolve_and_get_absolute_path(
                os.getcwd(),
                build_file,
            )

            if file_exist_by_absolute_path(resolved_build_file_path):
                return [resolved_build_file_path]
        raise CbuildException(
            row=-1,
            column=-1,
            error_type=ErrorType.PROCESS,
            machine_code=MachineCode.BUILD_FILE_NOT_FOUND,
            message="cbuild: *** No targets specified and no makefile found.  Stop.",
        )
    else:
        for build_file in build_files:
            resolved_build_file_path = resolve_and_get_absolute_path(
                os.getcwd(),
                build_file,
            )

            if not file_exist_by_absolute_path(resolved_build_file_path):
                raise CbuildException(
                    message=f"cbuild: {build_file}: No such file or directory",
                    column=-1,
                    row=-1,
                    error_type=ErrorType.PROCESS,
                    machine_code=MachineCode.BUILD_FILE_NOT_FOUND,
                )

            resolved_build_file_paths.append(resolved_build_file_path)

    return resolved_build_file_paths


def normalize_options(options: CBuildOptions) -> None:
    if not options.sequential and options.jobs == 0:
        options.jobs = 1

    if not options.backend:
        options.backend = "cbuild"
