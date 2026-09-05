import { createClient } from "@/lib/supabase/server";
import PedidosTable from "@/components/admin/PedidosTable";

export default async function PedidosPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, customer_name, total, status, closed_via")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl text-obsidian mb-6">Pedidos</h1>
      <PedidosTable initialOrders={orders ?? []} />
    </div>
  );
}
