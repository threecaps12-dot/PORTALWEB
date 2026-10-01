import CatalogoClient from "@/components/CatalogoClient";
import { getAllActiveProducts, getCollections } from "@/lib/catalog";

export const revalidate = 0;

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: { q?: string; cat?: string };
}) {
  const [products, collections] = await Promise.all([getAllActiveProducts(), getCollections()]);
  return (
    // La key remonta el catálogo cuando cambia ?cat= o ?q= desde el menú, para que el filtro se actualice
    <CatalogoClient
      key={`${searchParams.cat ?? ""}|${searchParams.q ?? ""}`}
      products={products}
      collections={collections}
      initialQuery={searchParams.q ?? ""}
      initialCategory={searchParams.cat ?? ""}
    />
  );
}
