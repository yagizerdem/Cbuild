#!/usr/bin/env bash
# Generates the Python3 parser from cbuild.g4 into cbuild_parser/
set -euo pipefail

ANTLR_VERSION="4.13.2"   # must match the antlr4-python3-runtime version
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRAMMAR="cbuild.g4"
OUT_DIR="cbuild_parser"

cd "$ROOT"

# Look for antlr4 in the project venv first (Windows: Scripts, Unix: bin)
if [[ -x "venv/Scripts/antlr4.exe" ]]; then
    ANTLR="venv/Scripts/antlr4.exe"
elif [[ -x "venv/bin/antlr4" ]]; then
    ANTLR="venv/bin/antlr4"
elif command -v antlr4 >/dev/null 2>&1; then
    ANTLR="antlr4"
else
    echo "antlr4 not found. Setup: pip install antlr4-tools antlr4-python3-runtime==$ANTLR_VERSION" >&2
    exit 1
fi

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

"$ANTLR" -v "$ANTLR_VERSION" -Dlanguage=Python3 -visitor -o "$OUT_DIR" -Xexact-output-dir "$GRAMMAR"

touch "$OUT_DIR/__init__.py"

echo "Parser generated: $OUT_DIR/"
ls "$OUT_DIR"
