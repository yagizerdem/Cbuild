---
title: The override Directive
description: Learn how the override directive lets a buildfile change variables set on the command line.
sidebar_position: 8
---

If a variable is set with a command argument, such as `cbuild CFLAGS=-O2`, ordinary assignments to it in the buildfile are ignored. To set the variable in the buildfile anyway, use the `override` directive. It is a line that looks like this:

```buildfile
override variable = value
```

or

```buildfile
override variable := value
```

To append more text to a variable defined on the command line, use:

```buildfile
override variable += more text
```

See [Appending More Text to Variables](./appending-more-text-to-variables.md).

For example, take this buildfile:

```buildfile
MODE = debug
override TARGET = app

all:
	echo $(MODE) $(TARGET)
```

`cbuild MODE=release TARGET=lib` prints `release app`. The command argument wins over the plain assignment to `MODE`, but the `override` assignment to `TARGET` wins over the command argument.

## Priority of override

An assignment marked with `override` has a higher priority than all other assignments, except another `override`. Later assignments or appends to the same variable that are not marked `override` are ignored:

```buildfile
override MODE = debug
MODE = release
MODE += fast

all:
	echo $(MODE)
```

This prints `debug`. The plain `=` and the plain `+=` have no effect.

To keep changing the variable, mark each assignment with `override`:

```buildfile
override MODE = debug
override MODE += fast
```

Now `MODE` is `debug fast`.

## Adding to Values from the Command Line

The `override` directive is not meant to start a war between the buildfile and command arguments. It exists so that you can change and add to values that the user gives with command arguments.

For example, suppose you always want the `-g` switch when you run the C compiler, but you still want to let the user choose the other switches with a command argument, as usual. You can use this `override` directive:

```buildfile
override CFLAGS += -g

all:
	echo $(CFLAGS)
```

`cbuild CFLAGS=-O2` prints `-O2 -g`. The user's switches are kept, and `-g` is always added.

## override with define

You can also use `override` with the `define` directive. It works as you might expect:

```buildfile
override define foo =
bar
endef
```

See [Defining Multi-Line Variables](./multi-line-var.md) for more about `define`.
