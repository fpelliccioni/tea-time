// Almacena cuántas veces el usuario preparó cada té para poder reordenar
// los más comunes arriba.

const KEY = "tea-time:usage:v1";

type UsageMap = Record<string, number>;

const read = (): UsageMap => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UsageMap;
  } catch {
    return {};
  }
};

const write = (map: UsageMap) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* noop */
  }
};

export const getUsage = (): UsageMap => read();

export const bumpUsage = (id: string) => {
  const map = read();
  map[id] = (map[id] ?? 0) + 1;
  write(map);
};
