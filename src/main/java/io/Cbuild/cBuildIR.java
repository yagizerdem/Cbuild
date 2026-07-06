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

    public enum ConditionKind {
        IFEQ("ifeq"),
        IFNEQ("ifneq"),
        IFDEF("ifdef"),
        IFNDEF("ifndef");

        private final String keyword;

        ConditionKind(String keyword) {
            this.keyword = keyword;
        }

        public String keyword() {
            return keyword;
        }

        public static ConditionKind fromKeyword(String keyword) {
            if (keyword == null || keyword.isBlank()) {
                throw new IllegalArgumentException("Condition keyword cannot be null or blank");
            }

            return switch (keyword.trim().toLowerCase()) {
                case "ifeq" -> IFEQ;
                case "ifneq" -> IFNEQ;
                case "ifdef" -> IFDEF;
                case "ifndef" -> IFNDEF;
                default -> throw new IllegalArgumentException(
                        "Unknown condition keyword: " + keyword
                );
            };
        }
    }

    public static class ConditionalIR implements IR {
        public ConditionKind kind;
        public Condition condition;
        public List<IR> thenBranch = new ArrayList<>();
        public List<IR> elseBranch = new ArrayList<>();
    }

    public static class Condition  {
        public ValueIR left;
        public ValueIR right;
    }

    public static interface Rule extends IR {

        List<ValueIR> targets();
        List<RecipeIR> recipes();
    }

    public enum RuleSeparator {
        SINGLE_COLON,
        DOUBLE_COLON
    }

    public static class NormalRuleIR implements Rule {
        public final List<ValueIR> targets = new ArrayList<>();
        public RuleSeparator separator = RuleSeparator.SINGLE_COLON;
        public final List<ValueIR> prerequisites = new ArrayList<>();
        public final List<RecipeIR> recipes = new ArrayList<>();

        @Override
        public List<ValueIR> targets() {
            return targets;
        }

        @Override
        public List<RecipeIR> recipes() {
            return recipes;
        }
    }
    public static class TargetRuleIR implements Rule {

    }

    public static class StaticPatternRuleIR implements Rule {

    }

    public static class RecipeIR implements IR {}


}
