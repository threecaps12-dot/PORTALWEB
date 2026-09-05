"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type VariantInput = { size: string; sku: string; stock: number };

type ProductInitial = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  categoryLabel: string;
  collectionId: string | null;
  isFeatured: boolean;
  hasRealPhoto: boolean;
  status: "active" | "draft" | "archived";
  images: string[];
  variants: VariantInput[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductForm({
  mode,
  collections,
  initial,
}: {
  mode: "create" | "edit";
  collections: { id: string; name: string }[];
  initial?: ProductInitial;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    initial?.compareAtPrice ? String(initial.compareAtPrice) : ""
  );
  const [categoryLabel, setCategoryLabel] = useState(initial?.categoryLabel ?? "");
  const [collectionId, setCollectionId] = useState(initial?.collectionId ?? collections[0]?.id ?? "");
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [hasRealPhoto, setHasRealPhoto] = useState(initial?.hasRealPhoto ?? false);
  const [status, setStatus] = useState(initial?.status ?? "active");
  const [images, setImages] = useState(initial?.images.join("\n") ?? "");
  const [variants, setVariants] = useState<VariantInput[]>(
    initial?.variants ?? [{ size: "Única", sku: "", stock: 0 }]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function updateVariant(index: number, field: keyof VariantInput, value: string) {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, [field]: field === "stock" ? Number(value) : value } : v
      )
    );
  }

  function addVariantRow() {
    setVariants((prev) => [...prev, { size: "", sku: "", stock: 0 }]);
  }

  function removeVariantRow(index: number) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !slug || !price || variants.length === 0) {
      setError("Nombre, slug, precio y al menos una talla/variante son obligatorios.");
      return;
    }

    setLoading(true);

    const imageUrls = images
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const productPayload = {
      name,
      slug,
      description,
      price: Number(price),
      compare_at_price: compareAtPrice ? Number(compareAtPrice) : null,
      category_label: categoryLabel || null,
      collection_id: collectionId || null,
      is_featured: isFeatured,
      has_real_photo: hasRealPhoto,
      status,
    };

    if (mode === "create") {
      const { data: product, error: insertError } = await supabase
        .from("products")
        .insert(productPayload)
        .select()
        .single();

      if (insertError || !product) {
        setError(insertError?.message ?? "No se pudo crear el producto.");
        setLoading(false);
        return;
      }

      const imagesPayload = imageUrls.map((url, i) => ({
        product_id: product.id,
        url,
        alt_text: name,
        sort_order: i,
      }));
      const variantsPayload = variants.map((v) => ({
        product_id: product.id,
        size: v.size,
        sku: v.sku,
        stock: v.stock,
      }));

      const [imagesRes, variantsRes] = await Promise.all([
        imagesPayload.length
          ? supabase.from("product_images").insert(imagesPayload)
          : Promise.resolve({ error: null }),
        supabase.from("product_variants").insert(variantsPayload),
      ]);

      if (imagesRes.error || variantsRes.error) {
        await supabase.from("products").delete().eq("id", product.id);
        setError(
          variantsRes.error?.message ??
            imagesRes.error?.message ??
            "No se pudo guardar el producto (revisa que los SKU no estén repetidos)."
        );
        setLoading(false);
        return;
      }
    } else if (initial) {
      const { error: updateError } = await supabase
        .from("products")
        .update(productPayload)
        .eq("id", initial.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      await supabase.from("product_images").delete().eq("product_id", initial.id);
      await supabase.from("product_variants").delete().eq("product_id", initial.id);

      const imagesPayload = imageUrls.map((url, i) => ({
        product_id: initial.id,
        url,
        alt_text: name,
        sort_order: i,
      }));
      const variantsPayload = variants.map((v) => ({
        product_id: initial.id,
        size: v.size,
        sku: v.sku,
        stock: v.stock,
      }));

      const [imagesRes, variantsRes] = await Promise.all([
        imagesPayload.length
          ? supabase.from("product_images").insert(imagesPayload)
          : Promise.resolve({ error: null }),
        supabase.from("product_variants").insert(variantsPayload),
      ]);

      if (imagesRes.error || variantsRes.error) {
        setError(
          variantsRes.error?.message ??
            imagesRes.error?.message ??
            "El producto se actualizó pero hubo un error con imágenes/variantes (revisa SKU repetidos)."
        );
        setLoading(false);
        return;
      }
    }

    router.push("/admin/productos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6">
      {error && (
        <p className="text-crimson text-sm border-l-2 border-crimson pl-3">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-obsidian/50 text-xs tracking-wide">NOMBRE</label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="border border-obsidian/15 px-3 py-2.5 text-sm focus:outline-none focus:border-crimson"
          />
        </div>

        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-obsidian/50 text-xs tracking-wide">SLUG (URL)</label>
          <input
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value));
              setSlugTouched(true);
            }}
            required
            className="border border-obsidian/15 px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-crimson"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-obsidian/50 text-xs tracking-wide">PRECIO USD</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-obsidian/15 px-3 py-2.5 text-sm focus:outline-none focus:border-crimson"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-obsidian/50 text-xs tracking-wide">PRECIO ANTES (opcional)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            className="border border-obsidian/15 px-3 py-2.5 text-sm focus:outline-none focus:border-crimson"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-obsidian/50 text-xs tracking-wide">COLECCIÓN</label>
          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="border border-obsidian/15 px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-crimson"
          >
            {collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-obsidian/50 text-xs tracking-wide">ETIQUETA (badge)</label>
          <input
            value={categoryLabel}
            onChange={(e) => setCategoryLabel(e.target.value.toUpperCase())}
            placeholder="EDICIÓN LIMITADA, URBAN..."
            className="border border-obsidian/15 px-3 py-2.5 text-sm focus:outline-none focus:border-crimson"
          />
        </div>

        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-obsidian/50 text-xs tracking-wide">DESCRIPCIÓN</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border border-obsidian/15 px-3 py-2.5 text-sm focus:outline-none focus:border-crimson"
          />
        </div>

        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-obsidian/50 text-xs tracking-wide">
            IMÁGENES (una URL por línea, la primera es la principal)
          </label>
          <textarea
            value={images}
            onChange={(e) => setImages(e.target.value)}
            rows={3}
            placeholder="/products/mi-gorra.jpg"
            className="border border-obsidian/15 px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-crimson"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-obsidian/70">
          <input
            type="checkbox"
            checked={hasRealPhoto}
            onChange={(e) => setHasRealPhoto(e.target.checked)}
          />
          Tiene foto real (si no, se muestra un ícono de referencia)
        </label>

        <label className="flex items-center gap-2 text-sm text-obsidian/70">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Destacado (aparece en "Recomendados de la semana")
        </label>

        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-obsidian/50 text-xs tracking-wide">ESTADO</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="border border-obsidian/15 px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-crimson w-fit"
          >
            <option value="active">Activo (visible en el sitio)</option>
            <option value="draft">Borrador (oculto)</option>
            <option value="archived">Archivado</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-obsidian/50 text-xs tracking-wide">TALLAS / VARIANTES</label>
          <button
            type="button"
            onClick={addVariantRow}
            className="text-xs text-crimson hover:underline"
          >
            + Agregar talla
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {variants.map((v, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_90px_32px] gap-2">
              <input
                placeholder="Talla (S, M, Única...)"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
                required
                className="border border-obsidian/15 px-2.5 py-2 text-sm focus:outline-none focus:border-crimson"
              />
              <input
                placeholder="SKU"
                value={v.sku}
                onChange={(e) => updateVariant(i, "sku", e.target.value)}
                required
                className="border border-obsidian/15 px-2.5 py-2 text-sm font-mono focus:outline-none focus:border-crimson"
              />
              <input
                type="number"
                min="0"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => updateVariant(i, "stock", e.target.value)}
                required
                className="border border-obsidian/15 px-2.5 py-2 text-sm focus:outline-none focus:border-crimson"
              />
              <button
                type="button"
                onClick={() => removeVariantRow(i)}
                disabled={variants.length === 1}
                className="text-obsidian/40 hover:text-crimson disabled:opacity-20"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="self-start bg-crimson hover:bg-crimson-hover disabled:opacity-50 text-cream text-xs tracking-[0.15em] px-6 py-3 transition-all hover:scale-[1.02] active:scale-95"
      >
        {loading ? "GUARDANDO..." : mode === "create" ? "CREAR PRODUCTO" : "GUARDAR CAMBIOS"}
      </button>
    </form>
  );
}
