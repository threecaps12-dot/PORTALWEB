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
  images: string[];
  sizes: string[];
  stockLeft: number;
};

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [activeImage, setActiveImage] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = product.images[activeImage] ?? product.images[0];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div
            className="relative aspect-square bg-white dark:bg-obsidian-soft overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setZooming(true)}
            onMouseLeave={() => setZooming(false)}
            onClick={() => setLightboxOpen(true)}
          >
            <Image src={currentImage} alt={product.name} fill className="object-cover" priority />
            {zooming && (
              <div
                className="hidden md:block absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundSize: "220%",
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
            <span className="absolute bottom-3 right-3 bg-obsidian/70 text-cream text-[10px] tracking-widest px-2 py-1 pointer-events-none">
              CLIC PARA AMPLIAR
            </span>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((url, i) => (
                <button
                  key={url + i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 border ${
                    i === activeImage ? "border-crimson" : "border-obsidian/15 dark:border-cream/15"
                  }`}
                >
                  <Image src={url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
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

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-obsidian/95 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar"
            className="absolute top-6 right-6 text-cream text-3xl leading-none hover:text-crimson"
          >
            ✕
          </button>
          <div className="relative w-full h-full max-w-3xl max-h-[85vh]">
            <Image src={currentImage} alt={product.name} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
