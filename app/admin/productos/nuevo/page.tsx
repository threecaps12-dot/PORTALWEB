import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export default async function NuevoProductoPage() {
  const supabase = await createClient();
  const { data: collections } = await supabase.from("collections").select("id, name").order("name");

  return (
    <div>
      <h1 className="font-display text-2xl text-obsidian mb-6">Nuevo producto</h1>
      <ProductForm mode="create" collections={collections ?? []} />
    </div>
  );
}
