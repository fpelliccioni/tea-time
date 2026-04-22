import { useEffect, useRef, useState } from "react";
import type { Tea } from "../lib/teas";
import { playRelaxingChime, primeAudio } from "../lib/sound";
import { bumpUsage } from "../lib/storage";

type Props = {
  tea: Tea;
  onBack: () => void;
};

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
};

type Phase = "setup" | "running" | "done";

export function Timer({ tea, onBack }: Props) {
  const [total, setTotal] = useState(tea.seconds);
  const [remaining, setRemaining] = useState(tea.seconds);
  const [phase, setPhase] = useState<Phase>("setup");
  const endAt = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setTotal(tea.seconds);
    setRemaining(tea.seconds);
    setPhase("setup");
  }, [tea]);

  useEffect(() => {
    if (phase !== "running") return;

    const tick = () => {
      const now = Date.now();
      const left = Math.max(0, Math.round(((endAt.current ?? now) - now) / 1000));
      setRemaining(left);
      if (left <= 0) {
        setPhase("done");
        try {
          if ("vibrate" in navigator) navigator.vibrate([200, 120, 200, 120, 400]);
        } catch {
          /* noop */
        }
        playRelaxingChime();
        bumpUsage(tea.id);
        return;
      }
      raf.current = window.setTimeout(tick, 250);
    };
    raf.current = window.setTimeout(tick, 250);
    return () => {
      if (raf.current) window.clearTimeout(raf.current);
    };
  }, [phase, tea.id]);

  const adjust = (deltaSec: number) => {
    if (phase !== "setup") return;
    const next = Math.max(10, Math.min(60 * 30, total + deltaSec));
    setTotal(next);
    setRemaining(next);
  };

  const start = () => {
    primeAudio();
    endAt.current = Date.now() + total * 1000;
    setRemaining(total);
    setPhase("running");
  };

  const reset = () => {
    if (raf.current) window.clearTimeout(raf.current);
    setRemaining(total);
    setPhase("setup");
  };

  const progress = phase === "done" ? 1 : 1 - remaining / total;
  const displaySeconds = phase === "setup" ? total : remaining;

  return (
    <div className="flex flex-col min-h-full px-6 pt-3 pb-8">
      <header className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 px-3 rounded-full text-tea-200 hover:bg-tea-800/60 text-sm"
        >
          ← Volver
        </button>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-tea-400">
            {tea.tempC}°C
          </div>
          <div className="font-display text-sm text-tea-100">{tea.hint}</div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-5xl mb-2">{tea.emoji}</div>
          <div className="font-display text-3xl text-tea-50">{tea.name}</div>
        </div>

        <ProgressRing progress={progress} phase={phase}>
          <div className="text-center">
            <div className="font-display text-6xl tabular-nums text-tea-50">
              {fmt(displaySeconds)}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-tea-400 mt-1">
              {phase === "setup"
                ? "Listo para infusionar"
                : phase === "running"
                  ? "Infusionando..."
                  : "¡Tu té está listo!"}
            </div>
          </div>
        </ProgressRing>

        {phase === "done" && (
          <div className="fade-up text-center max-w-xs">
            <p className="font-display text-xl text-cream italic">
              Un momento para vos.
            </p>
            <p className="text-sm text-tea-300 mt-2">
              Respirá hondo y disfrutá tu {tea.name.toLowerCase()} 🌿
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        {phase === "setup" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              <AdjustBtn label="−30s" onClick={() => adjust(-30)} />
              <AdjustBtn label="−10s" onClick={() => adjust(-10)} />
              <AdjustBtn label="+10s" onClick={() => adjust(10)} />
              <AdjustBtn label="+30s" onClick={() => adjust(30)} />
            </div>
            <button
              onClick={start}
              className="w-full h-16 rounded-3xl bg-tea-400 hover:bg-tea-300 active:scale-[0.98] text-ink font-display text-2xl tracking-wide transition shadow-lg shadow-tea-900/40"
            >
              ¡TÉ!
            </button>
          </div>
        )}

        {phase === "running" && (
          <button
            onClick={reset}
            className="w-full h-14 rounded-3xl border border-tea-700/60 text-tea-100 hover:bg-tea-800/60 transition"
          >
            Cancelar
          </button>
        )}

        {phase === "done" && (
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 h-14 rounded-3xl border border-tea-700/60 text-tea-100 hover:bg-tea-800/60 transition"
            >
              De nuevo
            </button>
            <button
              onClick={onBack}
              className="flex-1 h-14 rounded-3xl bg-tea-400 hover:bg-tea-300 text-ink font-display text-lg transition"
            >
              Otro té
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdjustBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-11 flex-1 rounded-2xl bg-tea-900/60 border border-tea-700/40 text-tea-100 hover:bg-tea-800/60 text-sm tabular-nums transition"
    >
      {label}
    </button>
  );
}

function ProgressRing({
  progress,
  phase,
  children,
}: {
  progress: number;
  phase: Phase;
  children: React.ReactNode;
}) {
  const size = 260;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - progress);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {phase === "running" && (
        <div className="absolute inset-3 rounded-full bg-tea-400/20 pulse-ring" />
      )}
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={phase === "done" ? "#cbd9b8" : "#7fa263"}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={dash}
          style={{ transition: "stroke-dashoffset 0.3s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
