# AGENTS.md

## Purpose

This file defines the rules for AI agents working in this repository.

## General Rules

* Inspect the relevant files before proposing or making changes.
* Prefer minimal, focused changes over broad refactors.
* Preserve the existing project structure and naming conventions.
* Do not modify generated files manually.
* Do not introduce new dependencies unless they are necessary.
* Explain architectural trade-offs when suggesting structural changes.
* When requirements are ambiguous, state the assumption being used.

## Code Review Mode

When the user asks for a code review:

* Identify correctness issues, bugs, maintainability problems, and architectural concerns.
* Prioritize findings by severity:

    * Critical
    * Major
    * Minor
    * Suggestion
* Reference the relevant file, class, method, or code section.
* Explain why each issue matters.
* Recommend a concrete improvement.
* Avoid rewriting the entire implementation unless explicitly requested.
* Distinguish actual bugs from style preferences.

Use this structure:

1. Summary
2. Critical issues
3. Major issues
4. Minor improvements
5. Architectural observations

## Architecture Guidance Mode

When the user asks for architectural guidance:

* Focus on module boundaries, responsibilities, dependencies, data flow, and integration.
* Explain how components communicate.
* Discuss trade-offs between reasonable alternatives.
* Prefer simple architectures until project requirements justify additional complexity.
* Use diagrams or textual flow descriptions when they improve clarity.
* Do not provide a full implementation unless explicitly requested.
* Use practical examples related to this repository.

Consider:

* Dependency direction
* Separation of concerns
* Public module APIs
* Error propagation
* Configuration ownership
* Testability
* Extensibility
* Runtime and build-time boundaries

## Commit Message Mode

When the user asks for a commit message, return only the commit message.

Use Conventional Commits:

```text
<type>(<optional-scope>): <description>
```

Allowed types:

* feat
* fix
* refactor
* test
* docs
* build
* ci
* chore
* perf
* style
* revert

Rules:

* Use imperative mood.
* Keep the subject concise.
* Do not end the subject with a period.
* Use lowercase for the type and scope.
* Include a body only when the change requires additional context.
* Include a breaking-change footer when applicable.

Example:

```text
feat(parser): add support for order-only prerequisites
```

## Validation

Before considering a change complete:

* Run the relevant tests.
* Run formatting and lint checks.
* Run the build when the change affects compilation or packaging.
* Report any command that could not be executed.
* Do not claim that tests passed unless they were actually run.

## Repository-Specific Commands

Update this section with the actual commands used by the project.

```bash
# Build
./gradlew build

# Tests
./gradlew test

# Generate parser sources
./gradlew generateGrammarSource
```

## Generated Files

Do not manually edit generated ANTLR files. Modify the grammar source and regenerate them instead.

Generated files may include:

* Lexer classes
* Parser classes
* Listener classes
* Visitor classes
* `.tokens` files
* `.interp` files


## Tech Stack

- **Language:** Java
- **Build Tool:** Gradle with Kotlin DSL
- **Parser Generator:** ANTLR 4.13.2
- **Testing Framework:** JUnit 6 with JUnit Platform
- **ANTLR Runtime:** `antlr4-runtime`
- **Tuple Library:** JavaTuples 1.2
- **Local Dependency:** `ysv0.0.7.jar`

### Artifact Sources

- Maven Central
- Private Maven repository
- Maven Local
- Local flat directory repository

### Generated Parser Features

- Visitor generation enabled
- Long ANTLR error messages enabled
- Separate test grammar generation

### Project Configuration

- **Test Grammar Package:** `io.github.parser`
- **Project Group:** `io.Cbuild`
- **Project Version:** `1.0-SNAPSHOT`