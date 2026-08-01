package io.Cbuild.lua.luaNatives;

import io.Cbuild.lua.util.LuaFunction;
import org.luaj.vm2.Globals;
import org.luaj.vm2.LuaValue;
import org.luaj.vm2.lib.OneArgFunction;
import org.luaj.vm2.lib.TwoArgFunction;
import org.luaj.vm2.lib.ZeroArgFunction;

public class mathModule{

    public mathModule() {}

    public static class AbsFn extends OneArgFunction implements LuaFunction {

        public LuaValue call(LuaValue x) {
            double val = x.checkdouble();
            return LuaValue.valueOf(Math.abs(val));
        }

        @Override
        public String getFnName() {
            return "abs";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class SqrtFn extends OneArgFunction implements LuaFunction {

        public LuaValue call(LuaValue x) {
            return LuaValue.valueOf(Math.sqrt(x.checkdouble()));
        }

        @Override
        public String getFnName() {
            return "sqrt";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class PowFn extends TwoArgFunction implements LuaFunction {

        public LuaValue call(LuaValue base, LuaValue exponent) {
            return LuaValue.valueOf(Math.pow(base.checkdouble(), exponent.checkdouble()));
        }

        @Override
        public String getFnName() {
            return "pow";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class MinFn extends TwoArgFunction implements LuaFunction {

        public LuaValue call(LuaValue a, LuaValue b) {
            return LuaValue.valueOf(Math.min(a.checkdouble(), b.checkdouble()));
        }

        @Override
        public String getFnName() {
            return "min";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class MaxFn extends TwoArgFunction implements LuaFunction {

        public LuaValue call(LuaValue a, LuaValue b) {
            return LuaValue.valueOf(Math.max(a.checkdouble(), b.checkdouble()));
        }

        @Override
        public String getFnName() {
            return "max";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class FloorFn extends OneArgFunction implements LuaFunction {

        public LuaValue call(LuaValue x) {
            return LuaValue.valueOf(Math.floor(x.checkdouble()));
        }

        @Override
        public String getFnName() {
            return "floor";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class CeilFn extends OneArgFunction implements LuaFunction {

        public LuaValue call(LuaValue x) {
            return LuaValue.valueOf(Math.ceil(x.checkdouble()));
        }

        @Override
        public String getFnName() {
            return "ceil";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class RoundFn extends OneArgFunction implements LuaFunction {

        public LuaValue call(LuaValue x) {
            return LuaValue.valueOf((int) Math.round(x.checkdouble()));
        }

        @Override
        public String getFnName() {
            return "round";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class RandomFn extends ZeroArgFunction implements LuaFunction {

        public LuaValue call() {
            return LuaValue.valueOf(Math.random());
        }

        @Override
        public String getFnName() {
            return "random";
        }

        @Override
        public int arity() {
            return 0;
        }
    }

    public static void register(Globals globals){
        LuaValue mathModule = LuaValue.tableOf();

        AbsFn absFn = new AbsFn();
        mathModule.set(absFn.getFnName(), absFn);

        SqrtFn sqrtFn = new SqrtFn();
        mathModule.set(sqrtFn.getFnName(), sqrtFn);

        PowFn powFn = new PowFn();
        mathModule.set(powFn.getFnName(), powFn);

        MinFn minFn = new MinFn();
        mathModule.set(minFn.getFnName(), minFn);

        MaxFn maxFn = new MaxFn();
        mathModule.set(maxFn.getFnName(), maxFn);

        FloorFn floorFn = new FloorFn();
        mathModule.set(floorFn.getFnName(), floorFn);

        CeilFn ceilFn = new CeilFn();
        mathModule.set(ceilFn.getFnName(), ceilFn);

        RoundFn roundFn = new RoundFn();
        mathModule.set(roundFn.getFnName(), roundFn);

        RandomFn randomFn = new RandomFn();
        mathModule.set(randomFn.getFnName(), randomFn);

        globals.set("math", mathModule);
    }

}