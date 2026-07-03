package io.Cbuild.ySharpNatives;

import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.*;

import java.util.List;
import java.util.Random;

public class randomModule {

    private static final Random RNG = new Random();

    public static class IntFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 2;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            int min = requireInt(arguments.get(0), getFnName(), 1);
            int max = requireInt(arguments.get(1), getFnName(), 2);

            if (min > max) {
                throw new YsharpException(
                        YsharpException.YsharpErrorType.PROCESS,
                        -1,
                        "random.int(min, max): min cannot be greater than max."
                );
            }

            int value = RNG.nextInt((max - min) + 1) + min;
            return new Variable.Variant(value);
        }

        @Override
        public String getFnName() {
            return "int";
        }
    }

    public static class FloatFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            return new Variable.Variant(RNG.nextDouble());
        }

        @Override
        public String getFnName() {
            return "float";
        }
    }

    public static class BoolFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            return new Variable.Variant(RNG.nextBoolean());
        }

        @Override
        public String getFnName() {
            return "bool";
        }
    }

    public static class SeedFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            int seed = requireInt(arguments.getFirst(), getFnName(), 1);
            RNG.setSeed(seed);

            return new Variable.Variant(true);
        }

        @Override
        public String getFnName() {
            return "seed";
        }
    }

    public static class yRandomClass extends yClass.SealedClassObject {

        private yRandomClass() {
            this.prototype = yClass.ClassPrototype;

            RegisterNativeFn(new IntFn());
            RegisterNativeFn(new FloatFn());
            RegisterNativeFn(new BoolFn());
            RegisterNativeFn(new SeedFn());
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
            return "random";
        }

        @Override
        public String getType() {
            return "_random_";
        }
    }

    public static void Register(Interpreter interpreter) throws Exception {

        yRandomClass randomModule = new yRandomClass();

        Variable.Variant variant = new Variable.Variant(randomModule);
        Variable var = new Variable(
                variant,
                true,
                randomModule.getType()
        );

        interpreter.defineGlobal(randomModule.getClassName(), var);
    }
}