# Tea Time 🍵

Un timer de té relajante para Android e iOS. Elegí tu té, ajustá el tiempo si querés, y al terminar una campana suave te avisa para disfrutar el momento.

## Stack

- **Vite 8** + **React 19** + **TypeScript** — base web moderna y rápida.
- **Tailwind CSS v4** (vía `@tailwindcss/vite`) — estilos utilitarios.
- **Capacitor 8** — empaquetado nativo para **Android** e **iOS**.
- **Web Audio API** — campana tipo singing bowl generada en vivo, sin assets binarios.
- **LocalStorage** — base local para recordar los tés más usados y subirlos arriba.

## Funcionalidad

- **Selección de té**: catálogo con ~18 tipos (negro, verde, manzanilla, mate cocido, earl grey, rooibos, blanco, oolong, chai, jazmín, menta, pu-erh, matcha, english breakfast, hibisco, tilo, jengibre, boldo). Los 4 más comunes arriba, con orden dinámico según lo que más infusionás vos.
- **Buscador** rápido por nombre.
- **Timer** con tiempo recomendado precargado, ajustable a ±10/30 segundos antes de arrancar.
- **Botón TÉ** (grande, obvio, rico) para iniciar.
- **Anillo de progreso** y cuenta regresiva en vivo.
- **Fin**: campana suave (Web Audio) + vibración corta + mensaje cálido para que disfrutes.

## Scripts

```bash
npm install             # dependencias
npm run dev             # servidor de desarrollo web
npm run dev:lan         # dev server expuesto a la LAN
npm run build           # build de producción a dist/
npx cap sync            # copiar dist/ a las plataformas nativas

# Android (vía ADB)
npm run android:build      # genera el APK debug
npm run android:deploy     # build + install + launch en el dispositivo ADB
npm run android:uninstall  # remueve la app del dispositivo
```

### Notas para NixOS

Los scripts de Android (`scripts/android/env.sh`) detectan NixOS automáticamente y:

- Buscan un JDK 21 en `/nix/store` (requerido por AGP 8.13) y setean `JAVA_HOME`.
- Como el Android SDK de Nix es read-only (`/nix/store/...`), espejan el SDK a `~/Android/sdk` con symlinks para que AGP pueda bajar e instalar build-tools nuevos.

Para usarlo, basta con tener el SDK de Nix instalado y `ANDROID_HOME` apuntando ahí (típico via `programs.android.enable = true` o un shell.nix con `androidenv.composeAndroidPackages`).

## Regenerar íconos

Los íconos y splash se generan con `@capacitor/assets` a partir de los SVG en `resources/`:

```bash
npx @capacitor/assets generate
```

## Estructura

```
src/
  App.tsx                # orquesta picker ↔ timer
  components/
    TeaPicker.tsx        # lista + búsqueda + populares
    TeaCard.tsx          # item de la lista
    Timer.tsx            # pantalla del timer + estados
    TeaLogo.tsx          # logo interno en SVG
  lib/
    teas.ts              # "base de datos" local de tés
    sound.ts             # campana relajante con Web Audio API
    storage.ts           # conteo de uso local
resources/               # SVG fuente para generar íconos/splash
capacitor.config.ts
```

## Licencia

MIT
