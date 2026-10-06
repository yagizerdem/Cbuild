## Automatic variables

| Variable | Related method              | Description                                                                                                                        |
| -------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `$@`     | `generateAtVar()`           | Returns the **target name** of the current rule. For example: `build/main.o`.                                                      |
| `$%`     | `generatePercentVar()`      | Returns the archive member name. Since this project does not support archives, it returns an empty string (`""`).                  |
| `$<`     | `generateLessThanVar()`     | Returns the name of the first normal prerequisite.                                                                                 |
| `$?`     | `generateQuestionMarkVar()` | Returns prerequisites that are newer than the target or cause it to be out of date. Duplicates are removed.                        |
| `$^`     | `generateCaretVar()`        | Returns all normal prerequisites. Duplicates are removed.                                                                          |
| `$+`     | `generatePlusVar()`         | Returns all normal prerequisites. **Preserves duplicates.**                                                                        |
| `$\|`    | `generatePipeVar()`         | Returns order-only prerequisites. Duplicates are removed in this project.                                                          |
| `$(@D)`  | `generateAtDVar()`          | Returns the directory part of the target.                                                                                          |
| `$(@F)`  | `generateAtFVar()`          | Returns the file name of the target without its directory path.                                                                    |
| `$(<D)`  | `generateLessThanDVar()`    | Returns the directory part of the first normal prerequisite.                                                                       |
| `$(<F)`  | `generateLessThanFVar()`    | Returns the file name of the first normal prerequisite without its directory path.                                                 |
| `$(^D)`  | `generateCaretDVar()`       | Returns the directory parts of prerequisites in the `$^` list. Duplicate prerequisites are removed first.                          |
| `$(^F)`  | `generateCaretFVar()`       | Returns the file names of prerequisites in the `$^` list without their directory paths. Duplicate prerequisites are removed first. |
| `$(+D)`  | `generatePlusDVar()`        | Returns the directory parts of all prerequisites in the `$+` list. Preserves duplicates.                                           |
| `$(+F)`  | `generatePlusFVar()`        | Returns the file names of all prerequisites in the `$+` list without their directory paths. Preserves duplicates.                  |
| `$(?D)`  | `generateQuestionDVar()`    | Returns the directory parts of prerequisites in the `$?` list.                                                                     |
| `$(?F)`  | `generateQuestionFVar()`    | Returns the file names of prerequisites in the `$?` list without their directory paths.                                            |

## Built-in implicit variables

### Programs

| Variable   | Default value | Description                                                                                                             |
| ---------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `AR`       | `ar`          | Archive management program used by implicit rules.                                                                      |
| `AS`       | `as`          | Assembler program used by implicit rules.                                                                               |
| `CC`       | `cc`          | C compiler used by implicit rules.                                                                                      |
| `CXX`      | `g++`         | C++ compiler used by implicit rules.                                                                                    |
| `CPP`      | `$(CC) -E`    | C preprocessor command. This is stored as a deferred variable, so changes to `CC` are reflected when `CPP` is expanded. |
| `FC`       | `f77`         | Fortran compiler used by implicit rules.                                                                                |
| `M2C`      | `m2c`         | Modula-2 compiler used by implicit rules.                                                                               |
| `PC`       | `pc`          | Pascal compiler used by implicit rules.                                                                                 |
| `CO`       | `co`          | RCS checkout program used by implicit rules.                                                                            |
| `GET`      | `get`         | SCCS file retrieval program used by implicit rules.                                                                     |
| `LEX`      | `lex`         | Lexical analyzer generator used by implicit rules.                                                                      |
| `YACC`     | `yacc`        | Parser generator used by implicit rules.                                                                                |
| `LINT`     | `lint`        | C source checking program used by implicit rules.                                                                       |
| `MAKEINFO` | `makeinfo`    | Program used to convert Texinfo source files.                                                                           |
| `TEX`      | `tex`         | TeX processor used by implicit rules.                                                                                   |
| `TEXI2DVI` | `texi2dvi`    | Program used to convert Texinfo source to DVI output.                                                                   |
| `WEAVE`    | `weave`       | WEB documentation processor used by implicit rules.                                                                     |
| `CWEAVE`   | `cweave`      | CWEB documentation processor used by implicit rules.                                                                    |
| `TANGLE`   | `tangle`      | WEB source-code extraction program used by implicit rules.                                                              |
| `CTANGLE`  | `ctangle`     | CWEB source-code extraction program used by implicit rules.                                                             |
| `RM`       | `rm -f`       | Command used to remove files.                                                                                           |

### Flags

| Variable    | Default value | Description                                                                    |
| ----------- | ------------- | ------------------------------------------------------------------------------ |
| `ARFLAGS`   | `rv`          | Flags passed to the archive program referenced by `AR`.                        |
| `ASFLAGS`   | `""`          | Additional flags passed to the assembler referenced by `AS`.                   |
| `CFLAGS`    | `""`          | Additional flags passed to the C compiler referenced by `CC`.                  |
| `CXXFLAGS`  | `""`          | Additional flags passed to the C++ compiler referenced by `CXX`.               |
| `COFLAGS`   | `""`          | Additional flags passed to the RCS checkout program referenced by `CO`.        |
| `CPPFLAGS`  | `""`          | Additional flags passed to the C preprocessor.                                 |
| `FFLAGS`    | `""`          | Additional flags passed to the Fortran compiler referenced by `FC`.            |
| `GFLAGS`    | `""`          | Additional flags used by SCCS-related implicit rules.                          |
| `LDFLAGS`   | `""`          | Additional flags passed to the linker when an implicit rule performs linking.  |
| `LDLIBS`    | `""`          | Additional libraries or linker arguments appended when linking.                |
| `LOADLIBES` | `""`          | Deprecated alias for additional linker libraries; retained for compatibility.  |
| `LFLAGS`    | `""`          | Additional flags passed to the lexical analyzer generator referenced by `LEX`. |
| `YFLAGS`    | `""`          | Additional flags passed to the parser generator referenced by `YACC`.          |
| `PFLAGS`    | `""`          | Additional flags passed to the Pascal compiler referenced by `PC`.             |
| `RFLAGS`    | `""`          | Additional flags used by Ratfor-related implicit rules.                        |
| `LINTFLAGS` | `""`          | Additional flags passed to the source checker referenced by `LINT`.            |

All of these variables are registered with the `default` origin and are not exported by default. With the exception of `CPP`, the variables shown above are stored as raw variables. `CPP` is stored as a deferred variable with the value `$(CC) -E`.

## Variables with special meanings

| Variable      | Default value | Description                                                        |
| ------------- | ------------- | ------------------------------------------------------------------ |
| `SHELL`       | undefined     | The command interpreter used by the build system.                  |
| `.SHELLFLAGS` | undefined     | The flags passed to the command interpreter referenced by `SHELL`. |

## Special Targets

| Target   | Description                                       |
| -------- | ------------------------------------------------- |
| `.PHONY` | Declares phony targets that are not actual files. |
