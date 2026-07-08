package io.Cbuild.gnu_make_functions;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildParser;

import java.util.HashMap;
import java.util.Map;

public class make_function_dispatcher {

    public interface MakeFunctionHandler {
        cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx);
    }

    private static final Map<String, MakeFunctionHandler> handlers = new HashMap<>();

    static  {
        register("subst", new type.substFn());
        register("patsubst", new type.patsubstFn());
        register("strip", new type.stripFn());
        register("findstring", new type.findstringFn());
        register("filter", new type.filterFn());
        register("filter-out", new type.filterOutFn());
        register("sort", new type.sortFn());
        register("word", new type.wordFn());
        register("words", new type.wordsFn());
        register("wordlist", new type.wordlistFn());
        register("firstword", new type.firstwordFn());
        register("lastword", new type.lastwordFn());
        register("dir", new type.dirFn());
        register("suffix", new type.suffixFn());
        register("basename", new type.basenameFn());
        register("addsuffix", new type.addsuffixFn());
        register("addprefix", new type.addprefixFn());
        register("join", new type.joinFn());
        register("wildcard", new type.wildcardFn());
        register("realpath", new type.realpathFn());
        register("abspath", new type.abspathFn());
        register("error", new type.errorFn());
        register("warning", new type.warningFn());
        register("shell", new type.shellFn());
        register("origin", new type.originFn());
        register("flavor", new type.flavorFn());
        register("foreach", new type.foreachFn());
        register("if", new type.ifFn());
        register("or", new type.orFn());
        register("and", new type.andFn());
        register("call", new type.callFn());
        register("eval", new type.evalFn());
        register("file", new type.fileFn());
        register("value", new type.valueFn());
    }

    public static void register(String name, MakeFunctionHandler handler) {
        handlers.put(name, handler);
    }

    public boolean has(String name) {
        return make_function_dispatcher.handlers.containsKey(name);
    }

    public MakeFunctionHandler getHandler(String name) {
        return make_function_dispatcher.handlers.get(name);
    }

}
