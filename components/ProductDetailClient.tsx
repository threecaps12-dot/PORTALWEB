"use client";

import { useState } from "react";
import Image from "next/image";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ProductDetail = {
  name: string;
  price: number;
  compareAtPrice?: number;
  categoryLabel?: string;
  description: string;
  imageUrl: string;
  sizes: string[];
  stockLeft: number;
};

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-white dark:bg-obsidian-soft">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        </div>

        <div>
          {product.categoryLabel && (
            <span className="text-xs tracking-widest text-crimson">{product.categoryLabel}</span>
          )}
          <h1 className="font-display text-3xl md:text-4xl text-obsidian dark:text-cream mt-2 mb-4">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-semibold text-obsidian dark:text-cream">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-obsidian/40 dark:text-cream/40 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.stockLeft > 0 && product.stockLeft <= 10 && (
            <p className="text-crimson text-sm mb-6">
              Quedan {product.stockLeft} unidades disponibles
            </p>
          )}

          <p className="text-obsidian/70 dark:text-cream/70 text-sm leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-xs tracking-widest text-obsidian/50 dark:text-cream/50 mb-3">TALLA</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-sm px-4 py-2 border transition-colors ${
                    selectedSize === size
                      ? "border-crimson bg-crimson text-cream"
                      : "border-obsidian/20 dark:border-cream/20 text-obsidian/70 dark:text-cream/70 hover:border-obsidian dark:hover:border-cream"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedSize || product.stockLeft === 0}
            className="w-full bg-obsidian text-cream text-sm tracking-wide py-4 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-crimson transition-colors"
          >
            {product.stockLeft === 0 ? "AGOTADO" : "AÑADIR AL CARRITO"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
