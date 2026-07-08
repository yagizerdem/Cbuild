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

    public static class filterFn implements MakeFunction {

        private final compile_filter compiler;

        public filterFn() {
            this.compiler = new compile_filter();
        }

        @Override
        public String getFnName() {
            return "filter";
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

    public static class filterOutFn implements MakeFunction {

        private final compile_filter_out compiler;

        public filterOutFn() {
            this.compiler = new compile_filter_out();
        }

        @Override
        public String getFnName() {
            return "filter-out";
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

    public static class sortFn implements MakeFunction {

        private final compile_sort compiler;

        public sortFn() {
            this.compiler = new compile_sort();
        }

        @Override
        public String getFnName() {
            return "sort";
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

    public static class wordFn implements MakeFunction {

        private final compile_word compiler;

        public wordFn() {
            this.compiler = new compile_word();
        }

        @Override
        public String getFnName() {
            return "word";
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

    public static class wordsFn implements MakeFunction {

        private final compile_words compiler;

        public wordsFn() {
            this.compiler = new compile_words();
        }

        @Override
        public String getFnName() {
            return "words";
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

    public static class firstwordFn implements MakeFunction {

        private final compile_firstword compiler;

        public firstwordFn() {
            this.compiler = new compile_firstword();
        }

        @Override
        public String getFnName() {
            return "firstword";
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

    public static class lastwordFn implements MakeFunction {

        private final compile_lastword compiler;

        public lastwordFn() {
            this.compiler = new compile_lastword();
        }

        @Override
        public String getFnName() {
            return "lastword";
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

    public static class dirFn implements MakeFunction {

        private final compile_dir compiler;

        public dirFn() {
            this.compiler = new compile_dir();
        }

        @Override
        public String getFnName() {
            return "dir";
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

    public static class suffixFn implements MakeFunction {

        private final compile_suffix compiler;

        public suffixFn() {
            this.compiler = new compile_suffix();
        }

        @Override
        public String getFnName() {
            return "suffix";
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

    public static class basenameFn implements MakeFunction {

        private final compile_basename compiler;

        public basenameFn() {
            this.compiler = new compile_basename();
        }

        @Override
        public String getFnName() {
            return "basename";
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

    public static class addsuffixFn implements MakeFunction {

        private final compile_addsuffix compiler;

        public addsuffixFn() {
            this.compiler = new compile_addsuffix();
        }

        @Override
        public String getFnName() {
            return "addsuffix";
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

    public static class addprefixFn implements MakeFunction {

        private final compile_addprefix compiler;

        public addprefixFn() {
            this.compiler = new compile_addprefix();
        }

        @Override
        public String getFnName() {
            return "addprefix";
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

    public static class joinFn implements MakeFunction {

        private final compile_join compiler;

        public joinFn() {
            this.compiler = new compile_join();
        }

        @Override
        public String getFnName() {
            return "join";
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

    public static class wildcardFn implements MakeFunction {

        private final compile_wildcard compiler;

        public wildcardFn() {
            this.compiler = new compile_wildcard();
        }

        @Override
        public String getFnName() {
            return "wildcard";
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

    public static class realpathFn implements MakeFunction {

        private final compile_realpath compiler;

        public realpathFn() {
            this.compiler = new compile_realpath();
        }

        @Override
        public String getFnName() {
            return "realpath";
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

    public static class abspathFn implements MakeFunction {

        private final compile_abspath compiler;

        public abspathFn() {
            this.compiler = new compile_abspath();
        }

        @Override
        public String getFnName() {
            return "abspath";
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

    public static class errorFn implements MakeFunction {

        private final compile_error compiler;

        public errorFn() {
            this.compiler = new compile_error();
        }

        @Override
        public String getFnName() {
            return "error";
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

    public static class warningFn implements MakeFunction {

        private final compile_warning compiler;

        public warningFn() {
            this.compiler = new compile_warning();
        }

        @Override
        public String getFnName() {
            return "warning";
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

    public static class shellFn implements MakeFunction {

        private final compile_shell compiler;

        public shellFn() {
            this.compiler = new compile_shell();
        }

        @Override
        public String getFnName() {
            return "shell";
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

    public static class originFn implements MakeFunction {

        private final compile_origin compiler;

        public originFn() {
            this.compiler = new compile_origin();
        }

        @Override
        public String getFnName() {
            return "origin";
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

    public static class flavorFn implements MakeFunction {

        private final compile_flavor compiler;

        public flavorFn() {
            this.compiler = new compile_flavor();
        }

        @Override
        public String getFnName() {
            return "flavor";
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

    public static class foreachFn implements MakeFunction {

        private final compile_foreach compiler;

        public foreachFn() {
            this.compiler = new compile_foreach();
        }

        @Override
        public String getFnName() {
            return "foreach";
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

    public static class ifFn implements MakeFunction {

        private final compile_if compiler;

        public ifFn() {
            this.compiler = new compile_if();
        }

        @Override
        public String getFnName() {
            return "if";
        }

        @Override
        public int arity() {
            return -1;
        }

        @Override
        public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx) {
            return compiler.compile(ctx, this);
        }
    }

    public static class orFn implements MakeFunction {

        private final compile_or compiler;

        public orFn() {
            this.compiler = new compile_or();
        }

        @Override
        public String getFnName() {
            return "or";
        }

        @Override
        public int arity() {
            return -1;
        }

        @Override
        public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx) {
            return compiler.compile(ctx, this);
        }
    }

    public static class andFn implements MakeFunction {

        private final compile_and compiler;

        public andFn() {
            this.compiler = new compile_and();
        }

        @Override
        public String getFnName() {
            return "and";
        }

        @Override
        public int arity() {
            return -1;
        }

        @Override
        public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx) {
            return compiler.compile(ctx, this);
        }
    }

    public static class callFn implements MakeFunction {

        private final compile_call compiler;

        public callFn() {
            this.compiler = new compile_call();
        }

        @Override
        public String getFnName() {
            return "call";
        }

        @Override
        public int arity() {
            return -1;
        }

        @Override
        public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx) {
            return compiler.compile(ctx, this);
        }
    }

    public static class evalFn implements MakeFunction {

        private final compile_eval compiler;

        public evalFn() {
            this.compiler = new compile_eval();
        }

        @Override
        public String getFnName() {
            return "eval";
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

    public static class fileFn implements MakeFunction {

        private final compile_file compiler;

        public fileFn() {
            this.compiler = new compile_file();
        }

        @Override
        public String getFnName() {
            return "file";
        }

        @Override
        public int arity() {
            return -1;
        }

        @Override
        public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx) {
            return compiler.compile(ctx, this);
        }
    }

    public static class valueFn implements MakeFunction {

        private final compile_value compiler;

        public valueFn() {
            this.compiler = new compile_value();
        }

        @Override
        public String getFnName() {
            return "value";
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

}
