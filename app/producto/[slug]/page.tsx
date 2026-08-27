"use client";

import { useState } from "react";
import Image from "next/image";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder — reemplazar por fetch a Supabase usando params.slug
// (products join product_images + product_variants por slug).
const PRODUCT = {
  name: "Gorra Three Caps Bordada",
  price: 42,
  compareAtPrice: 55,
  categoryLabel: "EDICIÓN LIMITADA",
  description:
    "Gorra negra con ilustración bordada estilo grafiti, tipografía \"LA\" en relieve y firma tipo tag. Forro interior en satín rojo. Pieza única inspirada en la cultura urbana de la calle.",
  imageUrl: "/products/gorra-three-caps.jpg",
  sizes: ["Única"],
  stockLeft: 6,
};

export default function ProductoPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-white">
          <Image src={PRODUCT.imageUrl} alt={PRODUCT.name} fill className="object-cover" />
        </div>

        <div>
          <span className="text-xs tracking-widest text-crimson">{PRODUCT.categoryLabel}</span>
          <h1 className="font-display text-3xl md:text-4xl text-obsidian mt-2 mb-4">
            {PRODUCT.name}
          </h1>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-semibold text-obsidian">${PRODUCT.price.toFixed(2)}</span>
            {PRODUCT.compareAtPrice && (
              <span className="text-obsidian/40 line-through">${PRODUCT.compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Escasez — neuromarketing */}
          <p className="text-crimson text-sm mb-6">
            Quedan {PRODUCT.stockLeft} unidades disponibles
          </p>

          <p className="text-obsidian/70 text-sm leading-relaxed mb-8">{PRODUCT.description}</p>

          <div className="mb-8">
            <h3 className="text-xs tracking-widest text-obsidian/50 mb-3">TALLA</h3>
            <div className="flex flex-wrap gap-2">
              {PRODUCT.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-sm px-4 py-2 border transition-colors ${
                    selectedSize === size
                      ? "border-crimson bg-crimson text-cream"
                      : "border-obsidian/20 text-obsidian/70 hover:border-obsidian"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedSize}
            className="w-full bg-obsidian text-cream text-sm tracking-wide py-4 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-crimson transition-colors"
          >
            AÑADIR AL CARRITO
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
