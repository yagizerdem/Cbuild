package io.Cbuild.gnu_make_functions;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildParser;
import io.Cbuild.gnu_make_functions.compiler.overwrite.*;

public class type {

    public interface MakeFunction extends make_function_dispatcher.MakeFunctionHandler {
        public int arity();
        public String getFnName();
    }

    public static class substFn implements MakeFunction {

        private final compile_subst compiler;

        public substFn() {
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

    public static class wordlistFn implements MakeFunction {

        private final compile_wordlist compiler;

        public wordlistFn() {
            this.compiler = new compile_wordlist();
        }

        @Override
        public String getFnName() {
            return "wordlist";
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
