#!/usr/bin/env bash
# Once, when the container is made: the dependencies and the browser the e2e tests run in.
set -euo pipefail
cd "$(dirname "$0")/.."

pnpm install --frozen-lockfile
# Chromium and the system libraries it needs (apt, through sudo), as .github/workflows/e2e.yml has them
pnpm exec playwright install --with-deps chromium
