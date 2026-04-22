import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.yerbalabs.teatime",
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
      // Android 12+ cierra su splash nativo en ~500ms. El nuestro se muestra
      // arriba durante 1800ms con fade, para que sea claramente visible.
      launchShowDuration: 1800,
      launchFadeOutDuration: 280,
      launchAutoHide: true,
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
