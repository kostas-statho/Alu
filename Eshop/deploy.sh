#!/bin/bash
# ─── Surge Deploy — Eshop Discovery Questionnaire ────────────────────────────
# Site: https://alu-questionnaire.surge.sh
# Run from project root: bash deploy.sh

set -e

export PATH="$HOME/local/node-v22.14.0-linux-x64/bin:$PATH"

SRC="01_discovery/questionnaire_client-discovery_v1.html"
TMP_DIR="/tmp/surge-deploy"
DOMAIN="alu-questionnaire.surge.sh"

echo "▶ Preparing deploy..."
mkdir -p "$TMP_DIR"
cp "$SRC" "$TMP_DIR/index.html"

echo "▶ Uploading to Surge..."
surge "$TMP_DIR" "$DOMAIN"

# Cleanup
rm -rf "$TMP_DIR"
