from dataclasses import dataclass


@dataclass
class Pair[T1, T2]:
    first: T1
    second: T2
