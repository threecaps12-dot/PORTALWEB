import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductBySlug } from "@/lib/catalog";

export const revalidate = 0;

export default async function ProductoPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
