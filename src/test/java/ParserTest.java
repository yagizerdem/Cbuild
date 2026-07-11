import org.junit.jupiter.api.Test;
import util.utils;

public class ParserTest {


    @Test
    public void SimpleHelloWorld() {
        String buildFile =
                """
                        hello:
                        	echo "Hello, World"
                        """;

        utils.runBuildFile(buildFile);

    }


    @Test
    public void SimpleCommandPreq() {
        String buildFile =
                """
                        targets: prerequisites
                        \t command
                        \t command
                        \t command
                        """;

        utils.runBuildFile(buildFile);

    }

    @Test
    public void SimpleCommandPreq2() {
        String buildFile =
                """
                        blah: blah.o
                        	cc blah.o -o blah # Runs third
                        
                        blah.o: blah.c
                        	cc -c blah.c -o blah.o # Runs second
                        
                        # Typically blah.c would already exist, but I want to limit any additional required files
                        blah.c:
                        	echo "int main() { return 0; }" > blah.c # Runs first
                        """;

        utils.runBuildFile(buildFile);

    }

    @Test
    public void ComplexMakefileLikeBuild() {
        String buildFile =
                """
                        # Compiler settings
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
                        \t$(CC) $(objects) -o edit $(LDFLAGS)
                        
                        # Shared header dependencies
                        $(objects): defs.h
                        kbd.o command.o files.o: command.h
                        display.o insert.o search.o files.o: buffer.h
                        
                        # Explicit object rules
                        main.o: main.c defs.h
                        \t$(CC) $(CFLAGS) -c main.c -o main.o
                        
                        kbd.o: kbd.c defs.h command.h
                        \t$(CC) $(CFLAGS) -c kbd.c -o kbd.o
                        
                        command.o: command.c defs.h command.h
                        \t$(CC) $(CFLAGS) -c command.c -o command.o
                        
                        display.o: display.c defs.h buffer.h
                        \t$(CC) $(CFLAGS) -c display.c -o display.o
                        
                        insert.o: insert.c defs.h buffer.h
                        \t$(CC) $(CFLAGS) -c insert.c -o insert.o
                        
                        search.o: search.c defs.h buffer.h
                        \t$(CC) $(CFLAGS) -c search.c -o search.o
                        
                        files.o: files.c defs.h command.h buffer.h
                        \t$(CC) $(CFLAGS) -c files.c -o files.o
                        
                        utils.o: utils.c defs.h
                        \t$(CC) $(CFLAGS) -c utils.c -o utils.o
                        
                        # Utility target
                        clean:
                        \trm -f edit $(objects)
                        
                        # Install target
                        install: edit
                        \tmkdir -p /usr/local/bin
                        \tcp edit /usr/local/bin/edit
                        """;

        utils.runBuildFile(buildFile);
    }

    @Test
    public void PatternRule() {
        String buildFile =
                """
                        CC = gcc
                        CFLAGS = -O2
                        
                        %.o: %.c
                        	$(CC) $(CFLAGS) -c $< -o $@
                        
                        app: main.o util.o
                        	$(CC) main.o util.o -o app
                        """;

        utils.runBuildFile(buildFile);
    }

    @Test
    public void DockerComposeUp() {
        String buildFile =
                """
                        export HOST_UID=$(shell id -u)
                        export HOST_GID=$(shell id -g)
                        SHELL=/bin/bash
                        
                        # Watch out, Make expects TAB indentation!
                        up:
                        	docker-compose up
                        """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void ComplexMakeFile() {
        String buildFile =
                """
                        .PHONY: all clean
                        
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
                        """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void MultipleTargets() {
        String buildFile = """
                all: one two three
                
                one:
                	touch one
                two:
                	touch two
                three:
                	touch three
                
                clean:
                	rm -f one two three
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void Wildcard() {
        String buildFile = """
                thing_wrong := *.o # Don't do this! '*' will not get expanded
                thing_right := $(wildcard *.o)
                
                all: one two three four
                
                # Fails, because $(thing_wrong) is the string "*.o"
                one: $(thing_wrong)
                
                # Stays as *.o if there are no files that match this pattern :(
                two: *.o\s
                
                # Works as you would expect! In this case, it does nothing.
                three: $(thing_right)
                
                # Same as rule three
                four: $(wildcard *.o)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void AutomaticVariables() {
        String buildFile = """
                hey: one two
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
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void cProgramRecipe() {
        String buildFile = """
                CC = gcc # Flag for implicit rules
                CFLAGS = -g # Flag for implicit rules. Turn on debug info
                
                # Implicit rule #1: blah is built via the C linker implicit rule
                # Implicit rule #2: blah.o is built via the C compilation implicit rule, because blah.c exists
                blah: blah.o
                
                blah.c:
                	echo "int main() { return 0; }" > blah.c
                
                clean:
                	rm -f blah*
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void staticPatternRule() {
        String buildFile = """
                objects = foo.o bar.o all.o
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
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void staticPatternRule2() {
        String buildFile = """
                objects = foo.o bar.o all.o
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
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void staticPatternRuleFilters() {
        String buildFile = """
                obj_files = foo.result bar.o lose.o
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
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void patternRule1() {
        String buildFile = """
                # Define a pattern rule that compiles every .c file into a .o file
                %.o : %.c
                		$(CC) -c $(CFLAGS) $(CPPFLAGS) $< -o $@
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void patternRule2() {
        String buildFile = """
                # Define a pattern rule that has no pattern in the prerequisites.
                # This just creates empty .c files when needed.
                %.c:
                \t touch $@
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void doubleColonRules1() {
        String buildFile = """
                all: blah
                
                blah::
                	echo "hello"
                
                blah::
                	echo "hello again"
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void defaultShell() {
        String buildFile = """
                SHELL=/bin/bash
                
                cool:
                	echo "Hello from bash"
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void doubleDollarSign() {
        String buildFile = """
                make_var = I am a make variable
                all:
                	# Same as running "sh_var='I am a shell variable'; echo $sh_var" in the shell
                	sh_var='I am a shell variable'; echo $$sh_var
                
                	# Same as running "echo I am a make variable" in the shell
                	echo $(make_var)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void errorHandlingWithDashPrefix() {
        String buildFile = """
                one:
                \t# This error will be printed but ignored, and make will continue to run
                \t-false
                \ttouch one
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void recursiveMakeInvocation() {
        String buildFile = """
                new_contents = "hello:\\n\\ttouch inside_file"
                
                all:
                \tmkdir -p subdir
                \tprintf $(new_contents) | sed -e 's/^ //' > subdir/makefile
                \tcd subdir && $(MAKE)
                
                clean:
                \trm -rf subdir
                """;
    }


    @Test
    public void environmentVariableImportedIntoMake() {
        String buildFile = """
                # Run this with: export shell_env_var='I am an environment variable'; make
                all:
                \t# Print out the Shell variable
                \techo $$shell_env_var
                
                \t# Print out the Make variable
                \techo $(shell_env_var)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void exportDirectiveExportsVariableToRecipes() {
        String buildFile = """
                shell_env_var=Shell env var, created inside of Make
                export shell_env_var
                
                all:
                \techo $(shell_env_var)
                \techo $$shell_env_var
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void exportVariableToRecursiveMake() {
        String buildFile = """
                new_contents = "hello:\\n\\techo \\$$(cooly)"
                
                all:
                \tmkdir -p subdir
                \tprintf $(new_contents) | sed -e 's/^ //' > subdir/makefile
                \t@echo "---MAKEFILE CONTENTS---"
                \t@cd subdir && cat makefile
                \t@echo "---END MAKEFILE CONTENTS---"
                \tcd subdir && $(MAKE)
                
                # Note that variables and exports are set/affected globally.
                cooly = "The subdirectory can see me!"
                export cooly
                # This would nullify the line above: unexport cooly
                
                clean:
                \trm -rf subdir
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void inlineExportAssignmentForShellCommands() {
        String buildFile = """
                one=this will only work locally
                export two=we can run subcommands with this
                
                all:
                \t@echo $(one)
                \t@echo $$one
                \t@echo $(two)
                \t@echo $$two
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void exportAllVariablesSpecialTarget() {
        String buildFile = """
                .EXPORT_ALL_VARIABLES:
                new_contents = "hello:\\n\\techo \\$$(cooly)"
                
                cooly = "The subdirectory can see me!"
                # This would nullify the line above: unexport cooly
                
                all:
                \tmkdir -p subdir
                \tprintf $(new_contents) | sed -e 's/^ //' > subdir/makefile
                \t@echo "---MAKEFILE CONTENTS---"
                \t@cd subdir && cat makefile
                \t@echo "---END MAKEFILE CONTENTS---"
                \tcd subdir && $(MAKE)
                
                clean:
                \trm -rf subdir
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void recursiveVsSimpleVariables() {
        String buildFile = """
                one = one ${later_variable}
                two := two ${later_variable}
                
                later_variable = later
                
                all:
                \techo $(one)
                \techo $(two)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void appendToSimplyExpandedVariable() {
        String buildFile = """
                one = hello
                one := ${one} there
                
                all:
                \techo $(one)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void conditionalAssignmentOperator() {
        String buildFile = """
                one = hello
                one ?= will not be set
                two ?= will be set
                
                all:
                \techo $(one)
                \techo $(two)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void spacesInVariables() {
        String buildFile = """
                with_spaces = hello
                after = $(with_spaces)there
                
                nullstring =
                space = $(nullstring)
                
                all:
                \techo "$(after)"
                \techo start"$(space)"end
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void undefinedVariableExpansion() {
        String buildFile = """
                all:
                \t# Undefined variables expand to an empty string
                \techo $(nowhere)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void appendOperator() {
        String buildFile = """
                foo := start
                foo += more
                
                all:
                \techo $(foo)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void overrideCommandLineVariable() {
        String buildFile = """
                # Run with: make option_one=hi
                
                override option_one = did_override
                option_two = not_override
                
                all:
                \techo $(option_one)
                \techo $(option_two)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void defineDirectiveCreatesCommandList() {
        String buildFile = """
                one = export blah="I was set!"; echo $$blah
                
                define two
                export blah="I was set!"
                echo $$blah
                endef
                
                all:
                \t@echo "This prints 'I was set!'"
                \t@$(one)
                \t@echo "This does not print 'I was set!' because each command runs in a separate shell"
                \t@$(two)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void targetSpecificVariables() {
        String buildFile = """
                all: one = cool
                
                all:
                \techo one is defined: $(one)
                
                other:
                \techo one is nothing: $(one)
                """;
        utils.runBuildFile(buildFile);
    }

    @Test
    public void patternSpecificVariables() {
        String buildFile = """
%.c: one = cool

blah.c:
\techo one is defined: $(one)

other:
\techo one is nothing: $(one)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void conditionalIfElseInRecipeContext() {
        String buildFile = """
foo = ok

all:
ifeq ($(foo), ok)
\techo "foo equals ok"
else
\techo "nope"
endif
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void checkIfVariableIsEmpty() {
        String buildFile = """
nullstring =
foo = $(nullstring) 

all:
ifeq ($(strip $(foo)),)
\techo "foo is empty after being stripped"
endif
ifeq ($(nullstring),)
\techo "nullstring doesn't even have spaces"
endif
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void checkIfVariableIsDefined() {
        String buildFile = """
bar =
foo = $(bar)

all:
ifdef foo
\techo "foo is defined"
endif
ifndef bar
\techo "but bar is not"
endif
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void checkMakeFlagsWithFindstring() {
        String buildFile = """
all:
# Search for the "-i" flag. MAKEFLAGS is a list of single characters, one per flag.
ifneq (,$(findstring i, $(MAKEFLAGS)))
\techo "i was passed to MAKEFLAGS"
endif
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void substFunctionBasicReplacement() {
        String buildFile = """
bar := ${subst not,"totally", "I am not superman"}

all:
\t@echo $(bar)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void substFunctionReplaceSpacesWithComma() {
        String buildFile = """
comma := ,
empty:=
space := $(empty) $(empty)
foo := a b c
bar := $(subst $(space),$(comma),$(foo))

all:
\t@echo $(bar)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void substFunctionArgumentsKeepSpaces() {
        String buildFile = """
comma := ,
empty:=
space := $(empty) $(empty)
foo := a b c
bar := $(subst $(space), $(comma) , $(foo)) # Watch out!

all:
\t# Output is ", a , b , c". Notice the spaces introduced
\t@echo $(bar)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void patsubstFunctionAndSubstitutionReferences() {
        String buildFile = """
foo := a.o b.o l.a c.o
one := $(patsubst %.o,%.c,$(foo))
# This is a shorthand for the above
two := $(foo:%.o=%.c)
# This is the suffix-only shorthand, and is also equivalent to the above.
three := $(foo:.o=.c)

all:
\techo $(one)
\techo $(two)
\techo $(three)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void foreachFunctionAppendsTextToEachWord() {
        String buildFile = """
foo := who are you
# For each "word" in foo, output that same word with an exclamation after
bar := $(foreach wrd,$(foo),$(wrd)!)

all:
\t# Output is "who! are! you!"
\t@echo $(bar)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void ifFunctionChoosesThenOrElseBranch() {
        String buildFile = """
foo := $(if this-is-not-empty,then!,else!)
empty :=
bar := $(if $(empty),then!,else!)

all:
\t@echo $(foo)
\t@echo $(bar)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void callFunctionPassesParametersToVariableFunction() {
        String buildFile = """
sweet_new_fn = Variable Name: $(0) First: $(1) Second: $(2) Empty Variable: $(3)

all:
\t# Outputs "Variable Name: sweet_new_fn First: go Second: tigers Empty Variable:"
\t@echo $(call sweet_new_fn, go, tigers)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void shellFunctionExpandsCommandOutput() {
        String buildFile = """
all:
\t@echo $(shell ls -la) # Very ugly because the newlines are gone!
""";
        utils.runBuildFile(buildFile);
    }


    @Test
    public void filterFunctionSelectsMatchingFiles() {
        String buildFile = """
obj_files = foo.result bar.o lose.o
filtered_files = $(filter %.o,$(obj_files))

all:
\t@echo $(filtered_files)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void filterFunctionWithMultiplePatterns() {
        String buildFile = """
files = main.c app.h readme.md test.o
filtered_files = $(filter %.c %.h,$(files))

all:
\t@echo $(filtered_files)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void filterOutFunctionExcludesMatchingFiles() {
        String buildFile = """
files = main.c app.h readme.md test.o
filtered_files = $(filter-out %.h,$(files))

all:
\t@echo $(filtered_files)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void nestedFilterFunctions() {
        String buildFile = """
objects = main.o test_main.o app.o test_app.o
filtered_objects = $(filter %.o,$(filter-out test%,$(objects)))

all:
\t@echo $(filtered_objects)
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void includeDirectiveWithSingleMakefile() {
        String buildFile = """
include generated.mk

all:
\t@echo included
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void vpathDirectiveWithHeaderSearchPath() {
        String buildFile = """
vpath %.h ../headers ../other-directory

# Note: vpath allows blah.h to be found even though blah.h is never in the current directory
some_binary: ../headers blah.h
\ttouch some_binary

../headers:
\tmkdir ../headers

# We call the target blah.h instead of ../headers/blah.h, because that's the prereq that some_binary is looking for
# Typically, blah.h would already exist and you wouldn't need this.
blah.h:
\ttouch ../headers/blah.h

clean:
\trm -rf ../headers
\trm -f some_binary
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void multilineRecipeWithBackslashContinuation() {
        String buildFile = """
some_file:
\techo This line is too long, so \\
\t\tit is broken up into multiple lines
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void phonyTargetPreventsFileNameConflict() {
        String buildFile = """
some_file:
\ttouch some_file
\ttouch clean

.PHONY: clean
clean:
\trm -f some_file
\trm -f clean
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void deleteOnErrorSpecialTarget() {
        String buildFile = """
.DELETE_ON_ERROR:
all: one two

one:
\ttouch one
\tfalse

two:
\ttouch two
\tfalse
""";
        utils.runBuildFile(buildFile);
    }

    @Test
    public void makefileCookbookMediumSizedProjectExample() {
        String buildFile = """
# Thanks to Job Vranish (https://spin.atomicobject.com/2016/08/26/makefile-c-projects/)
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
\t$(CXX) $(OBJS) -o $@ $(LDFLAGS)

# Build step for C source
$(BUILD_DIR)/%.c.o: %.c
\tmkdir -p $(dir $@)
\t$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Build step for C++ source
$(BUILD_DIR)/%.cpp.o: %.cpp
\tmkdir -p $(dir $@)
\t$(CXX) $(CPPFLAGS) $(CXXFLAGS) -c $< -o $@


.PHONY: clean
clean:
\trm -r $(BUILD_DIR)

# Include the .d makefiles. The - at the front suppresses the errors of missing
# Makefiles. Initially, all the .d files will be missing, and we don't want those
# errors to show up.
-include $(DEPS)
""";
        utils.runBuildFile(buildFile);
    }

}

