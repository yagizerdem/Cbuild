package io.Cbuild;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.NoSuchElementException;

public class Env {

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
        Expansion expansion = new Expansion();

        switch (type) {
            case RECURSIVE ->
                    putDeferredVariable(name, value);

            case SIMPLE ->
                    putRawVariable(name, expansion.expandValue(value, this));

            default ->
                    throw new UnsupportedOperationException(
                            "YSharp backend does not support assignment type "
                                    + type
                                    + " for variable: "
                                    + name
                    );
        }
    }

}
