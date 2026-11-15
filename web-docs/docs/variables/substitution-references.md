---
title: Substitution References
description: Learn how to use substitution references in buildfile.
sidebar_position: 4
---

A substitution reference substitutes the value of a variable with alterations that you specify. It has the form '$\(var:a=b\)' \(or '$\{var:a=b}'\) and its meaning is to take the value of the variable var, replace every a at the end of a word with b in that value, and substitute the resulting string.

When we say “at the end of a word”, we mean that a must appear either followed by whitespace or at the end of the value in order to be replaced; other occurrences of a in the value are unaltered. For example:

foo := a.o b.o l.a c.o
bar := $(foo:.o=.c)
sets 'bar' to 'a.c b.c l.a c.c'. See Setting Variables.

A substitution reference is shorthand for the patsubst expansion function (see Functions for String Substitution and Analysis): '$(var:a=b)' is equivalent to '$(patsubst %a,%b,var)'. We provide substitution references as well as patsubst for compatibility with other implementations of make.

Another type of substitution reference lets you use the full power of the patsubst function. It has the same form '$(var:a=b)' described above, except that now a must contain a single '%' character. This case is equivalent to '$(patsubst a,b,$(var))'. See Functions for String Substitution and Analysis, for a description of the patsubst function. For example:

```buildfile
foo := a.o b.o l.a c.o
bar := $(foo:%.o=%.c)

app:
	echo $(bar)
```

As with the shell function, the exit status of the just-invoked shell script is stored in the .SHELLSTATUS variable.
