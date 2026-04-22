#!/usr/bin/env bash
# Builds the debug APK. Prints the resulting APK path on stdout.
#
# Uso: bash scripts/android/build.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

# shellcheck source=./env.sh
source "$ROOT/scripts/android/env.sh"

echo "[build] Generando web assets..."
npm run build

echo "[build] Sincronizando con Capacitor..."
npx cap sync android

echo "[build] Compilando APK debug..."
cd "$ROOT/android"
./gradlew assembleDebug

APK="$ROOT/android/app/build/outputs/apk/debug/app-debug.apk"
if [ ! -f "$APK" ]; then
  echo "[build] ERROR: no se encontró el APK en $APK" >&2
  exit 1
fi

echo
echo "[build] APK listo: $APK"
