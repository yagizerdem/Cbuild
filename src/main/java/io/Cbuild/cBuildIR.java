package io.Cbuild;

import jdk.jshell.spi.ExecutionControl;

import java.util.ArrayList;
import java.util.List;

public class cBuildIR {

    public interface IR {}

    public interface ValuePart {}

    public static class TextPart implements ValuePart {
        public String lexeme;

        public TextPart(String lexeme) {
            this.lexeme = lexeme;
        }
    }

    public static class VarRefPart implements ValuePart {
        public ValueIR nameExpr;

        public VarRefPart(ValueIR nameExpr) {
            this.nameExpr = nameExpr;
        }
    }

    public static class FunctionCallPart implements ValuePart {
        public FunctionIR function;

        public FunctionCallPart(FunctionIR function) {
            this.function = function;
        }
    }

    public static class ValueIR implements IR {
        public final List<ValuePart> parts = new ArrayList<>();

        public ValueIR() {}

        public ValueIR(List<ValuePart> parts) {
            this.parts.addAll(parts);
        }
    }

    public static class FunctionIR implements IR {
        public String name;
        public final List<ValueIR> args = new ArrayList<>();

        public FunctionIR(String name) {
            this.name = name;
        }
    }


    public static enum AssignmentType {
        RECURSIVE,          // =
        SIMPLE,             // :=
        POSIX_SIMPLE,       // ::=
        IMMEDIATE_ESCAPED,  // :::=
        CONDITIONAL,        // ?=
        APPEND,             // +=
        SHELL               // !=
    }

    public static enum AssignmentPrefix {
        OVERRIDE("override"),
        EXPORT("export"),
        UNEXPORT("unexport"),
        OVERRIDE_EXPORT("override export"),
        EXPORT_OVERRIDE("export override"),
        UNDEFINE("undefine"),
        OVERRIDE_UNDEFINE("override undefine"),
        UNDEFINE_OVERRIDE("undefine override");

        private final String prefix;

        AssignmentPrefix(String prefix) {
            this.prefix = prefix;
        }

        public String getPrefix() {
            return prefix;
        }

        public static AssignmentPrefix mapToEnum(String prefix) {
            if (prefix == null) {
                throw new IllegalArgumentException("Assignment prefix cannot be null");
            }

            String normalized = prefix.trim().replaceAll("\\s+", " ");

            for (AssignmentPrefix value : AssignmentPrefix.values()) {
                if (value.getPrefix().equals(normalized)) {
                    return value;
                }
            }

            throw new IllegalArgumentException("Unknown assignment prefix: " + prefix);
        }
    }

    public static final class AssignmentIR implements IR {
        public ValueIR left;
        public ValueIR right;
        public AssignmentType type;
        public AssignmentPrefix prefix;

        public AssignmentIR() {}

        public AssignmentIR(ValueIR left, ValueIR right) {
            this.left = left;
            this.right = right;
        }

        public AssignmentIR(ValueIR left, ValueIR right,  AssignmentType type) {
            this.left = left;
            this.right = right;
            this.type = type;
        }

        public AssignmentIR(ValueIR left, ValueIR right,  AssignmentPrefix prefix) {
            this.left = left;
            this.right = right;
            this.prefix = prefix;
        }

        public AssignmentIR(ValueIR left, ValueIR right,  AssignmentPrefix prefix, AssignmentType type) {
            this.left = left;
            this.right = right;
            this.prefix = prefix;
            this.type = type;
        }
    }
}
