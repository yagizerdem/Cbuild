import json
from typing import Any, NotRequired, TypedDict
from uuid import uuid4

from cbuild_compiler.ir import (
    NormalRuleIR,
    RecipeIR,
    RuleSeparator,
    StaticPatternRuleIR,
)


def _json_stringify(value: Any) -> str:
    return json.dumps(value, default=lambda o: vars(o))


class BaseModel:
    def __init__(self) -> None:
        self.uuid: str = str(uuid4())

    def __str__(self) -> str:
        return "<BaseModel>"


class NormalRuleOptions(TypedDict):
    target: str
    prerequisites: list[str]
    order_only_prerequisites: NotRequired[list[str]]
    shell_commands: list[str]
    recipe_irs: list[RecipeIR]
    rule_ir: NormalRuleIR | StaticPatternRuleIR
    evaluated_recipe_irs: list[RecipeIR]
    rule_seperator: RuleSeparator
    vpath_rules: NotRequired[list[VpathRule]]
    stem: NotRequired[str | None]


class VpathRule(BaseModel):
    def __init__(self, pattern: str, dirs: list[str]) -> None:
        super().__init__()
        self.pattern = pattern
        self.dirs = dirs


# pattern rule
class NormalRule(BaseModel):
    def __init__(self, options: NormalRuleOptions) -> None:
        super().__init__()

        self.target: str = options["target"]
        self.prerequisites: list[str] = options["prerequisites"]
        self.order_only_prerequisites: list[str] = (
            options.get("order_only_prerequisites") or []
        )
        self.shell_commands: list[str] = options["shell_commands"]
        self.recipe_irs: list[RecipeIR] = options["recipe_irs"]
        self.evaluated_recipe_irs: list[RecipeIR] = options["evaluated_recipe_irs"]
        self.rule_ir: NormalRuleIR | StaticPatternRuleIR = options["rule_ir"]

        self.vpath_rules: list[VpathRule] = options.get("vpath_rules") or []
        self.rule_seperator: RuleSeparator = options["rule_seperator"]
        self.stem: str | None = options.get("stem")

    def __str__(self) -> str:
        return f"""NormalRule {{
  target={self.target},
  prerequisites={_json_stringify(self.prerequisites)},
  orderOnlyPrerequisites={_json_stringify(self.order_only_prerequisites)},
  shellCommands={_json_stringify(self.shell_commands)},
  recipeIRS={_json_stringify(self.recipe_irs)},
  evaluatedRecipeIRs={_json_stringify(self.evaluated_recipe_irs)},
  ruleIR={_json_stringify(self.rule_ir)}
}}"""


class ImplicitPatternRuleOptions(TypedDict):
    target_pattern: str
    prerequisites: list[str]
    order_only_prerequisites: list[str]
    recipe_irs: list[RecipeIR]
    rule_ir: NormalRuleIR
    vpath_rules: list[VpathRule]
    evaluated_recipe_irs: list[RecipeIR]


# implicit pattern rule
class ImplicitPatterRule(BaseModel):
    def __init__(self, options: ImplicitPatternRuleOptions) -> None:
        super().__init__()

        self.target_pattern: str = options["target_pattern"]
        self.prerequisites: list[str] = options["prerequisites"]
        self.order_only_prerequisites: list[str] = options["order_only_prerequisites"]
        self.recipe_irs: list[RecipeIR] = options["recipe_irs"]
        self.rule_ir: NormalRuleIR = options["rule_ir"]
        self.vpath_rules: list[VpathRule] = options["vpath_rules"]
        self.evaluated_recipe_irs: list[RecipeIR] = options["evaluated_recipe_irs"]
