package io.Cbuild.gnu_make_functions;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildParser;
import io.Cbuild.gnu_make_functions.compiler.compile_subst;

public class type {

    public interface MakeFunction extends make_function_dispatcher.MakeFunctionHandler {
        public int arity();
        public String getFnName();
    }

    public static class IsubstFn implements MakeFunction {

        private final compile_subst compiler;

        public IsubstFn() {
            this.compiler = new compile_subst();
        }

        @Override
        public String getFnName() {
            return "subst";
        }

        @Override
        public int arity() {
            return 3;
        }

        @Override
        public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx) {
            return compiler.compile(ctx, this);
        }
    }
}
