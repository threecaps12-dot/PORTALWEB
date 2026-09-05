import { createClient } from "@/lib/supabase/server";
import type { ProductCardData } from "@/components/ProductCard";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category_label: string | null;
  has_real_photo: boolean;
  product_images: { url: string; sort_order: number }[];
  product_variants: { size: string; stock: number }[];
  collections: { slug: string; name: string } | null;
};

const PRODUCT_SELECT = `
  id, slug, name, description, price, compare_at_price, category_label, has_real_photo,
  product_images(url, sort_order),
  product_variants(size, stock),
  collections(slug, name)
`;

function toCardData(row: ProductRow): ProductCardData {
  const images = [...row.product_images].sort((a, b) => a.sort_order - b.sort_order);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
    categoryLabel: row.category_label ?? undefined,
    collectionSlug: row.collections?.slug,
    imageUrl: images[0]?.url ?? "/products/gorra-concrete-jungle.jpg",
    sizes: Array.from(new Set(row.product_variants.map((v) => v.size))),
    hasRealPhoto: row.has_real_photo,
  };
}

export async function getFeaturedProducts(): Promise<ProductCardData[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "active")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });
  return ((data as unknown as ProductRow[]) ?? []).map(toCardData);
}

export async function getAllActiveProducts(): Promise<ProductCardData[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "active")
    .order("created_at", { ascending: false });
  return ((data as unknown as ProductRow[]) ?? []).map(toCardData);
}

export async function getCollections() {
  const supabase = await createClient();
  const { data } = await supabase.from("collections").select("id, name, slug").order("name");
  return data ?? [];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (!data) return null;

  const row = data as unknown as ProductRow;
  const images = [...row.product_images].sort((a, b) => a.sort_order - b.sort_order);
  const stockLeft = row.product_variants.reduce((sum, v) => sum + v.stock, 0);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    price: Number(row.price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
    categoryLabel: row.category_label ?? undefined,
    imageUrl: images[0]?.url ?? "/products/gorra-concrete-jungle.jpg",
    sizes: Array.from(new Set(row.product_variants.map((v) => v.size))),
    hasRealPhoto: row.has_real_photo,
    stockLeft,
  };
}
