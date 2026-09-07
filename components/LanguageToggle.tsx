"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="w-[62px] h-9 inline-block" aria-hidden="true" />;
  }

  return (
    <div className="h-9 px-1 flex items-center gap-0.5 rounded-full border border-obsidian/15 dark:border-cream/15">
      <button
        onClick={() => setLang("es")}
        aria-label={t("lang.toSpanish")}
        aria-pressed={lang === "es"}
        className={`px-2 py-1 rounded-full text-[10px] font-display tracking-wider transition-colors ${
          lang === "es"
            ? "bg-obsidian text-cream dark:bg-cream dark:text-obsidian"
            : "text-obsidian/40 dark:text-cream/40 hover:text-crimson"
        }`}
      >
        ESP
      </button>
      <button
        onClick={() => setLang("en")}
        aria-label={t("lang.toEnglish")}
        aria-pressed={lang === "en"}
        className={`px-2 py-1 rounded-full text-[10px] font-display tracking-wider transition-colors ${
          lang === "en"
            ? "bg-obsidian text-cream dark:bg-cream dark:text-obsidian"
            : "text-obsidian/40 dark:text-cream/40 hover:text-crimson"
        }`}
      >
        ENG
      </button>
    </div>
  );
}
