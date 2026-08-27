"use client";

import { useState } from "react";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: "pending_whatsapp" | "awaiting_payment" | "paid" | "fulfilled" | "cancelled";
  closedVia: "whatsapp" | "instagram" | "site";
};

// Placeholder — reemplazar por fetch a Supabase con suscripción realtime
// (supabase.channel('orders').on('postgres_changes', ...)) para que la
// lista se actualice sola cuando entra un pedido nuevo por WhatsApp.
const INITIAL_ORDERS: Order[] = [
  { id: "1", orderNumber: "LP-20260824-3312", customerName: "Miguel R.", total: 84, status: "pending_whatsapp", closedVia: "whatsapp" },
  { id: "2", orderNumber: "LP-20260823-9021", customerName: "Ana T.", total: 42, status: "paid", closedVia: "instagram" },
  { id: "3", orderNumber: "LP-20260822-1187", customerName: "Carlos D.", total: 130, status: "fulfilled", closedVia: "whatsapp" },
];

const STATUS_LABELS: Record<Order["status"], string> = {
  pending_whatsapp: "Pendiente por confirmar",
  awaiting_payment: "Esperando pago",
  paid: "Pagado",
  fulfilled: "Enviado",
  cancelled: "Cancelado",
};

export default function PedidosPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  function markAsPaid(id: string) {
    // En producción: update en Supabase orders set status='paid', payment_reference=...
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "paid" as Order["status"] } : o))
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-obsidian mb-6">Pedidos</h1>

      <div className="bg-white border border-obsidian/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-obsidian/50 border-b border-obsidian/10">
              <th className="p-4">Pedido</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Total</th>
              <th className="p-4">Cerrado vía</th>
              <th className="p-4">Estado</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-obsidian/5">
                <td className="p-4 font-mono text-xs">{order.orderNumber}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">${order.total.toFixed(2)}</td>
                <td className="p-4 capitalize">{order.closedVia}</td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 ${
                      order.status === "paid" || order.status === "fulfilled"
                        ? "bg-green-100 text-green-700"
                        : "bg-gold/20 text-obsidian"
                    }`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td className="p-4">
                  {order.status !== "paid" && order.status !== "fulfilled" && (
                    <button
                      onClick={() => markAsPaid(order.id)}
                      className="text-xs bg-obsidian text-cream px-3 py-1.5 hover:bg-crimson transition-colors"
                    >
                      Marcar como pagado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
