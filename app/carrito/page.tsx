"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutHandoff from "@/components/CheckoutHandoff";
import ShippingInfo from "@/components/ShippingInfo";
import { CartLine } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { lineTotal, maxAllowed } from "@/lib/cartLogic";
import { useLanguage } from "@/lib/i18n";

export default function CarritoPage() {
  const { t } = useLanguage();
  const { items, hydrated, updateQuantity, removeItem } = useCart();

  const cartLines: CartLine[] = items.map((item) => ({
    productName: item.name,
    size: item.size,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <h1 className="font-display text-3xl text-obsidian dark:text-cream mb-8">{t("cart.title")}</h1>

        {!hydrated ? (
          <div className="min-h-[240px]" aria-busy="true" />
        ) : items.length === 0 ? (
          <div className="text-center py-16 border border-obsidian/10 dark:border-cream/10 mb-8">
            <p className="text-obsidian/60 dark:text-cream/60 mb-4">{t("cart.empty")}</p>
            <Link href="/catalogo" className="text-crimson font-medium hover:underline">
              {t("cart.browse")}
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-obsidian/10 dark:divide-cream/10 mb-8">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between gap-4 py-4 text-sm">
                  <div>
                    <p className="text-obsidian dark:text-cream">{item.name}</p>
                    <p className="text-obsidian/50 dark:text-cream/50">
                      {t("cart.sizeQty", { size: item.size, qty: item.quantity })}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        aria-label={t("cart.decrease")}
                        className="w-6 h-6 flex items-center justify-center border border-obsidian/20 dark:border-cream/20 text-obsidian dark:text-cream hover:border-crimson"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-obsidian dark:text-cream">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        disabled={item.quantity >= maxAllowed(item.maxQuantity)}
                        aria-label={t("cart.increase")}
                        className="w-6 h-6 flex items-center justify-center border border-obsidian/20 dark:border-cream/20 text-obsidian dark:text-cream hover:border-crimson disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="ml-2 text-obsidian/50 dark:text-cream/50 hover:text-crimson text-xs underline"
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                  <span className="text-obsidian dark:text-cream font-medium">
                    ${lineTotal(item.unitPrice, item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <ShippingInfo />

            <CheckoutHandoff items={cartLines} />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
