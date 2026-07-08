package io.Cbuild.gnu_make_functions.compiler.overwrite;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildException;
import io.Cbuild.cbuildParser;
import io.Cbuild.gnu_make_functions.compiler.compile_fn;
import io.Cbuild.gnu_make_functions.compiler.util;
import io.Cbuild.gnu_make_functions.type;

public class compile_and extends compile_fn {

    @Override
    public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx, type.MakeFunction function) {
        cBuildIR.FunctionIR ir = super.compile(ctx, function);
        util.cleanWS(ir);

        if (ir.args.isEmpty()) {
            throw new cbuildException(
                    cbuildException.ErrorType.SEMANTIC,
                    "and: expected at least 1 argument: cond1[, cond2...]",
                    ctx.start.getLine(),
                    ctx.start.getCharPositionInLine() + 1
            );
        }

        return ir;
    }
}