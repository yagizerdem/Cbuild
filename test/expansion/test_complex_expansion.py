import unittest

from cbuild_backend.env import Env, SymbolTableVariable
from cbuild_backend.expansion import (
    ExpansionEngine,
    RecursiveVariableExpansionException,
)
from cbuild_compiler.ir import (
    FunctionCallPart,
    FunctionIR,
    RecipeIR,
    TextPart,
    ValueIR,
    VariableReferencePart,
)
from test.util.cli_options import empty_cli_options


class ComplexExpansionTest(unittest.TestCase):
    def test_computed_var_ref_expansion_with_deferred_name_parts(self) -> None:
        command = ValueIR(
            [
                TextPart("c++ "),
                VariableReferencePart(
                    ValueIR(
                        [
                            TextPart("flags_"),
                            VariableReferencePart(ValueIR([TextPart("mode")])),
                            TextPart("_"),
                            VariableReferencePart(ValueIR([TextPart("language")])),
                        ]
                    )
                ),
                TextPart(" main.cpp"),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("selected_mode", SymbolTableVariable.raw_variable("debug"))
        context.set_variable("language", SymbolTableVariable.raw_variable("cpp"))
        context.set_variable("flags_debug_cpp", SymbolTableVariable.raw_variable("-g"))
        context.set_variable(
            "flags_release_cpp", SymbolTableVariable.raw_variable("-O2")
        )
        context.set_variable(
            "mode",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("selected_mode")]))])
            ),
        )
        engine = ExpansionEngine(context)
        expanded_debug_command = engine.expand(command)
        context.set_variable(
            "selected_mode", SymbolTableVariable.raw_variable("release")
        )
        expanded_release_command = engine.expand(command)
        self.assertEqual(expanded_debug_command, "c++ -g main.cpp")
        self.assertEqual(expanded_release_command, "c++ -O2 main.cpp")
        self.assertEqual(context.get_variable("mode").is_deferred(), True)
        self.assertIsNone(context.get_raw_variable("mode"))

    def test_shared_deferred_dependencies_do_not_trigger_recursive_cycles(self) -> None:
        dependencies = ValueIR(
            [
                VariableReferencePart(ValueIR([TextPart("left")])),
                TextPart(" / "),
                VariableReferencePart(ValueIR([TextPart("right")])),
                TextPart(" / "),
                VariableReferencePart(ValueIR([TextPart("left")])),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("root", SymbolTableVariable.raw_variable("core"))
        context.set_variable(
            "shared",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [VariableReferencePart(ValueIR([TextPart("root")])), TextPart(".o")]
                )
            ),
        )
        context.set_variable(
            "left",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        TextPart("left:"),
                        VariableReferencePart(ValueIR([TextPart("shared")])),
                    ]
                )
            ),
        )
        context.set_variable(
            "right",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        TextPart("right:"),
                        VariableReferencePart(ValueIR([TextPart("shared")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_dependencies = engine.expand(dependencies)
        context.set_variable("root", SymbolTableVariable.raw_variable("utils"))
        updated_dependencies = engine.expand(dependencies)
        self.assertEqual(
            expanded_dependencies, "left:core.o / right:core.o / left:core.o"
        )
        self.assertEqual(
            updated_dependencies, "left:utils.o / right:utils.o / left:utils.o"
        )
        self.assertIsNone(context.get_raw_variable("shared"))
        self.assertIsNone(context.get_raw_variable("left"))
        self.assertIsNone(context.get_raw_variable("right"))
        self.assertEqual(context.get_variable("shared").is_deferred(), True)
        self.assertEqual(context.get_variable("left").is_deferred(), True)
        self.assertEqual(context.get_variable("right").is_deferred(), True)

    def test_deferred_expansion_preserves_raw_values_containing_make_syntax(
        self,
    ) -> None:
        message = ValueIR([VariableReferencePart(ValueIR([TextPart("message")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "literal", SymbolTableVariable.raw_variable("$(literal) ${name} $$HOME")
        )
        context.set_variable("name", SymbolTableVariable.raw_variable("yagiz"))
        context.set_variable(
            "message",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        TextPart("["),
                        VariableReferencePart(ValueIR([TextPart("literal")])),
                        TextPart("] "),
                        VariableReferencePart(ValueIR([TextPart("name")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_message = engine.expand(message)
        self.assertEqual(expanded_message, "[$(literal) ${name} $$HOME] yagiz")
        self.assertEqual(
            context.get_raw_variable("literal"), "$(literal) ${name} $$HOME"
        )
        self.assertEqual(context.get_variable("message").is_deferred(), True)

    def test_missing_computed_references_are_reevaluated_after_definition(self) -> None:
        message = ValueIR([VariableReferencePart(ValueIR([TextPart("message")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "selected_key", SymbolTableVariable.raw_variable("nickname")
        )
        context.set_variable("empty", SymbolTableVariable.raw_variable(""))
        context.set_variable(
            "message",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        TextPart("<"),
                        VariableReferencePart(
                            ValueIR(
                                [
                                    VariableReferencePart(
                                        ValueIR([TextPart("selected_key")])
                                    )
                                ]
                            )
                        ),
                        TextPart(">["),
                        VariableReferencePart(ValueIR([TextPart("empty")])),
                        TextPart("]"),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_missing_message = engine.expand(message)
        self.assertEqual(context.has_variable("nickname"), False)
        context.set_variable("nickname", SymbolTableVariable.raw_variable("yagiz"))
        expanded_defined_message = engine.expand(message)
        self.assertEqual(expanded_missing_message, "<>[]")
        self.assertEqual(expanded_defined_message, "<yagiz>[]")
        self.assertIsNone(context.get_raw_variable("message"))

    def test_inherited_deferred_values_expand_with_local_overrides(self) -> None:
        profile = ValueIR([VariableReferencePart(ValueIR([TextPart("profile")]))])
        parent_context = Env(empty_cli_options())
        parent_context.set_variable("name", SymbolTableVariable.raw_variable("parent"))
        parent_context.set_variable("flags", SymbolTableVariable.raw_variable("-O2"))
        parent_context.set_variable(
            "profile",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("name")])),
                        TextPart(":["),
                        VariableReferencePart(ValueIR([TextPart("flags")])),
                        TextPart("]"),
                    ]
                )
            ),
        )
        middle_context = Env(empty_cli_options())
        middle_context.enclosing = parent_context
        middle_context.set_variable("name", SymbolTableVariable.raw_variable("child"))
        context = Env(empty_cli_options())
        context.enclosing = middle_context
        context.set_variable("flags", SymbolTableVariable.raw_variable(""))
        engine = ExpansionEngine(context)
        parent_engine = ExpansionEngine(parent_context)
        expanded_child_profile = engine.expand(profile)
        expanded_parent_profile = parent_engine.expand(profile)
        self.assertEqual(expanded_child_profile, "child:[]")
        self.assertEqual(expanded_parent_profile, "parent:[-O2]")
        self.assertEqual(context.has_variable("profile"), False)
        self.assertEqual(context.has_variable("name"), False)
        self.assertEqual(parent_context.get_variable("profile").is_deferred(), True)
        self.assertIsNone(parent_context.get_raw_variable("profile"))

    def test_function_calls_can_compute_a_variable_name_with_surrounding_text(
        self,
    ) -> None:
        strip = FunctionIR("strip")
        strip.args.append(
            ValueIR([VariableReferencePart(ValueIR([TextPart("selected_mode")]))])
        )
        flags = ValueIR(
            [
                VariableReferencePart(
                    ValueIR(
                        [TextPart("flags_"), FunctionCallPart(strip), TextPart("_cpp")]
                    )
                )
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable(
            "selected_mode", SymbolTableVariable.raw_variable("  debug\t")
        )
        context.set_variable("flags_debug_cpp", SymbolTableVariable.raw_variable("-g"))
        context.set_variable(
            "flags_release_cpp", SymbolTableVariable.raw_variable("-O2")
        )
        engine = ExpansionEngine(context)
        expanded_debug_flags = engine.expand(flags)
        context.set_variable(
            "selected_mode", SymbolTableVariable.raw_variable("\trelease  ")
        )
        expanded_release_flags = engine.expand(flags)
        self.assertEqual(expanded_debug_flags, "-g")
        self.assertEqual(expanded_release_flags, "-O2")

    def test_nested_functions_reevaluate_deferred_sources_and_prefixes(self) -> None:
        strip = FunctionIR("strip")
        strip.args.append(
            ValueIR([VariableReferencePart(ValueIR([TextPart("sources")]))])
        )
        patsubst = FunctionIR("patsubst")
        patsubst.args.extend(
            [
                ValueIR([TextPart("%.c")]),
                ValueIR([TextPart("%.o")]),
                ValueIR([FunctionCallPart(strip)]),
            ]
        )
        addprefix = FunctionIR("addprefix")
        addprefix.args.extend(
            [
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("build_dir")])),
                        TextPart("/"),
                    ]
                ),
                ValueIR([FunctionCallPart(patsubst)]),
            ]
        )
        objects = ValueIR([VariableReferencePart(ValueIR([TextPart("objects")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "sources", SymbolTableVariable.raw_variable("  main.c\tutil.c\nREADME  ")
        )
        context.set_variable("build_dir", SymbolTableVariable.raw_variable("build"))
        context.set_variable(
            "objects",
            SymbolTableVariable.deferred_variable(
                ValueIR([FunctionCallPart(addprefix)])
            ),
        )
        engine = ExpansionEngine(context)
        expanded_objects = engine.expand(objects)
        context.set_variable(
            "sources", SymbolTableVariable.raw_variable(" next.c  notes.txt ")
        )
        context.set_variable("build_dir", SymbolTableVariable.raw_variable("release"))
        updated_objects = engine.expand(objects)
        self.assertEqual(expanded_objects, "build/main.o build/util.o build/README")
        self.assertEqual(updated_objects, "release/next.o release/notes.txt")
        self.assertEqual(context.get_variable("objects").is_deferred(), True)
        self.assertIsNone(context.get_raw_variable("objects"))

    def test_if_expansion_skips_recursive_references_in_unselected_branches(
        self,
    ) -> None:
        debug_choice = FunctionIR("if")
        debug_choice.args.extend(
            [
                ValueIR([VariableReferencePart(ValueIR([TextPart("enabled")]))]),
                ValueIR([TextPart("debug")]),
                ValueIR(
                    [VariableReferencePart(ValueIR([TextPart("recursive_branch")]))]
                ),
            ]
        )
        release_choice = FunctionIR("if")
        release_choice.args.extend(
            [
                ValueIR([VariableReferencePart(ValueIR([TextPart("disabled")]))]),
                ValueIR(
                    [VariableReferencePart(ValueIR([TextPart("recursive_branch")]))]
                ),
                ValueIR([TextPart("release")]),
            ]
        )
        choices = ValueIR(
            [
                FunctionCallPart(debug_choice),
                TextPart(" / "),
                FunctionCallPart(release_choice),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("enabled", SymbolTableVariable.raw_variable("yes"))
        context.set_variable("disabled", SymbolTableVariable.raw_variable(""))
        context.set_variable(
            "recursive_branch",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [VariableReferencePart(ValueIR([TextPart("recursive_branch")]))]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_choices = engine.expand(choices)
        self.assertEqual(expanded_choices, "debug / release")
        self.assertEqual(context.get_variable("recursive_branch").is_deferred(), True)

    def test_foreach_reevaluates_its_body_and_restores_deferred_bindings(self) -> None:
        foreach = FunctionIR("foreach")
        foreach.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("sources")]))]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("object")]))]),
            ]
        )
        objects = ValueIR([FunctionCallPart(foreach)])
        context = Env(empty_cli_options())
        context.set_variable(
            "sources", SymbolTableVariable.raw_variable(" main\tutil ")
        )
        context.set_variable("original_item", SymbolTableVariable.raw_variable("saved"))
        original_item = SymbolTableVariable.deferred_variable(
            ValueIR([VariableReferencePart(ValueIR([TextPart("original_item")]))]),
            "override",
            True,
        )
        context.set_variable("item", original_item)
        context.set_variable(
            "object",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        TextPart("build/"),
                        VariableReferencePart(ValueIR([TextPart("item")])),
                        TextPart(".o"),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_objects = engine.expand(objects)
        expanded_restored_item = engine.expand(
            ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))])
        )
        self.assertEqual(expanded_objects, "build/main.o build/util.o")
        self.assertEqual(expanded_restored_item, "saved")
        self.assertEqual(context.get_variable("item"), original_item)
        self.assertIsNone(context.get_raw_variable("item"))
        self.assertEqual(context.get_variable("item").origin, "override")
        self.assertEqual(context.get_variable("item").is_exported, True)
        self.assertEqual(context.get_variable("object").is_deferred(), True)

    def test_nested_foreach_restores_outer_bindings_and_cleans_up_variables(
        self,
    ) -> None:
        inner_foreach = FunctionIR("foreach")
        inner_foreach.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("x y")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        outer_foreach = FunctionIR("foreach")
        outer_foreach.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("main util")]),
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("item")])),
                        TextPart(":"),
                        FunctionCallPart(inner_foreach),
                        TextPart(":"),
                        VariableReferencePart(ValueIR([TextPart("item")])),
                    ]
                ),
            ]
        )
        values = ValueIR([FunctionCallPart(outer_foreach)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_values = engine.expand(values)
        self.assertEqual(expanded_values, "main:x y:main util:x y:util")
        self.assertEqual(context.has_variable("item"), False)
        self.assertEqual(context.variable_count, 0)

    def test_call_expands_computed_names_with_local_positional_arguments(self) -> None:
        strip = FunctionIR("strip")
        strip.args.append(ValueIR([VariableReferencePart(ValueIR([TextPart("name")]))]))
        call = FunctionIR("call")
        call.args.extend(
            [
                ValueIR([VariableReferencePart(ValueIR([TextPart("formatter_name")]))]),
                ValueIR([FunctionCallPart(strip)]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("role")]))]),
            ]
        )
        profile = ValueIR([FunctionCallPart(call)])
        context = Env(empty_cli_options())
        context.set_variable(
            "formatter_name", SymbolTableVariable.raw_variable("format_profile")
        )
        context.set_variable("name", SymbolTableVariable.raw_variable("  yagiz\t"))
        context.set_variable("role", SymbolTableVariable.raw_variable("developer"))
        context.set_variable("separator", SymbolTableVariable.raw_variable(" / "))
        context.set_variable("1", SymbolTableVariable.raw_variable("global argument"))
        context.set_variable(
            "format_profile",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        VariableReferencePart(ValueIR([TextPart("separator")])),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_profile = engine.expand(profile)
        context.set_variable("name", SymbolTableVariable.raw_variable(" erdem "))
        updated_profile = engine.expand(profile)
        self.assertEqual(expanded_profile, "yagiz / developer")
        self.assertEqual(updated_profile, "erdem / developer")
        self.assertEqual(context.get_raw_variable("1"), "global argument")
        self.assertEqual(context.has_variable("2"), False)
        self.assertEqual(context.get_variable("format_profile").is_deferred(), True)

    def test_recipe_expands_flags_functions_and_automatic_variables(self) -> None:
        addprefix = FunctionIR("addprefix")
        addprefix.args.extend(
            [
                ValueIR([TextPart("build/")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("^")]))]),
            ]
        )
        recipe = RecipeIR.command(
            ValueIR(
                [
                    VariableReferencePart(ValueIR([TextPart("compiler")])),
                    TextPart(" "),
                    VariableReferencePart(ValueIR([TextPart("flags")])),
                    TextPart(" -o "),
                    VariableReferencePart(ValueIR([TextPart("@")])),
                    TextPart(" "),
                    FunctionCallPart(addprefix),
                ]
            )
        )
        context = Env(empty_cli_options())
        context.set_variable("compiler", SymbolTableVariable.raw_variable("cc"))
        context.set_variable("optimization", SymbolTableVariable.raw_variable("-O2"))
        context.set_variable("@", SymbolTableVariable.raw_variable("app"))
        context.set_variable("^", SymbolTableVariable.raw_variable("main.o util.o"))
        context.set_variable(
            "flags",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("optimization")])),
                        TextPart(" -Wall"),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_recipe = engine.expand(recipe)
        context.set_variable("optimization", SymbolTableVariable.raw_variable("-g"))
        context.set_variable("@", SymbolTableVariable.raw_variable("app-debug"))
        updated_recipe = engine.expand(recipe)
        self.assertEqual(
            expanded_recipe, "cc -O2 -Wall -o app build/main.o build/util.o"
        )
        self.assertEqual(
            updated_recipe, "cc -g -Wall -o app-debug build/main.o build/util.o"
        )
        self.assertIsNone(context.get_raw_variable("flags"))
        self.assertEqual(context.get_variable("flags").is_deferred(), True)

    def test_direct_deferred_recursion_throws_an_expansion_exception(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("recursive_value")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "recursive_value",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        TextPart("prefix:"),
                        VariableReferencePart(ValueIR([TextPart("recursive_value")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception),
            str(RecursiveVariableExpansionException("recursive_value")),
        )
        self.assertEqual(context.get_variable("recursive_value").is_deferred(), True)
        self.assertIsNone(context.get_raw_variable("recursive_value"))

    def test_indirect_deferred_recursion_detects_multi_variable_cycles(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("first")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "first",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("second")]))])
            ),
        )
        context.set_variable(
            "second",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("third")]))])
            ),
        )
        context.set_variable(
            "third",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("first")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception), str(RecursiveVariableExpansionException("first"))
        )
        self.assertIsNone(context.get_raw_variable("first"))
        self.assertIsNone(context.get_raw_variable("second"))
        self.assertIsNone(context.get_raw_variable("third"))

    def test_function_arguments_share_recursive_variable_cycle_detection(self) -> None:
        strip = FunctionIR("strip")
        strip.args.append(
            ValueIR([VariableReferencePart(ValueIR([TextPart("alias")]))])
        )
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("recursive_value")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "recursive_value",
            SymbolTableVariable.deferred_variable(ValueIR([FunctionCallPart(strip)])),
        )
        context.set_variable(
            "alias",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("recursive_value")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception),
            str(RecursiveVariableExpansionException("recursive_value")),
        )
        self.assertEqual(context.get_variable("recursive_value").is_deferred(), True)
        self.assertEqual(context.get_variable("alias").is_deferred(), True)


if __name__ == "__main__":
    unittest.main()
