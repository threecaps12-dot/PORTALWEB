"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-obsidian overflow-hidden md:aspect-video md:max-h-[85vh]">
      {/* Video 16:9 completo, sin recortar las gorras */}
      <div className="relative w-full aspect-video md:absolute md:inset-0 md:aspect-auto overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/banners/hero-collection.jpg"
          className="w-full h-full object-contain"
        >
          <source src="/banners/hero-video-v3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian to-transparent" />
      </div>
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-2 pb-10 md:absolute md:inset-0 md:pt-0 md:pb-16 flex flex-col justify-end">
        <span className="text-gold text-xs md:text-sm tracking-[0.2em] mb-3 animate-fade-up" style={{ animationDelay: "150ms", opacity: 0 }}>
          {t("hero.badge")}
        </span>
        <h1
          className="font-display text-cream text-4xl md:text-6xl leading-[0.95] max-w-xl mb-6 animate-fade-up"
          style={{ animationDelay: "280ms", opacity: 0 }}
        >
          {t("hero.title")}
        </h1>
        <Link
          href="/catalogo?cat=destacados"
          className="inline-block bg-crimson hover:bg-crimson-hover text-cream font-display text-lg tracking-wide px-8 py-3 w-fit transition-all hover:scale-[1.03] active:scale-95 animate-fade-up"
          style={{ animationDelay: "420ms", opacity: 0 }}
        >
          {t("hero.cta")}
        </Link>
      </div>
    </section>
  );
}
