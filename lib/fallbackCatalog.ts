// Respaldo local: si Supabase no responde (cuota agotada, proyecto pausado, error de red),
// la tienda muestra estas 7 gorras con las fotos de /public/products en vez de quedar vacia.
// Mismos datos que el catalogo de muestra de db/migrations/003_catalog_management.sql.
import type { ProductCardData } from "@/components/ProductCard";

type FallbackProduct = ProductCardData & { description: string };

const g = (
  n: number,
  slug: string,
  name: string,
  description: string,
  price: number,
  compareAtPrice: number | undefined,
  categoryLabel: string,
  isFeatured: boolean
): FallbackProduct => ({
  id: `local-${n}`,
  slug,
  name,
  description,
  price,
  compareAtPrice,
  categoryLabel,
  collectionSlug: "gorras",
  imageUrl: `/products/${slug}.jpg`,
  sizes: ["Unica"],
  hasRealPhoto: true,
  isFeatured,
  stockLeft: 10,
});

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  g(1, "gorra-concrete-jungle", "Gorra Concrete Jungle", "Gorra negra con ilustracion bordada estilo grafiti, tipografia NY en relieve y acabado desgastado tipo tag.", 45, 60, "EDICION LIMITADA", true),
  g(2, "gorra-costa-azul-la", "Gorra Costa Azul LA", "Gorra bordada con paleta azul inspirada en el skyline de Los Angeles.", 38, undefined, "URBAN", false),
  g(3, "gorra-cruz-gotica", "Gorra Cruz Gotica", "Bordado gotico en relieve sobre base negra, acabado premium.", 42, undefined, "STREETWEAR", false),
  g(4, "gorra-barroco-negro", "Gorra Barroco Negro", "Ornamentacion barroca bordada, edicion limitada.", 48, 62, "EDICION LIMITADA", false),
  g(5, "gorra-samurai-urbano", "Gorra Samurai Urbano", "Ilustracion de samurai bordada con estetica urbana japonesa.", 40, undefined, "URBAN", true),
  g(6, "gorra-diamante-la", "Gorra Diamante LA", "Bordado de diamante con brillo, edicion limitada.", 52, 68, "EDICION LIMITADA", true),
  g(7, "gorra-llamas-rosa-ny", "Gorra Llamas Rosa NY", "Llamas rosas bordadas sobre base negra, tipografia NY.", 44, undefined, "STREETWEAR", true),
];

export const FALLBACK_COLLECTIONS = [{ id: "local-gorras", name: "Gorras", slug: "gorras" }];
