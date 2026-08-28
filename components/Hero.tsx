import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[420px] bg-obsidian overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/banners/hero-collection.jpg"
          alt="Colección Three Caps"
          fill
          priority
          className="object-cover opacity-80 animate-kenburns"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent" />

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-end pb-16">
        <span className="text-gold text-xs md:text-sm tracking-[0.2em] mb-3 animate-fade-up" style={{ animationDelay: "150ms", opacity: 0 }}>
          EDICIÓN LIMITADA — QUEDAN POCAS UNIDADES
        </span>
        <h1
          className="font-display text-cream text-4xl md:text-6xl leading-[0.95] max-w-xl mb-6 animate-fade-up"
          style={{ animationDelay: "280ms", opacity: 0 }}
        >
          La colección que se agota primero.
        </h1>
        <Link
          href="/catalogo?cat=destacados"
          className="inline-block bg-crimson hover:bg-crimson-hover text-cream text-sm tracking-wide px-8 py-3 w-fit transition-all hover:scale-[1.03] active:scale-95 animate-fade-up"
          style={{ animationDelay: "420ms", opacity: 0 }}
        >
          COMPRAR AHORA
        </Link>
      </div>
    </section>
  );
}
