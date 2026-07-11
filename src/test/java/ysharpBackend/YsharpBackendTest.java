package ysharpBackend;

import util.utils;
import io.Cbuild.cBuildIR;
import io.Cbuild.ySharpBackend.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class YsharpBackendTest {

    @BeforeEach
    public void clearSymbolTable() {
        ySharpBackend.symbolTable.clear();
    }

    @Test
    public void ExpansionBasicTest() {
        cBuildIR.ValueIR identifier = utils.createValueIR(utils.createVarRefPart(utils.createTextPart("name")));
        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("name", ySharpBackend.SymbolTableVariable.rawVariable("foo bar"));
        String expanded = backend.expandValue(identifier);
        Assertions.assertEquals("foo bar", expanded);
    }

    @Test
    public void ExpansionBasicTest2() {
        cBuildIR.ValueIR identifier = utils.createValueIR(utils.createVarRefPart(
                utils.createTextPart("full "), utils.createVarRefPart(utils.createTextPart("postfix"))
        ));
        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("postfix", ySharpBackend.SymbolTableVariable.rawVariable("name"));
        ySharpBackend.symbolTable.put("full name", ySharpBackend.SymbolTableVariable.rawVariable("yagiz erdem"));
        String expanded = backend.expandValue(identifier);
        Assertions.assertEquals("yagiz erdem", expanded);
    }

    @Test
    public void ExpansionKeepsPlainTextParts() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("hello "),
                utils.createTextPart("world")
        );

        ySharpBackend backend = new ySharpBackend();
        String expanded = backend.expandValue(value);

        Assertions.assertEquals("hello world", expanded);
    }

    @Test
    public void ExpansionCombinesTextAndVariableReferences() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("hello "),
                utils.createVarRefPart("name"),
                utils.createTextPart("!")
        );

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("name", ySharpBackend.SymbolTableVariable.rawVariable("yagiz"));
        String expanded = backend.expandValue(value);

        Assertions.assertEquals("hello yagiz!", expanded);
    }

    @Test
    public void ExpansionUndefinedVariableBecomesEmptyString() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("before"),
                utils.createVarRefPart("missing"),
                utils.createTextPart("after")
        );

        ySharpBackend backend = new ySharpBackend();
        String expanded = backend.expandValue(value);

        Assertions.assertEquals("beforeafter", expanded);
    }

    @Test
    public void ExpansionEmptyVariableValueIsPreservedAsEmptyString() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("a"),
                utils.createVarRefPart("empty"),
                utils.createTextPart("b")
        );

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("empty", ySharpBackend.SymbolTableVariable.rawVariable(""));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("compiler_flags", ySharpBackend.SymbolTableVariable.rawVariable("-Wall -O2"));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("active", ySharpBackend.SymbolTableVariable.rawVariable("cc"));
        ySharpBackend.symbolTable.put("tool.cc", ySharpBackend.SymbolTableVariable.rawVariable("clang"));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("env", ySharpBackend.SymbolTableVariable.rawVariable("dev"));
        ySharpBackend.symbolTable.put("profile.dev", ySharpBackend.SymbolTableVariable.rawVariable("debug"));
        ySharpBackend.symbolTable.put("selected.debug", ySharpBackend.SymbolTableVariable.rawVariable("build-debug"));
        String expanded = backend.expandValue(value);

        Assertions.assertEquals("build-debug", expanded);
    }

    @Test
    public void ExpansionRepeatedVariableReferencesUseSameSymbolValue() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createVarRefPart("word"),
                utils.createTextPart("-"),
                utils.createVarRefPart("word")
        );

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("word", ySharpBackend.SymbolTableVariable.rawVariable("echo"));
        String expanded = backend.expandValue(value);

        Assertions.assertEquals("echo-echo", expanded);
    }

    @Test
    public void ExpansionDoesNotRecursivelyExpandVariableValues() {
        cBuildIR.ValueIR value = utils.createValueIR(utils.createVarRefPart("outer"));

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("outer", ySharpBackend.SymbolTableVariable.rawVariable("$(inner)"));
        ySharpBackend.symbolTable.put("inner", ySharpBackend.SymbolTableVariable.rawVariable("expanded"));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("platform", ySharpBackend.SymbolTableVariable.rawVariable("linux"));
        ySharpBackend.symbolTable.put("mode", ySharpBackend.SymbolTableVariable.rawVariable("debug"));
        ySharpBackend.symbolTable.put("kind", ySharpBackend.SymbolTableVariable.rawVariable("cflags"));
        ySharpBackend.symbolTable.put("config.linux.debug.cflags", ySharpBackend.SymbolTableVariable.rawVariable("-g -Wall"));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("platform", ySharpBackend.SymbolTableVariable.rawVariable("linux"));
        ySharpBackend.symbolTable.put("profile", ySharpBackend.SymbolTableVariable.rawVariable("release"));
        ySharpBackend.symbolTable.put("tool.linux", ySharpBackend.SymbolTableVariable.rawVariable("gcc"));
        ySharpBackend.symbolTable.put("flags.linux.release", ySharpBackend.SymbolTableVariable.rawVariable("-O3 -DNDEBUG"));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("selected", ySharpBackend.SymbolTableVariable.rawVariable("compiler"));
        ySharpBackend.symbolTable.put("alias.compiler", ySharpBackend.SymbolTableVariable.rawVariable("CC"));
        ySharpBackend.symbolTable.put("CC", ySharpBackend.SymbolTableVariable.rawVariable("clang"));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("prefix.suffix", ySharpBackend.SymbolTableVariable.rawVariable("fallback"));
        String expanded = backend.expandValue(value);

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

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("host", ySharpBackend.SymbolTableVariable.rawVariable("current"));
        ySharpBackend.symbolTable.put("cpu", ySharpBackend.SymbolTableVariable.rawVariable("native"));
        ySharpBackend.symbolTable.put("mode", ySharpBackend.SymbolTableVariable.rawVariable("asan"));
        ySharpBackend.symbolTable.put("os.current", ySharpBackend.SymbolTableVariable.rawVariable("linux"));
        ySharpBackend.symbolTable.put("arch.native", ySharpBackend.SymbolTableVariable.rawVariable("x86_64"));
        ySharpBackend.symbolTable.put("matrix.linux.x86_64.asan", ySharpBackend.SymbolTableVariable.rawVariable("build/linux-x86_64-asan"));
        String expanded = backend.expandValue(value);

        Assertions.assertEquals("build/linux-x86_64-asan", expanded);
    }

}