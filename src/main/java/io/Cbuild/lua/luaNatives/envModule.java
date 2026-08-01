package io.Cbuild.lua.luaNatives;

import io.Cbuild.Env;
import io.Cbuild.lua.util.LuaFunction;
import org.luaj.vm2.Globals;
import org.luaj.vm2.LuaValue;
import org.luaj.vm2.lib.OneArgFunction;
import org.luaj.vm2.lib.TwoArgFunction;
import org.luaj.vm2.lib.ZeroArgFunction;

public class envModule {

    public envModule() {}

    public static class SetFn extends TwoArgFunction implements LuaFunction {

        private final Env cBuildContext;

        public SetFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public LuaValue call(LuaValue key, LuaValue value) {
            String keyValue = key.checkjstring();
            String rawValue = value.checkjstring();

            cBuildContext.appendRawVariable(keyValue, rawValue);

            return LuaValue.valueOf(rawValue);
        }

        @Override
        public String getFnName() {
            return "set";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class GetFn extends OneArgFunction implements LuaFunction {

        private final Env cBuildContext;

        public GetFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public LuaValue call(LuaValue key) {
            return LuaValue.valueOf(cBuildContext.getRawVariable(key.checkjstring()));
        }

        @Override
        public String getFnName() {
            return "get";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class SizeFn extends ZeroArgFunction implements LuaFunction {

        private final Env cBuildContext;

        public SizeFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public LuaValue call() {
            return LuaValue.valueOf(cBuildContext.symbolTable.size());
        }

        @Override
        public String getFnName() {
            return "size";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static class HasFn extends OneArgFunction implements LuaFunction {

        private final Env cBuildContext;

        public HasFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public LuaValue call(LuaValue key) {
            return LuaValue.valueOf(cBuildContext.hasVariable(key.checkjstring()));
        }

        @Override
        public String getFnName() {
            return "has";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class RemoveFn extends OneArgFunction implements LuaFunction {

        private final Env cBuildContext;

        public RemoveFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public LuaValue call(LuaValue key) {
            cBuildContext.deleteVariable(key.checkjstring());
            return LuaValue.TRUE;
        }

        @Override
        public String getFnName() {
            return "remove";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static void register(Globals globals, Env cBuildContext) {
        LuaValue envModule = LuaValue.tableOf();

        SetFn setFn = new SetFn(cBuildContext);
        envModule.set(setFn.getFnName(), setFn);

        GetFn getFn = new GetFn(cBuildContext);
        envModule.set(getFn.getFnName(), getFn);

        HasFn hasFn = new HasFn(cBuildContext);
        envModule.set(hasFn.getFnName(), hasFn);

        RemoveFn removeFn = new RemoveFn(cBuildContext);
        envModule.set(removeFn.getFnName(), removeFn);

        SizeFn sizeFn = new SizeFn(cBuildContext);
        envModule.set(sizeFn.getFnName(), sizeFn);

        globals.set("env", envModule);
    }
}
