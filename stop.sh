#!/usr/bin/env bash
set -e

echo "🛑 Stopping Zero-Effort Apps..."

if command -v podman-compose &> /dev/null; then
    podman-compose down
elif command -v docker-compose &> /dev/null; then
    docker-compose down
elif docker compose version &> /dev/null; then
    docker compose down
else
    echo "⚠️ Neither podman-compose nor docker compose found."
fi

echo "✅ Apps stopped."
