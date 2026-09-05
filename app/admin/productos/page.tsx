import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CollectionsManager from "@/components/admin/CollectionsManager";
import ProductsList from "@/components/admin/ProductsList";

export default async function ProductosPage() {
  const supabase = await createClient();

  const [{ data: collections }, { data: products }] = await Promise.all([
    supabase.from("collections").select("id, name, slug").order("name"),
    supabase
      .from("products")
      .select("id, name, price, status, is_featured, collections(name), product_images(url, sort_order)")
      .order("created_at", { ascending: false }),
  ]);

  const sortedProducts = (products ?? []).map((p: any) => ({
    ...p,
    product_images: [...(p.product_images ?? [])].sort((a: any, b: any) => a.sort_order - b.sort_order),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-obsidian">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="text-xs bg-crimson text-cream px-4 py-2 tracking-wide hover:bg-crimson-hover transition-colors"
        >
          + AGREGAR PRODUCTO
        </Link>
      </div>

      <CollectionsManager collections={collections ?? []} />

      <ProductsList initialProducts={sortedProducts as any} />
    </div>
  );
}
