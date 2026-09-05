"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { ProductCardData } from "@/components/ProductCard";

export default function HomeClient({ featuredProducts }: { featuredProducts: ProductCardData[] }) {
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
        products={featuredProducts}
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
