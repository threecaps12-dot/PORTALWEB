import HomeClient from "@/components/HomeClient";
import { getFeaturedProducts } from "@/lib/catalog";

export const revalidate = 0;

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  return <HomeClient featuredProducts={featuredProducts} />;
}
