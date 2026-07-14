package ysharpBackend;

import io.Cbuild.Env;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import util.utils;
import io.Cbuild.cBuildIR;
import io.Cbuild.ySharpBackend.*;

import java.util.List;

public class YgraphBuilderTest {


    @Test
    public void reassignmentReplacesPreviousSimpleValue() {
        List<cBuildIR.IR> instructions = utils.generateIR("""
app : main.c main.h
\t echo build app > app
""");

        ySharpBackend backend = new ySharpBackend(new Env());
        List<ySharpBackend.yModel.yBaseModel> modelGraph = utils.generateYsharpGraph(instructions, backend);

        Assertions.assertTrue(
                modelGraph.stream()
                        .allMatch(ySharpBackend.yModel.NormalRule.class::isInstance),
                "Every model in modelGraph should be an instance of NormalRule"
        );

        List<ySharpBackend.yModel.NormalRule> normalRules = modelGraph.stream()
                .map(ySharpBackend.yModel.NormalRule.class::cast)
                .toList();

        Assertions.assertEquals("app", normalRules.getFirst().target);
        Assertions.assertEquals("main.c", normalRules.getFirst().prerequisites.getFirst());
        Assertions.assertEquals("main.h", normalRules.getFirst().prerequisites.get(1));

    }

    @Test
    public void assignmentsDoNotCreateGraphModels() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
target := app
source = main.c
$(target): $(source)
""");

        Assertions.assertEquals(1, rules.size());
        Assertions.assertEquals("app", rules.getFirst().target);
        Assertions.assertEquals(List.of("main.c"), rules.getFirst().prerequisites);
    }

    @Test
    public void simpleAssignmentsExpandTargetAndPrerequisiteLists() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
targets := app app-tests
sources := main.c app.c
headers := main.h app.h
$(targets): $(sources) $(headers)
""");

        Assertions.assertEquals(
                List.of("app", "app-tests"),
                rules.stream().map(rule -> rule.target).toList()
        );

        List<String> expected =
                List.of("main.c", "app.c", "main.h", "app.h");

        Assertions.assertEquals(expected, rules.get(0).prerequisites);
        Assertions.assertEquals(expected, rules.get(1).prerequisites);
    }

    @Test
    public void simpleAssignmentCapturesValueImmediately() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
extension := c
source := main.$(extension)
extension := cpp
app: $(source)
""");

        Assertions.assertEquals(
                List.of("main.c"),
                rules.getFirst().prerequisites
        );
    }

    @Test
    public void recursiveAssignmentUsesLatestValue() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
extension := c
source = main.$(extension)
extension := cpp
app: $(source)
""");

        Assertions.assertEquals(
                List.of("main.cpp"),
                rules.getFirst().prerequisites
        );
    }

    @Test
    public void recursiveAssignmentSupportsForwardReference() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
objects = $(sources)
sources := main.o util.o platform.o
app: $(objects)
""");

        Assertions.assertEquals(
                List.of("main.o", "util.o", "platform.o"),
                rules.getFirst().prerequisites
        );
    }

    @Test
    public void variablesExpandInsideTargetAndPrerequisiteNames() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
build_dir := build
mode = debug
source_dir := src
$(build_dir)/app-$(mode): $(source_dir)/$(mode)/main.c $(source_dir)/common.h
""");

        Assertions.assertEquals(
                "build/app-debug",
                rules.getFirst().target
        );

        Assertions.assertEquals(
                List.of("src/debug/main.c", "src/common.h"),
                rules.getFirst().prerequisites
        );
    }

    @Test
    public void nestedVariableNameSelectsPrerequisiteList() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
platform := linux
sources.linux := linux_main.c epoll.c
sources.windows := windows_main.c iocp.c
app: $(sources.$(platform))
""");

        Assertions.assertEquals(
                List.of("linux_main.c", "epoll.c"),
                rules.getFirst().prerequisites
        );
    }

    @Test
    public void expandedTargetsHaveIndependentPrerequisiteLists() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
targets := app test-app
common = common.h config.h
$(targets): $(common)
""");

        Assertions.assertEquals(2, rules.size());
        Assertions.assertNotSame(
                rules.get(0).prerequisites,
                rules.get(1).prerequisites
        );

        rules.get(0).prerequisites.add("only-first.h");

        Assertions.assertEquals(
                List.of("common.h", "config.h"),
                rules.get(1).prerequisites
        );
    }

    @Test
    public void graphPreservesRuleOrder() {
        List<ySharpBackend.yModel.NormalRule> rules = buildRules("""
first_target := prepare
$(first_target): config.h
second_target = app
$(second_target): main.c $(first_target)
""");

        Assertions.assertEquals(
                List.of("prepare", "app"),
                rules.stream().map(rule -> rule.target).toList()
        );

        Assertions.assertEquals(
                List.of("config.h"),
                rules.get(0).prerequisites
        );

        Assertions.assertEquals(
                List.of("main.c", "prepare"),
                rules.get(1).prerequisites
        );
    }

    private List<ySharpBackend.yModel.NormalRule> buildRules(
            String cBuildProgram
    ) {
        List<cBuildIR.IR> instructions =
                utils.generateIR(cBuildProgram);

        ySharpBackend backend =
                new ySharpBackend(new Env());

        return utils.generateYsharpGraph(instructions, backend)
                .stream()
                .map(ySharpBackend.yModel.NormalRule.class::cast)
                .toList();
    }

    @Test
    public void buildsExpandedDependencyGraphFromRecursiveAndSimpleAssignments() {
        List<cBuildIR.IR> instructions = utils.generateIR("""
SRC = $(CORE) $(UTILS)
CORE := main.c main.h
UTILS = utils.c utils.h

ALL = $(SRC) $(EXTRA)
SNAPSHOT := $(SRC) $(EXTRA)
EXTRA = config.h

app1 app2 : $(ALL)
\techo build app

main.c : $(UTILS)
\techo build main.c

main.h : common.h
\techo build main.h

utils.c : generated.h
\techo build utils.c

utils.h : common.h
\techo build utils.h

config.h : settings.h
\techo build config.h

generated.h : schema.txt
\techo generate generated.h

common.h :
\techo build common.h

settings.h :
\techo build settings.h

schema.txt :
\techo build schema.txt
""");

        ySharpBackend backend = new ySharpBackend(new Env());

        List<ySharpBackend.yModel.yBaseModel> modelGraph =
                utils.generateYsharpGraph(instructions, backend);

        Assertions.assertTrue(
                modelGraph.stream()
                        .allMatch(ySharpBackend.yModel.NormalRule.class::isInstance)
        );

        List<ySharpBackend.yModel.NormalRule> rules = modelGraph.stream()
                .map(ySharpBackend.yModel.NormalRule.class::cast)
                .toList();

        // app1 ve app2 ayrı graph node üretir.
        Assertions.assertEquals(11, rules.size());

        assertRule(
                rules,
                "app1",
                "main.c",
                "main.h",
                "utils.c",
                "utils.h",
                "config.h"
        );

        assertRule(
                rules,
                "app2",
                "main.c",
                "main.h",
                "utils.c",
                "utils.h",
                "config.h"
        );

        assertRule(rules, "main.c", "utils.c", "utils.h");
        assertRule(rules, "main.h", "common.h");
        assertRule(rules, "utils.c", "generated.h");
        assertRule(rules, "utils.h", "common.h");
        assertRule(rules, "config.h", "settings.h");
        assertRule(rules, "generated.h", "schema.txt");

        assertRule(rules, "common.h");
        assertRule(rules, "settings.h");
        assertRule(rules, "schema.txt");

    }

    private void assertRule(
            List<ySharpBackend.yModel.NormalRule> rules,
            String target,
            String... expectedPrerequisites
    ) {
        ySharpBackend.yModel.NormalRule rule = rules.stream()
                .filter(candidate -> target.equals(candidate.target))
                .findFirst()
                .orElseThrow(() -> new AssertionError(
                        "Graph içerisinde target bulunamadı: " + target
                ));

        Assertions.assertEquals(
                List.of(expectedPrerequisites),
                rule.prerequisites,
                "Unexpected prerequisites for target: " + target
        );
    }

}
