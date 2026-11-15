from dataclasses import dataclass


@dataclass
class BuildFileMeta:
    name: str
    relative_path: str
    absolute_path: str
    size: int
    raw_content: str  # program
