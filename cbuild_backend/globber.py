import glob
import os


def resolve_glob_pattern(pattern: str) -> list[str]:
    return glob.glob(
        pattern,
        root_dir=os.getcwd(),
        recursive=False,
    )
