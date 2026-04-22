export type Tea = {
  id: string;
  seconds: number;
  tempC: number;
  emoji: string;
  popularity: number;
  // Casos especiales sin cuenta regresiva (ej. mate cebado: solo importa la
  // temperatura del agua).
  noTimer?: boolean;
  tempRange?: [number, number];
};

// Tiempos recomendados de infusión y temperaturas. Los nombres y
// descripciones viven en `src/i18n/messages.ts`, indexados por `id`.
export const TEAS: Tea[] = [
  {
    id: "mate",
    seconds: 0,
    tempC: 75,
    tempRange: [70, 80],
    emoji: "🧉",
    popularity: 110,
    noTimer: true,
  },
  { id: "negro", seconds: 180, tempC: 95, emoji: "🫖", popularity: 100 },
  { id: "verde", seconds: 150, tempC: 80, emoji: "🍵", popularity: 95 },
  { id: "manzanilla", seconds: 300, tempC: 95, emoji: "🌼", popularity: 92 },
  { id: "mate-cocido", seconds: 240, tempC: 80, emoji: "🍵", popularity: 90 },
  { id: "earl-grey", seconds: 240, tempC: 95, emoji: "🌸", popularity: 85 },
  { id: "rooibos", seconds: 360, tempC: 100, emoji: "🌿", popularity: 78 },
  { id: "blanco", seconds: 240, tempC: 80, emoji: "🤍", popularity: 72 },
  { id: "oolong", seconds: 180, tempC: 90, emoji: "🍃", popularity: 70 },
  { id: "chai", seconds: 300, tempC: 100, emoji: "🌶️", popularity: 68 },
  { id: "jazmin", seconds: 180, tempC: 80, emoji: "💮", popularity: 65 },
  { id: "menta", seconds: 300, tempC: 100, emoji: "🌱", popularity: 62 },
  { id: "matcha", seconds: 30, tempC: 75, emoji: "🍵", popularity: 60 },
  { id: "english-breakfast", seconds: 240, tempC: 95, emoji: "☕", popularity: 58 },
  { id: "pu-erh", seconds: 240, tempC: 95, emoji: "🪵", popularity: 55 },
  { id: "hibisco", seconds: 300, tempC: 100, emoji: "🌺", popularity: 50 },
  { id: "tilo", seconds: 300, tempC: 95, emoji: "🌳", popularity: 48 },
  { id: "jengibre", seconds: 420, tempC: 100, emoji: "🫚", popularity: 45 },
  { id: "boldo", seconds: 300, tempC: 100, emoji: "🍂", popularity: 40 },
];

export const getTeaById = (id: string) => TEAS.find((t) => t.id === id);
