# tinyMake Requirements

## Rules

A Makefile for `tinyMake` contains rules and variable definitions.

A rule has the following syntax:

```make
target target ... : prereq prereq ...
	recipe
	recipe
	...
```

The first line of a rule contains:

- One or more targets
- A colon (`:`)
- Zero or more prerequisites

For example:

```make
app: main.o utils.o
	gcc main.o utils.o -o app
```

In this rule, `app` depends on `main.o` and `utils.o`.

### Rule Requirements

- Targets and prerequisites are separated by whitespace.
- Target and prerequisite names may not contain spaces internally.
- Each recipe line must begin with a TAB character.
- A recipe is a shell command used to rebuild a target.
- A rule does not have to contain any recipes.
- The same target may appear in multiple rules.
- If a target appears in multiple rules, only one of those rules may contain recipes.

Example:

```make
app: main.o

app: utils.o
	gcc main.o utils.o -o app
```

The prerequisites of duplicate target rules are combined.

---

## Variables

`tinyMake` supports simple variables.

A variable is defined using the following syntax:

```make
name = value
```

For example:

```make
CC = gcc
CFLAGS = -Wall -O2
```

Everything to the left of `=` is treated as the variable name, except surrounding spaces.

Everything to the right of `=` is treated as the variable value.

A variable name may not directly contain spaces.

---

## Variable Expansion

Variables are referenced using:

```make
$(name)
```

For example:

```make
CC = gcc

app:
	$(CC) main.c -o app
```

Variables may be used anywhere in the Makefile, including:

- Variable names
- Variable values
- Targets
- Prerequisites
- Recipes

Target and prerequisite variables are expanded before their names are parsed.

For example:

```make
TARGETS = a b
PREREQS = d e

$(TARGETS) c: $(PREREQS) f
```

is equivalent to:

```make
a b c: d e f
```

---

## Variables Referencing Other Variables

A variable name or value may depend on another variable.

For example:

```make
A = hello
B = $(A) world
```

Variable names may also be generated using variable expansion.

However, recursive dependency loops are not allowed.

For example, the following is invalid:

```make
A = $(B)
B = $(A)
```

A variable must not directly or indirectly depend on itself.

---

## Recipe Variable Expansion

Variables inside recipes are not expanded when the rule is parsed.

They are expanded immediately before the recipe is executed.

For example:

```make
app:
	echo $(MESSAGE)

MESSAGE = hello
```

When the recipe runs, the executed command should be:

```bash
echo hello
```

This means variables defined after a rule may still be used by that rule's recipes.

---

## Undefined Variables

A variable that does not exist expands to an empty string.

For example:

```make
echo $(DOES_NOT_EXIST)
```

becomes:

```make
echo
```

---

## Dollar Sign Escaping

The sequence:

```make
$$
```

is replaced by a single dollar sign:

```text
$
```

For example:

```make
app:
	echo $$PATH
```

must result in the following command being passed to the shell:

```bash
echo $PATH
```

---

# Building a Target

To build a target, `tinyMake` performs the following steps.

## 1. Build All Prerequisites

All prerequisites of the target are recursively built first.

For example:

```make
app: main.o utils.o
```

requires:

```text
main.o
utils.o
```

to be built before `app`.

---

## 2. Determine Whether the Target Is Out of Date

After all prerequisites have been built, `tinyMake` checks whether the target needs to be rebuilt.

A target is considered out of date if any of the following conditions are true.

### The Target File Does Not Exist

If no file exists with the target's name, the target is out of date.

---

### A Prerequisite File Does Not Exist

If the target has at least one prerequisite for which no corresponding file exists, the target is out of date.

---

### A Prerequisite Is Newer Than the Target

The modification time of files must be determined using the `st_mtim` field returned by the `stat` system call.

If:

```text
prerequisite modification time > target modification time
```

then the target is out of date.

---

## 3. Execute the Recipes

If the target is out of date, its recipes are executed.

Each recipe must be executed by starting Bash with the `-c` option.

Conceptually:

```bash
bash -c "recipe"
```

However, `tinyMake` must use:

```c
fork()
execvp()
```

directly.

The `system()` library function should not be used because it may introduce incorrect quoting behavior for recipes containing special shell characters.

Each recipe executes in a separate shell subprocess.

For example:

```make
app:
	cd src
	gcc main.c -o ../app
```

must execute as two independent shell processes.

Therefore, the working directory change performed by the first recipe does not affect the second recipe.

---

# Command-Line Options

`tinyMake` must support the following command-line syntax:

```bash
tinyMake -f makefile -j concurrency target target ...
```

---

## `-f`

The `-f` option specifies the Makefile to use.

Example:

```bash
tinyMake -f build.mk
```

If `-f` is not provided, the default file is:

```text
Makefile
```

---

## `-j`

The `-j` option specifies the maximum number of recipes that may execute concurrently.

Example:

```bash
tinyMake -j 4
```

allows at most four recipes to execute simultaneously.

If `-j` is not specified, the default concurrency is:

```text
1
```

---

## Targets

Targets may be specified as positional command-line arguments.

For example:

```bash
tinyMake app test
```

builds both:

```text
app
test
```

If no target is specified, the default target is the first target encountered in the Makefile.

For example:

```make
app:
	echo build app

test:
	echo run tests
```

Running:

```bash
tinyMake
```

builds:

```text
app
```

because it is the first target encountered.

---

# Concurrency

By default, only one recipe executes at a time.

```bash
tinyMake
```

is therefore equivalent to:

```bash
tinyMake -j 1
```

When `-j` is specified, recipes for different targets may execute concurrently.

For example:

```bash
tinyMake -j 4 app
```

may execute up to four recipes at the same time.

However, the following constraints must always be respected.

---

## Recipes for the Same Target Are Sequential

Recipes belonging to the same target must never execute concurrently.

For example:

```make
app:
	echo step1
	echo step2
	echo step3
```

must always execute in this order:

```text
step1
step2
step3
```

---

## Prerequisites Must Finish First

A target's recipes cannot execute until all of its prerequisites have finished building.

More precisely, the target's out-of-date check cannot occur until all prerequisites have completed.

For example:

```make
app: a b
	echo build app

a:
	echo build a

b:
	echo build b
```

With:

```bash
tinyMake -j 2 app
```

the builds of `a` and `b` may execute concurrently.

However:

```text
build app
```

cannot execute until both have completed.

Conceptually:

```text
a ──┐
    ├──> app
b ──┘
```

---

## Independent Targets May Run Concurrently

If two targets do not depend on each other, their recipes may execute in parallel.

For example:

```make
a:
	sleep 1
	echo a

b:
	sleep 1
	echo b
```

Running:

```bash
tinyMake -j 2 a b
```

may execute the recipes for `a` and `b` simultaneously.

---

# Error Handling

Errors may occur while:

- Parsing the Makefile
- Expanding variables
- Resolving rules
- Building prerequisites
- Executing recipes
- Waiting for subprocesses

In most cases, `tinyMake` may print an error message and terminate the build.

Error messages should follow GNU Make's format as closely as practical.

---

## Parse Errors

If a Makefile line:

- Does not contain `:`
- Does not contain `=`
- Does not start with a TAB

then `tinyMake` should report a syntax error.

For example:

```text
Makefile:23: *** missing separator.  Stop.
```

The error message must include:

- Makefile name
- Line number
- Error description

Line numbers begin at `1`.

---

## Recipe Errors

If a recipe subprocess exits with a non-zero exit status, the build should fail.

For example:

```text
tinyMake: *** [test/test.mk:69: fail] Error 22
```

This message indicates that:

- The Makefile was `test/test.mk`
- The failed recipe was on line `69`
- The target was `fail`
- The recipe exited with status `22`

In general, recipe errors should follow this format:

```text
tinyMake: *** [makefile:line: target] Error exit_code
```

---

# Execution Model

A target can conceptually move through the following states:

```text
Not Started
    |
    v
Building Prerequisites
    |
    v
Checking Timestamp
    |
    +------------------+
    |                  |
    v                  v
Up To Date        Out Of Date
                       |
                       v
                Running Recipes
                       |
                 +-----+-----+
                 |           |
                 v           v
              Success      Failed
```

A target must not be built multiple times during the same build, even if multiple other targets depend on it.

For example:

```make
app: common
test: common

common:
	echo build common
```

Running:

```bash
tinyMake -j 2 app test
```

must build `common` only once.

---

# Summary

`tinyMake` must support:

- Makefile rule parsing
- Multiple targets in a rule
- Multiple prerequisites
- Multiple rules for the same target
- At most one recipe definition per target
- Variable definitions using `=`
- `$(name)` variable expansion
- Variables inside variable names and values
- Variable expansion in targets
- Variable expansion in prerequisites
- Deferred variable expansion in recipes
- Undefined variables expanding to an empty string
- `$$` escaping
- Recursive prerequisite builds
- File existence checks
- File modification-time checks using `st_mtim`
- Recipe execution through `bash -c`
- Direct use of `fork()` and `execvp()`
- Multiple command-line targets
- Default target selection
- `-f` Makefile selection
- `-j` concurrency control
- Parallel execution of independent targets
- Sequential recipes for the same target
- Dependency ordering
- Non-zero recipe exit status handling
- Makefile filename and line numbers in errors
- GNU Make-like error messages
- Prevention of duplicate builds of the same target
