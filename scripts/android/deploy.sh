#!/usr/bin/env bash
# Builds, installs and launches the app on a connected Android device via ADB.
#
# Uso:
#   bash scripts/android/deploy.sh              # usa el primer dispositivo conectado
#   ANDROID_SERIAL=<serial> bash ...deploy.sh   # elige dispositivo específico
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

# shellcheck source=./env.sh
source "$ROOT/scripts/android/env.sh"

# Detectar dispositivos conectados
mapfile -t DEVICES < <(adb devices | awk 'NR>1 && $2=="device"{print $1}')
if [ ${#DEVICES[@]} -eq 0 ]; then
  echo "[deploy] ERROR: no hay dispositivos adb conectados." >&2
  echo "         Conectá por USB (con depuración USB habilitada) o por WiFi:" >&2
  echo "           adb connect <ip>:<puerto>" >&2
  exit 1
fi

if [ -n "${ANDROID_SERIAL:-}" ]; then
  SERIAL="$ANDROID_SERIAL"
else
  SERIAL="${DEVICES[0]}"
fi

ADB=(adb -s "$SERIAL")
echo "[deploy] Dispositivo: $SERIAL"

# Buildear + sincronizar + compilar APK via Gradle
echo "[deploy] Generando web assets..."
npm run build

echo "[deploy] Sincronizando con Capacitor..."
npx cap sync android

# Instalar usando gradle installDebug (maneja re-install + permisos)
echo "[deploy] Instalando en el dispositivo..."
cd "$ROOT/android"
ANDROID_SERIAL="$SERIAL" ./gradlew installDebug

# Lanzar la app
APP_ID=$(grep -oE 'appId:\s*"[^"]+"' "$ROOT/capacitor.config.ts" | head -1 | sed -E 's/.*"([^"]+)".*/\1/')
if [ -z "$APP_ID" ]; then
  APP_ID="com.yerbalabs.teatime"
fi
echo "[deploy] Lanzando $APP_ID..."
"${ADB[@]}" shell am start -n "$APP_ID/.MainActivity" >/dev/null

echo
echo "[deploy] ✔ Tea Time corriendo en $SERIAL"
