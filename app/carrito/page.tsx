"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutHandoff from "@/components/CheckoutHandoff";
import { CartLine } from "@/lib/whatsapp";

// Placeholder — reemplazar por el carrito real (Supabase cart_items o
// estado global tipo Zustand/Context sincronizado entre páginas).
const CART_ITEMS: CartLine[] = [
  { productName: "Gorra Three Caps Bordada", size: "Única", quantity: 1, unitPrice: 42 },
  { productName: "Camiseta Firma Bordada", size: "M", quantity: 2, unitPrice: 28 },
];

export default function CarritoPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={CART_ITEMS.length} />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <h1 className="font-display text-3xl text-obsidian dark:text-cream mb-8">TU CARRITO</h1>

        <div className="divide-y divide-obsidian/10 dark:divide-cream/10 mb-8">
          {CART_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-4 text-sm">
              <div>
                <p className="text-obsidian dark:text-cream">{item.productName}</p>
                <p className="text-obsidian/50 dark:text-cream/50">
                  Talla {item.size} × {item.quantity}
                </p>
              </div>
              <span className="text-obsidian dark:text-cream font-medium">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <CheckoutHandoff items={CART_ITEMS} />
      </div>

      <Footer />
    </>
  );
}
