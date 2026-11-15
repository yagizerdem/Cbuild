---
title: Defining Multi-Line Variables
description: Learn how to define multi-line variables in buildfile.
sidebar_position: 9
---

You can also set a variable with the `define` directive. Its syntax is unusual: the value can contain newline characters. This is useful for canned sequences of commands and for blocks of buildfile text that you want to keep together.

The `define` directive is followed, on the same line, by the name of the variable and an optional assignment operator. Nothing else goes on that line. The value starts on the next line. The end of the value is marked by a line that contains only the word `endef`.

```buildfile
define two-lines
echo foo
echo $(bar)
endef
```

Apart from the syntax, `define` works like any other variable definition. The variable name can contain variable and function references. They are expanded when CBuild reads the directive, to find the name of the variable:

```buildfile
prefix = build

define $(prefix)-banner
Building...
endef
```

This defines a variable named `build-banner`.

## The Assignment Operator

The assignment operator is optional. If you leave it out, CBuild uses `=` and creates a recursively expanded variable. See [The Two Flavors of Variables](./the-two-flavors-of-variables.md).

All the usual operators are accepted after the name:

| Form             | Meaning                                                 |
| ---------------- | ------------------------------------------------------- |
| `define VAR`     | Same as `define VAR =`, a recursively expanded variable |
| `define VAR =`   | Recursively expanded variable                           |
| `define VAR :=`  | Simply expanded variable                                |
| `define VAR ::=` | Simply expanded variable (POSIX form)                   |
| `define VAR ?=`  | Defined only if `VAR` is not defined yet                |
| `define VAR +=`  | Appended to the current value of `VAR`                  |

With `:=`, the body is expanded once, when the directive is read:

```buildfile
define V :=
value of W is: $(W)
endef

W = late
```

`$(V)` is `value of W is: ` because `W` was not defined yet when `V` was defined.

With `+=`, the value is appended to the previous value as in any other append operation, with a single space between the old and the new text:

```buildfile
X = a

define X +=
b
endef
```

`$(X)` is now `a b`. See [Appending More Text to Variables](./appending-more-text-to-variables.md).

## Newlines in the Value

The newline before `endef` is not part of the value. In the `two-lines` example above, the value is:

```text
echo foo
echo $(bar)
```

If you want the value to end with a newline, add an empty line before `endef`:

```buildfile
define with-trailing-newline
line

endef
```

Here the value is `line` followed by one newline. Empty lines in the middle of the body are kept too.

:::caution
In GNU make, a body made only of two empty lines defines a variable that holds one newline character. This is a common way to write a `newline` variable:

```buildfile
define newline


endef
```

CBuild does not support this yet. A `define` whose body has only empty lines gets an empty value.
:::

## Nested define Directives

A `define` body can contain other `define` directives. CBuild keeps track of the nesting and pairs each `define` with its own `endef`:

```buildfile
define outer
define inner
x
endef
endef
```

The inner `define` is not run when `outer` is defined. It stays in the value of `outer` as plain text. A missing `endef` is a syntax error.

## Using a Multi-Line Variable in a Recipe

A multi-line variable is handy for a canned sequence of commands:

```buildfile
bar = baz

define two-lines
echo foo
echo $(bar)
endef

all:
	$(two-lines)
```

In Cbuild, each line of the expanded value becomes its own recipe line and runs in a separate shell, so the example above behaves like:

```buildfile
two-lines = echo foo; echo $(bar)
```

:::caution
CBuild currently gives the whole expanded value, newlines included, to the shell as one command string. What happens with the second and later lines depends on the shell. For example, `cmd.exe` runs only the first line. For recipes that should work everywhere, join the commands on a single line with `;` or `&&`:

```buildfile
two-lines = echo foo && echo $(bar)
```

:::

## Current Limitations

`define` in CBuild does not cover everything GNU make supports yet:

- **Recipe lines in the body.** A body line that starts with a tab, such as a recipe line in a rule template, causes the error `recipe commences before first target`.
- **Leading spaces in the body.** A body line that starts with spaces can cause the error `missing separator`.
- **Specifiers.** `override define` and `export define` are accepted by the grammar, but they currently fail with `missing separator`. To override a variable set on the command line, use a single-line `override` assignment instead. See [The override Directive](./override.md).
- **The `eval` function.** In GNU make, `define` is often used with `$(eval ...)` to generate rules. CBuild does not support `eval` yet.
