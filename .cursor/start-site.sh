#!/usr/bin/env bash
# Serves the site on port 8000. Leaves an existing listener on that port running.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT=8000
LOG=/tmp/wss-site.log

listening() {
  python3 -c "import socket; socket.create_connection(('127.0.0.1', ${PORT}), 1).close()" >/dev/null 2>&1
}

if listening; then
  exit 0
fi

nohup python3 -m http.server "$PORT" --bind 0.0.0.0 --directory "$ROOT" >"$LOG" 2>&1 &
server_pid=$!

for _ in $(seq 1 25); do
  if listening; then
    exit 0
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    echo "site server exited before it accepted connections" >&2
    exit 1
  fi
  sleep 0.2
done

echo "site server did not become ready on port ${PORT}" >&2
exit 1
