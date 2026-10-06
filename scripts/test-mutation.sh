#!/usr/bin/env bash
set -euo pipefail

# Stryker incremental cache management.
# Decompresses stryker-incremental.json.gz before running Stryker,
# then recompresses after (on any exit).

CACHE_GZ="src/__tests__/mutation/stryker-incremental.json.gz"
CACHE_JSON="src/__tests__/mutation/stryker-incremental.json"

# Decompress the incremental cache so Stryker can read it.
if [ -f "$CACHE_GZ" ]; then
  gunzip -kf "$CACHE_GZ"
fi

# Re-compress on any exit (success or failure).
# gzip -n omits the mtime header so the .gz is deterministic for identical content.
cleanup() {
  if [ -f "$CACHE_JSON" ]; then
    gzip -fn "$CACHE_JSON"
  fi
  rm -f "$CACHE_JSON"
}
trap cleanup EXIT

# Run Stryker. Exit code propagates via set -e.
npx stryker run stryker.config.json
