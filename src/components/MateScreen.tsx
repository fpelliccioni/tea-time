import type { Tea } from "../lib/teas";
import { bumpUsage } from "../lib/storage";
import { useEffect, useMemo } from "react";
import { useI18n } from "../i18n";

type Props = {
  tea: Tea;
  onBack: () => void;
};

export function MateScreen({ tea, onBack }: Props) {
  const { t, teaName } = useI18n();

  useEffect(() => {
    bumpUsage(tea.id);
  }, [tea.id]);

  const tip = useMemo(
    () => t.mateTips[Math.floor(Math.random() * t.mateTips.length)],
    [t.mateTips],
  );

  const [low, high] = tea.tempRange ?? [tea.tempC - 5, tea.tempC + 5];

  return (
    <div className="flex flex-col min-h-full px-6 pt-3 pb-8">
      <header className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 px-3 rounded-full text-tea-200 hover:bg-tea-800/60 text-sm"
        >
          ← {t.back}
        </button>
        <div className="text-end">
          <div className="text-xs uppercase tracking-widest text-tea-400">
            {t.mateHeritage}
          </div>
          <div className="font-display text-sm text-tea-100">{t.noTimer}</div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 fade-up">
        <div className="text-center">
          <div className="text-7xl mb-3">{tea.emoji}</div>
          <div className="font-display text-4xl text-tea-50">
            {teaName(tea.id)}
          </div>
          <div className="text-sm text-tea-300 mt-2">{t.mateHero}</div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 rounded-full bg-tea-400/15 pulse-ring" />
          <div className="relative h-56 w-56 rounded-full border-2 border-tea-400/40 bg-tea-900/50 flex flex-col items-center justify-center">
            <div className="text-[11px] uppercase tracking-[0.25em] text-tea-400">
              {t.mateTempLabel}
            </div>
            <div className="font-display text-6xl tabular-nums text-tea-50 mt-1">
              {low}–{high}
              <span className="text-3xl align-top">°C</span>
            </div>
            <div className="text-xs text-tea-300 mt-1">{t.mateNeverBoil}</div>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-3xl bg-tea-900/60 border border-tea-700/40 px-5 py-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-tea-400 mb-1">
            {t.mateTipLabel}
          </div>
          <p className="font-display text-lg text-cream italic leading-snug">
            “{tip}”
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onBack}
          className="w-full h-16 rounded-3xl bg-tea-400 hover:bg-tea-300 active:scale-[0.98] text-ink font-display text-2xl tracking-wide transition shadow-lg shadow-tea-900/40"
        >
          {t.mateCta}
        </button>
      </div>
    </div>
  );
}
