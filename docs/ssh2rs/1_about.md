# About

**ssh2rs** is an SSH2 client for Python, written in Rust. It runs commands on remote hosts with a sync or async API.

## Features

-   Sync client (`SSHClient`) and async client (`AsyncSSHClient`)
-   Run remote commands and get `stdout`, `stderr` and exit code (`rc`)
-   Upload and download files over SFTP
-   Password authentication, SSH agent and default key files
-   Host key verification through `known_hosts`
-   Context managers that disconnect automatically
-   Connect and exec timeouts in seconds
-   Typed errors (`SSHError` and subclasses)

## Sync example

```python
from ssh2rs import SSHClient

with SSHClient.connect("example.com", 22, timeout=5.0) as client:
    client.authenticate("user", "password")
    result = client.exec("uname -a", timeout=3.0)
    print(result.stdout, result.stderr, result.rc)
```

## Async example

```python
import asyncio

from ssh2rs import AsyncSSHClient


async def main():
    async with await AsyncSSHClient.connect("example.com", 22, timeout=5.0) as client:
        await client.authenticate("user", "password")
        result = await client.exec("uname -a", timeout=3.0)
        print(result.stdout, result.stderr, result.rc)


asyncio.run(main())
```
