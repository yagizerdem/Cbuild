package io.Cbuild.ySharpNatives;

import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.*;

import java.util.List;

public class mathModule {

    public static class AbsFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            double value = requireNumber(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant(Math.abs(value));
        }

        @Override public String getFnName() { return "abs"; }
    }

    public static class SqrtFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            double value = requireNumber(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant(Math.sqrt(value));
        }

        @Override public String getFnName() { return "sqrt"; }
    }

    public static class PowFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 2; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            double base = requireNumber(arguments.get(0), getFnName(), 1);
            double exponent = requireNumber(arguments.get(1), getFnName(), 2);

            return new Variable.Variant(Math.pow(base, exponent));
        }

        @Override public String getFnName() { return "pow"; }
    }

    public static class MinFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 2; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            double a = requireNumber(arguments.get(0), getFnName(), 1);
            double b = requireNumber(arguments.get(1), getFnName(), 2);

            return new Variable.Variant(Math.min(a, b));
        }

        @Override public String getFnName() { return "min"; }
    }

    public static class MaxFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 2; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            double a = requireNumber(arguments.get(0), getFnName(), 1);
            double b = requireNumber(arguments.get(1), getFnName(), 2);

            return new Variable.Variant(Math.max(a, b));
        }

        @Override public String getFnName() { return "max"; }
    }

    public static class FloorFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            double value = requireNumber(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant(Math.floor(value));
        }

        @Override public String getFnName() { return "floor"; }
    }

    public static class CeilFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            double value = requireNumber(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant(Math.ceil(value));
        }

        @Override public String getFnName() { return "ceil"; }
    }

    public static class RoundFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            double value = requireNumber(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant((int) Math.round(value));
        }

        @Override public String getFnName() { return "round"; }
    }

    public static class RandomFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 0; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            return new Variable.Variant(Math.random());
        }

        @Override public String getFnName() { return "random"; }
    }

    public static class yMathClass extends yClass.SealedClassObject {

        private yMathClass() {
            this.prototype = yClass.ClassPrototype;

            RegisterNativeFn(new AbsFn());
            RegisterNativeFn(new SqrtFn());
            RegisterNativeFn(new PowFn());
            RegisterNativeFn(new MinFn());
            RegisterNativeFn(new MaxFn());
            RegisterNativeFn(new FloorFn());
            RegisterNativeFn(new CeilFn());
            RegisterNativeFn(new RoundFn());
            RegisterNativeFn(new RandomFn());
        }

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            throw new YsharpException(
                    YsharpException.YsharpErrorType.PROCESS,
                    -1,
                    "Cannot create instance of static class '" + getClassName() + "'."
            );
        }

        @Override
        public String getClassName() {
            return "math";
        }

        @Override
        public String getType() {
            return "_math_";
        }
    }

    public static void Register(Interpreter interpreter) throws Exception {

        yMathClass mathModule = new yMathClass();

        Variable.Variant variant = new Variable.Variant(mathModule);
        Variable var = new Variable(
                variant,
                true,
                mathModule.getType()
        );

        interpreter.defineGlobal(mathModule.getClassName(), var);
    }
}