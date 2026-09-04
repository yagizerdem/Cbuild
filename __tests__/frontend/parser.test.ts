import { test } from "vitest";
import { runBuildFile } from "../util/parse";

test("SimpleHelloWorld", () => {
  const buildFile = `hello:
	echo "Hello, World"
`;

  runBuildFile(buildFile);
});

test("SimpleCommandPreq", () => {
  const buildFile = `targets: prerequisites
	 command
	 command
	 command
`;

  runBuildFile(buildFile);
});

test("SimpleCommandPreq2", () => {
  const buildFile = `blah: blah.o
	cc blah.o -o blah # Runs third

blah.o: blah.c
	cc -c blah.c -o blah.o # Runs second

# Typically blah.c would already exist, but I want to limit any additional required files
blah.c:
	echo "int main() { return 0; }" > blah.c # Runs first
`;

  runBuildFile(buildFile);
});

test("ComplexMakefileLikeBuild", () => {
  const buildFile = `# Compiler settings
CC := gcc
CFLAGS := -Wall -Wextra -O2
LDFLAGS :=

# Objects
objects = main.o kbd.o command.o display.o insert.o search.o files.o utils.o

# Conditional flags
ifeq ($(MODE), debug)
CFLAGS += -g
else
CFLAGS += -DNDEBUG
endif

# Default target
edit: $(objects)
	$(CC) $(objects) -o edit $(LDFLAGS)

# Shared header dependencies
$(objects): defs.h
kbd.o command.o files.o: command.h
display.o insert.o search.o files.o: buffer.h

# Explicit object rules
main.o: main.c defs.h
	$(CC) $(CFLAGS) -c main.c -o main.o

kbd.o: kbd.c defs.h command.h
	$(CC) $(CFLAGS) -c kbd.c -o kbd.o

command.o: command.c defs.h command.h
	$(CC) $(CFLAGS) -c command.c -o command.o

display.o: display.c defs.h buffer.h
	$(CC) $(CFLAGS) -c display.c -o display.o

insert.o: insert.c defs.h buffer.h
	$(CC) $(CFLAGS) -c insert.c -o insert.o

search.o: search.c defs.h buffer.h
	$(CC) $(CFLAGS) -c search.c -o search.o

files.o: files.c defs.h command.h buffer.h
	$(CC) $(CFLAGS) -c files.c -o files.o

utils.o: utils.c defs.h
	$(CC) $(CFLAGS) -c utils.c -o utils.o

# Utility target
clean:
	rm -f edit $(objects)

# Install target
install: edit
	mkdir -p /usr/local/bin
	cp edit /usr/local/bin/edit
`;

  runBuildFile(buildFile);
});

test("PatternRule", () => {
  const buildFile = `CC = gcc
CFLAGS = -O2

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

app: main.o util.o
	$(CC) main.o util.o -o app
`;

  runBuildFile(buildFile);
});

test("DockerComposeUp", () => {
  const buildFile = `export HOST_UID=$(shell id -u)
export HOST_GID=$(shell id -g)
SHELL=/bin/bash

# Watch out, Make expects TAB indentation!
up:
	docker-compose up
`;

  runBuildFile(buildFile);
});

test("ComplexMakeFile", () => {
  const buildFile = `.PHONY: all clean

CFLAGS      =-std=gnu99 -Wall -O2 $(INCS)
SRCS        =$(wildcard src/*.c)
OBJS        =$(SRCS:%.c=%.o)
LIBS        =-lpthread
INCS        =-I"./include"

OBJDIR      =build/$(MACHINE)/obj
ENTRYDIR    =build/$(MACHINE)/obj/entry
BINDIR      =build/$(MACHINE)/bin

all: x86 com
	@echo "***************************************"
	@echo "Application has been successfully built"
	@echo "***************************************"

x86:
	export MACHINE=x86 CC=gcc && $(MAKE) app -j4
com:
	export MACHINE=com CC=/opt/com/buildroot-2016.05/output/host/usr/bin/arm-buildroot-linux-uclibcgnueabi-gcc && $(MAKE) app -j4

%.o: %.c
	$(CC) $(CFLAGS) -c -o $(OBJDIR)/$(notdir $@) $^

%main.o: %main.c
	$(CC) $(CFLAGS) -c -o $(ENTRYDIR)/$(notdir $@) $^

app: mktree $(OBJS)
	$(CC) $(CFLAGS) $(OBJDIR)/*.o $(ENTRYDIR)/main.o -o $(BINDIR)/app $(LIBS)

mktree:
	mkdir -p $(ENTRYDIR)
	mkdir -p $(BINDIR)

clean:
	rm -rf build

%:
	@# Build dynamic target
	@# example: make "a MACHINE=i.MX6 CC=arm-linux-gnueabihf-gcc"
	export $@ && $(MAKE) app -j4
`;

  runBuildFile(buildFile);
});

test("MultipleTargets", () => {
  const buildFile = `all: one two three

one:
	touch one
two:
	touch two
three:
	touch three

clean:
	rm -f one two three
`;

  runBuildFile(buildFile);
});

test("Wildcard", () => {
  const buildFile = `thing_wrong := *.o # Don't do this! '*' will not get expanded
thing_right := $(wildcard *.o)

all: one two three four

# Fails, because $(thing_wrong) is the string "*.o"
one: $(thing_wrong)

# Stays as *.o if there are no files that match this pattern :(
two: *.o 

# Works as you would expect! In this case, it does nothing.
three: $(thing_right)

# Same as rule three
four: $(wildcard *.o)
`;

  runBuildFile(buildFile);
});

test("AutomaticVariables", () => {
  const buildFile = `hey: one two
	# Outputs "hey", since this is the target name
	echo $@

	# Outputs all prerequisites newer than the target
	echo $?

	# Outputs all prerequisites
	echo $^

	# Outputs the first prerequisite
	echo $<

	touch hey

one:
	touch one

two:
	touch two

clean:
	rm -f hey one two
`;

  runBuildFile(buildFile);
});

test("cProgramRecipe", () => {
  const buildFile = `CC = gcc # Flag for implicit rules
CFLAGS = -g # Flag for implicit rules. Turn on debug info

# Implicit rule #1: blah is built via the C linker implicit rule
# Implicit rule #2: blah.o is built via the C compilation implicit rule, because blah.c exists
blah: blah.o

blah.c:
	echo "int main() { return 0; }" > blah.c

clean:
	rm -f blah*
`;

  runBuildFile(buildFile);
});

test("staticPatternRule", () => {
  const buildFile = `objects = foo.o bar.o all.o
all: $(objects)
	$(CC) $^ -o all

foo.o: foo.c
	$(CC) -c foo.c -o foo.o

bar.o: bar.c
	$(CC) -c bar.c -o bar.o

all.o: all.c
	$(CC) -c all.c -o all.o

all.c:
	echo "int main() { return 0; }" > all.c

# Note: all.c does not use this rule because Make prioritizes more specific matches when there is more than one match.
%.c:
	touch $@

clean:
	rm -f *.c *.o all
`;

  runBuildFile(buildFile);
});

test("staticPatternRule2", () => {
  const buildFile = `objects = foo.o bar.o all.o
all: $(objects)
	$(CC) $^ -o all

# Syntax - targets ...: target-pattern: prereq-patterns ...
# In the case of the first target, foo.o, the target-pattern matches foo.o and sets the "stem" to be "foo".
# It then replaces the '%' in prereq-patterns with that stem
$(objects): %.o: %.c
	$(CC) -c $^ -o $@

all.c:
	echo "int main() { return 0; }" > all.c

# Note: all.c does not use this rule because Make prioritizes more specific matches when there is more than one match.
%.c:
	touch $@

clean:
	rm -f *.c *.o all
`;

  runBuildFile(buildFile);
});

test("staticPatternRuleFilters", () => {
  const buildFile = `obj_files = foo.result bar.o lose.o
src_files = foo.raw bar.c lose.c

all: $(obj_files)
# Note: PHONY is important here. Without it, implicit rules will try to build the executable "all", since the prereqs are ".o" files.
.PHONY: all

# Ex 1: .o files depend on .c files. Though we don't actually make the .o file.
$(filter %.o,$(obj_files)): %.o: %.c
	echo "target: $@ prereq: $<"

# Ex 2: .result files depend on .raw files. Though we don't actually make the .result file.
$(filter %.result,$(obj_files)): %.result: %.raw
	echo "target: $@ prereq: $<"

%.c %.raw:
	touch $@

clean:
	rm -f $(src_files)
`;

  runBuildFile(buildFile);
});

test("patternRule1", () => {
  const buildFile = `# Define a pattern rule that compiles every .c file into a .o file
%.o : %.c
		$(CC) -c $(CFLAGS) $(CPPFLAGS) $< -o $@
`;

  runBuildFile(buildFile);
});

test("patternRule2", () => {
  const buildFile = `# Define a pattern rule that has no pattern in the prerequisites.
# This just creates empty .c files when needed.
%.c:
	 touch $@
`;

  runBuildFile(buildFile);
});

test("doubleColonRules1", () => {
  const buildFile = `all: blah

blah::
	echo "hello"

blah::
	echo "hello again"
`;

  runBuildFile(buildFile);
});

test("defaultShell", () => {
  const buildFile = `SHELL=/bin/bash

cool:
	echo "Hello from bash"
`;

  runBuildFile(buildFile);
});

test("doubleDollarSign", () => {
  const buildFile = `make_var = I am a make variable
all:
	# Same as running "sh_var='I am a shell variable'; echo $sh_var" in the shell
	sh_var='I am a shell variable'; echo $$sh_var

	# Same as running "echo I am a make variable" in the shell
	echo $(make_var)
`;

  runBuildFile(buildFile);
});

test("errorHandlingWithDashPrefix", () => {
  const buildFile = `one:
	# This error will be printed but ignored, and make will continue to run
	-false
	touch one
`;

  runBuildFile(buildFile);
});

test("recursiveMakeInvocation", () => {
  const buildFile = `new_contents = "hello:\\n\\ttouch inside_file"

all:
	mkdir -p subdir
	printf $(new_contents) | sed -e 's/^ //' > subdir/makefile
	cd subdir && $(MAKE)

clean:
	rm -rf subdir
`;

});

test("environmentVariableImportedIntoMake", () => {
  const buildFile = `# Run this with: export shell_env_var='I am an environment variable'; make
all:
	# Print out the Shell variable
	echo $$shell_env_var

	# Print out the Make variable
	echo $(shell_env_var)
`;

  runBuildFile(buildFile);
});

test("exportDirectiveExportsVariableToRecipes", () => {
  const buildFile = `shell_env_var=Shell env var, created inside of Make
export shell_env_var

all:
	echo $(shell_env_var)
	echo $$shell_env_var
`;

  runBuildFile(buildFile);
});

test("exportVariableToRecursiveMake", () => {
  const buildFile = `new_contents = "hello:\\n\\techo \\$$(cooly)"

all:
	mkdir -p subdir
	printf $(new_contents) | sed -e 's/^ //' > subdir/makefile
	@echo "---MAKEFILE CONTENTS---"
	@cd subdir && cat makefile
	@echo "---END MAKEFILE CONTENTS---"
	cd subdir && $(MAKE)

# Note that variables and exports are set/affected globally.
cooly = "The subdirectory can see me!"
export cooly
# This would nullify the line above: unexport cooly

clean:
	rm -rf subdir
`;

  runBuildFile(buildFile);
});

test("inlineExportAssignmentForShellCommands", () => {
  const buildFile = `one=this will only work locally
export two=we can run subcommands with this

all:
	@echo $(one)
	@echo $$one
	@echo $(two)
	@echo $$two
`;

  runBuildFile(buildFile);
});

test("exportAllVariablesSpecialTarget", () => {
  const buildFile = `.EXPORT_ALL_VARIABLES:
new_contents = "hello:\\n\\techo \\$$(cooly)"

cooly = "The subdirectory can see me!"
# This would nullify the line above: unexport cooly

all:
	mkdir -p subdir
	printf $(new_contents) | sed -e 's/^ //' > subdir/makefile
	@echo "---MAKEFILE CONTENTS---"
	@cd subdir && cat makefile
	@echo "---END MAKEFILE CONTENTS---"
	cd subdir && $(MAKE)

clean:
	rm -rf subdir
`;

  runBuildFile(buildFile);
});

test("recursiveVsSimpleVariables", () => {
  const buildFile = `one = one \${later_variable}
two := two \${later_variable}

later_variable = later

all:
	echo $(one)
	echo $(two)
`;

  runBuildFile(buildFile);
});

test("appendToSimplyExpandedVariable", () => {
  const buildFile = `one = hello
one := \${one} there

all:
	echo $(one)
`;

  runBuildFile(buildFile);
});

test("conditionalAssignmentOperator", () => {
  const buildFile = `one = hello
one ?= will not be set
two ?= will be set

all:
	echo $(one)
	echo $(two)
`;

  runBuildFile(buildFile);
});

test("spacesInVariables", () => {
  const buildFile = `with_spaces = hello
after = $(with_spaces)there

nullstring =
space = $(nullstring)

all:
	echo "$(after)"
	echo start"$(space)"end
`;

  runBuildFile(buildFile);
});

test("undefinedVariableExpansion", () => {
  const buildFile = `all:
	# Undefined variables expand to an empty string
	echo $(nowhere)
`;

  runBuildFile(buildFile);
});

test("appendOperator", () => {
  const buildFile = `foo := start
foo += more

all:
	echo $(foo)
`;

  runBuildFile(buildFile);
});

test("overrideCommandLineVariable", () => {
  const buildFile = `# Run with: make option_one=hi

override option_one = did_override
option_two = not_override

all:
	echo $(option_one)
	echo $(option_two)
`;

  runBuildFile(buildFile);
});

test("defineDirectiveCreatesCommandList", () => {
  const buildFile = `one = export blah="I was set!"; echo $$blah

define two
export blah="I was set!"
echo $$blah
endef

all:
	@echo "This prints 'I was set!'"
	@$(one)
	@echo "This does not print 'I was set!' because each command runs in a separate shell"
	@$(two)
`;

  runBuildFile(buildFile);
});

test("targetSpecificVariables", () => {
  const buildFile = `all: one = cool

all:
	echo one is defined: $(one)

other:
	echo one is nothing: $(one)
`;

  runBuildFile(buildFile);
});

test("patternSpecificVariables", () => {
  const buildFile = `%.c: one = cool

blah.c:
	echo one is defined: $(one)

other:
	echo one is nothing: $(one)
`;

  runBuildFile(buildFile);
});

test("conditionalIfElseInRecipeContext", () => {
  const buildFile = `foo = ok

all:
ifeq ($(foo), ok)
	echo "foo equals ok"
else
	echo "nope"
endif
`;

  runBuildFile(buildFile);
});

test("checkIfVariableIsEmpty", () => {
  const buildFile = `nullstring =
foo = $(nullstring)

all:
ifeq ($(strip $(foo)),)
	echo "foo is empty after being stripped"
endif
ifeq ($(nullstring),)
	echo "nullstring doesn't even have spaces"
endif
`;

  runBuildFile(buildFile);
});

test("checkIfVariableIsDefined", () => {
  const buildFile = `bar =
foo = $(bar)

all:
ifdef foo
	echo "foo is defined"
endif
ifndef bar
	echo "but bar is not"
endif
`;

  runBuildFile(buildFile);
});

test("checkMakeFlagsWithFindstring", () => {
  const buildFile = `all:
# Search for the "-i" flag. MAKEFLAGS is a list of single characters, one per flag.
ifneq (,$(findstring i, $(MAKEFLAGS)))
	echo "i was passed to MAKEFLAGS"
endif
`;

  runBuildFile(buildFile);
});

test("substFunctionBasicReplacement", () => {
  const buildFile = `bar := \${subst not,"totally", "I am not superman"}

all:
	@echo $(bar)
`;

  runBuildFile(buildFile);
});

test("substFunctionReplaceSpacesWithComma", () => {
  const buildFile = `comma := ,
empty:=
space := $(empty) $(empty)
foo := a b c
bar := $(subst $(space),$(comma),$(foo))

all:
	@echo $(bar)
`;

  runBuildFile(buildFile);
});

test("substFunctionArgumentsKeepSpaces", () => {
  const buildFile = `comma := ,
empty:=
space := $(empty) $(empty)
foo := a b c
bar := $(subst $(space), $(comma) , $(foo)) # Watch out!

all:
	# Output is ", a , b , c". Notice the spaces introduced
	@echo $(bar)
`;

  runBuildFile(buildFile);
});

test("patsubstFunctionAndSubstitutionReferences", () => {
  const buildFile = `foo := a.o b.o l.a c.o
one := $(patsubst %.o,%.c,$(foo))
# This is a shorthand for the above
two := $(foo:%.o=%.c)
# This is the suffix-only shorthand, and is also equivalent to the above.
three := $(foo:.o=.c)

all:
	echo $(one)
	echo $(two)
	echo $(three)
`;

  runBuildFile(buildFile);
});

test("foreachFunctionAppendsTextToEachWord", () => {
  const buildFile = `foo := who are you
# For each "word" in foo, output that same word with an exclamation after
bar := $(foreach wrd,$(foo),$(wrd)!)

all:
	# Output is "who! are! you!"
	@echo $(bar)
`;

  runBuildFile(buildFile);
});

test("ifFunctionChoosesThenOrElseBranch", () => {
  const buildFile = `foo := $(if this-is-not-empty,then!,else!)
empty :=
bar := $(if $(empty),then!,else!)

all:
	@echo $(foo)
	@echo $(bar)
`;

  runBuildFile(buildFile);
});

test("callFunctionPassesParametersToVariableFunction", () => {
  const buildFile = `sweet_new_fn = Variable Name: $(0) First: $(1) Second: $(2) Empty Variable: $(3)

all:
	# Outputs "Variable Name: sweet_new_fn First: go Second: tigers Empty Variable:"
	@echo $(call sweet_new_fn, go, tigers)
`;

  runBuildFile(buildFile);
});

test("shellFunctionExpandsCommandOutput", () => {
  const buildFile = `all:
	@echo $(shell ls -la) # Very ugly because the newlines are gone!
`;

  runBuildFile(buildFile);
});

test("filterFunctionSelectsMatchingFiles", () => {
  const buildFile = `obj_files = foo.result bar.o lose.o
filtered_files = $(filter %.o,$(obj_files))

all:
	@echo $(filtered_files)
`;

  runBuildFile(buildFile);
});

test("filterFunctionWithMultiplePatterns", () => {
  const buildFile = `files = main.c app.h readme.md test.o
filtered_files = $(filter %.c %.h,$(files))

all:
	@echo $(filtered_files)
`;

  runBuildFile(buildFile);
});

test("filterOutFunctionExcludesMatchingFiles", () => {
  const buildFile = `files = main.c app.h readme.md test.o
filtered_files = $(filter-out %.h,$(files))

all:
	@echo $(filtered_files)
`;

  runBuildFile(buildFile);
});

test("nestedFilterFunctions", () => {
  const buildFile = `objects = main.o test_main.o app.o test_app.o
filtered_objects = $(filter %.o,$(filter-out test%,$(objects)))

all:
	@echo $(filtered_objects)
`;

  runBuildFile(buildFile);
});

test("includeDirectiveWithSingleMakefile", () => {
  const buildFile = `include generated.mk

all:
	@echo included
`;

  runBuildFile(buildFile);
});

test("vpathDirectiveWithHeaderSearchPath", () => {
  const buildFile = `vpath %.h ../headers ../other-directory

# Note: vpath allows blah.h to be found even though blah.h is never in the current directory
some_binary: ../headers blah.h
	touch some_binary

../headers:
	mkdir ../headers

# We call the target blah.h instead of ../headers/blah.h, because that's the prereq that some_binary is looking for
# Typically, blah.h would already exist and you wouldn't need this.
blah.h:
	touch ../headers/blah.h

clean:
	rm -rf ../headers
	rm -f some_binary
`;

  runBuildFile(buildFile);
});

test("multilineRecipeWithBackslashContinuation", () => {
  const buildFile = `some_file:
	echo This line is too long, so \\
		it is broken up into multiple lines
`;

  runBuildFile(buildFile);
});

test("phonyTargetPreventsFileNameConflict", () => {
  const buildFile = `some_file:
	touch some_file
	touch clean

.PHONY: clean
clean:
	rm -f some_file
	rm -f clean
`;

  runBuildFile(buildFile);
});

test("deleteOnErrorSpecialTarget", () => {
  const buildFile = `.DELETE_ON_ERROR:
all: one two

one:
	touch one
	false

two:
	touch two
	false
`;

  runBuildFile(buildFile);
});

test("makefileCookbookMediumSizedProjectExample", () => {
  const buildFile = `# Thanks to Job Vranish (https://spin.atomicobject.com/2016/08/26/makefile-c-projects/)
TARGET_EXEC := final_program

BUILD_DIR := ./build
SRC_DIRS := ./src

# Find all the C and C++ files we want to compile
# Note the single quotes around the * expressions. The shell will incorrectly expand these otherwise, but we want to send the * directly to the find command.
SRCS := $(shell find $(SRC_DIRS) -name '*.cpp' -or -name '*.c' -or -name '*.s')

# Prepends BUILD_DIR and appends .o to every src file
# As an example, ./your_dir/hello.cpp turns into ./build/./your_dir/hello.cpp.o
OBJS := $(SRCS:%=$(BUILD_DIR)/%.o)

# String substitution (suffix version without %).
# As an example, ./build/hello.cpp.o turns into ./build/hello.cpp.d
DEPS := $(OBJS:.o=.d)

# Every folder in ./src will need to be passed to GCC so that it can find header files
INC_DIRS := $(shell find $(SRC_DIRS) -type d)
# Add a prefix to INC_DIRS. So moduleA would become -ImoduleA. GCC understands this -I flag
INC_FLAGS := $(addprefix -I,$(INC_DIRS))

# The -MMD and -MP flags together generate Makefiles for us!
# These files will have .d instead of .o as the output.
CPPFLAGS := $(INC_FLAGS) -MMD -MP

# The final build step.
$(BUILD_DIR)/$(TARGET_EXEC): $(OBJS)
	$(CXX) $(OBJS) -o $@ $(LDFLAGS)

# Build step for C source
$(BUILD_DIR)/%.c.o: %.c
	mkdir -p $(dir $@)
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Build step for C++ source
$(BUILD_DIR)/%.cpp.o: %.cpp
	mkdir -p $(dir $@)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -c $< -o $@


.PHONY: clean
clean:
	rm -r $(BUILD_DIR)

# Include the .d makefiles. The - at the front suppresses the errors of missing
# Makefiles. Initially, all the .d files will be missing, and we don't want those
# errors to show up.
-include $(DEPS)
`;

  runBuildFile(buildFile);
});

