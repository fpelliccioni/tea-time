import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { I18nProvider } from "./i18n";
import { SplashScreen } from "@capacitor/splash-screen";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);

// Escondemos el splash nativo una vez montado React. Un pequeño delay mantiene
// el logo visible lo suficiente como para que se sienta deliberado, no un flash.
requestAnimationFrame(() => {
  setTimeout(() => {
    SplashScreen.hide({ fadeOutDuration: 280 }).catch(() => {
      /* no pasa nada en web */
    });
  }, 420);
});
