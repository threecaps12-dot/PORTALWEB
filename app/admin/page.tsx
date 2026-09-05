import { createClient } from "@/lib/supabase/server";

const STATUS_LABELS: Record<string, string> = {
  pending_whatsapp: "Pendiente por confirmar",
  awaiting_payment: "Esperando pago",
  paid: "Pagado",
  fulfilled: "Enviado",
  cancelled: "Cancelado",
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [salesRes, pendingRes, lowStockRes, recentRes] = await Promise.all([
    supabase
      .from("orders")
      .select("total")
      .eq("status", "paid")
      .gte("created_at", startOfMonth.toISOString()),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending_whatsapp", "awaiting_payment"]),
    supabase
      .from("product_variants")
      .select("id", { count: "exact", head: true })
      .lt("stock", 5),
    supabase
      .from("orders")
      .select("id, order_number, customer_name, total, status")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const salesThisMonth = (salesRes.data ?? []).reduce((sum, o) => sum + Number(o.total ?? 0), 0);

  const STATS = [
    { label: "Ventas este mes", value: `$${salesThisMonth.toFixed(2)}` },
    { label: "Pedidos pendientes", value: String(pendingRes.count ?? 0) },
    { label: "Productos con bajo stock", value: String(lowStockRes.count ?? 0) },
  ];

  const recentOrders = recentRes.data ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-obsidian mb-6">Resumen</h1>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white border border-obsidian/10 p-5">
            <p className="text-obsidian/50 text-xs tracking-wide mb-2">{stat.label}</p>
            <p className="text-2xl font-semibold text-obsidian">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-obsidian/10 p-6">
        <h2 className="text-sm font-medium text-obsidian mb-4">Pedidos recientes</h2>
        {recentOrders.length === 0 ? (
          <p className="text-obsidian/50 text-sm">Todavía no hay pedidos registrados.</p>
        ) : (
          <div className="divide-y divide-obsidian/5">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 text-sm">
                <span className="font-mono text-xs text-obsidian/60">{order.order_number}</span>
                <span className="text-obsidian/80">{order.customer_name ?? "—"}</span>
                <span className="text-obsidian/50">${Number(order.total ?? 0).toFixed(2)}</span>
                <span className="text-xs text-obsidian/50">
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
