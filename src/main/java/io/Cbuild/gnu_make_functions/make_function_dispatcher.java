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
        register("subst", new type.IsubstFn());
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
