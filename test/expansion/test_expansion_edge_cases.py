import os
from pathlib import Path
import re
import sys
import tempfile
from typing import cast
import unittest
from unittest.mock import patch

from cbuild_backend.env import Env, SymbolTableVariable
from cbuild_backend.evaluator.assignment_evaluator import AssignmentIREvaluator
from cbuild_backend.execution.auto_variable import AutomaticVariableEnv
from cbuild_backend.execution.preq_resolution.type import (
    NoPathOrigin,
    OutOfDateResolution,
    PreqResolution,
    TargetResolution,
)
from cbuild_backend.expansion import (
    ExpansionEngine,
    RecursiveVariableExpansionException,
    ValueExpansionEngine,
)
from cbuild_backend.model import NormalRule
from cbuild_backend.process import ProcessResult, ProcessRunner
from cbuild_compiler.ir import (
    AssignmentIR,
    AssignmentType,
    FunctionCallPart,
    FunctionIR,
    NormalRuleIR,
    RecipeIR,
    TextPart,
    ValueIR,
    VariableReferencePart,
)
from test.util.cli_options import empty_cli_options
from test.util.compile import compile
from type.cbuild_exception import MachineCode


class ExpansionEdgeCasesTest(unittest.TestCase):
    def test_plain_text_remains_unchanged(self) -> None:
        value = ValueIR([TextPart("hello, world!")])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "hello, world!")

    def test_raw_variable_expansion(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("alpha"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "alpha")

    def test_undefined_variable_expands_to_an_empty_string(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("missing")]))])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_empty_variable_expands_to_an_empty_string(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable(""))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_adjacent_references_expand_without_added_whitespace(self) -> None:
        value = ValueIR(
            [
                VariableReferencePart(ValueIR([TextPart("A")])),
                VariableReferencePart(ValueIR([TextPart("B")])),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("alpha"))
        context.set_variable("B", SymbolTableVariable.raw_variable("beta"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "alphabeta")

    def test_text_surrounds_a_variable_reference(self) -> None:
        value = ValueIR(
            [
                TextPart("before:"),
                VariableReferencePart(ValueIR([TextPart("A")])),
                TextPart(":after"),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("alpha"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "before:alpha:after")

    def test_empty_valueir_expands_to_an_empty_string(self) -> None:
        value = ValueIR([])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_consecutive_empty_expansions_preserve_surrounding_text(self) -> None:
        value = ValueIR(
            [
                TextPart("<"),
                VariableReferencePart(ValueIR([TextPart("A")])),
                VariableReferencePart(ValueIR([TextPart("missing")])),
                VariableReferencePart(ValueIR([TextPart("B")])),
                TextPart(">"),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable(""))
        context.set_variable("B", SymbolTableVariable.raw_variable(""))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "<>")

    def test_spaces_are_preserved(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("   "))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "   ")

    def test_tabs_are_preserved(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("\t\t"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "\t\t")

    def test_newlines_are_preserved(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("\n\r\n"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "\n\r\n")

    def test_leading_and_trailing_whitespace_are_preserved(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable(" \thello\n "))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, " \thello\n ")

    def test_whitespace_only_variable_are_preserved(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable(" \t\n "))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, " \t\n ")

    def test_immediate_assignment_retains_its_dependency_value(self) -> None:
        assignment = AssignmentIR(
            AssignmentType.SIMPLE,
            ValueIR([TextPart("result")]),
            ValueIR([VariableReferencePart(ValueIR([TextPart("dependency")]))]),
        )
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("result")]))])
        context = Env(empty_cli_options())
        context.set_variable("dependency", SymbolTableVariable.raw_variable("before"))
        AssignmentIREvaluator(context, assignment).evaluate()
        engine = ExpansionEngine(context)
        expanded_before = engine.expand(value)
        context.set_variable("dependency", SymbolTableVariable.raw_variable("after"))
        expanded_after = engine.expand(value)
        self.assertEqual(expanded_before, "before")
        self.assertEqual(expanded_after, "before")
        self.assertEqual(context.get_variable("result").is_deferred(), False)

    def test_posix_immediate_assignment_retains_its_dependency_value(self) -> None:
        assignment = AssignmentIR(
            AssignmentType.POSIX_SIMPLE,
            ValueIR([TextPart("result")]),
            ValueIR([VariableReferencePart(ValueIR([TextPart("dependency")]))]),
        )
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("result")]))])
        context = Env(empty_cli_options())
        context.set_variable("dependency", SymbolTableVariable.raw_variable("before"))
        AssignmentIREvaluator(context, assignment).evaluate()
        engine = ExpansionEngine(context)
        expanded_before = engine.expand(value)
        context.set_variable("dependency", SymbolTableVariable.raw_variable("after"))
        expanded_after = engine.expand(value)
        self.assertEqual(expanded_before, "before")
        self.assertEqual(expanded_after, "before")
        self.assertEqual(context.get_variable("result").is_deferred(), False)

    def test_immediate_escaped_assignment_retains_its_dependency_value(self) -> None:
        assignment = AssignmentIR(
            AssignmentType.IMMEDIATE_ESCAPED,
            ValueIR([TextPart("result")]),
            ValueIR([VariableReferencePart(ValueIR([TextPart("dependency")]))]),
        )
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("result")]))])
        context = Env(empty_cli_options())
        context.set_variable("dependency", SymbolTableVariable.raw_variable("before"))
        AssignmentIREvaluator(context, assignment).evaluate()
        engine = ExpansionEngine(context)
        expanded_before = engine.expand(value)
        context.set_variable("dependency", SymbolTableVariable.raw_variable("after"))
        expanded_after = engine.expand(value)
        self.assertEqual(expanded_before, "before")
        self.assertEqual(expanded_after, "before")
        self.assertEqual(context.get_variable("result").is_deferred(), True)

    def test_deferred_assignment_reevaluates_its_dependency_value(self) -> None:
        assignment = AssignmentIR(
            AssignmentType.RECURSIVE,
            ValueIR([TextPart("result")]),
            ValueIR([VariableReferencePart(ValueIR([TextPart("dependency")]))]),
        )
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("result")]))])
        context = Env(empty_cli_options())
        context.set_variable("dependency", SymbolTableVariable.raw_variable("before"))
        AssignmentIREvaluator(context, assignment).evaluate()
        engine = ExpansionEngine(context)
        expanded_before = engine.expand(value)
        context.set_variable("dependency", SymbolTableVariable.raw_variable("after"))
        expanded_after = engine.expand(value)
        self.assertEqual(expanded_before, "before")
        self.assertEqual(expanded_after, "after")
        self.assertEqual(context.get_variable("result").is_deferred(), True)

    def test_raw_values_containing_references_are_never_reparsed(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("raw")]))])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable("raw", SymbolTableVariable.raw_variable("$(X) $$HOME"))
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "$(X) $$HOME")
        context.set_variable("X", SymbolTableVariable.raw_variable("changed"))
        self.assertEqual(engine.expand(value), "$(X) $$HOME")

    def test_subst_normal_input(self) -> None:
        fn = FunctionIR("subst")
        fn.args.extend(
            [
                ValueIR([TextPart("a")]),
                ValueIR([TextPart("x")]),
                ValueIR([TextPart("banana")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "bxnxnx")

    def test_subst_empty_input(self) -> None:
        fn = FunctionIR("subst")
        fn.args.extend(
            [
                ValueIR([TextPart("a")]),
                ValueIR([TextPart("x")]),
                ValueIR([TextPart("")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_subst_whitespace_input(self) -> None:
        fn = FunctionIR("subst")
        fn.args.extend(
            [
                ValueIR([TextPart("a")]),
                ValueIR([TextPart("x")]),
                ValueIR([TextPart(" a\t a\n")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, " x\t x\n")

    def test_subst_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   banana ")]))
        fn = FunctionIR("subst")
        fn.args.extend(
            [
                ValueIR([TextPart("a")]),
                ValueIR([TextPart("x")]),
                ValueIR([FunctionCallPart(nested)]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "x bxnxnx")

    def test_patsubst_normal_input(self) -> None:
        fn = FunctionIR("patsubst")
        fn.args.extend(
            [
                ValueIR([TextPart("%.c")]),
                ValueIR([TextPart("%.o")]),
                ValueIR([TextPart("main.c util.c notes")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "main.o util.o notes")

    def test_patsubst_empty_input(self) -> None:
        fn = FunctionIR("patsubst")
        fn.args.extend(
            [
                ValueIR([TextPart("%.c")]),
                ValueIR([TextPart("%.o")]),
                ValueIR([TextPart("")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_patsubst_whitespace_input(self) -> None:
        fn = FunctionIR("patsubst")
        fn.args.extend(
            [
                ValueIR([TextPart(" %.c\t")]),
                ValueIR([TextPart(" %.o\n")]),
                ValueIR([TextPart(" main.c\t util.c\n")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "main.o util.o")

    def test_patsubst_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" main.c   util.c ")]))
        fn = FunctionIR("patsubst")
        fn.args.extend(
            [
                ValueIR([TextPart("%.c")]),
                ValueIR([TextPart("%.o")]),
                ValueIR([FunctionCallPart(nested)]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "main.o util.o")

    def test_strip_normal_input(self) -> None:
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([TextPart(" a  b ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b")

    def test_strip_empty_input(self) -> None:
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_strip_whitespace_input(self) -> None:
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([TextPart(" \ta\n  b \t")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b")

    def test_strip_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b ")]))
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b")

    def test_findstring_normal_input(self) -> None:
        fn = FunctionIR("findstring")
        fn.args.extend([ValueIR([TextPart("bc")]), ValueIR([TextPart("abcd")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "bc")

    def test_findstring_empty_input(self) -> None:
        fn = FunctionIR("findstring")
        fn.args.extend([ValueIR([TextPart("bc")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_findstring_whitespace_input(self) -> None:
        fn = FunctionIR("findstring")
        fn.args.extend([ValueIR([TextPart("\t")]), ValueIR([TextPart("a\tb")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "\t")

    def test_findstring_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   bc ")]))
        fn = FunctionIR("findstring")
        fn.args.extend([ValueIR([TextPart("bc")]), ValueIR([FunctionCallPart(nested)])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "bc")

    def test_filter_normal_input(self) -> None:
        fn = FunctionIR("filter")
        fn.args.extend([ValueIR([TextPart("%.c")]), ValueIR([TextPart("a.c b.o c.c")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.c c.c")

    def test_filter_empty_input(self) -> None:
        fn = FunctionIR("filter")
        fn.args.extend([ValueIR([TextPart("%.c")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_filter_whitespace_input(self) -> None:
        fn = FunctionIR("filter")
        fn.args.extend(
            [ValueIR([TextPart(" %.c\t")]), ValueIR([TextPart(" a.c\t b.o\n c.c ")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.c c.c")

    def test_filter_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a.c   b.o c.c ")]))
        fn = FunctionIR("filter")
        fn.args.extend(
            [ValueIR([TextPart("%.c")]), ValueIR([FunctionCallPart(nested)])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.c c.c")

    def test_filter_out_normal_input(self) -> None:
        fn = FunctionIR("filter-out")
        fn.args.extend([ValueIR([TextPart("%.c")]), ValueIR([TextPart("a.c b.o c.c")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b.o")

    def test_filter_out_empty_input(self) -> None:
        fn = FunctionIR("filter-out")
        fn.args.extend([ValueIR([TextPart("%.c")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_filter_out_whitespace_input(self) -> None:
        fn = FunctionIR("filter-out")
        fn.args.extend(
            [ValueIR([TextPart(" %.c\t")]), ValueIR([TextPart(" a.c\t b.o\n c.c ")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b.o")

    def test_filter_out_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a.c   b.o c.c ")]))
        fn = FunctionIR("filter-out")
        fn.args.extend(
            [ValueIR([TextPart("%.c")]), ValueIR([FunctionCallPart(nested)])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b.o")

    def test_sort_normal_input(self) -> None:
        fn = FunctionIR("sort")
        fn.args.append(ValueIR([TextPart("b a b c")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b c")

    def test_sort_empty_input(self) -> None:
        fn = FunctionIR("sort")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_sort_whitespace_input(self) -> None:
        fn = FunctionIR("sort")
        fn.args.append(ValueIR([TextPart(" \tb\n a\t b c ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b c")

    def test_sort_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" b   a b c ")]))
        fn = FunctionIR("sort")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b c")

    def test_word_normal_input(self) -> None:
        fn = FunctionIR("word")
        fn.args.extend([ValueIR([TextPart("2")]), ValueIR([TextPart("a b c")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b")

    def test_word_empty_input(self) -> None:
        fn = FunctionIR("word")
        fn.args.extend([ValueIR([TextPart("2")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_word_whitespace_input(self) -> None:
        fn = FunctionIR("word")
        fn.args.extend(
            [ValueIR([TextPart(" 2\t")]), ValueIR([TextPart(" a\t b\n c ")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b")

    def test_word_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b c ")]))
        fn = FunctionIR("word")
        fn.args.extend([ValueIR([TextPart("2")]), ValueIR([FunctionCallPart(nested)])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b")

    def test_words_normal_input(self) -> None:
        fn = FunctionIR("words")
        fn.args.append(ValueIR([TextPart("a b c")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "3")

    def test_words_empty_input(self) -> None:
        fn = FunctionIR("words")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "0")

    def test_words_whitespace_input(self) -> None:
        fn = FunctionIR("words")
        fn.args.append(ValueIR([TextPart(" \ta\n b\t c ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "3")

    def test_words_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b c ")]))
        fn = FunctionIR("words")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "3")

    def test_wordlist_normal_input(self) -> None:
        fn = FunctionIR("wordlist")
        fn.args.extend(
            [
                ValueIR([TextPart("2")]),
                ValueIR([TextPart("3")]),
                ValueIR([TextPart("a b c d")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b c")

    def test_wordlist_empty_input(self) -> None:
        fn = FunctionIR("wordlist")
        fn.args.extend(
            [
                ValueIR([TextPart("1")]),
                ValueIR([TextPart("2")]),
                ValueIR([TextPart("")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_wordlist_whitespace_input(self) -> None:
        fn = FunctionIR("wordlist")
        fn.args.extend(
            [
                ValueIR([TextPart(" 2\t")]),
                ValueIR([TextPart(" 3\n")]),
                ValueIR([TextPart(" a\t b\n c d ")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b c")

    def test_wordlist_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b c d ")]))
        fn = FunctionIR("wordlist")
        fn.args.extend(
            [
                ValueIR([TextPart("2")]),
                ValueIR([TextPart("3")]),
                ValueIR([FunctionCallPart(nested)]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "b c")

    def test_firstword_normal_input(self) -> None:
        fn = FunctionIR("firstword")
        fn.args.append(ValueIR([TextPart("a b c")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a")

    def test_firstword_empty_input(self) -> None:
        fn = FunctionIR("firstword")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_firstword_whitespace_input(self) -> None:
        fn = FunctionIR("firstword")
        fn.args.append(ValueIR([TextPart(" \ta\n b\t c ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a")

    def test_firstword_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b c ")]))
        fn = FunctionIR("firstword")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a")

    def test_lastword_normal_input(self) -> None:
        fn = FunctionIR("lastword")
        fn.args.append(ValueIR([TextPart("a b c")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "c")

    def test_lastword_empty_input(self) -> None:
        fn = FunctionIR("lastword")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_lastword_whitespace_input(self) -> None:
        fn = FunctionIR("lastword")
        fn.args.append(ValueIR([TextPart(" \ta\n b\t c ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "c")

    def test_lastword_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b c ")]))
        fn = FunctionIR("lastword")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "c")

    def test_dir_normal_input(self) -> None:
        fn = FunctionIR("dir")
        fn.args.append(ValueIR([TextPart("src/a.c b.c")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/ ./")

    def test_dir_empty_input(self) -> None:
        fn = FunctionIR("dir")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_dir_whitespace_input(self) -> None:
        fn = FunctionIR("dir")
        fn.args.append(ValueIR([TextPart(" \tsrc/a.c\n b.c ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/ ./")

    def test_dir_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" src/a.c   b.c ")]))
        fn = FunctionIR("dir")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/ ./")

    def test_suffix_normal_input(self) -> None:
        fn = FunctionIR("suffix")
        fn.args.append(ValueIR([TextPart("src/a.c b.o notes")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, ".c .o")

    def test_suffix_empty_input(self) -> None:
        fn = FunctionIR("suffix")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_suffix_whitespace_input(self) -> None:
        fn = FunctionIR("suffix")
        fn.args.append(ValueIR([TextPart(" \tsrc/a.c\n b.o notes ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, ".c .o")

    def test_suffix_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" src/a.c   b.o notes ")]))
        fn = FunctionIR("suffix")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, ".c .o")

    def test_basename_normal_input(self) -> None:
        fn = FunctionIR("basename")
        fn.args.append(ValueIR([TextPart("src/a.c b.o notes")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/a b notes")

    def test_basename_empty_input(self) -> None:
        fn = FunctionIR("basename")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_basename_whitespace_input(self) -> None:
        fn = FunctionIR("basename")
        fn.args.append(ValueIR([TextPart(" \tsrc/a.c\n b.o notes ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/a b notes")

    def test_basename_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" src/a.c   b.o notes ")]))
        fn = FunctionIR("basename")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/a b notes")

    def test_addprefix_normal_input(self) -> None:
        fn = FunctionIR("addprefix")
        fn.args.extend([ValueIR([TextPart("build/")]), ValueIR([TextPart("a.o b.o")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "build/a.o build/b.o")

    def test_addprefix_empty_input(self) -> None:
        fn = FunctionIR("addprefix")
        fn.args.extend([ValueIR([TextPart("build/")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_addprefix_whitespace_input(self) -> None:
        fn = FunctionIR("addprefix")
        fn.args.extend(
            [ValueIR([TextPart("build/")]), ValueIR([TextPart(" \ta.o\n b.o ")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "build/a.o build/b.o")

    def test_addprefix_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a.o   b.o ")]))
        fn = FunctionIR("addprefix")
        fn.args.extend(
            [ValueIR([TextPart("build/")]), ValueIR([FunctionCallPart(nested)])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "build/a.o build/b.o")

    def test_addsuffix_normal_input(self) -> None:
        fn = FunctionIR("addsuffix")
        fn.args.extend([ValueIR([TextPart(".o")]), ValueIR([TextPart("a b")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.o b.o")

    def test_addsuffix_empty_input(self) -> None:
        fn = FunctionIR("addsuffix")
        fn.args.extend([ValueIR([TextPart(".o")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_addsuffix_whitespace_input(self) -> None:
        fn = FunctionIR("addsuffix")
        fn.args.extend([ValueIR([TextPart(".o")]), ValueIR([TextPart(" \ta\n b ")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.o b.o")

    def test_addsuffix_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b ")]))
        fn = FunctionIR("addsuffix")
        fn.args.extend([ValueIR([TextPart(".o")]), ValueIR([FunctionCallPart(nested)])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.o b.o")

    def test_join_normal_input(self) -> None:
        fn = FunctionIR("join")
        fn.args.extend([ValueIR([TextPart("a b c")]), ValueIR([TextPart(".o .a")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.o b.a c")

    def test_join_empty_input(self) -> None:
        fn = FunctionIR("join")
        fn.args.extend([ValueIR([TextPart("")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_join_whitespace_input(self) -> None:
        fn = FunctionIR("join")
        fn.args.extend(
            [ValueIR([TextPart(" \ta\n b c ")]), ValueIR([TextPart(" .o\t .a ")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.o b.a c")

    def test_join_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" a   b c ")]))
        fn = FunctionIR("join")
        fn.args.extend(
            [ValueIR([FunctionCallPart(nested)]), ValueIR([TextPart(".o .a")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a.o b.a c")

    def test_if_normal_input(self) -> None:
        fn = FunctionIR("if")
        fn.args.extend(
            [
                ValueIR([TextPart("yes")]),
                ValueIR([TextPart("chosen")]),
                ValueIR([TextPart("other")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "chosen")

    def test_if_empty_input(self) -> None:
        fn = FunctionIR("if")
        fn.args.extend(
            [
                ValueIR([TextPart("")]),
                ValueIR([TextPart("chosen")]),
                ValueIR([TextPart("other")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "other")

    def test_if_whitespace_input(self) -> None:
        fn = FunctionIR("if")
        fn.args.extend(
            [
                ValueIR([TextPart(" \t")]),
                ValueIR([TextPart("chosen")]),
                ValueIR([TextPart("other")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "chosen")

    def test_if_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" \t ")]))
        fn = FunctionIR("if")
        fn.args.extend(
            [
                ValueIR([FunctionCallPart(nested)]),
                ValueIR([TextPart("chosen")]),
                ValueIR([TextPart("other")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "other")

    def test_or_normal_input(self) -> None:
        fn = FunctionIR("or")
        fn.args.extend(
            [
                ValueIR([TextPart("")]),
                ValueIR([TextPart("chosen")]),
                ValueIR([TextPart("other")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "chosen")

    def test_or_empty_input(self) -> None:
        fn = FunctionIR("or")
        fn.args.extend([ValueIR([TextPart("")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_or_whitespace_input(self) -> None:
        fn = FunctionIR("or")
        fn.args.extend(
            [
                ValueIR([TextPart("")]),
                ValueIR([TextPart(" \t")]),
                ValueIR([TextPart("other")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, " \t")

    def test_or_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" chosen   value ")]))
        fn = FunctionIR("or")
        fn.args.extend(
            [ValueIR([FunctionCallPart(nested)]), ValueIR([TextPart("other")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "chosen value")

    def test_and_normal_input(self) -> None:
        fn = FunctionIR("and")
        fn.args.extend([ValueIR([TextPart("yes")]), ValueIR([TextPart("chosen")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "chosen")

    def test_and_empty_input(self) -> None:
        fn = FunctionIR("and")
        fn.args.extend([ValueIR([TextPart("yes")]), ValueIR([TextPart("")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_and_whitespace_input(self) -> None:
        fn = FunctionIR("and")
        fn.args.extend([ValueIR([TextPart(" \t")]), ValueIR([TextPart(" value\t ")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, " value\t ")

    def test_and_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" yes   value ")]))
        fn = FunctionIR("and")
        fn.args.extend(
            [ValueIR([FunctionCallPart(nested)]), ValueIR([TextPart("chosen")])]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "chosen")

    def test_abspath_normal_input(self) -> None:
        fn = FunctionIR("abspath")
        fn.args.append(ValueIR([TextPart("cbuild_compiler/ir.py")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.abspath("cbuild_compiler/ir.py"))

    def test_abspath_empty_input(self) -> None:
        fn = FunctionIR("abspath")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_abspath_whitespace_input(self) -> None:
        fn = FunctionIR("abspath")
        fn.args.append(ValueIR([TextPart(" \tcbuild_compiler/ir.py\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.abspath("cbuild_compiler/ir.py"))

    def test_abspath_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" \tcbuild_compiler/ir.py  ")]))
        fn = FunctionIR("abspath")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.abspath("cbuild_compiler/ir.py"))

    def test_realpath_normal_input(self) -> None:
        fn = FunctionIR("realpath")
        fn.args.append(ValueIR([TextPart("cbuild_compiler/ir.py")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.realpath("cbuild_compiler/ir.py"))

    def test_realpath_empty_input(self) -> None:
        fn = FunctionIR("realpath")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_realpath_whitespace_input(self) -> None:
        fn = FunctionIR("realpath")
        fn.args.append(ValueIR([TextPart(" \tcbuild_compiler/ir.py\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.realpath("cbuild_compiler/ir.py"))

    def test_realpath_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" \tcbuild_compiler/ir.py  ")]))
        fn = FunctionIR("realpath")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.realpath("cbuild_compiler/ir.py"))

    def test_wildcard_normal_input(self) -> None:
        fn = FunctionIR("wildcard")
        fn.args.append(ValueIR([TextPart("cbuild_compiler/ir.py")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.join("cbuild_compiler", "ir.py").replace(os.sep, "/"))

    def test_wildcard_empty_input(self) -> None:
        fn = FunctionIR("wildcard")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_wildcard_whitespace_input(self) -> None:
        fn = FunctionIR("wildcard")
        fn.args.append(ValueIR([TextPart(" \tcbuild_compiler/ir.py\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.join("cbuild_compiler", "ir.py").replace(os.sep, "/"))

    def test_wildcard_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" \tcbuild_compiler/ir.py  ")]))
        fn = FunctionIR("wildcard")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, os.path.join("cbuild_compiler", "ir.py").replace(os.sep, "/"))

    def test_value_normal_input(self) -> None:
        fn = FunctionIR("value")
        fn.args.append(ValueIR([TextPart("item")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "$(X)")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_value_empty_input(self) -> None:
        fn = FunctionIR("value")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_value_whitespace_input(self) -> None:
        fn = FunctionIR("value")
        fn.args.append(ValueIR([TextPart(" \titem\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "$(X)")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_value_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" \titem  ")]))
        fn = FunctionIR("value")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "$(X)")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_flavor_normal_input(self) -> None:
        fn = FunctionIR("flavor")
        fn.args.append(ValueIR([TextPart("item")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "recursive")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_flavor_empty_input(self) -> None:
        fn = FunctionIR("flavor")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "undefined")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_flavor_whitespace_input(self) -> None:
        fn = FunctionIR("flavor")
        fn.args.append(ValueIR([TextPart(" \titem\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "recursive")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_flavor_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" \titem  ")]))
        fn = FunctionIR("flavor")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "recursive")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_origin_normal_input(self) -> None:
        fn = FunctionIR("origin")
        fn.args.append(ValueIR([TextPart("item")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "command line")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_origin_empty_input(self) -> None:
        fn = FunctionIR("origin")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "undefined")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_origin_whitespace_input(self) -> None:
        fn = FunctionIR("origin")
        fn.args.append(ValueIR([TextPart(" \titem\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "command line")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_origin_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" \titem  ")]))
        fn = FunctionIR("origin")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "item",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))]),
                "command-line",
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "command line")
        self.assertEqual(context.get_variable("item").is_deferred(), True)

    def test_foreach_normal_input(self) -> None:
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("a b")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b")
        self.assertEqual(context.has_variable("item"), False)

    def test_foreach_empty_input(self) -> None:
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")
        self.assertEqual(context.has_variable("item"), False)

    def test_foreach_whitespace_input(self) -> None:
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart(" item\t")]),
                ValueIR([TextPart(" \ta\n b ")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b")
        self.assertEqual(context.has_variable("item"), False)

    def test_foreach_nested_function_input(self) -> None:
        nested = FunctionIR("sort")
        nested.args.append(ValueIR([TextPart(" b a b ")]))
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([FunctionCallPart(nested)]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "a b")
        self.assertEqual(context.has_variable("item"), False)

    def test_call_normal_input(self) -> None:
        fn = FunctionIR("call")
        fn.args.extend(
            [
                ValueIR([TextPart("format")]),
                ValueIR([TextPart("A")]),
                ValueIR([TextPart("B")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable(
            "format",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart("-"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "A-B")
        self.assertEqual(context.has_variable("1"), False)
        self.assertEqual(context.has_variable("2"), False)

    def test_call_empty_input(self) -> None:
        fn = FunctionIR("call")
        fn.args.extend(
            [
                ValueIR([TextPart("")]),
                ValueIR([TextPart("A")]),
                ValueIR([TextPart("B")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable(
            "format",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart("-"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")
        self.assertEqual(context.has_variable("1"), False)
        self.assertEqual(context.has_variable("2"), False)

    def test_call_whitespace_input(self) -> None:
        fn = FunctionIR("call")
        fn.args.extend(
            [
                ValueIR([TextPart("format")]),
                ValueIR([TextPart(" A ")]),
                ValueIR([TextPart(" B\t")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable(
            "format",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart("-"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, " A - B\t")
        self.assertEqual(context.has_variable("1"), False)
        self.assertEqual(context.has_variable("2"), False)

    def test_call_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" format ")]))
        fn = FunctionIR("call")
        fn.args.extend(
            [
                ValueIR([FunctionCallPart(nested)]),
                ValueIR([TextPart("A")]),
                ValueIR([TextPart("B")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable(
            "format",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart("-"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "A-B")
        self.assertEqual(context.has_variable("1"), False)
        self.assertEqual(context.has_variable("2"), False)

    def test_error_normal_input(self) -> None:
        fn = FunctionIR("error")
        fn.args.append(ValueIR([TextPart("message")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(raised.exception.message, "message")
        self.assertEqual(raised.exception.machine_code, MachineCode.ERROR_FN)

    def test_error_empty_input(self) -> None:
        fn = FunctionIR("error")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(raised.exception.message, "")
        self.assertEqual(raised.exception.machine_code, MachineCode.ERROR_FN)

    def test_error_whitespace_input(self) -> None:
        fn = FunctionIR("error")
        fn.args.append(ValueIR([TextPart(" \tmessage\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(raised.exception.message, " \tmessage\n ")
        self.assertEqual(raised.exception.machine_code, MachineCode.ERROR_FN)

    def test_error_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" message  ")]))
        fn = FunctionIR("error")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(raised.exception.message, "message")
        self.assertEqual(raised.exception.machine_code, MachineCode.ERROR_FN)

    def test_warning_normal_input(self) -> None:
        fn = FunctionIR("warning")
        fn.args.append(ValueIR([TextPart("message")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch("builtins.print") as warning:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "")
            warning.assert_called_once_with("message", file=sys.stderr)

    def test_warning_empty_input(self) -> None:
        fn = FunctionIR("warning")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch("builtins.print") as warning:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "")
            warning.assert_called_once_with("", file=sys.stderr)

    def test_warning_whitespace_input(self) -> None:
        fn = FunctionIR("warning")
        fn.args.append(ValueIR([TextPart(" \tmessage\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch("builtins.print") as warning:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "")
            warning.assert_called_once_with(" \tmessage\n ", file=sys.stderr)

    def test_warning_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" message  ")]))
        fn = FunctionIR("warning")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch("builtins.print") as warning:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "")
            warning.assert_called_once_with("message", file=sys.stderr)

    def test_shell_normal_input(self) -> None:
        fn = FunctionIR("shell")
        fn.args.append(ValueIR([TextPart("echo hello")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch.object(
            ProcessRunner,
            "run",
            return_value=ProcessResult(
                command="echo hello",
                exit_code=0,
                signal=None,
                stdout="hello\r\nworld\n\n",
                stderr="",
            ),
        ) as run:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "hello world")
            run.assert_called_once()
            self.assertEqual(run.call_args.args[0], "echo hello")
            self.assertLessEqual(
                {
                    "cwd": os.getcwd(),
                    "output": "capture",
                    "ignore_errors": True,
                }.items(),
                run.call_args.args[1].items(),
            )
            self.assertEqual(context.get_raw_variable(".SHELLSTATUS"), "0")

    def test_shell_empty_input(self) -> None:
        fn = FunctionIR("shell")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch.object(
            ProcessRunner,
            "run",
            return_value=ProcessResult(
                command="", exit_code=0, signal=None, stdout="", stderr=""
            ),
        ) as run:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "")
            run.assert_called_once()
            self.assertEqual(run.call_args.args[0], "")
            self.assertLessEqual(
                {
                    "cwd": os.getcwd(),
                    "output": "capture",
                    "ignore_errors": True,
                }.items(),
                run.call_args.args[1].items(),
            )
            self.assertEqual(context.get_raw_variable(".SHELLSTATUS"), "0")

    def test_shell_whitespace_input(self) -> None:
        fn = FunctionIR("shell")
        fn.args.append(ValueIR([TextPart(" \techo hello  ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch.object(
            ProcessRunner,
            "run",
            return_value=ProcessResult(
                command=" \techo hello  ",
                exit_code=0,
                signal=None,
                stdout="hello\r\nworld\n\n",
                stderr="",
            ),
        ) as run:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "hello world")
            run.assert_called_once()
            self.assertEqual(run.call_args.args[0], " \techo hello  ")
            self.assertLessEqual(
                {
                    "cwd": os.getcwd(),
                    "output": "capture",
                    "ignore_errors": True,
                }.items(),
                run.call_args.args[1].items(),
            )
            self.assertEqual(context.get_raw_variable(".SHELLSTATUS"), "0")

    def test_shell_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" echo   hello ")]))
        fn = FunctionIR("shell")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with patch.object(
            ProcessRunner,
            "run",
            return_value=ProcessResult(
                command="echo hello",
                exit_code=0,
                signal=None,
                stdout="hello\r\nworld\n\n",
                stderr="",
            ),
        ) as run:
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "hello world")
            run.assert_called_once()
            self.assertEqual(run.call_args.args[0], "echo hello")
            self.assertLessEqual(
                {
                    "cwd": os.getcwd(),
                    "output": "capture",
                    "ignore_errors": True,
                }.items(),
                run.call_args.args[1].items(),
            )
            self.assertEqual(context.get_raw_variable(".SHELLSTATUS"), "0")

    def test_file_normal_input(self) -> None:
        directory = tempfile.mkdtemp(
            prefix="cbuild-expansion-", dir=tempfile.gettempdir()
        )
        filename = os.path.join(directory, "input.txt")
        try:
            Path(filename).write_text("message\n", newline="")
            fn = FunctionIR("file")
            fn.args.append(ValueIR([TextPart("<" + filename)]))
            value = ValueIR([FunctionCallPart(fn)])
            context = Env(empty_cli_options())
            engine = ExpansionEngine(context)
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "message")
        finally:
            if os.path.exists(filename):
                os.unlink(filename)
            os.rmdir(directory)

    def test_file_empty_input(self) -> None:
        directory = tempfile.mkdtemp(
            prefix="cbuild-expansion-", dir=tempfile.gettempdir()
        )
        filename = os.path.join(directory, "input.txt")
        try:
            Path(filename).write_text("", newline="")
            fn = FunctionIR("file")
            fn.args.append(ValueIR([TextPart("<" + filename)]))
            value = ValueIR([FunctionCallPart(fn)])
            context = Env(empty_cli_options())
            engine = ExpansionEngine(context)
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "")
        finally:
            if os.path.exists(filename):
                os.unlink(filename)
            os.rmdir(directory)

    def test_file_whitespace_input(self) -> None:
        directory = tempfile.mkdtemp(
            prefix="cbuild-expansion-", dir=tempfile.gettempdir()
        )
        filename = os.path.join(directory, "input.txt")
        try:
            Path(filename).write_text(" \tmessage\n \n", newline="")
            fn = FunctionIR("file")
            fn.args.append(ValueIR([TextPart("  < " + filename + "  ")]))
            value = ValueIR([FunctionCallPart(fn)])
            context = Env(empty_cli_options())
            engine = ExpansionEngine(context)
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, " \tmessage\n ")
        finally:
            if os.path.exists(filename):
                os.unlink(filename)
            os.rmdir(directory)

    def test_file_nested_function_input(self) -> None:
        directory = tempfile.mkdtemp(
            prefix="cbuild-expansion-", dir=tempfile.gettempdir()
        )
        filename = os.path.join(directory, "input.txt")
        try:
            Path(filename).write_text("message\n", newline="")
            nested = FunctionIR("if")
            nested.args.extend(
                [
                    ValueIR([TextPart("yes")]),
                    ValueIR([TextPart("<" + filename)]),
                    ValueIR([TextPart("<missing")]),
                ]
            )
            fn = FunctionIR("file")
            fn.args.append(ValueIR([FunctionCallPart(nested)]))
            value = ValueIR([FunctionCallPart(fn)])
            context = Env(empty_cli_options())
            engine = ExpansionEngine(context)
            expanded_value = engine.expand(value)
            self.assertEqual(expanded_value, "message")
        finally:
            if os.path.exists(filename):
                os.unlink(filename)
            os.rmdir(directory)

    def test_eval_rejects_unsupported_normal_input(self) -> None:
        fn = FunctionIR("eval")
        fn.args.append(ValueIR([TextPart("CREATED = value\n")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        # EvalRunner declares eval unsupported; silent success loses the input.
        with self.assertRaisesRegex(
            Exception, re.compile(r"not supported|unsupported", re.IGNORECASE)
        ):
            engine.expand(value)
        self.assertEqual(context.has_variable("CREATED"), False)

    def test_eval_rejects_unsupported_empty_input(self) -> None:
        fn = FunctionIR("eval")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        # EvalRunner declares eval unsupported; silent success loses the input.
        with self.assertRaisesRegex(
            Exception, re.compile(r"not supported|unsupported", re.IGNORECASE)
        ):
            engine.expand(value)
        self.assertEqual(context.has_variable("CREATED"), False)

    def test_eval_rejects_unsupported_whitespace_input(self) -> None:
        fn = FunctionIR("eval")
        fn.args.append(ValueIR([TextPart(" \t\n ")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        # EvalRunner declares eval unsupported; silent success loses the input.
        with self.assertRaisesRegex(
            Exception, re.compile(r"not supported|unsupported", re.IGNORECASE)
        ):
            engine.expand(value)
        self.assertEqual(context.has_variable("CREATED"), False)

    def test_eval_rejects_unsupported_nested_function_input(self) -> None:
        nested = FunctionIR("strip")
        nested.args.append(ValueIR([TextPart(" CREATED = value ")]))
        fn = FunctionIR("eval")
        fn.args.append(ValueIR([FunctionCallPart(nested)]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        # EvalRunner declares eval unsupported; silent success loses the input.
        with self.assertRaisesRegex(
            Exception, re.compile(r"not supported|unsupported", re.IGNORECASE)
        ):
            engine.expand(value)
        self.assertEqual(context.has_variable("CREATED"), False)

    def test_compiled_dollar_escaping_dollar_dollar(self) -> None:
        assignment = compile("value = $$\n")[0]
        self.assertIsInstance(assignment, AssignmentIR)
        value = (cast(AssignmentIR, assignment)).right
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "$")

    def test_recipe_dollar_escaping_dollar_dollar(self) -> None:
        rule = compile("all:\n\techo $$\n")[0]
        self.assertIsInstance(rule, NormalRuleIR)
        recipe = (cast(NormalRuleIR, rule)).recipes[0]
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_recipe = engine.expand(recipe)
        self.assertEqual(expanded_recipe, "echo $")

    def test_compiled_dollar_escaping_dollar_dollar_home(self) -> None:
        assignment = compile("value = $$HOME\n")[0]
        self.assertIsInstance(assignment, AssignmentIR)
        value = (cast(AssignmentIR, assignment)).right
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "$HOME")

    def test_recipe_dollar_escaping_dollar_dollar_home(self) -> None:
        rule = compile("all:\n\techo $$HOME\n")[0]
        self.assertIsInstance(rule, NormalRuleIR)
        recipe = (cast(NormalRuleIR, rule)).recipes[0]
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_recipe = engine.expand(recipe)
        self.assertEqual(expanded_recipe, "echo $HOME")

    def test_compiled_dollar_escaping_dollar_dollar_dollar_dollar(self) -> None:
        assignment = compile("value = $$$$\n")[0]
        self.assertIsInstance(assignment, AssignmentIR)
        value = (cast(AssignmentIR, assignment)).right
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "$$")

    def test_recipe_dollar_escaping_dollar_dollar_dollar_dollar(self) -> None:
        rule = compile("all:\n\techo $$$$\n")[0]
        self.assertIsInstance(rule, NormalRuleIR)
        recipe = (cast(NormalRuleIR, rule)).recipes[0]
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_recipe = engine.expand(recipe)
        self.assertEqual(expanded_recipe, "echo $$")

    def test_compiled_dollar_escaping_foo_dollar_dollar_bar(self) -> None:
        assignment = compile("value = foo$$bar\n")[0]
        self.assertIsInstance(assignment, AssignmentIR)
        value = (cast(AssignmentIR, assignment)).right
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "foo$bar")

    def test_recipe_dollar_escaping_foo_dollar_dollar_bar(self) -> None:
        rule = compile("all:\n\techo foo$$bar\n")[0]
        self.assertIsInstance(rule, NormalRuleIR)
        recipe = (cast(NormalRuleIR, rule)).recipes[0]
        context = Env(empty_cli_options())
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        expanded_recipe = engine.expand(recipe)
        self.assertEqual(expanded_recipe, "echo foo$bar")

    # cbuild currenlty does not support $@
    # test("automatic variable expansion $@", () => {
    #   const [assignment] = compile("value = $@\n");
    #   const value: ValueIR = (assignment as AssignmentIR).right!;
    #   const rule = new NormalRule({
    #     target: "build/app",
    #     prerequisites: ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
    #     orderOnlyPrerequisites: ["cache", "generated", "cache"],
    #     shellCommands: [],
    #     recipeIRs: [],
    #     evaluatedRecipeIRs: [],
    #     ruleIR: new NormalRuleIR(),
    #     ruleSeperator: ":",
    #   });
    #   const resolved_prequisites: PreqResolution[] = rule.prerequisites.map(
    #     (preqName) => ({
    #       preqName,
    #       vpathRules: [],
    #       origin: { type: "target-rule" },
    #     }),
    #   );
    #   const order_only: PreqResolution[] = rule.orderOnlyPrerequisites.map(
    #     (preqName) => ({
    #       preqName,
    #       vpathRules: [],
    #       origin: { type: "target-rule" },
    #     }),
    #   );
    #   const target: TargetResolution = {
    #     targetName: rule.target,
    #     vpathRules: [],
    #     origin: { type: "not-found" },
    #   };
    #   const parent_context = new Env({} as CBuildOptions);
    #   const context = new AutomaticVariableEnv(
    #     rule,
    #     parent_context,
    #     target,
    #     resolved_prequisites,
    #     order_only,
    #     {
    #       resolvedTarget: target,
    #       resolvedPreqs: resolved_prequisites,
    #       isTargetOutOfDate: true,
    #       outOfDatePreqs: [
    #         resolved_prequisites[1],
    #         resolved_prequisites[2],
    #         resolved_prequisites[1],
    #       ],
    #     },
    #   ).generate();
    #   const engine = new ExpansionEngine(context);
    #   const expanded_value = engine.expand(value);
    #   expect(expanded_value).toEqual("build/app");
    # });
    def test_automatic_variable_expansion_lt(self) -> None:
        assignment = compile("value = $<\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/main.o")

    def test_automatic_variable_expansion_question(self) -> None:
        assignment = compile("value = $?\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "lib/util.o src/main.o")

    def test_automatic_variable_expansion_caret(self) -> None:
        assignment = compile("value = $^\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src/main.o lib/util.o standalone.o")

    def test_automatic_variable_expansion_plus(self) -> None:
        assignment = compile("value = $+\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(
            expanded_value, "src/main.o lib/util.o src/main.o standalone.o"
        )

    def test_automatic_variable_expansion_pipe(self) -> None:
        assignment = compile("value = $|\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "cache generated")

    def test_automatic_variable_expansion_at_d(self) -> None:
        assignment = compile("value = $(@D)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "build")

    def test_automatic_variable_expansion_at_f(self) -> None:
        assignment = compile("value = $(@F)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "app")

    def test_automatic_variable_expansion_lt_d(self) -> None:
        assignment = compile("value = $(<D)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src")

    def test_automatic_variable_expansion_lt_f(self) -> None:
        assignment = compile("value = $(<F)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "main.o")

    def test_automatic_variable_expansion_caret_d(self) -> None:
        assignment = compile("value = $(^D)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src lib .")

    def test_automatic_variable_expansion_caret_f(self) -> None:
        assignment = compile("value = $(^F)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "main.o util.o standalone.o")

    def test_automatic_variable_expansion_plus_d(self) -> None:
        assignment = compile("value = $(+D)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "src lib src .")

    def test_automatic_variable_expansion_plus_f(self) -> None:
        assignment = compile("value = $(+F)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "main.o util.o main.o standalone.o")

    def test_automatic_variable_expansion_question_d(self) -> None:
        assignment = compile("value = $(?D)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "lib src")

    def test_automatic_variable_expansion_question_f(self) -> None:
        assignment = compile("value = $(?F)\n")[0]
        value = (cast(AssignmentIR, assignment)).right
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "util.o main.o")

    def test_automatic_caret_removes_duplicates(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("^")]))])
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(
            expanded_value.split(" "), ["src/main.o", "lib/util.o", "standalone.o"]
        )

    def test_automatic_plus_preserves_duplicates(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("+")]))])
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(
            expanded_value.split(" "),
            ["src/main.o", "lib/util.o", "src/main.o", "standalone.o"],
        )

    def test_automatic_variables_are_empty_when_prerequisites_are_absent(self) -> None:
        parent_context = Env(empty_cli_options())
        rule = NormalRule(
            {
                "target": "app",
                "prerequisites": [],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        context = AutomaticVariableEnv(
            rule, parent_context, None, [], [], None
        ).generate()
        value = ValueIR(
            [
                VariableReferencePart(ValueIR([TextPart("<")])),
                VariableReferencePart(ValueIR([TextPart("?")])),
                VariableReferencePart(ValueIR([TextPart("^")])),
                VariableReferencePart(ValueIR([TextPart("+")])),
                VariableReferencePart(ValueIR([TextPart("|")])),
                VariableReferencePart(ValueIR([TextPart("<D")])),
                VariableReferencePart(ValueIR([TextPart("<F")])),
            ]
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "")
        self.assertEqual(context.get_raw_variable("@D"), ".")
        self.assertEqual(context.get_raw_variable("@F"), "app")

    def test_computed_reference_a(self) -> None:
        value = ValueIR(
            [
                VariableReferencePart(
                    ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
                )
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("B"))
        context.set_variable("B", SymbolTableVariable.raw_variable("value"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "value")

    def test_computed_reference_a_2(self) -> None:
        value = ValueIR(
            [
                VariableReferencePart(
                    ValueIR(
                        [
                            VariableReferencePart(
                                ValueIR(
                                    [VariableReferencePart(ValueIR([TextPart("A")]))]
                                )
                            )
                        ]
                    )
                )
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("B"))
        context.set_variable("B", SymbolTableVariable.raw_variable("C"))
        context.set_variable("C", SymbolTableVariable.raw_variable("value"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "value")

    def test_computed_reference_empty_computed_name(self) -> None:
        value = ValueIR(
            [
                VariableReferencePart(
                    ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
                )
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable(""))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_computed_reference_undefined_computed_name(self) -> None:
        value = ValueIR(
            [
                VariableReferencePart(
                    ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
                )
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("missing"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_computed_reference_undefined_inner_computed_reference(self) -> None:
        value = ValueIR(
            [
                VariableReferencePart(
                    ValueIR(
                        [
                            VariableReferencePart(
                                ValueIR(
                                    [VariableReferencePart(ValueIR([TextPart("A")]))]
                                )
                            )
                        ]
                    )
                )
            ]
        )
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "")

    def test_computed_reference_many_layers_of_computed_references(self) -> None:
        value = ValueIR(
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
                                                                                                            [
                                                                                                                TextPart(
                                                                                                                    "A"
                                                                                                                )
                                                                                                            ]
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
                                                                )
                                                            ]
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
                )
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("A", SymbolTableVariable.raw_variable("key_1"))
        context.set_variable("key_1", SymbolTableVariable.raw_variable("key_2"))
        context.set_variable("key_2", SymbolTableVariable.raw_variable("key_3"))
        context.set_variable("key_3", SymbolTableVariable.raw_variable("key_4"))
        context.set_variable("key_4", SymbolTableVariable.raw_variable("key_5"))
        context.set_variable("key_5", SymbolTableVariable.raw_variable("key_6"))
        context.set_variable("key_6", SymbolTableVariable.raw_variable("key_7"))
        context.set_variable("key_7", SymbolTableVariable.raw_variable("value"))
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(expanded_value, "value")

    def test_nested_functions_compute_variable_reference_names(self) -> None:
        strip = FunctionIR("strip")
        strip.args.append(ValueIR([TextPart(" PROFILE ")]))
        prefix = FunctionIR("addprefix")
        prefix.args.extend(
            [ValueIR([TextPart("debug_")]), ValueIR([FunctionCallPart(strip)])]
        )
        value = ValueIR([VariableReferencePart(ValueIR([FunctionCallPart(prefix)]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "debug_PROFILE", SymbolTableVariable.raw_variable("selected")
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "selected")

    def test_subst_zero_argument_behavior(self) -> None:
        fn = FunctionIR("subst")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_patsubst_zero_argument_behavior(self) -> None:
        fn = FunctionIR("patsubst")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_strip_zero_argument_behavior(self) -> None:
        fn = FunctionIR("strip")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_findstring_zero_argument_behavior(self) -> None:
        fn = FunctionIR("findstring")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_filter_zero_argument_behavior(self) -> None:
        fn = FunctionIR("filter")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_filter_out_zero_argument_behavior(self) -> None:
        fn = FunctionIR("filter-out")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_sort_zero_argument_behavior(self) -> None:
        fn = FunctionIR("sort")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_word_zero_argument_behavior(self) -> None:
        fn = FunctionIR("word")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_words_zero_argument_behavior(self) -> None:
        fn = FunctionIR("words")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_wordlist_zero_argument_behavior(self) -> None:
        fn = FunctionIR("wordlist")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_firstword_zero_argument_behavior(self) -> None:
        fn = FunctionIR("firstword")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_lastword_zero_argument_behavior(self) -> None:
        fn = FunctionIR("lastword")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_dir_zero_argument_behavior(self) -> None:
        fn = FunctionIR("dir")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "")

    def test_suffix_zero_argument_behavior(self) -> None:
        fn = FunctionIR("suffix")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_basename_zero_argument_behavior(self) -> None:
        fn = FunctionIR("basename")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_addprefix_zero_argument_behavior(self) -> None:
        fn = FunctionIR("addprefix")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_addsuffix_zero_argument_behavior(self) -> None:
        fn = FunctionIR("addsuffix")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_join_zero_argument_behavior(self) -> None:
        fn = FunctionIR("join")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_if_zero_argument_behavior(self) -> None:
        fn = FunctionIR("if")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_or_zero_argument_behavior(self) -> None:
        fn = FunctionIR("or")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "")

    def test_and_zero_argument_behavior(self) -> None:
        fn = FunctionIR("and")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "")

    def test_abspath_zero_argument_behavior(self) -> None:
        fn = FunctionIR("abspath")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_realpath_zero_argument_behavior(self) -> None:
        fn = FunctionIR("realpath")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_wildcard_zero_argument_behavior(self) -> None:
        fn = FunctionIR("wildcard")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_value_zero_argument_behavior(self) -> None:
        fn = FunctionIR("value")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_flavor_zero_argument_behavior(self) -> None:
        fn = FunctionIR("flavor")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_origin_zero_argument_behavior(self) -> None:
        fn = FunctionIR("origin")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_foreach_zero_argument_behavior(self) -> None:
        fn = FunctionIR("foreach")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_call_zero_argument_behavior(self) -> None:
        fn = FunctionIR("call")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "")

    def test_error_zero_argument_behavior(self) -> None:
        fn = FunctionIR("error")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_warning_zero_argument_behavior(self) -> None:
        fn = FunctionIR("warning")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_shell_zero_argument_behavior(self) -> None:
        fn = FunctionIR("shell")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_file_zero_argument_behavior(self) -> None:
        fn = FunctionIR("file")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_eval_zero_argument_behavior(self) -> None:
        fn = FunctionIR("eval")
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaisesRegex(
            Exception, re.compile(r"not supported|unsupported", re.IGNORECASE)
        ):
            engine.expand(value)

    def test_subst_rejects_missing_required_arguments(self) -> None:
        fn = FunctionIR("subst")
        fn.args.extend([ValueIR([TextPart("a")]), ValueIR([TextPart("b")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_patsubst_rejects_missing_required_arguments(self) -> None:
        fn = FunctionIR("patsubst")
        fn.args.extend([ValueIR([TextPart("%.c")]), ValueIR([TextPart("%.o")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_join_rejects_missing_required_arguments(self) -> None:
        fn = FunctionIR("join")
        fn.args.append(ValueIR([TextPart("a")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_wordlist_rejects_missing_required_arguments(self) -> None:
        fn = FunctionIR("wordlist")
        fn.args.extend([ValueIR([TextPart("1")]), ValueIR([TextPart("2")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_if_rejects_missing_required_arguments(self) -> None:
        fn = FunctionIR("if")
        fn.args.append(ValueIR([TextPart("yes")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_foreach_rejects_missing_required_arguments(self) -> None:
        fn = FunctionIR("foreach")
        fn.args.extend([ValueIR([TextPart("item")]), ValueIR([TextPart("a b")])])
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception):
            engine.expand(value)

    def test_if_evaluates_its_condition_before_only_the_selected_branch(self) -> None:
        condition_warning = FunctionIR("warning")
        condition_warning.args.append(ValueIR([TextPart("condition")]))
        then_warning = FunctionIR("warning")
        then_warning.args.append(ValueIR([TextPart("then")]))
        else_warning = FunctionIR("warning")
        else_warning.args.append(ValueIR([TextPart("else")]))
        fn = FunctionIR("if")
        fn.args.extend(
            [
                ValueIR(
                    [
                        FunctionCallPart(condition_warning),
                        VariableReferencePart(ValueIR([TextPart("enabled")])),
                    ]
                ),
                ValueIR([FunctionCallPart(then_warning), TextPart("selected")]),
                ValueIR([FunctionCallPart(else_warning), TextPart("fallback")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("enabled", SymbolTableVariable.raw_variable("yes"))
        engine = ExpansionEngine(context)
        warnings = []
        with patch(
            "builtins.print", side_effect=lambda message, **_: warnings.append(message)
        ):
            self.assertEqual(engine.expand(value), "selected")
            context.set_variable("enabled", SymbolTableVariable.raw_variable(""))
            self.assertEqual(engine.expand(value), "fallback")
            self.assertEqual(warnings, ["condition", "then", "condition", "else"])

    def test_foreach_expands_its_list_once_before_creating_temporary_bindings(
        self,
    ) -> None:
        list_warning = FunctionIR("warning")
        list_warning.args.append(ValueIR([TextPart("list")]))
        body_warning = FunctionIR("warning")
        body_warning.args.append(
            ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))])
        )
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR(
                    [
                        FunctionCallPart(list_warning),
                        VariableReferencePart(ValueIR([TextPart("item")])),
                    ]
                ),
                ValueIR(
                    [
                        FunctionCallPart(body_warning),
                        VariableReferencePart(ValueIR([TextPart("item")])),
                    ]
                ),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        original_item = SymbolTableVariable.raw_variable("first second")
        context.set_variable("item", original_item)
        engine = ExpansionEngine(context)
        warnings = []
        with patch(
            "builtins.print", side_effect=lambda message, **_: warnings.append(message)
        ):
            self.assertEqual(engine.expand(value), "first second")
            self.assertEqual(warnings, ["list", "first", "second"])
            self.assertEqual(context.get_variable("item"), original_item)

    def test_nested_function_arguments_expand_from_left_to_right(self) -> None:
        from_warning = FunctionIR("warning")
        from_warning.args.append(ValueIR([TextPart("from")]))
        to_warning = FunctionIR("warning")
        to_warning.args.append(ValueIR([TextPart("to")]))
        left_warning = FunctionIR("warning")
        left_warning.args.append(ValueIR([TextPart("left")]))
        right_warning = FunctionIR("warning")
        right_warning.args.append(ValueIR([TextPart("right")]))
        nested = FunctionIR("join")
        nested.args.extend(
            [
                ValueIR([FunctionCallPart(left_warning), TextPart("a")]),
                ValueIR([FunctionCallPart(right_warning), TextPart("c")]),
            ]
        )
        fn = FunctionIR("subst")
        fn.args.extend(
            [
                ValueIR([FunctionCallPart(from_warning), TextPart("a")]),
                ValueIR([FunctionCallPart(to_warning), TextPart("b")]),
                ValueIR([FunctionCallPart(nested)]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        warnings = []
        with patch(
            "builtins.print", side_effect=lambda message, **_: warnings.append(message)
        ):
            self.assertEqual(engine.expand(value), "bc")
            self.assertEqual(warnings, ["from", "to", "left", "right"])

    def test_or_ignores_recursion_after_short_circuiting(self) -> None:
        fn = FunctionIR("or")
        fn.args.extend(
            [
                ValueIR([TextPart("selected")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("cycle")]))]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable(
            "cycle",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("cycle")]))])
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "selected")

    def test_and_ignores_recursion_after_short_circuiting(self) -> None:
        fn = FunctionIR("and")
        fn.args.extend(
            [
                ValueIR([TextPart("")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("cycle")]))]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable(
            "cycle",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("cycle")]))])
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "")

    def test_if_ignores_recursion_in_its_unselected_branch(self) -> None:
        fn = FunctionIR("if")
        fn.args.extend(
            [
                ValueIR([TextPart("yes")]),
                ValueIR([TextPart("selected")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("cycle")]))]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable(
            "cycle",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("cycle")]))])
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "selected")

    def test_nested_call_restores_outer_and_global_positional_arguments(self) -> None:
        inner_call = FunctionIR("call")
        inner_call.args.extend(
            [
                ValueIR([TextPart("inner")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("2")]))]),
                ValueIR([TextPart("inner-second")]),
            ]
        )
        outer_call = FunctionIR("call")
        outer_call.args.extend(
            [
                ValueIR([TextPart("outer")]),
                ValueIR([TextPart("outer-first")]),
                ValueIR([TextPart("outer-second")]),
            ]
        )
        value = ValueIR([FunctionCallPart(outer_call)])
        context = Env(empty_cli_options())
        context.set_variable("1", SymbolTableVariable.raw_variable("global-first"))
        context.set_variable("2", SymbolTableVariable.raw_variable("global-second"))
        context.set_variable(
            "inner",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart("-"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        context.set_variable(
            "outer",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart(":"),
                        FunctionCallPart(inner_call),
                        TextPart(":"),
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart(","),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(
            engine.expand(value),
            "outer-first:outer-second-inner-second:outer-first,outer-second",
        )
        self.assertEqual(context.get_raw_variable("1"), "global-first")
        self.assertEqual(context.get_raw_variable("2"), "global-second")
        self.assertEqual(context.has_variable("0"), False)

    def test_nested_call_leaves_omitted_positional_arguments_empty(self) -> None:
        inner_call = FunctionIR("call")
        inner_call.args.extend(
            [ValueIR([TextPart("inner")]), ValueIR([TextPart("inner-first")])]
        )
        outer_call = FunctionIR("call")
        outer_call.args.extend(
            [
                ValueIR([TextPart("outer")]),
                ValueIR([TextPart("outer-first")]),
                ValueIR([TextPart("outer-second")]),
            ]
        )
        value = ValueIR([FunctionCallPart(outer_call)])
        context = Env(empty_cli_options())
        context.set_variable(
            "inner",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart("-"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        context.set_variable(
            "outer",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        FunctionCallPart(inner_call),
                        TextPart(":"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "inner-first-:outer-second")
        self.assertEqual(context.has_variable("1"), False)
        self.assertEqual(context.has_variable("2"), False)

    def test_child_raw_variable_shadows_a_raw_parent_variable(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("VALUE")]))])
        parent_context = Env(empty_cli_options())
        parent_context.set_variable("BASE", SymbolTableVariable.raw_variable("parent"))
        parent_context.set_variable("VALUE", SymbolTableVariable.raw_variable("parent"))
        context = Env(empty_cli_options())
        context.enclosing = parent_context
        context.set_variable("VALUE", SymbolTableVariable.raw_variable("child"))
        engine = ExpansionEngine(context)
        parent_engine = ExpansionEngine(parent_context)
        self.assertEqual(engine.expand(value), "child")
        self.assertEqual(parent_engine.expand(value), "parent")
        self.assertEqual(context.variable_count, 1)

    def test_child_raw_variable_shadows_a_deferred_parent_variable(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("VALUE")]))])
        parent_context = Env(empty_cli_options())
        parent_context.set_variable("BASE", SymbolTableVariable.raw_variable("parent"))
        parent_context.set_variable(
            "VALUE",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("BASE")]))])
            ),
        )
        context = Env(empty_cli_options())
        context.enclosing = parent_context
        context.set_variable("VALUE", SymbolTableVariable.raw_variable("child"))
        engine = ExpansionEngine(context)
        parent_engine = ExpansionEngine(parent_context)
        self.assertEqual(engine.expand(value), "child")
        self.assertEqual(parent_engine.expand(value), "parent")
        self.assertEqual(context.variable_count, 1)

    def test_foreach_shadows_a_parent_binding_and_deletes_its_temporary_local_binding(
        self,
    ) -> None:
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("a b")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        value = ValueIR(
            [
                FunctionCallPart(fn),
                TextPart(":"),
                VariableReferencePart(ValueIR([TextPart("item")])),
            ]
        )
        parent_context = Env(empty_cli_options())
        parent_context.set_variable("item", SymbolTableVariable.raw_variable("parent"))
        context = Env(empty_cli_options())
        context.enclosing = parent_context
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "a b:parent")
        self.assertEqual(context.has_variable("item"), False)
        self.assertEqual(parent_context.get_raw_variable("item"), "parent")

    def test_nested_foreach_and_call_preserve_enclosing_and_positional_bindings(
        self,
    ) -> None:
        pair_call = FunctionIR("call")
        pair_call.args.extend(
            [
                ValueIR([TextPart("pair")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("1")]))]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        inner_foreach = FunctionIR("foreach")
        inner_foreach.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("x y")]),
                ValueIR([FunctionCallPart(pair_call)]),
            ]
        )
        format_call = FunctionIR("call")
        format_call.args.extend(
            [
                ValueIR([TextPart("format")]),
                ValueIR([VariableReferencePart(ValueIR([TextPart("item")]))]),
            ]
        )
        outer_foreach = FunctionIR("foreach")
        outer_foreach.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("a b")]),
                ValueIR([FunctionCallPart(format_call)]),
            ]
        )
        value = ValueIR([FunctionCallPart(outer_foreach)])
        parent_context = Env(empty_cli_options())
        parent_context.set_variable("item", SymbolTableVariable.raw_variable("parent"))
        context = Env(empty_cli_options())
        context.enclosing = parent_context
        context.set_variable("1", SymbolTableVariable.raw_variable("global"))
        context.set_variable(
            "pair",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart(":"),
                        VariableReferencePart(ValueIR([TextPart("2")])),
                    ]
                )
            ),
        )
        context.set_variable(
            "format",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("1")])),
                        TextPart("["),
                        FunctionCallPart(inner_foreach),
                        TextPart("]"),
                        VariableReferencePart(ValueIR([TextPart("item")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "a[a:x a:y]a b[b:x b:y]b")
        self.assertEqual(context.get_raw_variable("1"), "global")
        self.assertEqual(context.has_variable("2"), False)
        self.assertEqual(context.has_variable("item"), False)
        self.assertEqual(parent_context.get_raw_variable("item"), "parent")

    def test_direct_deferred_recursion_is_rejected(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception), str(RecursiveVariableExpansionException("A"))
        )

    def test_indirect_deferred_recursion_is_rejected(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("B")]))])
            ),
        )
        context.set_variable(
            "B",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception), str(RecursiveVariableExpansionException("A"))
        )

    def test_long_deferred_recursion_is_rejected(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("B")]))])
            ),
        )
        context.set_variable(
            "B",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("C")]))])
            ),
        )
        context.set_variable(
            "C",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("D")]))])
            ),
        )
        context.set_variable(
            "D",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception), str(RecursiveVariableExpansionException("A"))
        )

    def test_computed_variable_names_participate_in_recursive_cycle_detection(
        self,
    ) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable("key", SymbolTableVariable.raw_variable("A"))
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(
                            ValueIR([VariableReferencePart(ValueIR([TextPart("key")]))])
                        )
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception), str(RecursiveVariableExpansionException("A"))
        )

    def test_function_arguments_participate_in_recursive_cycle_detection(self) -> None:
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))]))
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A", SymbolTableVariable.deferred_variable(ValueIR([FunctionCallPart(fn)]))
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            str(raised.exception), str(RecursiveVariableExpansionException("A"))
        )

    def test_repeated_deferred_dependencies_do_not_produce_false_cycles(self) -> None:
        value = ValueIR(
            [
                VariableReferencePart(ValueIR([TextPart("A")])),
                VariableReferencePart(ValueIR([TextPart("A")])),
                VariableReferencePart(ValueIR([TextPart("B")])),
                VariableReferencePart(ValueIR([TextPart("A")])),
            ]
        )
        context = Env(empty_cli_options())
        context.set_variable("ROOT", SymbolTableVariable.raw_variable("x"))
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("ROOT")]))])
            ),
        )
        context.set_variable(
            "B",
            SymbolTableVariable.deferred_variable(
                ValueIR(
                    [
                        VariableReferencePart(ValueIR([TextPart("A")])),
                        VariableReferencePart(ValueIR([TextPart("A")])),
                    ]
                )
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "xxxxx")
        self.assertEqual(engine.expand(value), "xxxxx")
        context.set_variable("ROOT", SymbolTableVariable.raw_variable("y"))
        self.assertEqual(engine.expand(value), "yyyyy")

    def test_same_engine_can_expand_a_failed_variable_after_raw_repair(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(RecursiveVariableExpansionException):
            engine.expand(value)
        context.set_variable("A", SymbolTableVariable.raw_variable("fixed"))
        self.assertEqual(engine.expand(value), "fixed")
        self.assertEqual(engine.expand(value), "fixed")

    def test_same_engine_can_expand_a_failed_variable_after_deferred_repair(
        self,
    ) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(RecursiveVariableExpansionException):
            engine.expand(value)
        context.set_variable(
            "A", SymbolTableVariable.deferred_variable(ValueIR([TextPart("fixed")]))
        )
        self.assertEqual(engine.expand(value), "fixed")
        self.assertEqual(engine.expand(value), "fixed")

    def test_same_engine_can_expand_an_indirect_cycle_after_repairing_its_leaf(
        self,
    ) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("B")]))])
            ),
        )
        context.set_variable(
            "B",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        engine = ExpansionEngine(context)
        with self.assertRaises(RecursiveVariableExpansionException):
            engine.expand(value)
        context.set_variable("B", SymbolTableVariable.raw_variable("fixed"))
        self.assertEqual(engine.expand(value), "fixed")

    def test_active_recursive_lookups_are_empty_after_an_expansion_exception(
        self,
    ) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        active_lookups = set()
        engine = ValueExpansionEngine(context, active_lookups)
        with self.assertRaises(RecursiveVariableExpansionException):
            engine.expand(value)
        self.assertEqual(len(active_lookups), 0)

    def test_function_exceptions_also_clean_up_deferred_lookup_state(self) -> None:
        fn = FunctionIR("error")
        fn.args.append(ValueIR([TextPart("failed")]))
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A", SymbolTableVariable.deferred_variable(ValueIR([FunctionCallPart(fn)]))
        )
        engine = ExpansionEngine(context)
        with self.assertRaisesRegex(Exception, re.escape("failed")):
            engine.expand(value)
        context.set_variable("A", SymbolTableVariable.raw_variable("fixed"))
        self.assertEqual(engine.expand(value), "fixed")

    def test_foreach_restores_its_binding_after_a_body_exception(self) -> None:
        failure = FunctionIR("error")
        failure.args.append(ValueIR([TextPart("body failed")]))
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("a b")]),
                ValueIR([FunctionCallPart(failure)]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        original_item = SymbolTableVariable.raw_variable("saved")
        context.set_variable("item", original_item)
        engine = ExpansionEngine(context)
        with self.assertRaisesRegex(Exception, re.escape("body failed")):
            engine.expand(value)
        self.assertEqual(context.get_variable("item"), original_item)

    def test_foreach_removes_its_binding_after_a_body_exception(self) -> None:
        failure = FunctionIR("error")
        failure.args.append(ValueIR([TextPart("body failed")]))
        fn = FunctionIR("foreach")
        fn.args.extend(
            [
                ValueIR([TextPart("item")]),
                ValueIR([TextPart("a b")]),
                ValueIR([FunctionCallPart(failure)]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaisesRegex(Exception, re.escape("body failed")):
            engine.expand(value)
        self.assertEqual(context.has_variable("item"), False)
        self.assertEqual(context.variable_count, 0)

    def test_recipe_normal_variable_expansion(self) -> None:
        recipe = RecipeIR.command(
            ValueIR([VariableReferencePart(ValueIR([TextPart("RAW")]))])
        )
        context = Env(empty_cli_options())
        context.set_variable("RAW", SymbolTableVariable.raw_variable("hello"))
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(recipe), "hello")

    def test_recipe_deferred_variable_expansion(self) -> None:
        recipe = RecipeIR.command(
            ValueIR([VariableReferencePart(ValueIR([TextPart("DEFERRED")]))])
        )
        context = Env(empty_cli_options())
        context.set_variable("BASE", SymbolTableVariable.raw_variable("hello"))
        context.set_variable(
            "DEFERRED",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("BASE")]))])
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(recipe), "hello")

    def test_recipe_automatic_variable_expansion(self) -> None:
        recipe = RecipeIR.command(
            ValueIR([VariableReferencePart(ValueIR([TextPart("<")]))])
        )
        context = Env(empty_cli_options())
        context.set_variable(
            "<", SymbolTableVariable.raw_variable("main.c", "automatic")
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(recipe), "main.c")

    def test_recipe_function_expansion(self) -> None:
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([TextPart("  a\t b  ")]))
        recipe = RecipeIR.command(ValueIR([FunctionCallPart(fn)]))
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(recipe), "a b")

    def test_recipe_preserves_command_whitespace_around_expansions(self) -> None:
        recipe = RecipeIR.command(
            ValueIR(
                [
                    TextPart(" \t echo  "),
                    VariableReferencePart(ValueIR([TextPart("CONTENT")])),
                    TextPart("\t\n  end \t"),
                ]
            )
        )
        context = Env(empty_cli_options())
        context.set_variable("CONTENT", SymbolTableVariable.raw_variable(" a\t b\n "))
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(recipe), " \t echo   a\t b\n \t\n  end \t")

    def test_compiled_recipe_combines_variables_functions_and_escaped_dollars(
        self,
    ) -> None:
        rule = compile("all:\n\techo $(RAW) $(DEFERRED) $< $(strip a  b) $$HOME\n")[0]
        recipe = (cast(NormalRuleIR, rule)).recipes[0]
        context = Env(empty_cli_options())
        context.set_variable("RAW", SymbolTableVariable.raw_variable("raw"))
        context.set_variable("BASE", SymbolTableVariable.raw_variable("deferred"))
        context.set_variable(
            "DEFERRED",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("BASE")]))])
            ),
        )
        context.set_variable(
            "<", SymbolTableVariable.raw_variable("main.c", "automatic")
        )
        context.set_variable("HOME", SymbolTableVariable.raw_variable("make-home"))
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(recipe), "echo raw deferred main.c a b $HOME")

    def test_compiled_recipe_preserves_interior_and_trailing_command_whitespace(
        self,
    ) -> None:
        rule = compile("all:\n\t  echo\t$(VALUE)  \n")[0]
        recipe = (cast(NormalRuleIR, rule)).recipes[0]
        context = Env(empty_cli_options())
        context.set_variable("VALUE", SymbolTableVariable.raw_variable(" a\tb "))
        engine = ExpansionEngine(context)
        # The parser consumes indentation before the command.
        self.assertEqual(engine.expand(recipe), "echo\t a\tb   ")

    def test_empty_function_output_expands_to_an_empty_string(self) -> None:
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "")

    def test_adjacent_empty_functions_and_references_add_no_whitespace(self) -> None:
        fn = FunctionIR("strip")
        fn.args.append(ValueIR([TextPart(" \t\n ")]))
        value = ValueIR(
            [
                TextPart("["),
                FunctionCallPart(fn),
                VariableReferencePart(ValueIR([TextPart("missing")])),
                FunctionCallPart(fn),
                TextPart("]"),
            ]
        )
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "[]")

    def test_subst_results_containing_variable_syntax_remain_literal(self) -> None:
        fn = FunctionIR("subst")
        fn.args.extend(
            [
                ValueIR([TextPart("TOKEN")]),
                ValueIR([TextPart("$(X)")]),
                ValueIR([TextPart("TOKEN")]),
            ]
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "LITERAL",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))])
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "$(X)")
        context.set_variable("X", SymbolTableVariable.raw_variable("changed"))
        self.assertEqual(engine.expand(value), "$(X)")

    def test_value_results_containing_variable_syntax_remain_literal(self) -> None:
        fn = FunctionIR("value")
        fn.args.append(ValueIR([TextPart("LITERAL")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        context.set_variable(
            "LITERAL",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("X")]))])
            ),
        )
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "$(X)")
        context.set_variable("X", SymbolTableVariable.raw_variable("changed"))
        self.assertEqual(engine.expand(value), "$(X)")

    def test_shell_results_containing_variable_syntax_remain_literal(self) -> None:
        fn = FunctionIR("shell")
        fn.args.append(ValueIR([TextPart("command")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
        engine = ExpansionEngine(context)
        with patch.object(
            ProcessRunner,
            "run",
            return_value=ProcessResult(
                command="command", exit_code=0, signal=None, stdout="$(X)\n", stderr=""
            ),
        ):
            self.assertEqual(engine.expand(value), "$(X)")

    def test_file_results_containing_variable_syntax_remain_literal(self) -> None:
        directory = tempfile.mkdtemp(
            prefix="cbuild-expansion-", dir=tempfile.gettempdir()
        )
        filename = os.path.join(directory, "input.txt")
        try:
            Path(filename).write_text("$(X)\n", newline="")
            fn = FunctionIR("file")
            fn.args.append(ValueIR([TextPart("<" + filename)]))
            value = ValueIR([FunctionCallPart(fn)])
            context = Env(empty_cli_options())
            context.set_variable("X", SymbolTableVariable.raw_variable("expanded"))
            engine = ExpansionEngine(context)
            self.assertEqual(engine.expand(value), "$(X)")
        finally:
            if os.path.exists(filename):
                os.unlink(filename)
            os.rmdir(directory)

    def test_file_writes_and_appends_expanded_contents(self) -> None:
        directory = tempfile.mkdtemp(
            prefix="cbuild-expansion-", dir=tempfile.gettempdir()
        )
        filename = os.path.join(directory, "output.txt")
        try:
            write = FunctionIR("file")
            write.args.extend(
                [
                    ValueIR([TextPart(">" + filename)]),
                    ValueIR([VariableReferencePart(ValueIR([TextPart("CONTENT")]))]),
                ]
            )
            append = FunctionIR("file")
            append.args.extend(
                [ValueIR([TextPart(">>" + filename)]), ValueIR([TextPart("tail")])]
            )
            read = FunctionIR("file")
            read.args.append(ValueIR([TextPart("<" + filename)]))
            context = Env(empty_cli_options())
            context.set_variable("CONTENT", SymbolTableVariable.raw_variable("first"))
            engine = ExpansionEngine(context)
            self.assertEqual(engine.expand(ValueIR([FunctionCallPart(write)])), "")
            self.assertEqual(Path(filename).read_text(newline=""), "first\n")
            self.assertEqual(engine.expand(ValueIR([FunctionCallPart(append)])), "")
            self.assertEqual(
                engine.expand(ValueIR([FunctionCallPart(read)])), "first\ntail"
            )
        finally:
            if os.path.exists(filename):
                os.unlink(filename)
            os.rmdir(directory)

    def test_file_write_without_a_text_argument_creates_an_empty_line(self) -> None:
        directory = tempfile.mkdtemp(
            prefix="cbuild-expansion-", dir=tempfile.gettempdir()
        )
        filename = os.path.join(directory, "output.txt")
        try:
            fn = FunctionIR("file")
            fn.args.append(ValueIR([TextPart(">" + filename)]))
            context = Env(empty_cli_options())
            engine = ExpansionEngine(context)
            self.assertEqual(engine.expand(ValueIR([FunctionCallPart(fn)])), "")
            self.assertEqual(Path(filename).read_text(newline=""), "\n")
        finally:
            if os.path.exists(filename):
                os.unlink(filename)
            os.rmdir(directory)

    def test_file_rejects_invalid_operation(self) -> None:
        fn = FunctionIR("file")
        fn.args.append(ValueIR([TextPart("")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            raised.exception.machine_code, MachineCode.FUNCTION_RUNTIME_ERROR
        )

    def test_file_rejects_invalid_operation_gt(self) -> None:
        fn = FunctionIR("file")
        fn.args.append(ValueIR([TextPart(">")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            raised.exception.machine_code, MachineCode.FUNCTION_RUNTIME_ERROR
        )

    def test_file_rejects_invalid_operation_gt_gt(self) -> None:
        fn = FunctionIR("file")
        fn.args.append(ValueIR([TextPart(">>")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            raised.exception.machine_code, MachineCode.FUNCTION_RUNTIME_ERROR
        )

    def test_file_rejects_invalid_operation_lt(self) -> None:
        fn = FunctionIR("file")
        fn.args.append(ValueIR([TextPart("<")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            raised.exception.machine_code, MachineCode.FUNCTION_RUNTIME_ERROR
        )

    def test_file_rejects_invalid_operation_invalid(self) -> None:
        fn = FunctionIR("file")
        fn.args.append(ValueIR([TextPart("invalid")]))
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        with self.assertRaises(Exception) as raised:
            engine.expand(value)
        self.assertEqual(
            raised.exception.machine_code, MachineCode.FUNCTION_RUNTIME_ERROR
        )

    def test_wildcard_supports_multiple_whitespace_separated_patterns(self) -> None:
        fn = FunctionIR("wildcard")
        fn.args.append(
            ValueIR([TextPart("cbuild_compiler/ir.py\tcbuild_backend/env.py")])
        )
        value = ValueIR([FunctionCallPart(fn)])
        context = Env(empty_cli_options())
        engine = ExpansionEngine(context)
        expanded_value = engine.expand(value)
        self.assertEqual(
            sorted(expanded_value.split(" ")),
            sorted(
                [
                    os.path.join("cbuild_backend", "env.py").replace(os.sep, "/"),
                    os.path.join("cbuild_compiler", "ir.py").replace(os.sep, "/"),
                ]
            ),
        )

    def test_direct_automatic_variable_expansion_plus_d(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("+D")]))])
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "src lib src .")

    def test_direct_automatic_variable_expansion_plus_f(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("+F")]))])
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "main.o util.o main.o standalone.o")

    def test_direct_automatic_variable_expansion_question_d(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("?D")]))])
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "lib src")

    def test_direct_automatic_variable_expansion_question_f(self) -> None:
        value = ValueIR([VariableReferencePart(ValueIR([TextPart("?F")]))])
        rule = NormalRule(
            {
                "target": "build/app",
                "prerequisites": [
                    "src/main.o",
                    "lib/util.o",
                    "src/main.o",
                    "standalone.o",
                ],
                "order_only_prerequisites": ["cache", "generated", "cache"],
                "shell_commands": [],
                "recipe_irs": [],
                "evaluated_recipe_irs": [],
                "rule_ir": NormalRuleIR(),
                "rule_seperator": ":",
            }
        )
        resolved_prequisites = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.prerequisites
        ]
        order_only = [
            (
                PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=[],
                    origin=NoPathOrigin("target-rule"),
                )
            )
            for preq_name in rule.order_only_prerequisites
        ]
        target = TargetResolution(
            target_name=rule.target, vpath_rules=[], origin=NoPathOrigin("not-found")
        )
        parent_context = Env(empty_cli_options())
        context = AutomaticVariableEnv(
            rule,
            parent_context,
            target,
            resolved_prequisites,
            order_only,
            OutOfDateResolution(
                resolved_target=target,
                resolved_preqs=resolved_prequisites,
                is_target_out_of_date=True,
                out_of_date_preqs=[
                    resolved_prequisites[1],
                    resolved_prequisites[2],
                    resolved_prequisites[1],
                ],
            ),
        ).generate()
        engine = ExpansionEngine(context)
        self.assertEqual(engine.expand(value), "util.o main.o")

    def test_same_engine_can_expand_unrelated_values_after_recursion_fails(
        self,
    ) -> None:
        broken = ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
        safe = ValueIR([VariableReferencePart(ValueIR([TextPart("SAFE")]))])
        context = Env(empty_cli_options())
        context.set_variable(
            "A",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("A")]))])
            ),
        )
        context.set_variable(
            "SAFE",
            SymbolTableVariable.deferred_variable(
                ValueIR([VariableReferencePart(ValueIR([TextPart("ROOT")]))])
            ),
        )
        context.set_variable("ROOT", SymbolTableVariable.raw_variable("safe"))
        engine = ExpansionEngine(context)
        with self.assertRaises(RecursiveVariableExpansionException):
            engine.expand(broken)
        self.assertEqual(engine.expand(safe), "safe")


if __name__ == "__main__":
    unittest.main()
