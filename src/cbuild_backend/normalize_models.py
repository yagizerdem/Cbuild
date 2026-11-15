from cbuild_backend.model import NormalRule
from cbuild_compiler.ir import RuleSeparator
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class NormalizeModels:
    def __init__(self, explicit_rules: list[NormalRule]) -> None:
        self.explicit_rules: list[NormalRule] = explicit_rules
        self.target_name_rule_map: dict[str, list[NormalRule]] = {}

    def normalize(self) -> list[NormalRule]:
        self._create_target_name_rule_map()
        self._validate_rule_seperators()
        self.explicit_rules = self._normalize_rule()
        return self.explicit_rules

    def _validate_rule_seperators(self) -> None:
        for target, rules in self.target_name_rule_map.items():
            for i in range(len(rules) - 1):
                cur_rule = rules[i]
                next_rule = rules[i + 1]

                if cur_rule.rule_seperator != next_rule.rule_seperator:
                    raise CbuildException(
                        column=cur_rule.rule_ir.col,
                        row=cur_rule.rule_ir.row,
                        error_type=ErrorType.PROCESS,
                        machine_code=MachineCode.INVALID_RULE_SEPERATOR,
                        message=f"buildfile:{cur_rule.rule_ir.row}: *** target file '{target}' has both : and :: entries.  Stop.",
                    )

    def _create_target_name_rule_map(self) -> None:
        for rule in self.explicit_rules:
            if rule.target in self.target_name_rule_map:
                self.target_name_rule_map[rule.target].append(rule)
            else:
                self.target_name_rule_map[rule.target] = [rule]

    def _normalize_rule(self) -> list[NormalRule]:
        normalized_rules: list[NormalRule] = []

        for rules in self.target_name_rule_map.values():
            if len(rules) == 0:
                continue

            first_rule = rules[0]

            if first_rule.rule_seperator == RuleSeparator.DOUBLE_COLON:
                normalized_rules.extend(rules)
                continue

            prerequisites: list[str] = []
            order_only_prerequisites: list[str] = []

            recipe_rule: NormalRule | None = None

            for rule in rules:
                prerequisites.extend(rule.prerequisites)
                order_only_prerequisites.extend(rule.order_only_prerequisites)

                if len(rule.recipe_irs) > 0:
                    recipe_rule = rule

            source_rule = recipe_rule if recipe_rule is not None else first_rule

            normalized_rules.append(
                NormalRule(
                    {
                        "target": first_rule.target,
                        "prerequisites": prerequisites,
                        "order_only_prerequisites": order_only_prerequisites,
                        "shell_commands": source_rule.shell_commands,
                        "recipe_irs": source_rule.recipe_irs,
                        "evaluated_recipe_irs": source_rule.evaluated_recipe_irs,
                        "rule_ir": source_rule.rule_ir,
                        "vpath_rules": source_rule.vpath_rules,
                        "rule_seperator": first_rule.rule_seperator,
                        "stem": source_rule.stem,
                    }
                )
            )

        return normalized_rules
