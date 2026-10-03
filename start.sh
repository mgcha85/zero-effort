#!/usr/bin/env bash
set -e

APP_ENV=${APP_ENV:-dev}
ENV_FILE=".env.${APP_ENV}"

if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  $ENV_FILE not found! Falling back to .env.example"
    cp .env.example "$ENV_FILE"
fi

echo "🚀 Starting 3 Independent Zero-Effort Web Apps [ $APP_ENV ] using $ENV_FILE"

set -o allexport
source "$ENV_FILE"
set +o allexport

if command -v podman-compose &> /dev/null; then
    podman-compose --env-file "$ENV_FILE" up -d --build
elif command -v docker-compose &> /dev/null; then
    docker-compose --env-file "$ENV_FILE" up -d --build
elif docker compose version &> /dev/null; then
    docker compose --env-file "$ENV_FILE" up -d --build
else
    echo "❌ Neither podman-compose nor docker compose found!"
    exit 1
fi

echo "✅ All 3 independent web apps successfully started:"
echo "   - Cờ Caro Online (VN):         http://localhost:${CARO_PORT:-3001}"
echo "   - Global Size Converter (SEA): http://localhost:${SIZE_PORT:-3002}"
echo "   - Zero-Upload Image (KR):      http://localhost:${MEDIA_PORT:-3003}"
