package minimalApi;

import io.Cbuild.Env;
import io.Cbuild.Expansion;
import util.utils;
import io.Cbuild.cBuildIR;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class minimalApiBackendTest {

    @BeforeEach
    public void clearSymbolTable() {}

    @Test
    public void ExpansionBasicTest() {
        cBuildIR.ValueIR identifier = utils.createValueIR(utils.createVarRefPart(utils.createTextPart("name")));
        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("name", Env.SymbolTableVariable.rawVariable("foo bar"));
        String expanded = expansion.expandValue(identifier, context);
        Assertions.assertEquals("foo bar", expanded);
    }

    @Test
    public void ExpansionBasicTest2() {
        cBuildIR.ValueIR identifier = utils.createValueIR(utils.createVarRefPart(
                utils.createTextPart("full "), utils.createVarRefPart(utils.createTextPart("postfix"))
        ));
        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("postfix", Env.SymbolTableVariable.rawVariable("name"));
        context.symbolTable.put("full name", Env.SymbolTableVariable.rawVariable("yagiz erdem"));
        String expanded = expansion.expandValue(identifier, context);
        Assertions.assertEquals("yagiz erdem", expanded);
    }

    @Test
    public void ExpansionKeepsPlainTextParts() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("hello "),
                utils.createTextPart("world")
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("hello world", expanded);
    }

    @Test
    public void ExpansionCombinesTextAndVariableReferences() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("hello "),
                utils.createVarRefPart("name"),
                utils.createTextPart("!")
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("name", Env.SymbolTableVariable.rawVariable("yagiz"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("hello yagiz!", expanded);
    }

    @Test
    public void ExpansionUndefinedVariableBecomesEmptyString() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("before"),
                utils.createVarRefPart("missing"),
                utils.createTextPart("after")
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("beforeafter", expanded);
    }

    @Test
    public void ExpansionEmptyVariableValueIsPreservedAsEmptyString() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("a"),
                utils.createVarRefPart("empty"),
                utils.createTextPart("b")
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("empty", Env.SymbolTableVariable.rawVariable(""));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("ab", expanded);
    }

    @Test
    public void ExpansionVariableNameCanHaveMultipleTextParts() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart(
                        utils.createTextPart("compiler"),
                        utils.createTextPart("_"),
                        utils.createTextPart("flags")
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("compiler_flags", Env.SymbolTableVariable.rawVariable("-Wall -O2"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("-Wall -O2", expanded);
    }

    @Test
    public void ExpansionVariableNameCanContainExpandedVariableReference() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart(
                        utils.createTextPart("tool."),
                        utils.createVarRefPart("active")
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("active", Env.SymbolTableVariable.rawVariable("cc"));
        context.symbolTable.put("tool.cc", Env.SymbolTableVariable.rawVariable("clang"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("clang", expanded);
    }

    @Test
    public void ExpansionSupportsDeeplyNestedVariableNames() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart(
                        utils.createTextPart("selected."),
                        utils.createVarRefPart(
                                utils.createTextPart("profile."),
                                utils.createVarRefPart("env")
                        )
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("env", Env.SymbolTableVariable.rawVariable("dev"));
        context.symbolTable.put("profile.dev", Env.SymbolTableVariable.rawVariable("debug"));
        context.symbolTable.put("selected.debug", Env.SymbolTableVariable.rawVariable("build-debug"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("build-debug", expanded);
    }

    @Test
    public void ExpansionRepeatedVariableReferencesUseSameSymbolValue() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart("word"),
                utils.createTextPart("-"),
                utils.createVarRefPart("word")
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("word", Env.SymbolTableVariable.rawVariable("echo"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("echo-echo", expanded);
    }

    @Test
    public void ExpansionDoesNotRecursivelyExpandVariableValues() {
        cBuildIR.ValueIR value = utils.createValueIR(utils.createVarRefPart("outer"));

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("outer", Env.SymbolTableVariable.rawVariable("$(inner)"));
        context.symbolTable.put("inner", Env.SymbolTableVariable.rawVariable("expanded"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("$(inner)", expanded);
    }

    @Test
    public void ExpansionBuildsVariableNameFromSeveralNestedReferences() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart(
                        utils.createTextPart("config."),
                        utils.createVarRefPart("platform"),
                        utils.createTextPart("."),
                        utils.createVarRefPart("mode"),
                        utils.createTextPart("."),
                        utils.createVarRefPart("kind")
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("platform", Env.SymbolTableVariable.rawVariable("linux"));
        context.symbolTable.put("mode", Env.SymbolTableVariable.rawVariable("debug"));
        context.symbolTable.put("kind", Env.SymbolTableVariable.rawVariable("cflags"));
        context.symbolTable.put("config.linux.debug.cflags", Env.SymbolTableVariable.rawVariable("-g -Wall"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("-g -Wall", expanded);
    }

    @Test
    public void ExpansionCombinesMultipleNestedVariablesInsideOneValue() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("cc="),
                utils.createVarRefPart(
                        utils.createTextPart("tool."),
                        utils.createVarRefPart("platform")
                ),
                utils.createTextPart(" flags="),
                utils.createVarRefPart(
                        utils.createTextPart("flags."),
                        utils.createVarRefPart("platform"),
                        utils.createTextPart("."),
                        utils.createVarRefPart("profile")
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("platform", Env.SymbolTableVariable.rawVariable("linux"));
        context.symbolTable.put("profile", Env.SymbolTableVariable.rawVariable("release"));
        context.symbolTable.put("tool.linux", Env.SymbolTableVariable.rawVariable("gcc"));
        context.symbolTable.put("flags.linux.release", Env.SymbolTableVariable.rawVariable("-O3 -DNDEBUG"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("cc=gcc flags=-O3 -DNDEBUG", expanded);
    }

    @Test
    public void ExpansionSupportsNestedVariableReferenceAsOnlyNamePart() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart(
                        utils.createVarRefPart(
                                utils.createTextPart("alias."),
                                utils.createVarRefPart("selected")
                        )
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("selected", Env.SymbolTableVariable.rawVariable("compiler"));
        context.symbolTable.put("alias.compiler", Env.SymbolTableVariable.rawVariable("CC"));
        context.symbolTable.put("CC", Env.SymbolTableVariable.rawVariable("clang"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("clang", expanded);
    }

    @Test
    public void ExpansionMissingNestedNamePartCanStillResolveShorterName() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart(
                        utils.createTextPart("prefix"),
                        utils.createVarRefPart("missing"),
                        utils.createTextPart(".suffix")
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("prefix.suffix", Env.SymbolTableVariable.rawVariable("fallback"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("fallback", expanded);
    }

    @Test
    public void ExpansionNestedVariableCanSelectAnotherNestedVariableName() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart(
                        utils.createTextPart("matrix."),
                        utils.createVarRefPart(
                                utils.createTextPart("os."),
                                utils.createVarRefPart("host")
                        ),
                        utils.createTextPart("."),
                        utils.createVarRefPart(
                                utils.createTextPart("arch."),
                                utils.createVarRefPart("cpu")
                        ),
                        utils.createTextPart("."),
                        utils.createVarRefPart("mode")
                )
        );

        Env context = new Env();
        Expansion expansion = new Expansion();
        context.symbolTable.put("host", Env.SymbolTableVariable.rawVariable("current"));
        context.symbolTable.put("cpu", Env.SymbolTableVariable.rawVariable("native"));
        context.symbolTable.put("mode", Env.SymbolTableVariable.rawVariable("asan"));
        context.symbolTable.put("os.current", Env.SymbolTableVariable.rawVariable("linux"));
        context.symbolTable.put("arch.native", Env.SymbolTableVariable.rawVariable("x86_64"));
        context.symbolTable.put("matrix.linux.x86_64.asan", Env.SymbolTableVariable.rawVariable("build/linux-x86_64-asan"));
        String expanded = expansion.expandValue(value, context);

        Assertions.assertEquals("build/linux-x86_64-asan", expanded);
    }

}