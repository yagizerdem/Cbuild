package io.Cbuild.lua;

import org.luaj.vm2.Globals;
import org.luaj.vm2.LoadState;
import org.luaj.vm2.LuaValue;
import org.luaj.vm2.compiler.LuaC;
import org.luaj.vm2.lib.*;
import org.luaj.vm2.lib.jse.JseBaseLib;
import org.luaj.vm2.lib.jse.JseMathLib;
import org.luaj.vm2.lib.jse.JseOsLib;

public final class LuaGlobals {

    private static Globals cachedGlobals;

    private LuaGlobals() {}

    private static Globals createGlobals() {
        Globals globals = new Globals();

        LoadState.install(globals);
        LuaC.install(globals);

        return globals;
    }

    public static Globals getGlobalsCached() {
        if (cachedGlobals == null) {
            cachedGlobals = createGlobals();
        }

        return cachedGlobals;
    }

    public static Globals getGlobals() {
        return createGlobals();
    }

    public static void executeCode(Globals globals, String luaProgram) {
        LuaValue chunk = globals.load(luaProgram);
        chunk.call();
    }

    public static void executeCode(String luaProgram) {
        executeCode(getGlobalsCached(), luaProgram);
    }
}