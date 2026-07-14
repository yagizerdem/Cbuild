package io.Cbuild.ySharpBackend;

import io.Cbuild.*;
import org.stringtemplate.v4.ST;

import java.util.*;
import java.util.stream.Collectors;

public class ySharpBackend {

    private final Env globalContext;

    public ySharpBackend() {
        this.globalContext = new Env();
    }

    public ySharpBackend(Env context) {
        this.globalContext = context;
    }

    public Env getGlobalContext() {
        return this.globalContext;
    }

    public void validateCompatibility(List<cBuildIR.IR> instructions) {
        for (cBuildIR.IR ir : instructions) {
            validateIR(ir);
        }
    }

    public boolean isCompatible(List<cBuildIR.IR> instructions) {
        try {
            validateCompatibility(instructions);
            return true;
        } catch (cbuildException exception) {
            return false;
        }
    }

    private void validateIR(cBuildIR.IR ir) {
        if (!allowedIR(ir)) {
            throw incompatible(
                    ir,
                    "Unsupported IR type for ySharp backend: "
                            + ir.getClass().getSimpleName()
            );
        }

        if (ir instanceof cBuildIR.AssignmentIR assignmentIR) {
            validateAssignment(assignmentIR);
            return;
        }

        if (ir instanceof cBuildIR.NormalRuleIR normalRuleIR) {
            validateNormalRule(normalRuleIR);
        }
    }

    private void validateAssignment(cBuildIR.AssignmentIR assignmentIR) {
        validateParts(
                assignmentIR.left.parts,
                assignmentIR,
                "Assignment left-hand side"
        );

        validateParts(
                assignmentIR.right.parts,
                assignmentIR,
                "Assignment right-hand side"
        );

        if (assignmentIR.prefix != null) {
            String prefix = assignmentIR.prefix.getPrefix();

            if (prefix != null && !prefix.isBlank()) {
                throw incompatible(
                        assignmentIR,
                        "Assignment prefixes are not supported by the ySharp backend: "
                                + prefix
                );
            }
        }
    }

    private void validateNormalRule(cBuildIR.NormalRuleIR normalRuleIR) {
        if (!normalRuleIR.orderonlyprerequisites.isEmpty()) {
            throw incompatible(
                    normalRuleIR,
                    "Order-only prerequisites are not supported by the ySharp backend"
            );
        }

        for (var target : normalRuleIR.targets) {
            validateParts(
                    target.parts,
                    normalRuleIR,
                    "Rule target"
            );
        }

        for (var prerequisite : normalRuleIR.prerequisites) {
            validateParts(
                    prerequisite.parts,
                    normalRuleIR,
                    "Rule prerequisite"
            );
        }

        for (var recipe : normalRuleIR.recipes) {
            if (recipe.conditional != null) {
                throw incompatible(
                        normalRuleIR,
                        "Conditional recipes are not supported by the ySharp backend"
                );
            }
        }
    }

    private void validateParts(
            List<cBuildIR.ValuePart> parts,
            cBuildIR.IR owner,
            String context
    ) {
        for (cBuildIR.ValuePart part : parts) {
            if (part instanceof cBuildIR.FunctionCallPart functionCallPart) {
                throw incompatible(
                        owner,
                        context + " contains an unsupported function call: "
                                + functionCallPart
                );
            }
        }
    }

    private boolean validateAssignmentFlavor(cBuildIR.AssignmentType type) {
        return type == cBuildIR.AssignmentType.RECURSIVE
                || type == cBuildIR.AssignmentType.SIMPLE;
    }

    private boolean allowedIR(cBuildIR.IR ir) {
        return ir instanceof cBuildIR.AssignmentIR
                || ir instanceof cBuildIR.YsharpHookIR
                || ir instanceof cBuildIR.NormalRuleIR;
    }

    private cbuildException incompatible(cBuildIR.IR ir, String message) {

        return new cbuildException(
                cbuildException.ErrorType.SEMANTIC,
                message,
                ir.getRow(),
                ir.getCol()
        );
    }

    public static class yModel {

        public static abstract class yBaseModel {

            private final String uuid;

            public yBaseModel() {
                this.uuid = util.uuid();
            }

            @Override
            public String toString() {
                return "<BaseModel>";
            }
        }

        public static class NormalRule extends yBaseModel {
            public String target;
            public List<String> prerequisites;
            public List<String> shellCommands;
            public cBuildIR.NormalRuleIR normalRuleIR;

            public NormalRule() {
                super();
            }

            public NormalRule(String target) {
                super();
                this.target = target;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites,
                    List<String> shellCommands
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
                this.shellCommands = shellCommands;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites,
                    List<String> shellCommands,
                    cBuildIR.NormalRuleIR normalRuleIR
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
                this.shellCommands = shellCommands;
                this.normalRuleIR = normalRuleIR;
            }

            @Override
            public String toString() {
                return """
            NormalRule {
              target='%s',
              prerequisites=%s,
              shellCommands=%s,
              normalRuleIR=%s
            }
            """.formatted(
                        target,
                        prerequisites,
                        shellCommands,
                        normalRuleIR
                );
            }

        }
    }


    public static class yModelBuilder extends ExecIR.BaseExecIR {

        public final List<yModel.yBaseModel> ruleModels;
        public final Env context;

        public yModelBuilder(Env context) {
            this.context = context;
            this.ruleModels = new ArrayList<>();
        }

        public List<yModel.yBaseModel> build(List<cBuildIR.IR> instructions) {
            for(int i = 0; i < instructions.size(); i++) {
                Object response = instructions.get(i).exec(this);
                collectModels(this.ruleModels, response);
            }
            return this.ruleModels;
        }

        public List<yModel.yBaseModel> collectModels(List<yModel.yBaseModel> target, Object resources) {
            if(resources instanceof List<?> list) {
                for(var item : list) {
                    if(item instanceof yModel.yBaseModel model) {
                        target.add(model);
                    }
                }
            }
            if(resources instanceof yModel.yBaseModel model) {
                target.add(model);
            }
            return target;
        }

        @Override
        public List<yModel.yBaseModel> exec(cBuildIR.NormalRuleIR ir) {
            List<yModel.yBaseModel> rules = new ArrayList<>();
            Expansion expansion = new Expansion();
            List<String> targets = new ArrayList<>();
            List<String> preq = new ArrayList<>();
            for(cBuildIR.ValueIR valueIR : ir.targets) {
                String expansionResult = expansion.expandValue(valueIR, context);
                targets.addAll(Arrays.stream(expansionResult.split("\\s+"))
                        .filter(x ->  !x.trim().isBlank()).toList());
            }

            for(cBuildIR.ValueIR valueIR : ir.prerequisites) {
                String expansionResult = expansion.expandValue(valueIR, context);
                preq.addAll(Arrays.stream(expansionResult.split("\\s+"))
                        .filter(x ->  !x.trim().isBlank()).toList());
            }

            for(String target : targets) {
                yModel.NormalRule rule = new yModel.NormalRule();
                rule.target = target;
                rule.prerequisites = new ArrayList<>(preq);
                rule.normalRuleIR = ir;
                rules.add(rule);
            }

            return rules;
        }

        @Override
        public Void exec(cBuildIR.AssignmentIR ir) {
            Expansion.ySharpExpansionEngine expansionEngine =
                    new Expansion.ySharpExpansionEngine(this.context);
            ir.exec(expansionEngine);
            return null;
        }

//        @Override
//        public <T> T exec(cBuildIR.RecipeIR ir) {
//            return super.exec(ir);
//        }
    }

    public List<yModel.yBaseModel> build(List<cBuildIR.IR> instructions) {
        yModelBuilder builder = new yModelBuilder(this.globalContext);
        List<yModel.yBaseModel> models = builder.build(instructions);
        return models;
    }

    public List<yModel.yBaseModel> build(List<cBuildIR.IR> instructions, Env context) {
        yModelBuilder builder = new yModelBuilder(context);
        List<yModel.yBaseModel> models = builder.build(instructions);
        return models;
    }

    public void printModel(yModel.yBaseModel model) {
        System.out.println(model.toString());
    }

    public void printModel(List<? extends yModel.yBaseModel> models) {
        models.forEach(model -> {
            System.out.println(model.toString());
        });
    }

    public void printModel(yModel.NormalRule rule) {
        System.out.println(rule.toString());
    }



    public boolean hasCircularDependency(List<yModel.NormalRule> rules) {
        Map<String, List<String>> graph = new HashMap<>();

        for (yModel.NormalRule rule : rules) {
            graph.computeIfAbsent(
                    rule.target,
                    ignored -> new ArrayList<>()
            ).addAll(rule.prerequisites);
        }

        Set<String> visited = new HashSet<>();
        Set<String> activePath = new HashSet<>();

        for (String target : graph.keySet()) {
            if (hasCircularDependencyRecursive(
                    target,
                    graph,
                    visited,
                    activePath
            )) {
                return true;
            }
        }

        return false;
    }

    private boolean hasCircularDependencyRecursive(
            String target,
            Map<String, List<String>> graph,
            Set<String> visited,
            Set<String> activePath
    ) {
        if (activePath.contains(target)) {
            return true;
        }

        if (visited.contains(target)) {
            return false;
        }

        activePath.add(target);

        for (String prerequisite :
                graph.getOrDefault(target, List.of())) {

            if (graph.containsKey(prerequisite)
                    && hasCircularDependencyRecursive(
                    prerequisite,
                    graph,
                    visited,
                    activePath
            )) {
                return true;
            }
        }

        activePath.remove(target);
        visited.add(target);

        return false;
    }

    public List<yModel.NormalRule> getTargetSubgraph(
            List<yModel.NormalRule> rules,
            String defaultTarget
    ) {
        List<yModel.NormalRule> subGraph = new ArrayList<>();
        Stack<String> stack = new Stack<>();
        Set<String> visitedTargets = new HashSet<>();

        stack.push(defaultTarget);

        while (!stack.isEmpty()) {
            String currentTarget = stack.pop();

            if (!visitedTargets.add(currentTarget)) {
                continue;
            }

            for (yModel.NormalRule rule : rules) {
                if (rule.target.equals(currentTarget)) {
                    subGraph.add(rule);
                    stack.addAll(rule.prerequisites);
                }
            }
        }

        if (hasCircularDependency(subGraph)) {
            throw new cbuildException(
                    cbuildException.ErrorType.SEMANTIC,
                    "Circular dependency detected while resolving target '"
                            + defaultTarget
                            + "'."
            );
        }

        return subGraph;
    }
}