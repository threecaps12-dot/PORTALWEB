"use client";

import { useState } from "react";
import Image from "next/image";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  categoryLabel?: string;
  collectionSlug?: string;
  imageUrl: string;
  sizes: string[];
  hasRealPhoto?: boolean; // false = mostrar ícono de referencia en vez de foto
};

/** Ícono de línea simple por tipo de producto, usado mientras no hay foto real. */
function PlaceholderIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("hoodie")) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="#0D0D0D" strokeWidth="2.5" className="w-[42%] h-[42%]">
        <path d="M30 20 L20 30 L28 40 L32 35 L32 85 L68 85 L68 35 L72 40 L80 30 L70 20 L60 20 Q50 28 40 20 Z" />
      </svg>
    );
  }
  if (lower.includes("camiseta") || lower.includes("tee")) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="#0D0D0D" strokeWidth="2.5" className="w-[42%] h-[42%]">
        <path d="M32 18 L20 26 L26 38 L32 34 L32 82 L68 82 L68 34 L74 38 L80 26 L68 18 L60 18 Q50 24 40 18 Z" />
      </svg>
    );
  }
  // Gorra por defecto
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#0D0D0D" strokeWidth="2.5" className="w-[42%] h-[42%]">
      <path d="M15 55 Q15 25 50 22 Q85 25 85 55 Q50 68 15 55 Z" />
      <path d="M15 55 Q50 75 85 55 L92 66 Q50 88 8 66 Z" fill="#8C0B1E" stroke="none" />
      <circle cx="50" cy="30" r="2.5" fill="#0D0D0D" />
    </svg>
  );
}

export default function ProductCard({
  product,
  onAddToCart,
}: {
  product: ProductCardData;
  onAddToCart: (productId: string, size: string) => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    if (!selectedSize) return;
    onAddToCart(product.id, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] bg-[#F2EEE6] dark:bg-obsidian-soft overflow-hidden flex items-center justify-center">
        {product.categoryLabel && (
          <span className="absolute top-3 left-3 z-10 bg-obsidian text-cream text-[10px] tracking-widest px-2 py-1">
            {product.categoryLabel}
          </span>
        )}
        {product.hasRealPhoto ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <PlaceholderIcon name={product.name} />
            <span className="absolute bottom-2.5 right-2.5 z-10 bg-obsidian/[0.08] text-obsidian/50 text-[8px] tracking-wider px-1.5 py-1 rounded-sm">
              FOTO REF.
            </span>
          </>
        )}
      </div>

      <h3 className="font-body text-sm text-obsidian dark:text-cream mt-3">{product.name}</h3>

      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-obsidian dark:text-cream font-semibold">${product.price.toFixed(2)}</span>
        {product.compareAtPrice && (
          <span className="text-obsidian/40 dark:text-cream/40 line-through text-sm">
            ${product.compareAtPrice.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`text-xs px-2.5 py-1 border transition-colors ${
              selectedSize === size
                ? "border-crimson bg-crimson text-cream"
                : "border-obsidian/20 dark:border-cream/20 text-obsidian/70 dark:text-cream/70 hover:border-obsidian dark:hover:border-cream"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <button
        disabled={!selectedSize}
        onClick={handleAdd}
        className={`mt-3 text-cream text-xs tracking-wide py-2.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 ${
          justAdded ? "bg-green-700" : "bg-obsidian hover:bg-crimson"
        }`}
      >
        {justAdded ? "AÑADIDO AL CARRITO" : "AÑADIR AL CARRITO"}
      </button>
    </div>
  );
}
