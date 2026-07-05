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

    public static class patsubstFn implements MakeFunction {

        private final compile_patsubst compiler;

        public patsubstFn() {
            this.compiler = new compile_patsubst();
        }

        @Override
        public String getFnName() {
            return "patsubst";
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

    public static class stripFn implements MakeFunction {

        private final compile_strip compiler;

        public stripFn() {
            this.compiler = new compile_strip();
        }

        @Override
        public String getFnName() {
            return "strip";
        }

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx) {
            return compiler.compile(ctx, this);
        }
    }

    public static class findstringFn implements MakeFunction {

        private final compile_findstring compiler;

        public findstringFn() {
            this.compiler = new compile_findstring();
        }

        @Override
        public String getFnName() {
            return "findstring";
        }

        @Override
        public int arity() {
            return 2;
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
