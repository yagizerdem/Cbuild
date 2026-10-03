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
