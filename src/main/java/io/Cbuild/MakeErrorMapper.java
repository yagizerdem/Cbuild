package io.Cbuild;

import org.antlr.v4.codegen.model.OptionalBlock;
import org.javatuples.Pair;
import org.stringtemplate.v4.ST;

import javax.swing.text.html.Option;
import java.util.Optional;

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

        var result = recipeWithoutTarget(diagnostic);
        if (result.isPresent()) return result.get();

        result = unterminatedVariableReference(diagnostic);
        if(result.isPresent()) return result.get();

        result = missingSeparator(diagnostic);
        if (result.isPresent()) return result.get();


        return "parse error near '%s'".formatted(
                diagnostic.getOffendingToken().isBlank()
                        ? "<EOF>"
                        : diagnostic.getOffendingToken()
        );
    }

    private Optional<String> missingSeparator (
            Diagnostic.ParseDiagnostic diagnostic
    ) {
        boolean flag = !diagnostic.getSourceLine().isEmpty()
                && !diagnostic.getSourceLine().startsWith("\t")
                && diagnostic.getRuleStack().stream()
                .anyMatch(rule ->
                        rule.equals("statement")
                                || rule.equals("makefile"));

        if(!flag) return Optional.empty();

        String message = "missing separator";

        if(diagnostic.getSourceLine().startsWith(" ".repeat(8))) {
            message = "missing separator (did you mean TAB instead of 8 spaces?)";
        }

        return Optional.of(message);
    }

    private Optional<String> recipeWithoutTarget(Diagnostic.ParseDiagnostic diagnostic) {
        String srcLine = diagnostic.getSourceLine();
        boolean flag = srcLine.startsWith("\t")
                && diagnostic.getRuleStack().stream()
                .noneMatch(rule -> rule.equals("recipe"));

        if(flag) {
            for(int i = 0; i < srcLine.length(); i++) {
                if(Cursor.stopSet(srcLine.charAt(i), Cursor.CharMask.Blank)) continue;
                if(!Cursor.stopSet(srcLine.charAt(i), Cursor.CharMask.Blank)){
                    if(Cursor.stopSet(srcLine.charAt(i), Cursor.CharMask.Semi)) {
                        return Optional.of("commands commence before first target. Stop.");
                    }
                    break;
                }

            }
        }

        return flag ? Optional.of("recipe commences before first target."): Optional.empty();
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

    private Optional<String> unterminatedVariableReference(
            Diagnostic.ParseDiagnostic diagnostic
    ) {
        String line = diagnostic.getSourceLine();

        if (line == null) {
            return Optional.empty();
        }

        if (hasUnclosedVariableReference(line)) {
            return Optional.of("unterminated variable reference");
        }

        return Optional.empty();
    }

    private boolean hasUnclosedVariableReference(String line) {
        int parentheses = 0;
        int braces = 0;

        for (int i = 0; i < line.length() - 1; i++) {
            if (line.charAt(i) != '$') {
                continue;
            }

            char next = line.charAt(i + 1);

            if (next == '(') {
                parentheses++;
                i++;
            } else if (next == '{') {
                braces++;
                i++;
            }
        }

        for (char ch : line.toCharArray()) {
            if (ch == ')' && parentheses > 0) {
                parentheses--;
            } else if (ch == '}' && braces > 0) {
                braces--;
            }
        }

        return parentheses > 0 || braces > 0;
    }
}