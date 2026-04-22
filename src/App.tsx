import { useState } from "react";
import { TeaPicker } from "./components/TeaPicker";
import { Timer } from "./components/Timer";
import { MateScreen } from "./components/MateScreen";
import type { Tea } from "./lib/teas";
import { primeAudio } from "./lib/sound";

export default function App() {
  const [selected, setSelected] = useState<Tea | null>(null);

  const back = () => setSelected(null);

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
