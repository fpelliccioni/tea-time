import { useMemo, useState } from "react";
import { TEAS, type Tea } from "../lib/teas";
import { getUsage } from "../lib/storage";
import { TeaCard } from "./TeaCard";
import { TeaLogo } from "./TeaLogo";
import { LanguageSelect } from "./LanguageSelect";
import { useI18n } from "../i18n";
import { useFavorites } from "../hooks/useFavorites";

type Props = { onPick: (tea: Tea) => void };

export function TeaPicker({ onPick }: Props) {
  const { t, teaName } = useI18n();
  const { favs } = useFavorites();
  const [query, setQuery] = useState("");

  const ordered = useMemo(() => {
    const usage = getUsage();
    return [...TEAS].sort((a, b) => {
      const ua = usage[a.id] ?? 0;
      const ub = usage[b.id] ?? 0;
      const scoreA = ua * 1000 + a.popularity;
      const scoreB = ub * 1000 + b.popularity;
      return scoreB - scoreA;
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ordered;
    return ordered.filter((tea) => teaName(tea.id).toLowerCase().includes(q));
  }, [ordered, query, teaName]);

  const favSet = useMemo(() => new Set(favs), [favs]);
  const favoriteTeas = useMemo(
    () => filtered.filter((tea) => favSet.has(tea.id)),
    [filtered, favSet],
  );
  const nonFavorites = useMemo(
    () => filtered.filter((tea) => !favSet.has(tea.id)),
    [filtered, favSet],
  );

  const popular = !query ? nonFavorites.slice(0, 4) : [];
  const rest = !query ? nonFavorites.slice(4) : nonFavorites;

  return (
    <div className="flex flex-col min-h-full px-5 pt-5 pb-8">
      <header className="flex items-start gap-3 mb-5 px-1">
        <TeaLogo size={44} />
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl text-tea-50 leading-none">
            Tea Time <span className="text-sm align-top">🇦🇷</span>
          </h1>
          <p className="text-xs text-tea-300 mt-1">{t.appSubtitle}</p>
        </div>
        <LanguageSelect />
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search}
          className="w-full h-12 rounded-2xl bg-tea-900/60 border border-tea-700/40 px-4 text-tea-50 placeholder:text-tea-400 focus:outline-none focus:border-tea-400 transition"
        />
      </div>

      {favoriteTeas.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-rose-300/80 mb-2 px-1 flex items-center gap-1.5">
            <span aria-hidden>♥</span>
            {t.favorites}
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {favoriteTeas.map((tea) => (
              <TeaCard key={tea.id} tea={tea} onPick={onPick} />
            ))}
          </div>
        </section>
      )}

      {!query && popular.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-tea-400 mb-2 px-1">
            {t.popular}
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {popular.map((tea) => (
              <TeaCard key={tea.id} tea={tea} onPick={onPick} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          {!query && (
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-tea-400 mb-2 px-1">
              {t.allTeas}
            </h2>
          )}
          <div className="grid grid-cols-1 gap-2">
            {rest.map((tea) => (
              <TeaCard key={tea.id} tea={tea} onPick={onPick} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-tea-400 py-10">{t.empty}</p>
      )}

      <footer className="mt-8 text-center text-[11px] text-tea-500">
        {t.footer}
      </footer>
    </div>
  );
}
