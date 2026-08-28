"use client";

import { buildWhatsAppLink, buildInstagramLink, generateOrderNumber, CartLine } from "@/lib/whatsapp";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.2-1.44a9.9 9.9 0 0 0 4.84 1.24h.01c5.46 0 9.9-4.45 9.9-9.9C22 6.45 17.5 2 12.04 2Z" opacity="0.15" />
      <path
        fillRule="evenodd"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.2-1.44a9.9 9.9 0 0 0 4.84 1.24h.01c5.46 0 9.9-4.45 9.9-9.9C22 6.45 17.5 2 12.04 2Zm0 18.03h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.86.82-3-.2-.31a8.12 8.12 0 1 1 6.9 3.76Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 6h7a4 4 0 0 1 0 8H9l-1 5H5l3-13Z" strokeLinejoin="round" />
      <path d="M10 6h6a4 4 0 0 1 0 8" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

export default function CheckoutHandoff({ items }: { items: CartLine[] }) {
  const orderNumber = generateOrderNumber();
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <div className="border border-obsidian/10 dark:border-cream/10 p-6 md:p-8 bg-white dark:bg-obsidian-soft">
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-obsidian/60 dark:text-cream/60 text-sm">Pedido #{orderNumber}</span>
        <span className="font-display text-2xl text-obsidian dark:text-cream">${total.toFixed(2)}</span>
      </div>

      <p className="text-sm text-obsidian/70 dark:text-cream/70 mb-5">
        Confirma tu pedido y ciérralo directo con nosotros. Te respondemos al instante.
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={buildWhatsAppLink(items, orderNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-hover text-cream text-sm tracking-wide py-3.5 transition-colors"
        >
          <WhatsAppIcon />
          FINALIZAR POR WHATSAPP
        </a>

        <a
          href={buildInstagramLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-obsidian dark:border-cream text-obsidian dark:text-cream text-sm tracking-wide py-3.5 hover:bg-obsidian hover:text-cream dark:hover:bg-cream dark:hover:text-obsidian transition-colors"
        >
          <InstagramIcon />
          FINALIZAR POR INSTAGRAM
        </a>

        <div className="flex items-center gap-2 justify-center text-obsidian/50 dark:text-cream/50 text-xs pt-2">
          <PayPalIcon />
          También aceptamos PayPal — indícalo al confirmar tu pedido.
        </div>
      </div>
    </div>
  );
}
