package io.Cbuild.lua.luaNatives;

import io.Cbuild.lua.util.LuaFunction;
import org.luaj.vm2.Globals;
import org.luaj.vm2.LuaError;
import org.luaj.vm2.LuaValue;
import org.luaj.vm2.Varargs;
import org.luaj.vm2.lib.OneArgFunction;
import org.luaj.vm2.lib.VarArgFunction;
import org.luaj.vm2.lib.ZeroArgFunction;

import java.io.File;

public class processModule {

    public processModule() {}

    public static class CwdFn extends ZeroArgFunction implements LuaFunction {

        @Override
        public LuaValue call() {
            return LuaValue.valueOf(System.getProperty("user.dir"));
        }

        @Override
        public String getFnName() {
            return "cwd";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static class ExecFn extends VarArgFunction implements LuaFunction {

        @Override
        public Varargs invoke(Varargs arguments) {
            if (arguments.narg() < 1 || arguments.narg() > 2) {
                throw new LuaError("Expected exec(command) or exec(command, cwd).");
            }

            String command = arguments.checkjstring(1);
            String cwd = arguments.narg() == 2
                    ? arguments.checkjstring(2)
                    : null;

            try {
                String os = System.getProperty("os.name").toLowerCase();
                ProcessBuilder builder = os.contains("win")
                        ? new ProcessBuilder("cmd.exe", "/c", command)
                        : new ProcessBuilder("sh", "-c", command);

                if (cwd != null) {
                    builder.directory(new File(cwd));
                }

                Process process = builder
                        .inheritIO()
                        .start();

                return LuaValue.valueOf(process.waitFor());
            } catch (Exception exception) {
                throw new LuaError("Cannot execute command '" + command + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "exec";
        }

        @Override
        public int arity() {
            return -1;
        }
    }

    public static class ExitFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue exitCode) {
            System.exit(exitCode.checkint());
            return LuaValue.NIL;
        }

        @Override
        public String getFnName() {
            return "exit";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class PidFn extends ZeroArgFunction implements LuaFunction {

        @Override
        public LuaValue call() {
            return LuaValue.valueOf((double) ProcessHandle.current().pid());
        }

        @Override
        public String getFnName() {
            return "pid";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static class OsFn extends ZeroArgFunction implements LuaFunction {

        @Override
        public LuaValue call() {
            return LuaValue.valueOf(System.getProperty("os.name"));
        }

        @Override
        public String getFnName() {
            return "os";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static class ArchFn extends ZeroArgFunction implements LuaFunction {

        @Override
        public LuaValue call() {
            return LuaValue.valueOf(System.getProperty("os.arch"));
        }

        @Override
        public String getFnName() {
            return "arch";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static void register(Globals globals) {
        LuaValue processModule = LuaValue.tableOf();

        CwdFn cwdFn = new CwdFn();
        processModule.set(cwdFn.getFnName(), cwdFn);

        ExecFn execFn = new ExecFn();
        processModule.set(execFn.getFnName(), execFn);

        ExitFn exitFn = new ExitFn();
        processModule.set(exitFn.getFnName(), exitFn);

        PidFn pidFn = new PidFn();
        processModule.set(pidFn.getFnName(), pidFn);

        OsFn osFn = new OsFn();
        processModule.set(osFn.getFnName(), osFn);

        ArchFn archFn = new ArchFn();
        processModule.set(archFn.getFnName(), archFn);

        globals.set("process", processModule);
    }
}
