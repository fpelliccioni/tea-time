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
};

export default config;
