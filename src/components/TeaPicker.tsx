import { useMemo, useState } from "react";
import { TEAS, type Tea } from "../lib/teas";
import { getUsage } from "../lib/storage";
import { TeaCard } from "./TeaCard";
import { TeaLogo } from "./TeaLogo";

type Props = { onPick: (tea: Tea) => void };

export function TeaPicker({ onPick }: Props) {
  const [query, setQuery] = useState("");

  const ordered = useMemo(() => {
    const usage = getUsage();
    // Orden: uso del usuario (dominante) + popularidad base.
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
    return ordered.filter((t) => t.name.toLowerCase().includes(q));
  }, [ordered, query]);

  const popular = filtered.slice(0, 4);
  const rest = filtered.slice(4);

  return (
    <div className="flex flex-col min-h-full px-5 pt-5 pb-8">
      <header className="flex items-center gap-3 mb-5 px-1">
        <TeaLogo size={44} />
        <div>
          <h1 className="font-display text-2xl text-tea-50 leading-none">
            Tea Time
          </h1>
          <p className="text-xs text-tea-300 mt-1">
            Elegí tu té y ¡dejá que la hoja haga magia!
          </p>
        </div>
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar té..."
          className="w-full h-12 rounded-2xl bg-tea-900/60 border border-tea-700/40 px-4 text-tea-50 placeholder:text-tea-400 focus:outline-none focus:border-tea-400 transition"
        />
      </div>

      {!query && popular.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-tea-400 mb-2 px-1">
            Más comunes
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {popular.map((t) => (
              <TeaCard key={t.id} tea={t} onPick={onPick} />
            ))}
          </div>
        </section>
      )}

      <section>
        {!query && (
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-tea-400 mb-2 px-1">
            Todos los tés
          </h2>
        )}
        <div className="grid grid-cols-1 gap-2">
          {(query ? filtered : rest).map((t) => (
            <TeaCard key={t.id} tea={t} onPick={onPick} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-tea-400 py-10">Nada por acá.</p>
        )}
      </section>

      <footer className="mt-8 text-center text-[11px] text-tea-500">
        Hecho con cariño, una hoja a la vez.
      </footer>
    </div>
  );
}
