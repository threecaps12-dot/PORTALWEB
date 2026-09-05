import CatalogoClient from "@/components/CatalogoClient";
import { getAllActiveProducts, getCollections } from "@/lib/catalog";

export const revalidate = 0;

export default async function CatalogoPage() {
  const [products, collections] = await Promise.all([getAllActiveProducts(), getCollections()]);
  return <CatalogoClient products={products} collections={collections} />;
}
