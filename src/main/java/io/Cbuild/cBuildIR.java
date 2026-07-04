package io.Cbuild;

import java.util.ArrayList;
import java.util.List;

public class cBuildIR {

    public interface ValuePart {
    }

    public static class TextPart implements ValuePart {
        public String lexeme;
    }

    public static class VarRefPart implements ValuePart {
        public ValueExpr valueExpr;
    }

    public final class ValueExpr {
        public final List<ValuePart> parts = new ArrayList<>();
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

    public final class AssignmentExpr {
        public ValueExpr left;
        public ValueExpr right;
        public AssignmentType type;
    }

}
