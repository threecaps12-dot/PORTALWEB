import ProductCard, { ProductCardData } from "./ProductCard";
import Reveal from "@/components/Reveal";

export default function ProductGrid({
  title,
  products,
  onAddToCart,
}: {
  title: string;
  products: ProductCardData[];
  onAddToCart: (productId: string, size: string) => void;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-obsidian dark:text-cream">{title}</h2>
        <span className="text-xs text-obsidian/50 dark:text-cream/50 tracking-wide">
          {products.length} PRODUCTOS
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={(i % 4) * 90}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
