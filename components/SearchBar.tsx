"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export default function SearchBar() {
  const { t } = useLanguage();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/catalogo?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  if (open) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => !query && setOpen(false)}
          placeholder={t("nav.searchPlaceholder")}
          className="w-32 sm:w-48 bg-transparent border-b border-obsidian/40 dark:border-cream/40 text-obsidian dark:text-cream text-sm px-1 py-1 focus:outline-none focus:border-crimson"
        />
        <button type="submit" aria-label={t("nav.search")} className="hover:text-crimson transition-colors">
          <SearchIcon />
        </button>
      </form>
    );
  }

  return (
    <button aria-label={t("nav.search")} onClick={() => setOpen(true)} className="hover:text-crimson transition-colors">
      <SearchIcon />
    </button>
  );
}
