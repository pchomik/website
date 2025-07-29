# Configuration

## Overview

pytest-spec provides extensive configuration options to customize the appearance and behavior of your test output. This guide explains what can be configured, how to set up configuration, and provides examples to help you get the most out of the plugin.

## What Can Be Configured

pytest-spec allows you to customize various aspects of the test output:

-   **Header formatting** - Control how test suite headers are displayed
-   **Test result formatting** - Customize how individual test results appear
-   **Status indicators** - Change the symbols used for passed, failed, and skipped tests
-   **Output filtering** - Ignore specific tests or plugins from the output
-   **Indentation** - Control the spacing and structure of the output

## Configuration Methods

You can configure pytest-spec using two main methods:

### 1. INI File Configuration

For pytest 4.6.x and later:

```ini
[pytest]
# your configuration options here
```

For legacy pytest:

```ini
[tool:pytest]
# your configuration options here
```

### 2. pyproject.toml Configuration

Modern Python projects can use pyproject.toml:

```toml
[tool.pytest.ini_options]
# your configuration options here
```

## Configuration Options

### Header Formatting

**Option:** `spec_header_format`

Configure the format of test headers using format strings:

```ini
[pytest]
spec_header_format = {module_path}:
```

```toml
[tool.pytest.ini_options]
spec_header_format = "{module_path}:"
```

**Available variables:**

-   `{module_path}` - Path to the test module
-   `{class_name}` - Name of the test class (if applicable)
-   `{test_case}` - Human-readable test case name

### Test Result Formatting

**Option:** `spec_test_format`

Customize how individual test results are displayed:

```ini
[pytest]
spec_test_format = {result} {name}
```

```toml
[tool.pytest.ini_options]
spec_test_format = "{result} {name}"
```

**Available variables:**

-   `{result}` - Status indicator (configured below)
-   `{name}` - Test name
-   `{docstring_summary}` - First line from test docstring (if available)

### Status Indicators

Configure the symbols used to indicate test results:

#### Success Indicator

**Option:** `spec_success_indicator`

```ini
[pytest]
spec_success_indicator = ✓
```

```toml
[tool.pytest.ini_options]
spec_success_indicator = "✓"
```

#### Failure Indicator

**Option:** `spec_failure_indicator`

```ini
[pytest]
spec_failure_indicator = ✗
```

```toml
[tool.pytest.ini_options]
spec_failure_indicator = "✗"
```

#### Skipped Indicator

**Option:** `spec_skipped_indicator`

```ini
[pytest]
spec_skipped_indicator = »
```

```toml
[tool.pytest.ini_options]
spec_skipped_indicator = "»"
```

### Output Filtering

**Option:** `spec_ignore`

Hide tests or output from specific plugins:

```ini
[pytest]
spec_ignore = FLAKE8,ISORT
```

```toml
[tool.pytest.ini_options]
spec_ignore = "FLAKE8,ISORT"
```

Any test containing the specified strings will be ignored in the output.

### Indentation

**Option:** `spec_indent`

Control the indentation used in the output:

```ini
[pytest]
spec_indent = "   "
```

```toml
[tool.pytest.ini_options]
spec_indent = "   "
```

## Complete Configuration Example

Here's a complete example configuration in pyproject.toml:

```toml
[tool.pytest.ini_options]
spec_header_format = "{module_path} - {class_name}:"
spec_test_format = "{result} {docstring_summary}"
spec_success_indicator = "✅"
spec_failure_indicator = "❌"
spec_skipped_indicator = "⏭️"
spec_ignore = "FLAKE8,ISORT"
spec_indent = "    "
```
