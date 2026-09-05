"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ProductRow = {
  id: string;
  name: string;
  price: number;
  status: string;
  is_featured: boolean;
  collections: { name: string } | null;
  product_images: { url: string }[];
};

export default function ProductsList({ initialProducts }: { initialProducts: ProductRow[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [products, setProducts] = useState(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function toggleFeatured(id: string, value: boolean) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_featured: value } : p)));
    const { error } = await supabase.from("products").update({ is_featured: value }).eq("id", id);
    if (error) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_featured: !value } : p)));
    }
  }

  async function handleDelete(id: string) {
    if (confirmId !== id) {
      setConfirmId(id);
      return;
    }
    setDeletingId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setDeletingId(null);
    setConfirmId(null);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    }
  }

  return (
    <div className="bg-white border border-obsidian/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-obsidian/50 border-b border-obsidian/10">
            <th className="p-4">Producto</th>
            <th className="p-4">Categoría</th>
            <th className="p-4">Precio</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Destacado</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-obsidian/50">
                Todavía no hay productos. Crea el primero.
              </td>
            </tr>
          )}
          {products.map((p) => (
            <tr key={p.id} className="border-b border-obsidian/5">
              <td className="p-4 flex items-center gap-3">
                {p.product_images[0]?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.product_images[0].url}
                    alt=""
                    className="w-9 h-9 object-cover bg-obsidian/5"
                  />
                )}
                {p.name}
              </td>
              <td className="p-4 text-obsidian/70">{p.collections?.name ?? "—"}</td>
              <td className="p-4">${Number(p.price).toFixed(2)}</td>
              <td className="p-4">
                <span
                  className={`text-xs px-2 py-1 ${
                    p.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-obsidian/10 text-obsidian/60"
                  }`}
                >
                  {p.status === "active" ? "Activo" : p.status === "draft" ? "Borrador" : "Archivado"}
                </span>
              </td>
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={p.is_featured}
                  onChange={(e) => toggleFeatured(p.id, e.target.checked)}
                  className="accent-crimson w-4 h-4"
                />
              </td>
              <td className="p-4 flex gap-3">
                <Link
                  href={`/admin/productos/${p.id}/editar`}
                  className="text-xs text-obsidian hover:text-crimson"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  onBlur={() => setConfirmId((c) => (c === p.id ? null : c))}
                  disabled={deletingId === p.id}
                  className="text-xs text-crimson/70 hover:text-crimson disabled:opacity-50"
                >
                  {confirmId === p.id ? "¿Seguro? Clic de nuevo" : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
