import glob
import os


def _to_posix_separator(path: str) -> str:
    # GNU make returns wildcard matches with "/" on every platform. glob joins
    # matched segments with os.sep, so it is rewritten to "/" where it differs.
    # On POSIX os.sep is already "/" and a backslash is a valid file name
    # character, so the path is left untouched there.
    if os.sep == "/":
        return path
    return path.replace(os.sep, "/")


def resolve_glob_pattern(pattern: str) -> list[str]:
    return [
        _to_posix_separator(path)
        for path in glob.glob(
            pattern,
            root_dir=os.getcwd(),
            recursive=False,
        )
    ]
