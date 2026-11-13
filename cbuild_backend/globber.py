import glob
import os


def _to_host_separator(path: str) -> str:
    # glob keeps literal pattern segments as written but joins matched segments
    # with os.sep, so results can mix separators on Windows. Only os.altsep is
    # rewritten: on POSIX a backslash is a valid file name character.
    if os.altsep is None:
        return path
    return path.replace(os.altsep, os.sep)


def resolve_glob_pattern(pattern: str) -> list[str]:
    return [
        _to_host_separator(path)
        for path in glob.glob(
            pattern,
            root_dir=os.getcwd(),
            recursive=False,
        )
    ]
