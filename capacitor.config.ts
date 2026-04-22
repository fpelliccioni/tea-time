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
      // Android 12+ cierra su splash nativo en ~400ms. El nuestro se muestra
      // arriba durante 2200ms con fade, para que sea claramente visible.
      launchShowDuration: 2200,
      launchFadeOutDuration: 320,
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
