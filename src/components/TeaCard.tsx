import type { Tea } from "../lib/teas";

type Props = {
  tea: Tea;
  onPick: (tea: Tea) => void;
};

const fmtTime = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r === 0 ? `${m} min` : `${m}:${String(r).padStart(2, "0")}`;
};

export function TeaCard({ tea, onPick }: Props) {
  return (
    <button
      onClick={() => onPick(tea)}
      className="group relative w-full text-left bg-tea-900/60 hover:bg-tea-800/70 active:scale-[0.98] border border-tea-700/40 rounded-3xl p-4 transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tea-700/50 text-2xl">
          {tea.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg text-tea-50 truncate">
            {tea.name}
          </div>
          <div className="text-xs text-tea-300 truncate">{tea.hint}</div>
        </div>
        <div className="text-right">
          <div className="font-display text-base text-tea-100 tabular-nums">
            {fmtTime(tea.seconds)}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-tea-400">
            {tea.tempC}°C
          </div>
        </div>
      </div>
    </button>
  );
}
