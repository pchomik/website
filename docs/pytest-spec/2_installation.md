# Installation

## From PyPI (Recommended)

The easiest way to install the plugin is to use pip command:

```bash
pip install pytest-spec
```

## From Source

### Prerequisites

-   [git](https://git-scm.com/) for cloning the repository
-   [uv](https://docs.astral.sh/uv/) - A fast Python package and project manager

**What is uv?**
uv is an extremely fast Python package and project manager, written in Rust. It combines the best features of pip, virtualenv, and other Python packaging tools into a single, efficient tool. uv significantly speeds up Python package installation and management, making it ideal for both development and production environments.

### Installation Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/pchomik/pytest-spec.git
    cd pytest-spec
    ```

2. **Install dependencies:**
    ```bash
    uv sync
    ```

### For Development and Testing

To install with all development and testing dependencies:

```bash
uv sync --all-extras --dev
```

### To Build the Package

To build the package after installation:

```bash
uv build
```
