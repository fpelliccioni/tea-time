#!/usr/bin/env bash
# Uninstall the app from a connected Android device.
set -euo pipefail

APP_ID="com.fpelliccioni.teatime"

mapfile -t DEVICES < <(adb devices | awk 'NR>1 && $2=="device"{print $1}')
if [ ${#DEVICES[@]} -eq 0 ]; then
  echo "No hay dispositivos adb conectados." >&2
  exit 1
fi

SERIAL="${ANDROID_SERIAL:-${DEVICES[0]}}"
echo "Desinstalando $APP_ID de $SERIAL..."
adb -s "$SERIAL" uninstall "$APP_ID"
