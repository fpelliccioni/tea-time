#!/usr/bin/env bash
# Uninstall the app from a connected Android device.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

APP_ID=$(grep -oE 'appId:\s*"[^"]+"' "$ROOT/capacitor.config.ts" | head -1 | sed -E 's/.*"([^"]+)".*/\1/')
if [ -z "$APP_ID" ]; then
  APP_ID="com.yerbalabs.teatime"
fi

mapfile -t DEVICES < <(adb devices | awk 'NR>1 && $2=="device"{print $1}')
if [ ${#DEVICES[@]} -eq 0 ]; then
  echo "No hay dispositivos adb conectados." >&2
  exit 1
fi

SERIAL="${ANDROID_SERIAL:-${DEVICES[0]}}"
echo "Desinstalando $APP_ID de $SERIAL..."
adb -s "$SERIAL" uninstall "$APP_ID"
