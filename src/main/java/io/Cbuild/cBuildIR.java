package io.Cbuild;

import io.Cbuild.ySharpBackend.ySharpBackend;
import jdk.jshell.spi.ExecutionControl;
import org.stringtemplate.v4.ST;

import java.util.ArrayList;
import java.util.List;

public class cBuildIR {

    public interface IR {
        public int getRow();
        public int getCol();

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine);
    }

    public static abstract class BaseIR implements IR {
        public int row;
        public int col;

        @Override
        public int getRow() {
            return this.row;
        }

        @Override
        public int getCol() {
            return this.col;
        }

    }

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

    public static class ValueIR extends BaseIR{
        public final List<ValuePart> parts = new ArrayList<>();

        public ValueIR() {}

        public ValueIR(List<ValuePart> parts) {
            this.parts.addAll(parts);
        }

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

    public static class FunctionIR extends BaseIR {
        public String name;
        public final List<ValueIR> args = new ArrayList<>();

        public FunctionIR(String name) {
            this.name = name;
        }

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }


    public static enum AssignmentType {
        RECURSIVE("="),
        SIMPLE(":="),
        POSIX_SIMPLE("::="),
        IMMEDIATE_ESCAPED(":::="),
        CONDITIONAL("?="),
        APPEND("+="),
        SHELL("!=");

        private final String type;

        AssignmentType(String type) {
            this.type = type;
        }

        public String getType() {
            return type;
        }

        public static AssignmentType fromSymbol(String type) {
            if (type == null) {
                throw new IllegalArgumentException("Assignment type cannot be null");
            }

            String normalized = type.trim().replaceAll("\\s+", " ");

            for (AssignmentType value : AssignmentType.values()) {
                if (value.getType().equals(normalized)) {
                    return value;
                }
            }

            throw new IllegalArgumentException("Unknown assignment type: " + type);
        }
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

        public static AssignmentPrefix fromSymbol(String prefix) {
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

    public static final class AssignmentIR extends BaseIR {
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

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
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

    public static class ConditionalIR extends BaseIR {
        public ConditionKind kind;
        public Condition condition;
        public List<IR> thenBranch = new ArrayList<>();
        public List<IR> elseBranch = new ArrayList<>();

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
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
        SINGLE_COLON(":"),
        DOUBLE_COLON("::"),
        GROUPED_COLON("&:"),
        GROUPED_DOUBLE_COLON("&::");

        private final String symbol;

        RuleSeparator(String symbol) {
            this.symbol = symbol;
        }

        public String symbol() {
            return symbol;
        }

        public static RuleSeparator fromSymbol(String symbol) {
            if (symbol == null || symbol.isBlank()) {
                throw new IllegalArgumentException("Rule separator cannot be null or blank");
            }

            return switch (symbol.trim()) {
                case ":" -> SINGLE_COLON;
                case "::" -> DOUBLE_COLON;
                case "&:" -> GROUPED_COLON;
                case "&::" -> GROUPED_DOUBLE_COLON;
                default -> throw new IllegalArgumentException(
                        "Unknown rule separator: " + symbol
                );
            };
        }
    }

    public static class NormalRuleIR extends BaseIR implements Rule {
        public final List<ValueIR> targets = new ArrayList<>();
        public RuleSeparator separator = RuleSeparator.SINGLE_COLON;
        public final List<ValueIR> prerequisites = new ArrayList<>();
        public final List<ValueIR> orderonlyprerequisites = new ArrayList<>();
        public final List<RecipeIR> recipes = new ArrayList<>();

        public NormalRuleIR() {}

        public NormalRuleIR(List<ValueIR> targets, List<ValueIR> prerequisites) {
            this.targets.addAll(targets);
            this.prerequisites.addAll(prerequisites);
        }

        public NormalRuleIR(List<ValueIR> targets, List<ValueIR> prerequisites, RuleSeparator separator) {
            this.targets.addAll(targets);
            this.prerequisites.addAll(prerequisites);
            this.separator = separator;
        }

        public NormalRuleIR(List<ValueIR> targets, List<ValueIR> prerequisites, RuleSeparator separator, List<RecipeIR> recipes) {
            this.targets.addAll(targets);
            this.prerequisites.addAll(prerequisites);
            this.separator = separator;
            this.recipes.addAll(recipes);
        }

        public NormalRuleIR(List<ValueIR> targets,
                            List<ValueIR> prerequisites,
                            List<ValueIR> orderonlyprerequisites,
                            RuleSeparator separator,
                            List<RecipeIR> recipes) {
            this.targets.addAll(targets);
            this.prerequisites.addAll(prerequisites);
            this.orderonlyprerequisites.addAll(orderonlyprerequisites);
            this.separator = separator;
            this.recipes.addAll(recipes);
        }

        @Override
        public List<ValueIR> targets() {
            return targets;
        }

        @Override
        public List<RecipeIR> recipes() {
            return recipes;
        }

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

    public static class TargetRuleIR extends BaseIR implements Rule {
        public final List<ValueIR> targets = new ArrayList<>();
        public AssignmentIR assignment;
        public RuleSeparator separator; // not important for target rule

        public TargetRuleIR () {}

        public TargetRuleIR(List<ValueIR> _targets) {
            this.targets.addAll(_targets);
        }

        public TargetRuleIR(List<ValueIR> targets, AssignmentIR assignmentIR) {
            this.targets.addAll(targets);
            this.assignment = assignmentIR;
        }

        public TargetRuleIR(List<ValueIR> targets,
                            RuleSeparator separator,
                            AssignmentIR assignmentIR) {
            this.targets.addAll(targets);
            this.separator = separator;
            this.assignment = assignmentIR;
        }

        @Override
        public List<ValueIR> targets() {
            return targets;
        }

        @Override
        public List<RecipeIR> recipes() {
            return List.of();
        }


        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

    public static class StaticPatternRuleIR extends BaseIR implements Rule {
        public final List<ValueIR> targets = new ArrayList<>();
        public ValueIR targetPattern;
        public final List<ValueIR> prerequisites = new ArrayList<>();
        public final List<ValueIR> orderonlyprerequisites = new ArrayList<>();
        public final List<RecipeIR> recipes = new ArrayList<>();
        public RuleSeparator ruleSeparator;

        public StaticPatternRuleIR() {}

        public StaticPatternRuleIR(List<ValueIR> _targets) {
            this.targets.addAll(_targets);
        }

        public StaticPatternRuleIR(List<ValueIR> _targets, ValueIR targetPattern) {
            this.targets.addAll(_targets);
            this.targetPattern = targetPattern;
        }

        public StaticPatternRuleIR(List<ValueIR> _targets, ValueIR targetPattern, List<ValueIR> _prerequisites) {
            this.targets.addAll(_targets);
            this.targetPattern = targetPattern;
            this.prerequisites.addAll(_prerequisites);
        }

        public StaticPatternRuleIR(List<ValueIR> _targets,
                                   RuleSeparator ruleSeparator,
                                   ValueIR targetPattern,
                                   List<ValueIR> _prerequisites,
                                   List<RecipeIR> recipes) {
            this.targets.addAll(_targets);
            this.ruleSeparator = ruleSeparator;
            this.targetPattern = targetPattern;
            this.prerequisites.addAll(_prerequisites);
            this.recipes.addAll(recipes);
        }

        public StaticPatternRuleIR(List<ValueIR> _targets,
                                   RuleSeparator ruleSeparator,
                                   ValueIR targetPattern,
                                   List<ValueIR> _prerequisites,
                                   List<ValueIR> _orderonlyprerequisites,
                                   List<RecipeIR> recipes) {
            this.targets.addAll(_targets);
            this.ruleSeparator = ruleSeparator;
            this.targetPattern = targetPattern;
            this.prerequisites.addAll(_prerequisites);
            this.orderonlyprerequisites.addAll(_orderonlyprerequisites);
            this.recipes.addAll(recipes);
        }

        @Override
        public List<ValueIR> targets() {
            return targets;
        }

        @Override
        public List<RecipeIR> recipes() {
            return recipes;
        }

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

    public enum RecipeKind {
        COMMAND,
        COMMENT,
        EMPTY_LINE,
        CONDITIONAL
    }

    public static class RecipeIR extends BaseIR implements IR {
        public RecipeKind kind;
        public ValueIR command;
        public String comment;
        public ConditionalIR conditional;

        public static RecipeIR command(ValueIR command) {
            RecipeIR recipe = new RecipeIR();
            recipe.kind = RecipeKind.COMMAND;
            recipe.command = command;
            return recipe;
        }

        public static RecipeIR comment(String comment) {
            RecipeIR recipe = new RecipeIR();
            recipe.kind = RecipeKind.COMMENT;
            recipe.comment = comment;
            return recipe;
        }

        public static RecipeIR emptyLine() {
            RecipeIR recipe = new RecipeIR();
            recipe.kind = RecipeKind.EMPTY_LINE;
            return recipe;
        }

        public static RecipeIR conditional(ConditionalIR conditional) {
            RecipeIR recipe = new RecipeIR();
            recipe.kind = RecipeKind.CONDITIONAL;
            recipe.conditional = conditional;
            return recipe;
        }


        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

    public static class DefineIR extends BaseIR implements IR {
        public AssignmentPrefix specifiers;
        public ValueIR name;
        public AssignmentType assignmentType;
        public ValueIR value;

        public DefineIR() {}

        public DefineIR(
                AssignmentPrefix specifiers,
                ValueIR name,
                AssignmentType assignmentType,
                ValueIR value
        ) {
            this.specifiers = specifiers;
            this.name = name;
            this.assignmentType = assignmentType;
            this.value = value;
        }


        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

    public static class VpathIR extends BaseIR implements IR {

        public enum Type {
            CLEAR_ALL,
            CLEAR_PATTERN,
            SET_PATTERN
        }

        public final Type type;
        public final ValueIR pattern;
        public final List<ValueIR> directories;

        private VpathIR(Type type, ValueIR pattern, List<ValueIR> directories) {
            this.type = type;
            this.pattern = pattern;
            this.directories = directories;
        }

        public static VpathIR clearAll() {
            return new VpathIR(Type.CLEAR_ALL, null, List.of());
        }

        public static VpathIR clearPattern(ValueIR pattern) {
            return new VpathIR(Type.CLEAR_PATTERN, pattern, List.of());
        }

        public static VpathIR setPattern(ValueIR pattern, List<ValueIR> directories) {
            return new VpathIR(Type.SET_PATTERN, pattern, directories);
        }


        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

    public static class YsharpHookIR extends BaseIR {
        public String program;

        public YsharpHookIR() {}

        public YsharpHookIR(String program) {
            this.program = program;
        }

        public <T> T expansion(Expansion.AbstractBaseExpansionEngine expansionEngine) {
            return expansionEngine.expand(this);
        }
    }

}
