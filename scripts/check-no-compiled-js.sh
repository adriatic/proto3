#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Checking for compiled JS in src/ ..."

# Find .js files in src that look like tsc output
BAD_FILES=$(grep -R --include="*.js" -n \
  -e '"use strict";' \
  -e 'Object.defineProperty(exports' \
  -e 'exports\.__esModule' \
  src || true)

if [[ -n "$BAD_FILES" ]]; then
  echo ""
  echo "❌ Compiled JavaScript detected in src/ (this is forbidden):"
  echo ""
  echo "$BAD_FILES"
  echo ""
  echo "➡️  Fix: delete the .js files and ensure tsc outputs to dist/, not src/"
  exit 1
fi

echo "✅ No compiled JS found in src/"
