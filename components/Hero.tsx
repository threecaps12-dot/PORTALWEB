import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[420px] bg-obsidian overflow-hidden">
      {/* Imagen de producto a toda altura — reemplazar con foto real del catálogo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/hero-collection.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-end pb-16">
        <span className="text-gold text-xs md:text-sm tracking-[0.2em] mb-3">
          EDICIÓN LIMITADA — QUEDAN POCAS UNIDADES
        </span>
        <h1 className="font-display text-cream text-4xl md:text-6xl leading-[0.95] max-w-xl mb-6">
          La colección que se agota primero.
        </h1>
        <Link
          href="/catalogo?cat=destacados"
          className="inline-block bg-crimson hover:bg-crimson-hover text-cream text-sm tracking-wide px-8 py-3 w-fit transition-colors"
        >
          COMPRAR AHORA
        </Link>
      </div>
    </section>
  );
}
