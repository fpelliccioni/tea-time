import { useEffect, useState } from "react";
import { TeaPicker } from "./components/TeaPicker";
import { Timer } from "./components/Timer";
import { MateScreen } from "./components/MateScreen";
import type { Tea } from "./lib/teas";
import { primeAudio } from "./lib/sound";
import { App as CapApp } from "@capacitor/app";

export default function App() {
  const [selected, setSelected] = useState<Tea | null>(null);

  const back = () => setSelected(null);

  // Botón "back" nativo de Android: si estamos viendo un té, volvemos al
  // picker; si ya estamos en el picker, dejamos que Android cierre la app.
  useEffect(() => {
    const handle = CapApp.addListener("backButton", ({ canGoBack }) => {
      if (selected) {
        back();
      } else if (!canGoBack) {
        CapApp.exitApp();
      } else {
        window.history.back();
      }
    });
    return () => {
      handle.then((h) => h.remove());
    };
  }, [selected]);

  return (
    <main className="relative mx-auto max-w-md min-h-full bg-gradient-to-b from-tea-900/60 via-[#10120f] to-[#10120f]">
      {selected ? (
        selected.noTimer ? (
          <MateScreen tea={selected} onBack={back} />
        ) : (
          <Timer tea={selected} onBack={back} />
        )
      ) : (
        <TeaPicker
          onPick={(t) => {
            primeAudio();
            setSelected(t);
          }}
        />
      )}
    </main>
  );
}
