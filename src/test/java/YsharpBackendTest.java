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
        ySharpBackend.symbolTable.put("name", "foo bar");
        String expanded = backend.expand(identifier);
        Assertions.assertEquals("foo bar", expanded);
    }

    @Test
    public void ExpansionBasicTest2() {
        cBuildIR.ValueIR identifier = utils.createValueIR(utils.createVarRefPart(
                utils.createTextPart("full "), utils.createVarRefPart(utils.createTextPart("postfix"))
        ));
        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("postfix", "name");
        ySharpBackend.symbolTable.put("full name", "yagiz erdem");
        String expanded = backend.expand(identifier);
        Assertions.assertEquals("yagiz erdem", expanded);
    }

    @Test
    public void ExpansionKeepsPlainTextParts() {
        cBuildIR.ValueIR value = utils.createValueIR(
                utils.createTextPart("hello "),
                utils.createTextPart("world")
        );

        ySharpBackend backend = new ySharpBackend();
        String expanded = backend.expand(value);

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
        ySharpBackend.symbolTable.put("name", "yagiz");
        String expanded = backend.expand(value);

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
        String expanded = backend.expand(value);

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
        ySharpBackend.symbolTable.put("empty", "");
        String expanded = backend.expand(value);

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
        ySharpBackend.symbolTable.put("compiler_flags", "-Wall -O2");
        String expanded = backend.expand(value);

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
        ySharpBackend.symbolTable.put("active", "cc");
        ySharpBackend.symbolTable.put("tool.cc", "clang");
        String expanded = backend.expand(value);

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
        ySharpBackend.symbolTable.put("env", "dev");
        ySharpBackend.symbolTable.put("profile.dev", "debug");
        ySharpBackend.symbolTable.put("selected.debug", "build-debug");
        String expanded = backend.expand(value);

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
        ySharpBackend.symbolTable.put("word", "echo");
        String expanded = backend.expand(value);

        Assertions.assertEquals("echo-echo", expanded);
    }

    @Test
    public void ExpansionDoesNotRecursivelyExpandVariableValues() {
        cBuildIR.ValueIR value = utils.createValueIR(utils.createVarRefPart("outer"));

        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("outer", "$(inner)");
        ySharpBackend.symbolTable.put("inner", "expanded");
        String expanded = backend.expand(value);

        Assertions.assertEquals("$(inner)", expanded);
    }

}

