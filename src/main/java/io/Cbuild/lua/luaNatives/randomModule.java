package io.Cbuild.lua.luaNatives;

import io.Cbuild.lua.util.LuaFunction;
import org.luaj.vm2.Globals;
import org.luaj.vm2.LuaError;
import org.luaj.vm2.LuaValue;
import org.luaj.vm2.lib.OneArgFunction;
import org.luaj.vm2.lib.TwoArgFunction;
import org.luaj.vm2.lib.ZeroArgFunction;

import java.util.Random;

public class randomModule {

    private static final Random RNG = new Random();

    public randomModule() {}

    public static class IntFn extends TwoArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue minValue, LuaValue maxValue) {
            int min = minValue.checkint();
            int max = maxValue.checkint();

            if (min > max) {
                throw new LuaError(
                        "random.int(min, max): min cannot be greater than max."
                );
            }

            int value = (int) RNG.nextLong((long) min, (long) max + 1);
            return LuaValue.valueOf(value);
        }

        @Override
        public String getFnName() {
            return "int";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class FloatFn extends ZeroArgFunction implements LuaFunction {

        @Override
        public LuaValue call() {
            return LuaValue.valueOf(RNG.nextDouble());
        }

        @Override
        public String getFnName() {
            return "float";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static class BoolFn extends ZeroArgFunction implements LuaFunction {

        @Override
        public LuaValue call() {
            return LuaValue.valueOf(RNG.nextBoolean());
        }

        @Override
        public String getFnName() {
            return "bool";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static class SeedFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue seed) {
            RNG.setSeed(seed.checkint());
            return LuaValue.TRUE;
        }

        @Override
        public String getFnName() {
            return "seed";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static void register(Globals globals) {
        LuaValue randomModule = LuaValue.tableOf();

        IntFn intFn = new IntFn();
        randomModule.set(intFn.getFnName(), intFn);

        FloatFn floatFn = new FloatFn();
        randomModule.set(floatFn.getFnName(), floatFn);

        BoolFn boolFn = new BoolFn();
        randomModule.set(boolFn.getFnName(), boolFn);

        SeedFn seedFn = new SeedFn();
        randomModule.set(seedFn.getFnName(), seedFn);

        globals.set("random", randomModule);
    }
}
