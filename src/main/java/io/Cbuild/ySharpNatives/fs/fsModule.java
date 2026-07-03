package io.Cbuild.ySharpNatives.fs;

import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.*;
import ysharp.treewalk.evaluator.Native.Collections.Array.yArray;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.nio.file.StandardCopyOption;

public class fsModule {

    public static class ExistsFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant(Files.exists(Path.of(pathValue)));
        }

        @Override
        public String getFnName() {
            return "exists";
        }
    }

    public static class IsFileFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant(Files.isRegularFile(Path.of(pathValue)));
        }

        @Override
        public String getFnName() {
            return "isFile";
        }
    }

    public static class IsDirFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            return new Variable.Variant(Files.isDirectory(Path.of(pathValue)));
        }

        @Override
        public String getFnName() {
            return "isDir";
        }
    }

    public static class MkdirFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try {
                Files.createDirectory(Path.of(pathValue));
                return new Variable.Variant(true);
            } catch (Exception e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1, e.getMessage());
            }
        }

        @Override
        public String getFnName() {
            return "mkdir";
        }
    }

    public static class MkdirsFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try {
                Files.createDirectories(Path.of(pathValue));
                return new Variable.Variant(true);
            } catch (Exception e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1, e.getMessage());
            }
        }

        @Override
        public String getFnName() {
            return "mkdirs";
        }
    }

    public static class ReadFileFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try {
                return new Variable.Variant(Files.readString(Path.of(pathValue)));
            } catch (Exception e) {
                throw new YsharpException(
                        YsharpException.YsharpErrorType.PROCESS,
                        -1,
                        "Cannot read file '" + pathValue + "'."
                );
            }
        }

        @Override
        public String getFnName() {
            return "readFile";
        }
    }

    public static class WriteFileFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 2;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String pathValue = requireString(arguments.get(0), getFnName(), 1);
            String content = requireString(arguments.get(1), getFnName(), 2);

            try {
                Files.writeString(Path.of(pathValue), content);
                return new Variable.Variant(true);
            } catch (Exception e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1, e.getMessage());
            }
        }

        @Override
        public String getFnName() {
            return "writeFile";
        }
    }

    public static class DeleteFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try {
                return new Variable.Variant(Files.deleteIfExists(Path.of(pathValue)));
            } catch (IOException e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1,
                        "Cannot delete '" + pathValue + "'.");
            }
        }

        @Override public String getFnName() { return "delete"; }
    }

    public static class CopyFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 2; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String source = requireString(arguments.get(0), getFnName(), 1);
            String target = requireString(arguments.get(1), getFnName(), 2);

            try {
                Files.copy(Path.of(source), Path.of(target), StandardCopyOption.REPLACE_EXISTING);
                return new Variable.Variant(true);
            } catch (IOException e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1,
                        "Cannot copy '" + source + "' to '" + target + "'.");
            }
        }

        @Override public String getFnName() { return "copy"; }
    }

    public static class MoveFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 2; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String source = requireString(arguments.get(0), getFnName(), 1);
            String target = requireString(arguments.get(1), getFnName(), 2);

            try {
                Files.move(Path.of(source), Path.of(target), StandardCopyOption.REPLACE_EXISTING);
                return new Variable.Variant(true);
            } catch (IOException e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1,
                        "Cannot move '" + source + "' to '" + target + "'.");
            }
        }

        @Override public String getFnName() { return "move"; }
    }

    public static class ListFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try (var stream = Files.list(Path.of(pathValue))) {
                List<Variable.Variant> files = stream
                        .map(path -> new Variable.Variant(path.getFileName().toString()))
                        .toList();

                return new Variable.Variant(new yArray.yArrayInstance(new ArrayList<Variable.Variant>(files)));
            } catch (IOException e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1,
                        "Cannot list directory '" + pathValue + "'.");
            }
        }

        @Override public String getFnName() { return "list"; }
    }

    public static class LastModifiedFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try {
                String time = Files.getLastModifiedTime(Path.of(pathValue)).toString();
                return new Variable.Variant(new yString.yStringInstance(time));
            } catch (IOException e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1,
                        "Cannot get last modified time of '" + pathValue + "'.");
            }
        }

        @Override public String getFnName() { return "lastModified"; }
    }

    public static class SizeFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try {
                return new Variable.Variant((double) Files.size(Path.of(pathValue)));
            } catch (IOException e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1,
                        "Cannot get size of '" + pathValue + "'.");
            }
        }

        @Override public String getFnName() { return "size"; }
    }

    public static class RealPathFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            try {
                return new Variable.Variant(new yString.yStringInstance(Path.of(pathValue).toRealPath().toString()));
            } catch (IOException e) {
                throw new YsharpException(YsharpException.YsharpErrorType.PROCESS, -1,
                        "Cannot resolve real path of '" + pathValue + "'.");
            }
        }

        @Override public String getFnName() { return "realPath"; }
    }

    public static class ParentFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            Path parent = Path.of(pathValue).getParent();
            return new Variable.Variant(new yString.yStringInstance(parent == null ? "" : parent.toString()));
        }

        @Override public String getFnName() { return "parent"; }
    }

    public static class BasenameFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            Path fileName = Path.of(pathValue).getFileName();
            return new Variable.Variant(new yString.yStringInstance(fileName == null ? "" : fileName.toString()));
        }

        @Override public String getFnName() { return "basename"; }
    }

    public static class ExtnameFn extends Function.NativeFunction implements Callable {
        @Override public int arity() { return 1; }

        @Override
        public Variable.Variant call(Interpreter interpreter, List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String pathValue = requireString(arguments.getFirst(), getFnName(), 1);

            Path fileNamePath = Path.of(pathValue).getFileName();
            if (fileNamePath == null) {
                return new Variable.Variant("");
            }

            String fileName = fileNamePath.toString();
            int dotIndex = fileName.lastIndexOf('.');

            if (dotIndex <= 0 || dotIndex == fileName.length() - 1) {
                return new Variable.Variant("");
            }

            return new Variable.Variant(new yString.yStringInstance(fileName.substring(dotIndex)));
        }

        @Override public String getFnName() { return "extname"; }
    }

    public static class yFsClass extends yClass.SealedClassObject {

        private yFsClass(){
            this.prototype =  yClass.ClassPrototype;

            RegisterNativeFn(new ExistsFn());
            RegisterNativeFn(new IsFileFn());
            RegisterNativeFn(new IsDirFn());
            RegisterNativeFn(new MkdirFn());
            RegisterNativeFn(new MkdirsFn());
            RegisterNativeFn(new ReadFileFn());
            RegisterNativeFn(new WriteFileFn());
            RegisterNativeFn(new DeleteFn());
            RegisterNativeFn(new CopyFn());
            RegisterNativeFn(new MoveFn());
            RegisterNativeFn(new ListFn());
            RegisterNativeFn(new LastModifiedFn());
            RegisterNativeFn(new SizeFn());
            RegisterNativeFn(new RealPathFn());
            RegisterNativeFn(new ParentFn());
            RegisterNativeFn(new BasenameFn());
            RegisterNativeFn(new ExtnameFn());
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
            return "fs";
        }

        @Override
        public String getType() {
            return "_fs_";
        }
    }

    public static void Register(Interpreter interpreter) throws Exception {

        yFsClass fsModule = new yFsClass();

        Variable.Variant variant = new Variable.Variant(fsModule);
        Variable var = new Variable(variant,
                true,
                fsModule.getType());


        interpreter.defineGlobal(fsModule.getClassName(), var);
    }

}
