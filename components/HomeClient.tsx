"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { ProductCardData } from "@/components/ProductCard";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

export default function HomeClient({ featuredProducts }: { featuredProducts: ProductCardData[] }) {
  const { t } = useLanguage();
  const { addItem } = useCart();

  function handleAddToCart(product: ProductCardData, size: string) {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size,
      unitPrice: product.price,
      imageUrl: product.imageUrl,
    });
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <ProductGrid
        title={t("home.weeklyPicks")}
        products={featuredProducts}
        onAddToCart={handleAddToCart}
      />
      <PromoBanner
        tiles={[
          {
            imageUrl: "/banners/promo-gotica.jpg",
            title: t("home.gothicTitle"),
            subtitle: t("home.gothicSub"),
            href: "/catalogo?q=gotica",
          },
          {
            imageUrl: "/banners/promo-diamante.jpg",
            title: t("home.diamondTitle"),
            subtitle: t("home.diamondSub"),
            href: "/catalogo?q=diamante",
          },
        ]}
      />
      <Footer />
    </>
  );
}
