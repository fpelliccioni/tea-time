import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANGS,
  MESSAGES,
  RTL_LANGS,
  type Lang,
  type Messages,
} from "./messages";

export {
  LANGS,
  LANG_LABELS,
  LANG_FLAGS,
  RTL_LANGS,
  type Lang,
} from "./messages";

const STORAGE_KEY = "tea-time:lang:v1";

const isLang = (x: unknown): x is Lang =>
  typeof x === "string" && (LANGS as readonly string[]).includes(x);

const detectLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* noop */
  }
  const candidates = [...(navigator.languages ?? []), navigator.language ?? ""];
  for (const c of candidates) {
    const short = c.slice(0, 2).toLowerCase();
    if (isLang(short)) return short;
  }
  return "es";
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Messages;
  teaName: (id: string) => string;
  teaHint: (id: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => detectLang());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* noop */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const t = MESSAGES[lang];
    return {
      lang,
      setLang,
      t,
      teaName: (id) => t.teas[id]?.name ?? MESSAGES.es.teas[id]?.name ?? id,
      teaHint: (id) => t.teas[id]?.hint ?? MESSAGES.es.teas[id]?.hint ?? "",
    };
  }, [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => {
  const c = useContext(I18nCtx);
  if (!c) throw new Error("I18nProvider missing");
  return c;
};
