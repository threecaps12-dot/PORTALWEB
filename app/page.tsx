"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { ProductCardData } from "@/components/ProductCard";

// Placeholder — reemplazar por fetch a Supabase (products + product_variants
// donde is_featured = true) cuando se conecte el backend.
const FEATURED_PRODUCTS: ProductCardData[] = [
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
  {
    id: "4",
    slug: "camiseta-firma",
    name: "Camiseta Firma Bordada",
    price: 28,
    categoryLabel: "URBAN",
    imageUrl: "/products/camiseta-firma.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
];

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(productId: string, size: string) {
    // Placeholder — reemplazar por lógica real de carrito (Supabase cart_items
    // o estado local + sync). Ver components/CheckoutHandoff para el cierre.
    setCartCount((c) => c + 1);
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={cartCount} />
      <Hero />
      <ProductGrid
        title="RECOMENDADOS DE LA SEMANA"
        products={FEATURED_PRODUCTS}
        onAddToCart={handleAddToCart}
      />
      <Footer />
    </>
  );
}
