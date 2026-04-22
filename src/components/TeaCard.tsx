import type { Tea } from "../lib/teas";
import { useI18n } from "../i18n";
import { useFavorites } from "../hooks/useFavorites";

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
  const { t, teaName, teaHint } = useI18n();
  const { isFav, toggle } = useFavorites();
  const fav = isFav(tea.id);

  const mainRight = tea.noTimer
    ? tea.tempRange
      ? `${tea.tempRange[0]}–${tea.tempRange[1]}°C`
      : `${tea.tempC}°C`
    : fmtTime(tea.seconds);

  const subRight = tea.noTimer ? t.noTimer : `${tea.tempC}°C`;

  return (
    <div
      onClick={() => onPick(tea)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick(tea);
        }
      }}
      className="group relative w-full text-start bg-tea-900/60 hover:bg-tea-800/70 active:scale-[0.98] border border-tea-700/40 rounded-3xl p-4 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tea-700/50 text-2xl">
          {tea.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg text-tea-50 truncate">
            {teaName(tea.id)}
          </div>
          <div className="text-xs text-tea-300 truncate">{teaHint(tea.id)}</div>
        </div>
        <div className="text-end">
          <div className="font-display text-base text-tea-100 tabular-nums">
            {mainRight}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-tea-400">
            {subRight}
          </div>
        </div>
        <button
          type="button"
          aria-label={fav ? t.removeFavorite : t.addFavorite}
          aria-pressed={fav}
          onClick={(e) => {
            e.stopPropagation();
            toggle(tea.id);
          }}
          className={`shrink-0 ms-1 h-10 w-10 rounded-full flex items-center justify-center transition-all ${
            fav
              ? "text-rose-400 hover:text-rose-300"
              : "text-tea-500 hover:text-tea-200"
          } hover:bg-tea-800/60 active:scale-90`}
        >
          <HeartIcon filled={fav} />
        </button>
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
