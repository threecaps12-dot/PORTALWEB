"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { ProductCardData } from "@/components/ProductCard";

// Placeholder — reemplazar por fetch a Supabase (products + product_variants
// donde is_featured = true) cuando se conecte el backend. Fotos y nombres de
// referencia son temporales mientras se define el catálogo final con el cliente.
const FEATURED_PRODUCTS: ProductCardData[] = [
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
    id: "3",
    slug: "gorra-samurai-urbano",
    name: "Gorra Samurái Urbano",
    price: 40,
    categoryLabel: "URBAN",
    imageUrl: "/products/gorra-samurai-urbano.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
  },
  {
    id: "4",
    slug: "gorra-llamas-rosa-ny",
    name: "Gorra Llamas Rosa NY",
    price: 44,
    categoryLabel: "STREETWEAR",
    imageUrl: "/products/gorra-llamas-rosa-ny.jpg",
    sizes: ["Única"],
    hasRealPhoto: true,
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
      <PromoBanner
        tiles={[
          {
            imageUrl: "/banners/promo-gotica.jpg",
            title: "COLECCIÓN GÓTICA",
            subtitle: "BORDADO EN RELIEVE",
            href: "/catalogo?cat=goticas",
          },
          {
            imageUrl: "/banners/promo-diamante.jpg",
            title: "EDICIÓN DIAMANTE",
            subtitle: "BRILLO QUE NO PASA DESAPERCIBIDO",
            href: "/catalogo?cat=destacados",
          },
        ]}
      />
      <Footer />
    </>
  );
}
