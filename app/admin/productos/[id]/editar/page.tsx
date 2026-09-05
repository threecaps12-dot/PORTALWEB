import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditarProductoPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const [{ data: collections }, { data: product }] = await Promise.all([
    supabase.from("collections").select("id, name").order("name"),
    supabase
      .from("products")
      .select(
        "id, name, slug, description, price, compare_at_price, category_label, collection_id, is_featured, has_real_photo, status, product_images(url, sort_order), product_variants(size, sku, stock)"
      )
      .eq("id", params.id)
      .maybeSingle(),
  ]);

  if (!product) notFound();

  const images = [...(product.product_images ?? [])]
    .sort((a: any, b: any) => a.sort_order - b.sort_order)
    .map((img: any) => img.url);

  return (
    <div>
      <h1 className="font-display text-2xl text-obsidian mb-6">Editar producto</h1>
      <ProductForm
        mode="edit"
        collections={collections ?? []}
        initial={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description ?? "",
          price: Number(product.price),
          compareAtPrice: product.compare_at_price ? Number(product.compare_at_price) : null,
          categoryLabel: product.category_label ?? "",
          collectionId: product.collection_id,
          isFeatured: product.is_featured,
          hasRealPhoto: product.has_real_photo,
          status: product.status,
          images,
          variants: (product.product_variants ?? []).map((v: any) => ({
            size: v.size,
            sku: v.sku,
            stock: v.stock,
          })),
        }}
      />
    </div>
  );
}
