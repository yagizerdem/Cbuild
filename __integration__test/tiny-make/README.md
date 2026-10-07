# tinyMake full build integration tests

```sh
node node_modules/vitest/vitest.mjs run __integration__test/tiny-make/build.test.ts
```

Tests compile current production TypeScript into a temporary runtime and start the
actual CLI in isolated working directories. No parser, filesystem, shell,
scheduler or dependency graph is mocked. Fixtures are removed after each test;
the runtime is removed after the suite. The repository's `dist` is untouched.

Coverage includes real text transformations, variables, shell subprocesses,
dependency ordering, concurrency, incremental timestamps, multiple CLI goals,
error propagation and native C/C++ object compilation, linking and execution.
Assertions follow the supplied tinyMake requirements; failures expose backend
behavior that does not yet meet those requirements.

Native cases need GCC/Clang and G++/Clang++. The test harness probes executable
compilers on PATH and common MSYS2 locations on Windows. Override them using
`TINYMAKE_TEST_CC` and `TINYMAKE_TEST_CXX` (executable paths, without flags).
Missing compilers skip only the native cases with a warning; an invalid explicit
override is an error. Text and native timestamp tests use explicit `utimes`
values instead of waiting for filesystem clocks.

The Node recipe helper performs real I/O and logs process starts/finishes for
ordering assertions. Its compiler action launches the selected real compiler,
forwards output and propagates its exit status. It does not simulate compilation.
Build processes have a 15-second timeout, with process-tree cleanup on timeout.
