// Logica pura del carrito (sin React) para poder probarla de forma aislada.

export const MAX_PER_LINE = 99;

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  size: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
  /** Tope de unidades (stock disponible). Sin valor, aplica solo MAX_PER_LINE. */
  maxQuantity?: number;
};

/** Dinero en centavos enteros para evitar errores de coma flotante (ej. 39.99 x 3). */
export function toCents(price: number): number {
  return Math.round(price * 100);
}

export function lineTotal(unitPrice: number, quantity: number): number {
  return (toCents(unitPrice) * quantity) / 100;
}

export function cartTotal(lines: { unitPrice: number; quantity: number }[]): number {
  return lines.reduce((sum, l) => sum + toCents(l.unitPrice) * l.quantity, 0) / 100;
}

export function maxAllowed(maxQuantity?: number): number {
  return typeof maxQuantity === "number" && maxQuantity >= 1
    ? Math.min(Math.floor(maxQuantity), MAX_PER_LINE)
    : MAX_PER_LINE;
}

export function clampQuantity(quantity: number, maxQuantity?: number): number {
  const cap = maxAllowed(maxQuantity);
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(Math.floor(quantity), 0), cap);
}

const sameLine = (i: CartItem, productId: string, size: string) =>
  i.productId === productId && i.size === size;

export function addToItems(items: CartItem[], item: Omit<CartItem, "quantity">, quantity = 1): CartItem[] {
  const existing = items.find((i) => sameLine(i, item.productId, item.size));
  if (existing) {
    return items.map((i) =>
      sameLine(i, item.productId, item.size)
        ? {
            ...i,
            unitPrice: item.unitPrice,
            maxQuantity: item.maxQuantity,
            quantity: clampQuantity(i.quantity + quantity, item.maxQuantity) || i.quantity,
          }
        : i
    );
  }
  const qty = clampQuantity(quantity, item.maxQuantity);
  if (qty < 1) return items;
  return [...items, { ...item, quantity: qty }];
}

export function setItemQuantity(items: CartItem[], productId: string, size: string, quantity: number): CartItem[] {
  if (quantity <= 0) return items.filter((i) => !sameLine(i, productId, size));
  return items.map((i) =>
    sameLine(i, productId, size) ? { ...i, quantity: clampQuantity(quantity, i.maxQuantity) || i.quantity } : i
  );
}

export function removeFromItems(items: CartItem[], productId: string, size: string): CartItem[] {
  return items.filter((i) => !sameLine(i, productId, size));
}

export function countItems(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

/** Valida lo que viene de localStorage: descarta lineas dañadas y corrige cantidades fuera de rango. */
export function sanitizeStoredItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const out: CartItem[] = [];
  for (const i of raw) {
    if (
      !i ||
      typeof i.productId !== "string" ||
      typeof i.size !== "string" ||
      typeof i.name !== "string" ||
      !Number.isFinite(i.unitPrice) ||
      i.unitPrice < 0 ||
      !Number.isFinite(i.quantity)
    ) {
      continue;
    }
    const maxQuantity = typeof i.maxQuantity === "number" ? i.maxQuantity : undefined;
    const quantity = clampQuantity(i.quantity, maxQuantity);
    if (quantity < 1) continue;
    const existing = out.find((o) => sameLine(o, i.productId, i.size));
    if (existing) {
      existing.quantity = clampQuantity(existing.quantity + quantity, maxQuantity);
      continue;
    }
    out.push({
      productId: i.productId,
      slug: typeof i.slug === "string" ? i.slug : "",
      name: i.name,
      size: i.size,
      unitPrice: i.unitPrice,
      quantity,
      imageUrl: typeof i.imageUrl === "string" ? i.imageUrl : "",
      maxQuantity,
    });
  }
  return out;
}
