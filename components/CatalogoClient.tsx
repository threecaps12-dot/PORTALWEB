"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { ProductCardData } from "@/components/ProductCard";

const SIZE_OPTIONS = ["Única", "S", "M", "L", "XL"];

export default function CatalogoClient({
  products,
  collections,
}: {
  products: ProductCardData[];
  collections: { id: string; name: string; slug: string }[];
}) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("todas");
  const [maxPrice, setMaxPrice] = useState(100);
  const [cartCount, setCartCount] = useState(0);

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function handleAddToCart(productId: string, size: string) {
    setCartCount((c) => c + 1);
  }

  const filteredProducts = products.filter((p) => {
    if (selectedCollection !== "todas" && p.collectionSlug !== selectedCollection) return false;
    if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
    return p.price <= maxPrice;
  });

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={cartCount} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        {/* Sidebar de filtros */}
        <aside className="space-y-8">
          <div>
            <h3 className="text-xs tracking-widest text-obsidian/50 dark:text-cream/50 mb-3">COLECCIÓN</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setSelectedCollection("todas")}
                  className={
                    selectedCollection === "todas"
                      ? "text-crimson font-medium"
                      : "text-obsidian/70 dark:text-cream/70"
                  }
                >
                  Todas
                </button>
              </li>
              {collections.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedCollection(c.slug)}
                    className={
                      selectedCollection === c.slug
                        ? "text-crimson font-medium"
                        : "text-obsidian/70 dark:text-cream/70"
                    }
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-widest text-obsidian/50 dark:text-cream/50 mb-3">TALLA</h3>
            <div className="flex flex-wrap gap-1.5">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`text-xs px-2.5 py-1 border transition-colors ${
                    selectedSizes.includes(size)
                      ? "border-crimson bg-crimson text-cream"
                      : "border-obsidian/20 dark:border-cream/20 text-obsidian/70 dark:text-cream/70"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-widest text-obsidian/50 dark:text-cream/50 mb-3">
              PRECIO MÁXIMO — ${maxPrice}
            </h3>
            <input
              type="range"
              min={10}
              max={150}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-crimson"
            />
          </div>
        </aside>

        {/* Grilla */}
        <ProductGrid
          title="CATÁLOGO COMPLETO"
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </div>

      <Footer />
    </>
  );
}
