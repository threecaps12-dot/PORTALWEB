"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { ProductCardData } from "@/components/ProductCard";

// Placeholder — reemplazar por fetch a Supabase con los filtros aplicados
// (products join product_variants, filtrando por status='active').
const ALL_PRODUCTS: ProductCardData[] = [
  {
    id: "1",
    slug: "gorra-three-caps",
    name: "Gorra Three Caps Bordada",
    price: 42,
    compareAtPrice: 55,
    categoryLabel: "EDICIÓN LIMITADA",
    imageUrl: "/products/gorra-three-caps.jpg",
    sizes: ["Única"],
  },
  {
    id: "2",
    slug: "gorra-urban-classic",
    name: "Gorra Urban Classic",
    price: 35,
    categoryLabel: "URBAN",
    imageUrl: "/products/gorra-urban-classic.jpg",
    sizes: ["Única"],
  },
  {
    id: "3",
    slug: "hoodie-three-caps",
    name: "Hoodie Three Caps",
    price: 68,
    categoryLabel: "STREETWEAR",
    imageUrl: "/products/hoodie-three-caps.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
];

const SIZE_OPTIONS = ["Única", "S", "M", "L", "XL"];
const COLLECTION_OPTIONS = ["Todas", "Gorras", "Ropa", "Edición limitada"];

export default function CatalogoPage() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState("Todas");
  const [maxPrice, setMaxPrice] = useState(100);

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        {/* Sidebar de filtros */}
        <aside className="space-y-8">
          <div>
            <h3 className="text-xs tracking-widest text-obsidian/50 mb-3">COLECCIÓN</h3>
            <ul className="space-y-2 text-sm">
              {COLLECTION_OPTIONS.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setSelectedCollection(c)}
                    className={selectedCollection === c ? "text-crimson font-medium" : "text-obsidian/70"}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-widest text-obsidian/50 mb-3">TALLA</h3>
            <div className="flex flex-wrap gap-1.5">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`text-xs px-2.5 py-1 border ${
                    selectedSizes.includes(size)
                      ? "border-crimson bg-crimson text-cream"
                      : "border-obsidian/20 text-obsidian/70"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-widest text-obsidian/50 mb-3">
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
          products={ALL_PRODUCTS.filter((p) => p.price <= maxPrice)}
          onAddToCart={() => {}}
        />
      </div>

      <Footer />
    </>
  );
}
