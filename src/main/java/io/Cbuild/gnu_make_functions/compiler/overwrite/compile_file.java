package io.Cbuild.gnu_make_functions.compiler.overwrite;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildException;
import io.Cbuild.cbuildParser;
import io.Cbuild.gnu_make_functions.compiler.compile_fn;
import io.Cbuild.gnu_make_functions.compiler.util;
import io.Cbuild.gnu_make_functions.type;

public class compile_file extends compile_fn {

    @Override
    public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx, type.MakeFunction function) {
        cBuildIR.FunctionIR ir = super.compile(ctx, function);
        util.cleanWS(ir);

        if (ir.args.size() != 2 && ir.args.size() != 3) {
            throw new cbuildException(
                    cbuildException.ErrorType.SEMANTIC,
                    "file: expected 2 or 3 arguments: op filename[, text]",
                    ctx.start.getLine(),
                    ctx.start.getCharPositionInLine() + 1
            );
        }

        return ir;
    }
}