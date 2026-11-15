---
title: Appending More Text to Variables
description: Learn how to append more text to variables in buildfile.
sidebar_position: 7
---

You will often want to add more text to a variable that is already defined. Use a line with `+=` to do this:

```buildfile
objects += another.o
```

This takes the value of the variable `objects` and adds the text `another.o` to the end. A single space goes between the old value and the new text. For example:

```buildfile
objects = main.o foo.o bar.o utils.o
objects += another.o
```

sets `objects` to `main.o foo.o bar.o utils.o another.o`.

Using `+=` is similar to:

```buildfile
objects = main.o foo.o bar.o utils.o
objects := $(objects) another.o
```

The two forms differ in ways that matter when the values are more complex.

## Appending to an Undefined Variable

If the variable is not defined yet, `+=` works like a plain `=`. It defines a recursively expanded variable:

```buildfile
NAMES += alice
```

is the same as

```buildfile
NAMES = alice
```

If the variable is already defined, what `+=` does depends on the flavor of that earlier definition. See [The Two Flavors of Variables](./the-two-flavors-of-variables.md) for an explanation of the flavors.

## How `+=` Works with Each Flavor

When you add to a value with `+=`, CBuild acts as if you had written the extra text in the original definition of the variable.

### Simply expanded variables

If you first defined the variable with `:=` or `::=`, it is a simply expanded variable. `+=` appends to that simply expanded value. The new text is expanded before it is appended, just as `:=` would expand it. So

```buildfile
variable := value
variable += more
```

is exactly the same as:

```buildfile
variable := value
variable := $(variable) more
```

### Recursively expanded variables

If you first defined the variable with `=` or `:::=`, it is a recursively expanded variable. `+=` appends the right-hand side **without expanding it**. So

```buildfile
variable = value
variable += more
```

is roughly the same as:

```buildfile
temp = value
variable = $(temp) more
```

except that CBuild never defines a variable called `temp`.

The difference is visible when the appended text contains a variable reference:

```buildfile
var = value

REC = $(var)
REC += $(var)

SIM := $(var)
SIM += $(var)

var = changed

all:
	echo $(REC)
	echo $(SIM)
```

This prints `changed changed` for `REC` and `value value` for `SIM`. `REC` keeps both `$(var)` references and expands them when it is used. `SIM` expanded each `$(var)` at the moment of the assignment.

For a variable defined with `:::=`, see the example in [Immediately Expanded Variable Assignment](./the-two-flavors-of-variables.md#immediately-expanded-variable-assignment).

## Why `+=` Is Better Than `:=` for Appending

The difference matters most when the old value contains variable references. Take this common example:

```buildfile
CFLAGS = $(includes) -O
...
CFLAGS += -pg # enable profiling
```

The first line defines `CFLAGS` with a reference to another variable, `includes`. Because it uses `=`, `CFLAGS` is a recursively expanded variable. CBuild does not expand `$(includes) -O` when it reads the definition. So `includes` does not have to be defined yet. It only has to be defined before `CFLAGS` is used.

You might try to append to `CFLAGS` without `+=`, like this:

```buildfile
CFLAGS := $(CFLAGS) -pg # enable profiling
```

This is close, but it is not what you want. The `:=` turns `CFLAGS` into a simply expanded variable, so CBuild expands `$(CFLAGS) -pg` right away. If `includes` is not defined yet, the result is ` -O -pg`, and a later definition of `includes` has no effect.

With `+=`, `CFLAGS` gets the unexpanded value `$(includes) -O -pg`. The reference to `includes` is kept, so if `includes` is defined later, `$(CFLAGS)` still uses its value:

```buildfile
CFLAGS = $(includes) -O
CFLAGS += -pg
includes = -Ifoo

all:
	echo $(CFLAGS)
```

This prints `-Ifoo -O -pg`.

:::note
CBuild adds the separating space whenever the variable is already defined, even if its value is empty. After `EMPTY :=` and `EMPTY += x`, the value of `EMPTY` is ` x`, with a leading space. GNU make would give `x`.
:::
