"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  size: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
};

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "three-caps-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (i): i is CartItem =>
                i &&
                typeof i.productId === "string" &&
                typeof i.size === "string" &&
                typeof i.name === "string" &&
                Number.isFinite(i.unitPrice) &&
                Number.isInteger(i.quantity) &&
                i.quantity > 0
            )
          );
        }
      }
    } catch {
      // localStorage no disponible (SSR, modo privado, etc.)
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignoramos errores de cuota/privacidad
    }
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function updateQuantity(productId: string, size: string, quantity: number) {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => !(i.productId === productId && i.size === size));
      }
      return prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i));
    });
  }

  function removeItem(productId: string, size: string) {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  }

  function clear() {
    setItems([]);
  }

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, hydrated, itemCount, subtotal, addItem, updateQuantity, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
