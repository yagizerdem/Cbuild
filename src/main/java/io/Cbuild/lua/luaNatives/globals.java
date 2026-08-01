package io.Cbuild.lua.luaNatives;

import io.Cbuild.lua.util.LuaFunction;
import org.luaj.vm2.Globals;
import org.luaj.vm2.LuaValue;
import org.luaj.vm2.Varargs;
import org.luaj.vm2.lib.OneArgFunction;
import org.luaj.vm2.lib.VarArgFunction;

public class globals {

    public static class Print extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue arg) {
            System.out.print(arg.tojstring());
            return LuaValue.NIL;
        }

        @Override
        public String getFnName() {
            return "print";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class Println extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue arg) {
            System.out.println(arg.tojstring());
            return LuaValue.NIL;
        }

        @Override
        public String getFnName() {
            return "println";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class Str extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue arg) {
            return LuaValue.valueOf(arg.tojstring());
        }

        @Override
        public String getFnName() {
            return "__str";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class IntFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue arg) {
            return LuaValue.valueOf((int) arg.checkdouble());
        }

        @Override
        public String getFnName() {
            return "__int";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class Min extends VarArgFunction implements LuaFunction {

        @Override
        public Varargs invoke(Varargs args) {
            if (args.narg() == 0) {
                throw new IllegalArgumentException("min requires at least one argument");
            }

            double result = args.checkdouble(1);

            for (int i = 2; i <= args.narg(); i++) {
                result = Math.min(result, args.checkdouble(i));
            }

            return LuaValue.valueOf(result);
        }

        @Override
        public String getFnName() {
            return "__min";
        }

        @Override
        public int arity() {
            return -1;
        }
    }

    public static class Max extends VarArgFunction implements LuaFunction {

        @Override
        public Varargs invoke(Varargs args) {
            if (args.narg() == 0) {
                throw new IllegalArgumentException("max requires at least one argument");
            }

            double result = args.checkdouble(1);

            for (int i = 2; i <= args.narg(); i++) {
                result = Math.max(result, args.checkdouble(i));
            }

            return LuaValue.valueOf(result);
        }

        @Override
        public String getFnName() {
            return "__max";
        }

        @Override
        public int arity() {
            return -1;
        }
    }

    public static void register(Globals globals) {
        register(globals, new Print());
        register(globals, new Println());
        register(globals, new Str());
        register(globals, new IntFn());
        register(globals, new Min());
        register(globals, new Max());
    }

    private static void register(
            Globals globals,
            LuaFunction function
    ) {
        globals.set(
                function.getFnName(),
                (LuaValue) function
        );
    }
}