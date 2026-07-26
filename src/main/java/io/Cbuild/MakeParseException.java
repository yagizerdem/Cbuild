package io.Cbuild;

import org.antlr.v4.runtime.misc.ParseCancellationException;

public final class MakeParseException extends ParseCancellationException {

    private final Diagnostic.ParseDiagnostic diagnostic;

    public MakeParseException(Diagnostic.ParseDiagnostic diagnostic) {
        super(diagnostic.getMessage());
        this.diagnostic = diagnostic;
    }

    public Diagnostic.ParseDiagnostic diagnostic() {
        return diagnostic;
    }
}