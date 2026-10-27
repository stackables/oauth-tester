#!/usr/bin/env bash
# The box step (customizations.box.up): `pnpm dev`, the pages and the Worker with hot reload, started in the
# background, as the box waits for this script to end. Run again, it restarts it.
#
# Vite listens on 0.0.0.0:5173, the only port the box opens to the outside, so OrbStack serves it at the box's site
# (https://box-<name>.orb.local).
set -euo pipefail
cd "$(dirname "$0")/.."

logs=/tmp/oauth-tester-dev
mkdir -p "$logs"

# The server is the leader of a process group of its own (setsid), whose id is in dev.pid: killing the group stops
# pnpm and what it started.
if [[ -f $logs/dev.pid ]]; then
    kill -- "-$(cat "$logs/dev.pid")" 2>/dev/null || true
    rm -f "$logs/dev.pid"
fi

# The branch may have changed the dependencies since the last up
pnpm install --frozen-lockfile

setsid pnpm dev --host 0.0.0.0 --strictPort >"$logs/dev.log" 2>&1 </dev/null &
echo $! >"$logs/dev.pid"

for _ in $(seq 60); do
    if curl -sf -o /dev/null http://localhost:5173/; then
        echo "Dev server up on port 5173 (log: $logs/dev.log)"
        exit 0
    fi
    sleep 1
done
echo "Dev server did not come up in 60s" >&2
tail -n 50 "$logs/dev.log" >&2
exit 1
