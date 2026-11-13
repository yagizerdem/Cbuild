from cbuild_backend.model import NormalRule

type RuleUUID = str
type TargetName = str


# maps rule uuid to preq rules
def create_target_map(
    rules: list[NormalRule],
) -> dict[RuleUUID, list[NormalRule]]:
    rules_by_target: dict[TargetName, list[NormalRule]] = {}

    # merges rules with same target names into array
    for rule in rules:
        existing = rules_by_target.get(rule.target)

        if existing:
            existing.append(rule)
        else:
            rules_by_target[rule.target] = [rule]

    target_map: dict[RuleUUID, list[NormalRule]] = {}

    for rule in rules:
        dependencies: list[NormalRule] = []

        for prerequisite in [*rule.prerequisites, *rule.order_only_prerequisites]:
            matches = rules_by_target.get(prerequisite)

            if matches:
                dependencies.extend(matches)

        target_map[rule.uuid] = dependencies

    return target_map


def create_reverse_target_map(
    rules: list[NormalRule],
) -> dict[RuleUUID, list[NormalRule]]:
    rules_by_target: dict[TargetName, list[NormalRule]] = {}

    # merges rules with same target names into array
    for rule in rules:
        existing = rules_by_target.get(rule.target)

        if existing:
            existing.append(rule)
        else:
            rules_by_target[rule.target] = [rule]

    reverse_target_map: dict[RuleUUID, list[NormalRule]] = {}

    for rule in rules:
        for preq in [*rule.prerequisites, *rule.order_only_prerequisites]:
            preq_rules = rules_by_target.get(preq)
            if not preq_rules:
                continue  # No rule produces this prerequisite; it may be a filesystem or external dependency.

            for preq_rule in preq_rules:
                existing = reverse_target_map.get(preq_rule.uuid)
                if existing:
                    existing.append(rule)
                else:
                    reverse_target_map[preq_rule.uuid] = [rule]

    return reverse_target_map
