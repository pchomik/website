# Installation

ssh2rs requires Python 3.10 or newer. The package builds from source, so you need [uv](https://docs.astral.sh/uv/) and a [Rust toolchain](https://rustup.rs/).

## From source

```sh
git clone https://github.com/pchomik/ssh2rs
cd ssh2rs
uv sync
```

## For testing

```sh
cd ssh2rs
uv sync --extra test
source .env && uv run pytest -v
```

Tests need a reachable SSH server set in `.env`: `SSH2RS_TEST_HOST`, `SSH2RS_TEST_PORT`, `SSH2RS_TEST_USERNAME` and optional `SSH2RS_TEST_PASSWORD`.

## For development

```sh
cd ssh2rs
uv sync --all-extras
```

After you change the Rust code in `src/`, rebuild the package:

```sh
uv sync --reinstall-package ssh2rs
```
