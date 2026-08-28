"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { ProductCardData } from "@/components/ProductCard";

// Placeholder — reemplazar por fetch a Supabase con los filtros aplicados
// (products join product_variants, filtrando por status='active'). Fotos y
// nombres de referencia son temporales mientras se define el catálogo final.
const ALL_PRODUCTS: ProductCardData[] = [
  {
    id: "1",
    slug: "gorra-concrete-jungle",
    name: "Gorra Concrete Jungle",
    price: 45,
    compareAtPrice: 60,
    categoryLabel: "EDICIÓN LIMITADA",
    imageUrl: "/products/gorra-concrete-jungle.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "2",
    slug: "gorra-costa-azul-la",
    name: "Gorra Costa Azul LA",
    price: 38,
    categoryLabel: "URBAN",
    imageUrl: "/products/gorra-costa-azul-la.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "3",
    slug: "gorra-cruz-gotica",
    name: "Gorra Cruz Gótica",
    price: 42,
    categoryLabel: "STREETWEAR",
    imageUrl: "/products/gorra-cruz-gotica.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "4",
    slug: "gorra-barroco-negro",
    name: "Gorra Barroco Negro",
    price: 48,
    compareAtPrice: 62,
    categoryLabel: "EDICIÓN LIMITADA",
    imageUrl: "/products/gorra-barroco-negro.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "5",
    slug: "gorra-samurai-urbano",
    name: "Gorra Samurái Urbano",
    price: 40,
    categoryLabel: "URBAN",
    imageUrl: "/products/gorra-samurai-urbano.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "6",
    slug: "gorra-diamante-la",
    name: "Gorra Diamante LA",
    price: 52,
    compareAtPrice: 68,
    categoryLabel: "EDICIÓN LIMITADA",
    imageUrl: "/products/gorra-diamante-la.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "7",
    slug: "gorra-llamas-rosa-ny",
    name: "Gorra Llamas Rosa NY",
    price: 44,
    categoryLabel: "STREETWEAR",
    imageUrl: "/products/gorra-llamas-rosa-ny.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "8",
    slug: "hoodie-three-caps",
    name: "Hoodie Three Caps",
    price: 68,
    categoryLabel: "STREETWEAR",
    imageUrl: "/products/hoodie-three-caps.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "9",
    slug: "camiseta-firma",
    name: "Camiseta Firma Bordada",
    price: 28,
    categoryLabel: "URBAN",
    imageUrl: "/products/camiseta-firma.jpg",
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
            <h3 className="text-xs tracking-widest text-obsidian/50 dark:text-cream/50 mb-3">COLECCIÓN</h3>
            <ul className="space-y-2 text-sm">
              {COLLECTION_OPTIONS.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setSelectedCollection(c)}
                    className={
                      selectedCollection === c
                        ? "text-crimson font-medium"
                        : "text-obsidian/70 dark:text-cream/70"
                    }
                  >
                    {c}
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
          products={ALL_PRODUCTS.filter((p) => p.price <= maxPrice)}
          onAddToCart={() => {}}
        />
      </div>

      <Footer />
    </>
  );
}
