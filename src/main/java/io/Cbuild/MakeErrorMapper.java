package io.Cbuild;

import org.javatuples.Pair;
import org.stringtemplate.v4.ST;

public final class MakeErrorMapper {

    public String map(Diagnostic.ParseDiagnostic diagnostic) {
        String message = determineMessage(diagnostic);

        return "%s:%d: *** %s.  Stop.".formatted(
                diagnostic.getFileName(),
                diagnostic.getLine(),
                message
        );
    }

    private String determineMessage(Diagnostic.ParseDiagnostic diagnostic) {
        String line = diagnostic.getSourceLine();
        String trimmed = line.stripLeading();

        Pair<Boolean, String> pair = missingSeparator(diagnostic);
        if (pair.getValue0()) return pair.getValue1();

        if (isRecipeWithoutTarget(diagnostic)) {
            return "recipe commences before first target";
        }

        if (isMalformedConditional(diagnostic)) {
            return "invalid syntax in conditional";
        }

        if (isMissingEndef(diagnostic)) {
            return "missing 'endef', unterminated 'define'";
        }

        if (isMissingEndif(diagnostic)) {
            return "missing 'endif'";
        }

        if (isMalformedRule(diagnostic)) {
            return "target pattern contains no '%'";
        }

        if (isUnexpectedEof(diagnostic)) {
            return "unexpected end of file";
        }

        return "parse error near '%s'".formatted(
                diagnostic.getOffendingToken().isBlank()
                        ? "<EOF>"
                        : diagnostic.getOffendingToken()
        );
    }

    private Pair<Boolean, String> missingSeparator (
            Diagnostic.ParseDiagnostic diagnostic
    ) {
        boolean flag = !diagnostic.getSourceLine().isEmpty()
                && !diagnostic.getSourceLine().startsWith("\t")
                && diagnostic.getRuleStack().stream()
                .anyMatch(rule ->
                        rule.equals("statement")
                                || rule.equals("makefile"));

        if(!flag) return new Pair<Boolean, String>(false, "");

        String message = "missing separator";

        if(diagnostic.getSourceLine().startsWith(" ".repeat(8))) {
            message = "missing separator (did you mean TAB instead of 8 spaces?)";
        }

        return new Pair<Boolean, String>(true, message);
    }

    private boolean isRecipeWithoutTarget(Diagnostic.ParseDiagnostic diagnostic) {
        return diagnostic.getSourceLine().startsWith("\t")
                && diagnostic.getRuleStack().stream()
                .noneMatch(rule -> rule.equals("recipe"));
    }

    private boolean isMalformedConditional(Diagnostic.ParseDiagnostic diagnostic) {
        return diagnostic.getRuleStack().stream().anyMatch(rule ->
                rule.equals("conditional")
                        || rule.equals("ifeqDirective")
                        || rule.equals("ifneqDirective"));
    }

    private boolean isMissingEndef(Diagnostic.ParseDiagnostic diagnostic) {
        return isUnexpectedEof(diagnostic)
                && diagnostic.getRuleStack().contains("defineDirective");
    }

    private boolean isMissingEndif(Diagnostic.ParseDiagnostic diagnostic) {
        return isUnexpectedEof(diagnostic)
                && diagnostic.getRuleStack().contains("conditional");
    }

    private boolean isMalformedRule(Diagnostic.ParseDiagnostic diagnostic) {
        return diagnostic.getRuleStack().stream().anyMatch(rule ->
                rule.equals("staticPatternRule")
                        || rule.equals("patternRule"));
    }

    private boolean isUnexpectedEof(Diagnostic.ParseDiagnostic diagnostic) {
        return "<EOF>".equals(diagnostic.getOffendingToken())
                || diagnostic.getOffendingToken().isBlank();
    }
}