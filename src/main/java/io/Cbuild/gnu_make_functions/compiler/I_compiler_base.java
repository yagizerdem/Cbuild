package io.Cbuild.gnu_make_functions.compiler;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildParser;
import io.Cbuild.gnu_make_functions.make_function_dispatcher;
import io.Cbuild.gnu_make_functions.type;

public interface I_compiler_base {

     cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx, type.MakeFunction function);
}
