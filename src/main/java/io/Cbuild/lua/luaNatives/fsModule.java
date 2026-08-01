package io.Cbuild.lua.luaNatives;

import io.Cbuild.lua.util.LuaFunction;
import org.luaj.vm2.Globals;
import org.luaj.vm2.LuaError;
import org.luaj.vm2.LuaValue;
import org.luaj.vm2.lib.OneArgFunction;
import org.luaj.vm2.lib.TwoArgFunction;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

public class fsModule {

    public fsModule() {}

    public static class ExistsFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            return LuaValue.valueOf(Files.exists(Path.of(path.checkjstring())));
        }

        @Override
        public String getFnName() {
            return "exists";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class IsFileFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            return LuaValue.valueOf(Files.isRegularFile(Path.of(path.checkjstring())));
        }

        @Override
        public String getFnName() {
            return "isFile";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class IsDirFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            return LuaValue.valueOf(Files.isDirectory(Path.of(path.checkjstring())));
        }

        @Override
        public String getFnName() {
            return "isDir";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class MkdirFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try {
                Files.createDirectory(Path.of(pathValue));
                return LuaValue.TRUE;
            } catch (Exception exception) {
                throw fsError("Cannot create directory '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "mkdir";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class MkdirsFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try {
                Files.createDirectories(Path.of(pathValue));
                return LuaValue.TRUE;
            } catch (Exception exception) {
                throw fsError("Cannot create directories '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "mkdirs";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class ReadFileFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try {
                return LuaValue.valueOf(Files.readString(Path.of(pathValue)));
            } catch (Exception exception) {
                throw fsError("Cannot read file '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "readFile";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class WriteFileFn extends TwoArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path, LuaValue content) {
            String pathValue = path.checkjstring();

            try {
                Files.writeString(Path.of(pathValue), content.checkjstring());
                return LuaValue.TRUE;
            } catch (Exception exception) {
                throw fsError("Cannot write file '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "writeFile";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class DeleteFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try {
                return LuaValue.valueOf(Files.deleteIfExists(Path.of(pathValue)));
            } catch (IOException exception) {
                throw fsError("Cannot delete '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "delete";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class CopyFn extends TwoArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue source, LuaValue target) {
            String sourceValue = source.checkjstring();
            String targetValue = target.checkjstring();

            try {
                Files.copy(
                        Path.of(sourceValue),
                        Path.of(targetValue),
                        StandardCopyOption.REPLACE_EXISTING
                );
                return LuaValue.TRUE;
            } catch (IOException exception) {
                throw fsError("Cannot copy '" + sourceValue + "' to '" + targetValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "copy";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class MoveFn extends TwoArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue source, LuaValue target) {
            String sourceValue = source.checkjstring();
            String targetValue = target.checkjstring();

            try {
                Files.move(
                        Path.of(sourceValue),
                        Path.of(targetValue),
                        StandardCopyOption.REPLACE_EXISTING
                );
                return LuaValue.TRUE;
            } catch (IOException exception) {
                throw fsError("Cannot move '" + sourceValue + "' to '" + targetValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "move";
        }

        @Override
        public int arity() {
            return 2;
        }
    }

    public static class ListFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try (var stream = Files.list(Path.of(pathValue))) {
                List<Path> files = stream.toList();
                LuaValue result = LuaValue.tableOf();

                for (int index = 0; index < files.size(); index++) {
                    result.set(index + 1, files.get(index).getFileName().toString());
                }

                return result;
            } catch (IOException exception) {
                throw fsError("Cannot list directory '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "list";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class LastModifiedFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try {
                String time = Files.getLastModifiedTime(Path.of(pathValue)).toString();
                return LuaValue.valueOf(time);
            } catch (IOException exception) {
                throw fsError("Cannot get last modified time of '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "lastModified";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class SizeFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try {
                return LuaValue.valueOf((double) Files.size(Path.of(pathValue)));
            } catch (IOException exception) {
                throw fsError("Cannot get size of '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "size";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class RealPathFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            String pathValue = path.checkjstring();

            try {
                return LuaValue.valueOf(Path.of(pathValue).toRealPath().toString());
            } catch (IOException exception) {
                throw fsError("Cannot resolve real path of '" + pathValue + "'.");
            }
        }

        @Override
        public String getFnName() {
            return "realPath";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class ParentFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            Path parent = Path.of(path.checkjstring()).getParent();
            return LuaValue.valueOf(parent == null ? "" : parent.toString());
        }

        @Override
        public String getFnName() {
            return "parent";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class BasenameFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            Path fileName = Path.of(path.checkjstring()).getFileName();
            return LuaValue.valueOf(fileName == null ? "" : fileName.toString());
        }

        @Override
        public String getFnName() {
            return "basename";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static class ExtnameFn extends OneArgFunction implements LuaFunction {

        @Override
        public LuaValue call(LuaValue path) {
            Path fileNamePath = Path.of(path.checkjstring()).getFileName();
            if (fileNamePath == null) {
                return LuaValue.valueOf("");
            }

            String fileName = fileNamePath.toString();
            int dotIndex = fileName.lastIndexOf('.');

            if (dotIndex <= 0 || dotIndex == fileName.length() - 1) {
                return LuaValue.valueOf("");
            }

            return LuaValue.valueOf(fileName.substring(dotIndex));
        }

        @Override
        public String getFnName() {
            return "extname";
        }

        @Override
        public int arity() {
            return 1;
        }
    }

    public static void register(Globals globals) {
        LuaValue fsModule = LuaValue.tableOf();

        ExistsFn existsFn = new ExistsFn();
        fsModule.set(existsFn.getFnName(), existsFn);

        IsFileFn isFileFn = new IsFileFn();
        fsModule.set(isFileFn.getFnName(), isFileFn);

        IsDirFn isDirFn = new IsDirFn();
        fsModule.set(isDirFn.getFnName(), isDirFn);

        MkdirFn mkdirFn = new MkdirFn();
        fsModule.set(mkdirFn.getFnName(), mkdirFn);

        MkdirsFn mkdirsFn = new MkdirsFn();
        fsModule.set(mkdirsFn.getFnName(), mkdirsFn);

        ReadFileFn readFileFn = new ReadFileFn();
        fsModule.set(readFileFn.getFnName(), readFileFn);

        WriteFileFn writeFileFn = new WriteFileFn();
        fsModule.set(writeFileFn.getFnName(), writeFileFn);

        DeleteFn deleteFn = new DeleteFn();
        fsModule.set(deleteFn.getFnName(), deleteFn);

        CopyFn copyFn = new CopyFn();
        fsModule.set(copyFn.getFnName(), copyFn);

        MoveFn moveFn = new MoveFn();
        fsModule.set(moveFn.getFnName(), moveFn);

        ListFn listFn = new ListFn();
        fsModule.set(listFn.getFnName(), listFn);

        LastModifiedFn lastModifiedFn = new LastModifiedFn();
        fsModule.set(lastModifiedFn.getFnName(), lastModifiedFn);

        SizeFn sizeFn = new SizeFn();
        fsModule.set(sizeFn.getFnName(), sizeFn);

        RealPathFn realPathFn = new RealPathFn();
        fsModule.set(realPathFn.getFnName(), realPathFn);

        ParentFn parentFn = new ParentFn();
        fsModule.set(parentFn.getFnName(), parentFn);

        BasenameFn basenameFn = new BasenameFn();
        fsModule.set(basenameFn.getFnName(), basenameFn);

        ExtnameFn extnameFn = new ExtnameFn();
        fsModule.set(extnameFn.getFnName(), extnameFn);

        globals.set("fs", fsModule);
    }

    private static LuaError fsError(String message) {
        return new LuaError(message);
    }
}
