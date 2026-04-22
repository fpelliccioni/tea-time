import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fpelliccioni.teatime",
  appName: "Tea Time",
  webDir: "dist",
  backgroundColor: "#10120fff",
  android: {
    backgroundColor: "#10120fff",
  },
  ios: {
    contentInset: "always",
    backgroundColor: "#10120fff",
  },
  plugins: {
    SplashScreen: {
      // El splash se muestra durante el arranque nativo y lo ocultamos nosotros
      // desde JS apenas el primer render de React quedó listo, para que la
      // transición sea suave.
      launchShowDuration: 2000,
      launchAutoHide: false,
      backgroundColor: "#10120f",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
      useDialog: false,
    },
  },
};

export default config;
