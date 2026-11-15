from cbuild_backend.env import Env
from cbuild_backend.model import ImplicitPatterRule
from cbuild_compiler.ir import (
    NormalRuleIR,
    RecipeIR,
    RuleSeparator,
    ValueIR,
    text_part,
    var_ref_part,
)


def register_built_in_implicit_variables(context: Env) -> None:
    # GNU Make 10.3 - Variables Used by Implicit Rules
    # https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html

    # Programs
    context.set_raw_variable("AR", "ar", "default", False)
    context.set_raw_variable("AS", "as", "default", False)
    context.set_raw_variable("CC", "cc", "default", False)
    context.set_raw_variable("CXX", "g++", "default", False)
    context.set_deferred_variable(
        "CPP",
        ValueIR([
            var_ref_part(ValueIR([text_part("CC")])),
            text_part(" "),
            text_part("-E"),
        ]),
        "default",
        False,
    )
    context.set_raw_variable("FC", "f77", "default", False)
    context.set_raw_variable("M2C", "m2c", "default", False)
    context.set_raw_variable("PC", "pc", "default", False)
    context.set_raw_variable("CO", "co", "default", False)
    context.set_raw_variable("GET", "get", "default", False)
    context.set_raw_variable("LEX", "lex", "default", False)
    context.set_raw_variable("YACC", "yacc", "default", False)
    context.set_raw_variable("LINT", "lint", "default", False)
    context.set_raw_variable("MAKEINFO", "makeinfo", "default", False)
    context.set_raw_variable("TEX", "tex", "default", False)
    context.set_raw_variable("TEXI2DVI", "texi2dvi", "default", False)
    context.set_raw_variable("WEAVE", "weave", "default", False)
    context.set_raw_variable("CWEAVE", "cweave", "default", False)
    context.set_raw_variable("TANGLE", "tangle", "default", False)
    context.set_raw_variable("CTANGLE", "ctangle", "default", False)
    context.set_raw_variable("RM", "rm -f", "default", False)

    # Flags
    context.set_raw_variable("ARFLAGS", "rv", "default", False)
    context.set_raw_variable("ASFLAGS", "", "default", False)
    context.set_raw_variable("CFLAGS", "", "default", False)
    context.set_raw_variable("CXXFLAGS", "", "default", False)
    context.set_raw_variable("COFLAGS", "", "default", False)
    context.set_raw_variable("CPPFLAGS", "", "default", False)
    context.set_raw_variable("FFLAGS", "", "default", False)
    context.set_raw_variable("GFLAGS", "", "default", False)
    context.set_raw_variable("LDFLAGS", "", "default", False)
    context.set_raw_variable("LDLIBS", "", "default", False)
    context.set_raw_variable("LOADLIBES", "", "default", False)  # Deprecated alias, still supported
    context.set_raw_variable("LFLAGS", "", "default", False)
    context.set_raw_variable("YFLAGS", "", "default", False)
    context.set_raw_variable("PFLAGS", "", "default", False)
    context.set_raw_variable("RFLAGS", "", "default", False)
    context.set_raw_variable("LINTFLAGS", "", "default", False)


def get_built_in_implicit_rules() -> list[ImplicitPatterRule]:
    # GNU Make 10.2 - Catalogue of Built-In Rules
    # https://www.gnu.org/software/make/manual/html_node/Catalogue-of-Rules.html
    # Exact recipes: https://github.com/mirror/make/blob/master/src/default.c
    implicit_patter_rules: list[ImplicitPatterRule] = []
    implicit_patter_rules.append(_create_c_object_implicit_rule())
    implicit_patter_rules.append(_create_cpp_object_implicit_rule())
    implicit_patter_rules.append(_create_capital_c_object_implicit_rule())
    implicit_patter_rules.append(_create_cpp_extension_object_implicit_rule())
    implicit_patter_rules.append(_create_pascal_object_implicit_rule())
    implicit_patter_rules.append(_create_fortran_object_implicit_rule())
    implicit_patter_rules.append(_create_preprocessed_fortran_object_implicit_rule())
    implicit_patter_rules.append(_create_objective_c_object_implicit_rule())
    implicit_patter_rules.append(_create_ratfor_object_implicit_rule())
    implicit_patter_rules.append(_create_assembly_object_implicit_rule())
    implicit_patter_rules.append(_create_preprocessed_assembly_object_implicit_rule())
    implicit_patter_rules.append(_create_modula_object_implicit_rule())
    implicit_patter_rules.append(_create_object_executable_implicit_rule())
    implicit_patter_rules.append(_create_c_executable_implicit_rule())
    implicit_patter_rules.append(_create_cpp_executable_implicit_rule())
    implicit_patter_rules.append(_create_capital_c_executable_implicit_rule())
    implicit_patter_rules.append(_create_cpp_extension_executable_implicit_rule())
    implicit_patter_rules.append(_create_pascal_executable_implicit_rule())
    implicit_patter_rules.append(_create_fortran_executable_implicit_rule())
    implicit_patter_rules.append(_create_preprocessed_fortran_executable_implicit_rule())
    implicit_patter_rules.append(_create_objective_c_executable_implicit_rule())
    implicit_patter_rules.append(_create_ratfor_executable_implicit_rule())
    implicit_patter_rules.append(_create_modula_executable_implicit_rule())
    implicit_patter_rules.append(_create_cweb_c_implicit_rule())
    implicit_patter_rules.append(_create_cweb_with_change_c_implicit_rule())
    implicit_patter_rules.append(_create_cweb_tex_implicit_rule())
    implicit_patter_rules.append(_create_lex_c_implicit_rule())
    implicit_patter_rules.append(_create_lex_ratfor_implicit_rule())
    implicit_patter_rules.append(_create_yacc_c_implicit_rule())
    implicit_patter_rules.append(_create_tex_dvi_implicit_rule())
    implicit_patter_rules.append(_create_texinfo_dvi_implicit_rule())
    implicit_patter_rules.append(_create_texi_dvi_implicit_rule())
    implicit_patter_rules.append(_create_txinfo_dvi_implicit_rule())
    implicit_patter_rules.append(_create_texinfo_info_implicit_rule())
    implicit_patter_rules.append(_create_texi_info_implicit_rule())
    implicit_patter_rules.append(_create_txinfo_info_implicit_rule())
    implicit_patter_rules.append(_create_assembly_preprocess_implicit_rule())
    implicit_patter_rules.append(_create_rcs_checkout_implicit_rule())
    implicit_patter_rules.append(_create_rcs_directory_checkout_implicit_rule())
    implicit_patter_rules.append(_create_rcs_directory_file_checkout_implicit_rule())
    implicit_patter_rules.append(_create_sccs_checkout_implicit_rule())
    implicit_patter_rules.append(_create_sccs_directory_checkout_implicit_rule())

    return implicit_patter_rules


def _create_c_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.c")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.c"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_cpp_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.cc")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.cc"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_capital_c_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.C")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.C"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_cpp_extension_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.cpp")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.cpp"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_pascal_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.p")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.p"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_fortran_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.f")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.f"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_preprocessed_fortran_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.F")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.F"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_objective_c_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.m")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.m"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_ratfor_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.r")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.r"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_assembly_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.s")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.s"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_preprocessed_assembly_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.S")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.S"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_modula_object_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.mod")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.o",
            "prerequisites": ["%.mod"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_object_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.o")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.o"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_c_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.c")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.c"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_cpp_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.cc")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.cc"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_capital_c_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.C")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.C"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_cpp_extension_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.cpp")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.cpp"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_pascal_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.p")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.p"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_fortran_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.f")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.f"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_preprocessed_fortran_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.F")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.F"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_objective_c_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.m")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.m"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_ratfor_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LINK.r")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LOADLIBES")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("LDLIBS")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.r"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_modula_executable_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("COMPILE.mod")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
            text_part(" -e "),
            var_ref_part(ValueIR([text_part("@")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%.mod"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_cweb_c_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("CTANGLE")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" - "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.c",
            "prerequisites": ["%.w"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_cweb_with_change_c_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("CTANGLE")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("^")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.c",
            "prerequisites": ["%.w", "%.ch"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_cweb_tex_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("CWEAVE")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" - "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.tex",
            "prerequisites": ["%.w"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_lex_c_implicit_rule() -> ImplicitPatterRule:
    cleanup_recipe = RecipeIR.command(
        ValueIR([
            text_part("@"),
            var_ref_part(ValueIR([text_part("RM")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LEX.l")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" > "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [cleanup_recipe, recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.c",
            "prerequisites": ["%.l"],
            "recipe_irs": [cleanup_recipe, recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_lex_ratfor_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("LEX.l")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" > "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )
    move_recipe = RecipeIR.command(
        ValueIR([
            text_part("mv -f lex.yy.r "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe, move_recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.r",
            "prerequisites": ["%.l"],
            "recipe_irs": [recipe, move_recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_yacc_c_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("YACC.y")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )
    move_recipe = RecipeIR.command(
        ValueIR([
            text_part("mv -f y.tab.c "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe, move_recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.c",
            "prerequisites": ["%.y"],
            "recipe_irs": [recipe, move_recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_tex_dvi_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("TEX")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.dvi",
            "prerequisites": ["%.tex"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_texinfo_dvi_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("TEXI2DVI")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("TEXI2DVI_FLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.dvi",
            "prerequisites": ["%.texinfo"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_texi_dvi_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("TEXI2DVI")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("TEXI2DVI_FLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.dvi",
            "prerequisites": ["%.texi"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_txinfo_dvi_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("TEXI2DVI")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("TEXI2DVI_FLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.dvi",
            "prerequisites": ["%.txinfo"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_texinfo_info_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("MAKEINFO")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("MAKEINFO_FLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.info",
            "prerequisites": ["%.texinfo"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_texi_info_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("MAKEINFO")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("MAKEINFO_FLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.info",
            "prerequisites": ["%.texi"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_txinfo_info_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("MAKEINFO")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("MAKEINFO_FLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" -o "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.info",
            "prerequisites": ["%.txinfo"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_assembly_preprocess_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("PREPROCESS.S")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
            text_part(" > "),
            var_ref_part(ValueIR([text_part("@")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%.s",
            "prerequisites": ["%.S"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR(),
            "vpath_rules": [],
        }
    )


def _create_rcs_checkout_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([var_ref_part(ValueIR([text_part("CHECKOUT,v")]))]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["%,v"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR({"separator": RuleSeparator.DOUBLE_COLON}),
            "vpath_rules": [],
        }
    )


def _create_rcs_directory_checkout_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([var_ref_part(ValueIR([text_part("CHECKOUT,v")]))]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["RCS/%,v"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR({"separator": RuleSeparator.DOUBLE_COLON}),
            "vpath_rules": [],
        }
    )


def _create_rcs_directory_file_checkout_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([var_ref_part(ValueIR([text_part("CHECKOUT,v")]))]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["RCS/%"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR({"separator": RuleSeparator.DOUBLE_COLON}),
            "vpath_rules": [],
        }
    )


def _create_sccs_checkout_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("GET")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("GFLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("SCCS_OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["s.%"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR({"separator": RuleSeparator.DOUBLE_COLON}),
            "vpath_rules": [],
        }
    )


def _create_sccs_directory_checkout_implicit_rule() -> ImplicitPatterRule:
    recipe = RecipeIR.command(
        ValueIR([
            var_ref_part(ValueIR([text_part("GET")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("GFLAGS")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("SCCS_OUTPUT_OPTION")])),
            text_part(" "),
            var_ref_part(ValueIR([text_part("<")])),
        ]),
    )

    return ImplicitPatterRule(
        {
            "evaluated_recipe_irs": [recipe],
            "order_only_prerequisites": [],
            "target_pattern": "%",
            "prerequisites": ["SCCS/s.%"],
            "recipe_irs": [recipe],
            "rule_ir": NormalRuleIR({"separator": RuleSeparator.DOUBLE_COLON}),
            "vpath_rules": [],
        }
    )
