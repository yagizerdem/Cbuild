package io.Cbuild;

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
    }

    public static class FunctionIR implements IR {
        public String name;
        public final List<ValueIR> args = new ArrayList<>();

        public FunctionIR(String name) {
            this.name = name;
        }
    }


    public enum AssignmentType {
        RECURSIVE,          // =
        SIMPLE,             // :=
        POSIX_SIMPLE,       // ::=
        IMMEDIATE_ESCAPED,  // :::=
        CONDITIONAL,        // ?=
        APPEND,             // +=
        SHELL               // !=
    }

    public final class AssignmentIR implements IR {
        public ValueIR left;
        public ValueIR right;
        public AssignmentType type;
    }
}
