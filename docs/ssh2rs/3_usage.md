# Usage

## Authentication

`authenticate(username, password=None)` tries these methods in order and stops at the first success:

1. SSH agent keys (`SSH_AUTH_SOCK`).
2. Default key files in `~/.ssh`: `id_ed25519`, `id_ecdsa`, `id_rsa`. Keys with a passphrase are skipped.
3. Password, only if `password` is given.

If no method succeeds, `authenticate` raises `PasswordRequired` when `password` is `None`, otherwise `AuthenticationFailed`.

## Host key policy

Pass the policy as the `host_key_policy` argument of `connect`. The default is `HostKeyPolicy.Strict`.

| Policy                    | Unknown host           | Changed host key | Use case                      |
|---------------------------|------------------------|------------------|-------------------------------|
| `HostKeyPolicy.Strict`    | Rejected               | Rejected         | Default, production           |
| `HostKeyPolicy.AcceptNew` | Added to `known_hosts` | Rejected         | First connection to new hosts |
| `HostKeyPolicy.Disabled`  | Accepted               | Accepted         | Testing only, no MITM check   |

**Warning:** `HostKeyPolicy.Disabled` skips host key verification. Anyone on the network path can impersonate the server.

```python
from ssh2rs import HostKeyPolicy, SSHClient

client = SSHClient.connect("example.com", 22, host_key_policy=HostKeyPolicy.AcceptNew)
```

## Timeouts

Timeouts are in seconds (`float`). Pass `None` to disable one.

| Method    | Argument  | Default | Limits                        |
|-----------|-----------|---------|-------------------------------|
| `connect` | `timeout` | `30.0`  | TCP connect and SSH handshake |
| `exec`    | `timeout` | `None`  | Remote command execution      |

A timed-out call raises `ssh2rs.Timeout`.

```python
from ssh2rs import SSHClient, Timeout

with SSHClient.connect("example.com", 22, timeout=10.0) as client:
    client.authenticate("user", "password")
    try:
        client.exec("sleep 5", timeout=2.0)
    except Timeout:
        print("command timed out")
```

## Latest result

`latest_result` returns an `SSHResult` with the `stdout` and `stderr` of the last `exec` call. It also works after a timeout, so you can read the output collected before the timeout.

```python
from ssh2rs import SSHClient, Timeout

with SSHClient.connect("example.com", 22) as client:
    client.authenticate("user", "password")
    try:
        client.exec("sleep 5; echo done", timeout=2.0)
    except Timeout:
        print(client.latest_result.stdout)  # partial output before timeout
```

-   Each `exec` call resets the stored output. Before the first `exec`, both fields are empty strings.
-   `rc` is `None` when the command did not report an exit code, for example after a timeout.

## File transfer

`upload(src, dst, timeout=None)` copies a local file to the remote host. `download(src, dst, timeout=None)` copies a remote file to the local host. Both use SFTP.

-   `upload` creates or overwrites the remote file. `download` creates or overwrites the local file.
-   Both methods read the whole file into memory. Large files need matching RAM.

```python
from ssh2rs import SSHClient

with SSHClient.connect("example.com", 22, timeout=5.0) as client:
    client.authenticate("user", "password")
    client.upload("report.csv", "/tmp/report.csv", timeout=30.0)
    client.download("/etc/hostname", "hostname.txt", timeout=30.0)
```
