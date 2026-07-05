package io.Cbuild.gnu_make_functions.compiler;

import io.Cbuild.cBuildIR;

import java.util.List;

public class util {

    public static void cleanWS(cBuildIR.FunctionIR ir) {

        for (cBuildIR.ValueIR val_ir : ir.args) {
            val_ir.parts.removeIf(x -> {
                if (x instanceof cBuildIR.TextPart text_part) {
                    return text_part.lexeme.isBlank();
                }
                return false;
            });
        }
    }

}
