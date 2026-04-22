import { LANGS, LANG_FLAGS, LANG_LABELS, useI18n } from "../i18n";
import type { Lang } from "../i18n";

export function LanguageSelect() {
  const { lang, setLang, t } = useI18n();

  return (
    <label className="relative flex items-center gap-1 rounded-full bg-tea-900/60 border border-tea-700/40 px-2.5 py-1.5">
      <span className="text-base leading-none" aria-hidden>
        {LANG_FLAGS[lang]}
      </span>
      <select
        aria-label={t.language}
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="appearance-none bg-transparent text-xs text-tea-100 pr-4 focus:outline-none cursor-pointer"
      >
        {LANGS.map((l) => (
          <option key={l} value={l} className="bg-tea-900 text-tea-50">
            {LANG_LABELS[l]}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-tea-300"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
