package io.Cbuild.ySharpBackend;

import io.Cbuild.Expansion;
import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildException;

import java.util.Hashtable;
import java.util.List;
import java.util.NoSuchElementException;

public class ySharpBackend {

    public static final class SymbolTableVariable {

        private final String rawValue;
        private final cBuildIR.ValueIR deferredValue;
        private final boolean requiresSecondaryExpansion;

        public SymbolTableVariable(
                String rawValue,
                cBuildIR.ValueIR deferredValue,
                boolean requiresSecondaryExpansion
        ) {
            this.rawValue = rawValue;
            this.deferredValue = deferredValue;
            this.requiresSecondaryExpansion = requiresSecondaryExpansion;
        }

        public String getRawValue() {
            return rawValue;
        }

        public cBuildIR.ValueIR getDeferredValue() {
            return deferredValue;
        }

        public boolean requiresSecondaryExpansion() {
            return requiresSecondaryExpansion;
        }

        public boolean isDeferred() {
            return deferredValue != null;
        }

        public static SymbolTableVariable rawVariable(String rawValue) {
            return new SymbolTableVariable(rawValue, null, false);
        }

        public static SymbolTableVariable deferredVariable(cBuildIR.ValueIR deferredValue) {
            return new SymbolTableVariable(null, deferredValue, false);
        }

        public static SymbolTableVariable secondaryExpansionVariable(cBuildIR.ValueIR deferredValue) {
            return new SymbolTableVariable(null, deferredValue, true);
        }

        @Override
        public String toString() {
            return "SymbolTableVariable{" +
                    "rawValue='" + rawValue + '\'' +
                    ", deferredValue=" + deferredValue +
                    ", requiresSecondaryExpansion=" + requiresSecondaryExpansion +
                    '}';
        }
    }

    public final Hashtable<String, SymbolTableVariable> symbolTable = new Hashtable<>();

    public void printSymbolTable() {
        System.out.println("=== Symbol Table ===");

        if (symbolTable.isEmpty()) {
            System.out.println("(empty)");
            return;
        }

        symbolTable.forEach((name, variable) ->
                System.out.println(name + " -> " + variable)
        );

        System.out.println("====================");
    }

    public boolean hasVariable(String name) {
        return symbolTable.containsKey(name);
    }

    public SymbolTableVariable getVariable(String name) {
        return symbolTable.get(name);
    }

    public SymbolTableVariable requireVariable(String name) {
        SymbolTableVariable variable = symbolTable.get(name);
        if (variable == null) {
            throw new NoSuchElementException("Undefined variable: " + name);
        }
        return variable;
    }

    public String getRawVariable(String name) {
        return requireVariable(name).getRawValue();
    }

    public String getRawVariableOrDefault(String name, String defaultValue) {
        SymbolTableVariable variable = symbolTable.get(name);
        if (variable == null || variable.getRawValue() == null) {
            return defaultValue;
        }
        return variable.getRawValue();
    }

    public SymbolTableVariable putVariable(String name, SymbolTableVariable variable) {
        return symbolTable.put(name, variable);
    }

    public SymbolTableVariable putRawVariable(String name, String rawValue) {
        return putVariable(name, SymbolTableVariable.rawVariable(rawValue));
    }

    public SymbolTableVariable putDeferredVariable(String name, cBuildIR.ValueIR deferredValue) {
        return putVariable(name, SymbolTableVariable.deferredVariable(deferredValue));
    }

    public SymbolTableVariable putSecondaryExpansionVariable(String name, cBuildIR.ValueIR deferredValue) {
        return putVariable(name, SymbolTableVariable.secondaryExpansionVariable(deferredValue));
    }

    public void defineVariable(String name, SymbolTableVariable variable) {
        if (hasVariable(name)) {
            throw new IllegalStateException("Variable already exists: " + name);
        }
        putVariable(name, variable);
    }

    public void defineRawVariable(String name, String rawValue) {
        defineVariable(name, SymbolTableVariable.rawVariable(rawValue));
    }

    public void defineDeferredVariable(String name, cBuildIR.ValueIR deferredValue) {
        defineVariable(name, SymbolTableVariable.deferredVariable(deferredValue));
    }

    public void defineIfAbsent(String name, SymbolTableVariable variable) {
        symbolTable.putIfAbsent(name, variable);
    }

    public void overrideVariable(String name, SymbolTableVariable variable) {
        putVariable(name, variable);
    }

    public void overrideRawVariable(String name, String rawValue) {
        overrideVariable(name, SymbolTableVariable.rawVariable(rawValue));
    }

    public SymbolTableVariable deleteVariable(String name) {
        SymbolTableVariable removed = symbolTable.remove(name);
        if (removed == null) {
            throw new NoSuchElementException("Cannot delete undefined variable: " + name);
        }
        return removed;
    }

    public boolean deleteVariableIfExists(String name) {
        return symbolTable.remove(name) != null;
    }

    public void clearVariables() {
        symbolTable.clear();
    }

    public void appendRawVariable(String name, String rawValue) {
        String current = getRawVariableOrDefault(name, "");
        if (current.isEmpty()) {
            putRawVariable(name, rawValue);
            return;
        }
        putRawVariable(name, current + " " + rawValue);
    }

    public void assign(String name, SymbolTableVariable variable) {
        putVariable(name, variable);
    }

    public void assignRaw(String name, String rawValue) {
        putRawVariable(name, rawValue);
    }

    public void assign(
            String name,
            cBuildIR.AssignmentType type,
            cBuildIR.ValueIR value
    ) {

        switch (type) {
            case RECURSIVE ->
                    putDeferredVariable(name, value);

            case SIMPLE ->
                    putRawVariable(name, expandValue(value));

            default ->
                    throw new UnsupportedOperationException(
                            "YSharp backend does not support assignment type "
                                    + type
                                    + " for variable: "
                                    + name
                    );
        }
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

    public static class ySharpExpansionEngine extends Expansion.BaseExpansionEngine {

        private final ySharpValueExpansionEngine valueExpansionEngine;
        private final ySharpBackend backend;

        public ySharpExpansionEngine(ySharpBackend backend) {
            this.valueExpansionEngine = new ySharpValueExpansionEngine(backend);
            this.backend = backend;
        }

        @Override
        public <T> T expand(cBuildIR.AssignmentIR ir) {
            String identifier = ir.left.expansion(this.valueExpansionEngine);
            if(ir.type == cBuildIR.AssignmentType.SIMPLE) {
                String value = ir.right.expansion(this.valueExpansionEngine);
                backend.putRawVariable(identifier, value);
            }
            if(ir.type == cBuildIR.AssignmentType.RECURSIVE) {
                backend.putDeferredVariable(identifier, ir.right);
            }

            return null;
        }
    }

    public static class ySharpValueExpansionEngine extends Expansion.BaseExpansionEngine {

        private final ySharpBackend backend;

        public ySharpValueExpansionEngine(ySharpBackend backend) {
            this.backend = backend;
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> T expand(cBuildIR.ValueIR ir) {
            return (T) expandValueToString(ir);
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> T expand(cBuildIR.VarRefPart varRef) {
            return (T) expandVarRefToString(varRef);
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> T expand(cBuildIR.TextPart part) {
            return (T) part.lexeme;
        }

        private String expandValueToString(cBuildIR.ValueIR ir) {
            StringBuilder builder = new StringBuilder();
            for(cBuildIR.ValuePart part : ir.parts) {
                if(part instanceof cBuildIR.VarRefPart refPart) {
                    builder.append(expandVarRefToString(refPart));
                }
                if(part instanceof cBuildIR.TextPart textPart) {
                    builder.append(textPart.lexeme);
                }
            }
            return builder.toString();
        }

        private String expandVarRefToString(cBuildIR.VarRefPart varRef) {
            StringBuilder builder = new StringBuilder();
            for(cBuildIR.ValuePart part : varRef.nameExpr.parts) {
                if(part instanceof cBuildIR.VarRefPart refPart) {
                    builder.append(expandVarRefToString(refPart));
                }
                if(part instanceof cBuildIR.TextPart textPart) {
                    builder.append(textPart.lexeme);
                }
            }
            if(backend.symbolTable.containsKey(builder.toString())) {
                return backend.symbolTable.get(builder.toString()).getRawValue();
            }
            return "";
        }
    }

    public String expandValue(cBuildIR.ValueIR ir) {
        ySharpValueExpansionEngine engine = new ySharpValueExpansionEngine(this);
        return ir.expansion(engine);
    }

    public void expand(List<cBuildIR.IR> instructions) {
        ySharpExpansionEngine expansionEngine = new ySharpExpansionEngine(this);
        for(cBuildIR.IR ir : instructions) {
            ir.expansion(expansionEngine);
        }
    }

    public void expand(cBuildIR.IR instruction) {
        ySharpExpansionEngine expansionEngine = new ySharpExpansionEngine(this);
        instruction.expansion(expansionEngine);
    }


}