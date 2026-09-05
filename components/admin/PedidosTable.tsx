"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Order = {
  id: string;
  order_number: string;
  customer_name: string | null;
  total: number | null;
  status: "pending_whatsapp" | "awaiting_payment" | "paid" | "fulfilled" | "cancelled";
  closed_via: "whatsapp" | "instagram" | "site" | null;
};

const STATUS_LABELS: Record<Order["status"], string> = {
  pending_whatsapp: "Pendiente por confirmar",
  awaiting_payment: "Esperando pago",
  paid: "Pagado",
  fulfilled: "Enviado",
  cancelled: "Cancelado",
};

export default function PedidosTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("orders-panel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setOrders((prev) => [payload.new as Order, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setOrders((prev) =>
              prev.map((o) => (o.id === payload.new.id ? (payload.new as Order) : o))
            );
          } else if (payload.eventType === "DELETE") {
            setOrders((prev) => prev.filter((o) => o.id !== (payload.old as Order).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function markAsPaid(id: string) {
    const previous = orders;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "paid" } : o)));

    const { error } = await supabase.from("orders").update({ status: "paid" }).eq("id", id);
    if (error) {
      setOrders(previous);
    }
  }

  return (
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
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-obsidian/50">
                Todavía no hay pedidos registrados.
              </td>
            </tr>
          )}
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-obsidian/5">
              <td className="p-4 font-mono text-xs">{order.order_number}</td>
              <td className="p-4">{order.customer_name ?? "—"}</td>
              <td className="p-4">${Number(order.total ?? 0).toFixed(2)}</td>
              <td className="p-4 capitalize">{order.closed_via ?? "—"}</td>
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
  );
}
