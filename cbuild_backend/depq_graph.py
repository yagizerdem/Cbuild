from cbuild_backend.model import NormalRule
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

# Sentinel that mirrors calling getTargetSubgraph(rules) with a single argument.
_NO_ACTIVE_TARGET = object()


def has_circular_dependency(rules: list[NormalRule]) -> bool:
    graph: dict[str, list[str]] = {}

    for rule in rules:
        prerequisites = graph.get(rule.target, [])
        prerequisites.extend([*rule.prerequisites, *rule.order_only_prerequisites])
        graph[rule.target] = prerequisites

    visited: set[str] = set()
    active_path: set[str] = set()

    for target in graph.keys():
        if _has_circular_dependency_recursive(target, graph, visited, active_path):
            return True

    return False


def _has_circular_dependency_recursive(
    target: str,
    graph: dict[str, list[str]],
    visited: set[str],
    active_path: set[str],
) -> bool:
    if target in active_path:
        return True

    if target in visited:
        return False

    active_path.add(target)

    for prerequisite in graph.get(target, []):
        if prerequisite in graph and _has_circular_dependency_recursive(
            prerequisite, graph, visited, active_path
        ):
            return True

    active_path.discard(target)
    visited.add(target)

    return False


def get_target_subgraph(
    rules: list[NormalRule],
    active_target: str | None | object = _NO_ACTIVE_TARGET,
) -> list[NormalRule]:
    if active_target is _NO_ACTIVE_TARGET:
        return get_target_subgraph(rules, find_default_target_name(rules))

    sub_graph: list[NormalRule] = []
    stack: list[str | None | object] = []
    visited_targets: set[str | None | object] = set()

    stack.append(active_target)

    while len(stack) > 0:
        current_target = stack.pop()

        if current_target in visited_targets:
            continue

        visited_targets.add(current_target)

        for rule in rules:
            if rule.target == current_target:
                sub_graph.append(rule)
                stack.extend([*rule.prerequisites, *rule.order_only_prerequisites])

    if has_circular_dependency(sub_graph):
        raise CbuildException(
            column=-1,
            row=-1,
            error_type=ErrorType.SEMANTIC,
            machine_code=MachineCode.CIRCULAR_DEPQ,
            message=f"cbuild: Circular dependency detected while resolving target '{active_target}'. Stop.",
        )

    return sub_graph


def find_default_target_name(rules: list[NormalRule]) -> str | None:
    if len(rules) == 0:
        return None
    return rules[0].target


def find_target_rule(
    rules: list[NormalRule],
    target: str,
) -> NormalRule:
    for rule in rules:
        if rule.target == target:
            return rule
    raise CbuildException(
        column=-1,
        row=-1,
        error_type=ErrorType.PROCESS,
        machine_code=MachineCode.FILE_NOT_FOUND,
        message=f"cbuild: Target not found: {target}. Stop.",
    )


def find_target_list(
    rules: list[NormalRule],
    target: str,
) -> list[NormalRule]:
    target_rules: list[NormalRule] = [r for r in rules if r.target == target]

    if len(target_rules) == 0:
        raise CbuildException(
            column=-1,
            row=-1,
            error_type=ErrorType.PROCESS,
            machine_code=MachineCode.FILE_NOT_FOUND,
            message=f"cbuild: Target not found: {target}. Stop.",
        )
    return target_rules


def find_rule_by_uuid(rules: list[NormalRule], uuid: str) -> NormalRule:
    for rule in rules:
        if rule.uuid == uuid:
            return rule

    # programmatic error
    raise Exception(f"rule with uuid {uuid} not found")


# preserve order of targets
def find_top_level_targets(rules: list[NormalRule]) -> list[str]:
    prerequisite_targets: set[str] = set(
        name
        for rule in rules
        for name in [*rule.prerequisites, *rule.order_only_prerequisites]
    )

    return [
        target
        for target in dict.fromkeys(rule.target for rule in rules)
        if target not in prerequisite_targets
    ]


def get_all_subgraphs(rules: list[NormalRule]) -> list[list[NormalRule]]:
    sub_graphs: list[list[NormalRule]] = []
    top_level_targets: list[str] = find_top_level_targets(rules)
    for target in top_level_targets:
        sub_graphs.append(get_target_subgraph(rules, target))
    return sub_graphs


def topological_sort(
    graph: list[NormalRule],
    start_node: NormalRule,
) -> list[NormalRule]:
    rules_by_target: dict[str, list[NormalRule]] = {}

    for rule in graph:
        if rule.target not in rules_by_target:
            rules_by_target[rule.target] = []

        rules_by_target[rule.target].append(rule)

    sorted: list[NormalRule] = []
    visiting_targets: set[str] = set()
    visited_targets: set[str] = set()

    _topological_sort_recursive(
        start_node.target,
        rules_by_target,
        visiting_targets,
        visited_targets,
        sorted,
    )

    return sorted


def _topological_sort_recursive(
    target: str,
    rules_by_target: dict[str, list[NormalRule]],
    visiting_targets: set[str],
    visited_targets: set[str],
    sorted: list[NormalRule],
) -> None:
    if target in visited_targets:
        return

    if target in visiting_targets:
        raise CbuildException(
            column=-1,
            row=-1,
            error_type=ErrorType.SEMANTIC,
            machine_code=MachineCode.CIRCULAR_DEPQ,
            message=f"cbuild: Circular dependency detected while sorting target '{target}'. Stop.",
        )

    visiting_targets.add(target)

    target_rules: list[NormalRule] = rules_by_target.get(target, [])

    for rule in target_rules:
        for prerequisite in [*rule.prerequisites, *rule.order_only_prerequisites]:
            if prerequisite in rules_by_target:
                _topological_sort_recursive(
                    prerequisite,
                    rules_by_target,
                    visiting_targets,
                    visited_targets,
                    sorted,
                )

    visiting_targets.discard(target)
    visited_targets.add(target)
    sorted.extend(target_rules)
