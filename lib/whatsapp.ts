// Número de WhatsApp del negocio (formato internacional, sin '+' ni espacios)
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1XXXXXXXXXX";
export const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "tu_marca";

export type CartLine = {
  productName: string;
  size: string;
  color?: string;
  quantity: number;
  unitPrice: number;
};

/**
 * Arma el mensaje pre-llenado que el cliente envía al finalizar compra.
 * Este es el mensaje que recibe el bot de WhatsApp para iniciar el cierre.
 */
export function buildOrderMessage(items: CartLine[], orderNumber: string): string {
  const lines = items.map(
    (item) =>
      `• ${item.productName} — Talla ${item.size}${item.color ? ` / ${item.color}` : ""} x${item.quantity} — $${(
        item.unitPrice * item.quantity
      ).toFixed(2)}`
  );

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return [
    `Hola! Quiero confirmar mi pedido #${orderNumber}`,
    "",
    ...lines,
    "",
    `Total: $${total.toFixed(2)}`,
    "",
    "¿Me confirman disponibilidad y cómo sigo con el pago?",
  ].join("\n");
}

export function buildWhatsAppLink(items: CartLine[], orderNumber: string): string {
  const message = buildOrderMessage(items, orderNumber);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildInstagramLink(): string {
  return `https://ig.me/m/${INSTAGRAM_HANDLE}`;
}

export function generateOrderNumber(): string {
  const date = new Date();
  const stamp = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LP-${stamp}-${rand}`;
}
