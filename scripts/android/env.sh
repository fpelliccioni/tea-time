#!/usr/bin/env bash
# Source me: `source scripts/android/env.sh`
#
# Garantiza un toolchain funcional para buildear la app Android.
# Especialmente pensado para NixOS, donde el Android SDK por defecto vive en
# /nix/store (read-only) y AGP necesita un SDK escribible para bajar build-tools.

set -eu

# ---- 1. JAVA_HOME (JDK 21 requerido por AGP 8.13) ----
if ! command -v java >/dev/null 2>&1 \
   || ! java -version 2>&1 | grep -qE 'version "(21|22|23|24|25)'; then
  CANDIDATE=""
  for d in /nix/store/*-openjdk-21*; do
    [ -d "$d" ] || continue
    case "$d" in
      *.drv|*/*-jre|*headless*|*minimal*) continue ;;
    esac
    [ -x "$d/bin/java" ] && CANDIDATE="$d" && break
  done
  if [ -n "$CANDIDATE" ]; then
    export JAVA_HOME="$CANDIDATE"
    export PATH="$JAVA_HOME/bin:$PATH"
    echo "[env] JAVA_HOME=$JAVA_HOME"
  else
    echo "[env] ERROR: no JDK 21 encontrado." >&2
    echo "      Instalá con: nix-env -iA nixpkgs.jdk21" >&2
    return 1 2>/dev/null || exit 1
  fi
fi

# ---- 2. Android SDK escribible ----
# Si el SDK está en /nix/store, lo mirroreamos a $HOME/Android/sdk con symlinks
# para que AGP pueda bajar y registrar nuevos build-tools sin tocar el store.
if [ -n "${ANDROID_HOME:-}" ] && [ "${ANDROID_HOME#/nix/store/}" != "$ANDROID_HOME" ]; then
  MIRROR="$HOME/Android/sdk"
  if [ ! -L "$MIRROR/platform-tools" ] \
     || [ "$(readlink "$MIRROR/platform-tools")" != "$ANDROID_HOME/platform-tools" ]; then
    echo "[env] Mirroreando Android SDK a $MIRROR..."
    rm -rf "$MIRROR"
    mkdir -p "$MIRROR"
    for item in "$ANDROID_HOME"/*; do
      [ -e "$item" ] || continue
      name=$(basename "$item")
      if [ -d "$item" ]; then
        mkdir -p "$MIRROR/$name"
        for sub in "$item"/*; do
          [ -e "$sub" ] && ln -sf "$sub" "$MIRROR/$name/$(basename "$sub")"
        done
      else
        ln -sf "$item" "$MIRROR/$name"
      fi
    done
  fi
  export ANDROID_HOME="$MIRROR"
  export ANDROID_SDK_ROOT="$MIRROR"
  echo "[env] ANDROID_HOME=$ANDROID_HOME"
fi
