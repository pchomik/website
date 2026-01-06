# About

**pytest-spec** is a pytest plugin that formats test output as a readable specification. I wrote it because the default pytest output gets hard to scan when you have lots of tests, especially when the test names are long or follow some naming convention that makes sense to the code but not to someone reading the output.

## Why use it?

Standard pytest output works fine for small projects, but once your test suite grows, finding what failed takes effort. **pytest-spec** makes this easier by:

-   Converting test names into readable descriptions
-   Stripping away the `test_` prefixes and underscores
-   Using color-coded status indicators alongside each test
-   Organizing results hierarchically when using describe blocks or test classes

## Features

### Output formatting

The plugin transforms standard pytest output into a specification-style format. You get color-coded results that make it quick to scan - passed tests clearly distinguished from failed and skipped ones.

### Naming

By default, pytest-spec strips `test_` prefixes and converts underscores to spaces, turning function names like `test_user_authentication_succeeds` into "User authentication succeeds". If you want more control, you can use docstrings to define custom descriptions.

### Test structures

Works with whatever test organization you're using:

-   Regular test functions
-   Test classes (the class name becomes the context)
-   Describe-style blocks (popular with BDD approach)
-   Mixed test files with multiple styles in one file

## When it's useful

This plugin is particularly handy when:

-   Your team runs large test suites regularly
-   You're reviewing PRs and need to understand what broke
-   You want to include test coverage in documentation
-   CI/CD logs need to be readable for debugging
-   You're working with BDD-style test organization

## Example

![](/img/pytest-spec.gif)

Before and after - notice how the formatted output is easier to read at a glance.

## Getting started

Just install the plugin and run pytest. It works out of the box with no configuration:

```bash
pip install pytest-spec
pytest
```
