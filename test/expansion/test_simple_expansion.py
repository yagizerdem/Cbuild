import unittest

from cbuild_backend.env import Env, SymbolTableVariable
from cbuild_backend.expansion import ExpansionEngine
from cbuild_compiler.ir import TextPart, ValueIR, VariableReferencePart
from test.util.cli_options import empty_cli_options


class SimpleExpansionTest(unittest.TestCase):
    def test_simple_text_expansion(self) -> None:
        f_name = ValueIR([TextPart("jhon")])
        l_name = ValueIR([TextPart("doe")])
        full_name = ValueIR([TextPart("jhon"), TextPart(" "), TextPart("doe")])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_f_name = engine.expand(f_name)
        expanded_l_name = engine.expand(l_name)
        expanded_full_name = engine.expand(full_name)
        self.assertEqual(expanded_f_name, "jhon")
        self.assertEqual(expanded_l_name, "doe")
        self.assertEqual(expanded_full_name, "jhon doe")

    def test_var_ref_expansion(self) -> None:
        full_name = ValueIR(
            [
                VariableReferencePart(ValueIR([TextPart("f_name")])),
                TextPart(" "),
                VariableReferencePart(ValueIR([TextPart("l_name")])),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("f_name", SymbolTableVariable.raw_variable("yagiz"))
        context.set_variable("l_name", SymbolTableVariable.raw_variable("erdem"))
        engine = ExpansionEngine(context)
        expanded_full_name = engine.expand(full_name)
        self.assertEqual(expanded_full_name, "yagiz erdem")

    def test_deep_recursive_var_ref_expansion(self) -> None:
        full_name = ValueIR(
            [
                VariableReferencePart(
                    ValueIR(
                        [
                            VariableReferencePart(
                                ValueIR(
                                    [
                                        VariableReferencePart(
                                            ValueIR(
                                                [
                                                    VariableReferencePart(
                                                        ValueIR(
                                                            [TextPart("f_name_ref")]
                                                        )
                                                    )
                                                ]
                                            )
                                        )
                                    ]
                                )
                            )
                        ]
                    )
                ),
                TextPart(" "),
                VariableReferencePart(
                    ValueIR(
                        [
                            VariableReferencePart(
                                ValueIR(
                                    [
                                        VariableReferencePart(
                                            ValueIR(
                                                [
                                                    VariableReferencePart(
                                                        ValueIR(
                                                            [TextPart("l_name_ref")]
                                                        )
                                                    )
                                                ]
                                            )
                                        )
                                    ]
                                )
                            )
                        ]
                    )
                ),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable(
            "f_name_ref", SymbolTableVariable.raw_variable("f_name_alias")
        )
        context.set_variable(
            "f_name_alias", SymbolTableVariable.raw_variable("f_name_key")
        )
        context.set_variable("f_name_key", SymbolTableVariable.raw_variable("f_name"))
        context.set_variable("f_name", SymbolTableVariable.raw_variable("yagiz"))
        context.set_variable(
            "l_name_ref", SymbolTableVariable.raw_variable("l_name_alias")
        )
        context.set_variable(
            "l_name_alias", SymbolTableVariable.raw_variable("l_name_key")
        )
        context.set_variable("l_name_key", SymbolTableVariable.raw_variable("l_name"))
        context.set_variable("l_name", SymbolTableVariable.raw_variable("erdem"))
        engine = ExpansionEngine(context)
        expanded_full_name = engine.expand(full_name)
        self.assertEqual(expanded_full_name, "yagiz erdem")

    def test_deferred_var_ref_expansion_simple(self) -> None:
        full_name = ValueIR(
            [
                VariableReferencePart(ValueIR([TextPart("f_name")])),
                TextPart(" "),
                VariableReferencePart(ValueIR([TextPart("l_name")])),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable(
            "f_name",
            SymbolTableVariable.deferred_variable(ValueIR([TextPart("yagiz")])),
        )
        context.set_variable(
            "l_name",
            SymbolTableVariable.deferred_variable(ValueIR([TextPart("erdem")])),
        )
        engine = ExpansionEngine(context)
        # before expansion
        self.assertIsNone(context.get_raw_variable("f_name"))
        self.assertIsNone(context.get_raw_variable("l_name"))
        self.assertEqual(context.get_variable("f_name").is_deferred(), True)
        self.assertIsNone(context.get_variable("f_name").get_raw_value())
        expanded_full_name = engine.expand(full_name)
        # after expansion
        self.assertEqual(context.has_variable("f_name"), True)
        self.assertEqual(context.get_variable("f_name").is_deferred(), True)
        self.assertEqual(expanded_full_name, "yagiz erdem")
        self.assertIsNone(context.get_raw_variable("f_name"))
        self.assertIsNone(context.get_raw_variable("l_name"))

    def test_deep_recursive_deferred_var_ref_expansion(self) -> None:
        full_name = ValueIR([VariableReferencePart(ValueIR([TextPart("full_name")]))])
        context = Env(empty_cli_options())
        context.set_variable("f_name", SymbolTableVariable.raw_variable("yagiz"))
        context.set_variable("l_name", SymbolTableVariable.raw_variable("erdem"))
        context.set_variable(
            "first_name",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("f_name")]))])
            ),
        )
        context.set_variable(
            "last_name",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("l_name")]))])
            ),
        )
        context.set_variable(
            "display_name",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("first_name")])),
                        TextPart(" "),
                        VariableReferencePart(ValueIR([TextPart("last_name")])),
                    ]
                )
            ),
        )
        context.set_variable(
            "profile_name",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("display_name")]))])
            ),
        )
        context.set_variable(
            "full_name",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("profile_name")]))])
            ),
        )
        engine = ExpansionEngine(context)
        # before expansion
        self.assertIsNone(context.get_raw_variable("first_name"))
        self.assertIsNone(context.get_raw_variable("last_name"))
        self.assertIsNone(context.get_raw_variable("display_name"))
        self.assertIsNone(context.get_raw_variable("profile_name"))
        self.assertIsNone(context.get_raw_variable("full_name"))
        expanded_full_name = engine.expand(full_name)
        # after expansion
        # expansion does not change deffec var to raw values
        # recalculate defferd values in each call
        self.assertEqual(expanded_full_name, "yagiz erdem")
        self.assertIsNone(context.get_raw_variable("first_name"))
        self.assertIsNone(context.get_raw_variable("last_name"))
        self.assertIsNone(context.get_raw_variable("display_name"))
        self.assertIsNone(context.get_raw_variable("profile_name"))
        self.assertIsNone(context.get_raw_variable("full_name"))
        self.assertEqual(context.get_variable("first_name").is_deferred(), True)
        self.assertEqual(context.get_variable("last_name").is_deferred(), True)
        self.assertEqual(context.get_variable("display_name").is_deferred(), True)
        self.assertEqual(context.get_variable("profile_name").is_deferred(), True)
        self.assertEqual(context.get_variable("full_name").is_deferred(), True)


if __name__ == "__main__":
    unittest.main()
