package common.lua;

import io.Cbuild.Env;
import io.Cbuild.lua.LuaGlobals;
import io.Cbuild.lua.luaNatives.envModule;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.luaj.vm2.Globals;

public class EnvModuleTest {

    @Test
    public void envFunctionsUseBuildContext() {
        Env context = new Env();
        Globals globals = LuaGlobals.getGlobals();
        envModule.register(globals, context);

        LuaGlobals.executeCode(globals, """
                assert(env.size() == 0)
                assert(env.set("flags", "-O2") == "-O2")
                assert(env.set("flags", "-Wall") == "-Wall")
                assert(env.get("flags") == "-O2 -Wall")
                assert(env.has("flags"))
                assert(env.size() == 1)
                assert(env.remove("flags"))
                assert(not env.has("flags"))
                assert(env.size() == 0)
                """);

        Assertions.assertFalse(context.hasVariable("flags"));
    }
}
