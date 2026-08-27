// Placeholder — reemplazar por queries a Supabase:
// - ventas del mes: sum(orders.total) where status='paid' and created_at >= inicio de mes
// - pedidos pendientes: count(orders) where status in ('pending_whatsapp','awaiting_payment')
// - productos con bajo stock: product_variants where stock < 5

const STATS = [
  { label: "Ventas este mes", value: "$1,240.00" },
  { label: "Pedidos pendientes", value: "7" },
  { label: "Productos con bajo stock", value: "3" },
];

export default function AdminDashboard() {
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
        <p className="text-obsidian/50 text-sm">
          Conectar con la tabla <code>orders</code> ordenada por <code>created_at desc</code> para
          listar aquí los últimos pedidos, con acceso rápido a "Marcar como pagado" y
          "Marcar como enviado".
        </p>
      </div>
    </div>
  );
}
