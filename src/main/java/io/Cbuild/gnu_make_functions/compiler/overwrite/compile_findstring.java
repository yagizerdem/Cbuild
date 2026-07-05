package io.Cbuild.gnu_make_functions.compiler.overwrite;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildParser;
import io.Cbuild.gnu_make_functions.compiler.compile_fn;
import io.Cbuild.gnu_make_functions.compiler.util;
import io.Cbuild.gnu_make_functions.type;

public class compile_findstring extends compile_fn {

    @Override
    public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx, type.MakeFunction function) {
        cBuildIR.FunctionIR ir = super.compile(ctx, function);
        return ir;
    }
}
