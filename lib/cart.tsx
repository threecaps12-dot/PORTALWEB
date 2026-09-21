"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CartItem,
  addToItems,
  cartTotal,
  countItems,
  removeFromItems,
  sanitizeStoredItems,
  setItemQuantity,
} from "@/lib/cartLogic";

export type { CartItem };

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
      if (stored) setItems(sanitizeStoredItems(JSON.parse(stored)));
    } catch {
      // localStorage no disponible (SSR, modo privado, etc.) o JSON dañado
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

  // Mantiene sincronizadas varias pestañas abiertas del sitio.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return;
      try {
        setItems(sanitizeStoredItems(e.newValue ? JSON.parse(e.newValue) : []));
      } catch {
        // ignoramos JSON dañado
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((prev) => addToItems(prev, item, quantity));
  }

  function updateQuantity(productId: string, size: string, quantity: number) {
    setItems((prev) => setItemQuantity(prev, productId, size, quantity));
  }

  function removeItem(productId: string, size: string) {
    setItems((prev) => removeFromItems(prev, productId, size));
  }

  function clear() {
    setItems([]);
  }

  const itemCount = useMemo(() => countItems(items), [items]);
  const subtotal = useMemo(() => cartTotal(items), [items]);

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
