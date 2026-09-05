import CatalogoClient from "@/components/CatalogoClient";
import { getAllActiveProducts, getCollections } from "@/lib/catalog";

export const revalidate = 0;

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const [products, collections] = await Promise.all([getAllActiveProducts(), getCollections()]);
  return <CatalogoClient products={products} collections={collections} initialQuery={searchParams.q ?? ""} />;
}
