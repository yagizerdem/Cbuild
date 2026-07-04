package io.Cbuild.ySharpNatives;

import io.Cbuild.Env;
import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.*;

import java.util.List;
import java.util.Map;

public class envModule {

    public static class SetFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 2;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.get(0), getFnName(), 1);
            String value = requireString(arguments.get(1), getFnName(), 2);

            Env env = Env.getInstance();
            Map<String, String> envVars = env.getVariables();
            envVars.put(key, value);

            return new Variable.Variant(true);
        }

        @Override
        public String getFnName() {
            return "set";
        }
    }

    public static class GetFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.getFirst(), getFnName(), 1);

            Env env = Env.getInstance();
            Map<String, String> envVars = env.getVariables();
            String data = envVars.getOrDefault(key, "");

            return new Variable.Variant(new yString.yStringInstance(data));
        }

        @Override
        public String getFnName() {
            return "get";
        }
    }

    public static class SizeFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            Env env = Env.getInstance();
            Map<String, String> envVars = env.getVariables();

            return new Variable.Variant((double) envVars.size());
        }

        @Override
        public String getFnName() {
            return "size";
        }
    }

    public static class HasFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.getFirst(), getFnName(), 1);

            Env env = Env.getInstance();
            Map<String, String> envVars = env.getVariables();

            return new Variable.Variant(envVars.containsKey(key));
        }

        @Override
        public String getFnName() {
            return "has";
        }
    }

    public static class RemoveFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.getFirst(), getFnName(), 1);

            Env env = Env.getInstance();
            Map<String, String> envVars = env.getVariables();

            return new Variable.Variant(envVars.remove(key) != null);
        }

        @Override
        public String getFnName() {
            return "remove";
        }
    }

    public static class yEnvClass extends yClass.SealedClassObject {

        private yEnvClass() {
            this.prototype = yClass.ClassPrototype;

            RegisterNativeFn(new SetFn());
            RegisterNativeFn(new GetFn());
            RegisterNativeFn(new HasFn());
            RegisterNativeFn(new RemoveFn());
            RegisterNativeFn(new SizeFn());
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
            return "env";
        }

        @Override
        public String getType() {
            return "_env_";
        }
    }

    public static void Register(Interpreter interpreter) throws Exception {

        yEnvClass envModule = new yEnvClass();

        Variable.Variant variant = new Variable.Variant(envModule);
        Variable var = new Variable(
                variant,
                true,
                envModule.getType()
        );

        interpreter.defineGlobal(envModule.getClassName(), var);
    }
}