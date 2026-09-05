import { createClient } from "@/lib/supabase/server";
import InventarioTable from "@/components/admin/InventarioTable";

export default async function InventarioPage() {
  const supabase = await createClient();
  const { data: variants } = await supabase
    .from("product_variants")
    .select("id, size, sku, stock, products(name)")
    .order("sku");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-obsidian">Inventario</h1>
        <button className="text-xs bg-crimson text-cream px-4 py-2 tracking-wide hover:bg-crimson-hover transition-colors">
          + AGREGAR PRODUCTO
        </button>
      </div>
      <InventarioTable initialVariants={(variants as any) ?? []} />
    </div>
  );
}
