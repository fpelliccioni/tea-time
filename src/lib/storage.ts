// Persistencia local: contador de uso + favoritos.

const USAGE_KEY = "tea-time:usage:v1";
const FAV_KEY = "tea-time:favorites:v1";

type UsageMap = Record<string, number>;

const readUsage = (): UsageMap => {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UsageMap;
  } catch {
    return {};
  }
};

const writeUsage = (map: UsageMap) => {
  try {
    localStorage.setItem(USAGE_KEY, JSON.stringify(map));
  } catch {
    /* noop */
  }
};

export const getUsage = (): UsageMap => readUsage();

export const bumpUsage = (id: string) => {
  const map = readUsage();
  map[id] = (map[id] ?? 0) + 1;
  writeUsage(map);
};

const readFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed.filter((x) => typeof x === "string") as string[]) : [];
  } catch {
    return [];
  }
};

const writeFavorites = (ids: string[]) => {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
    // Disparar evento para que otros componentes en la misma pestaña se enteren
    // (el evento 'storage' solo se dispara entre pestañas distintas).
    window.dispatchEvent(new CustomEvent("tea-time:favorites"));
  } catch {
    /* noop */
  }
};

export const getFavorites = (): string[] => readFavorites();

export const isFavorite = (id: string): boolean => readFavorites().includes(id);

export const toggleFavorite = (id: string): boolean => {
  const current = readFavorites();
  const idx = current.indexOf(id);
  if (idx >= 0) {
    current.splice(idx, 1);
    writeFavorites(current);
    return false;
  }
  current.push(id);
  writeFavorites(current);
  return true;
};

export const FAVORITES_EVENT = "tea-time:favorites";
