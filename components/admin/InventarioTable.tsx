"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type VariantRow = {
  id: string;
  size: string;
  sku: string;
  stock: number;
  products: { name: string } | null;
};

export default function InventarioTable({ initialVariants }: { initialVariants: VariantRow[] }) {
  const [variants, setVariants] = useState(initialVariants);
  const supabase = createClient();

  async function updateStock(id: string, delta: number) {
    const current = variants.find((v) => v.id === id);
    if (!current) return;
    const nextStock = Math.max(0, current.stock + delta);

    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, stock: nextStock } : v)));

    const { error } = await supabase
      .from("product_variants")
      .update({ stock: nextStock })
      .eq("id", id);

    if (error) {
      setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, stock: current.stock } : v)));
    }
  }

  return (
    <div className="bg-white border border-obsidian/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-obsidian/50 border-b border-obsidian/10">
            <th className="p-4">Producto</th>
            <th className="p-4">Talla</th>
            <th className="p-4">SKU</th>
            <th className="p-4">Stock</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {variants.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-obsidian/50">
                Todavía no hay variantes de producto cargadas.
              </td>
            </tr>
          )}
          {variants.map((v) => (
            <tr key={v.id} className="border-b border-obsidian/5">
              <td className="p-4">{v.products?.name ?? "—"}</td>
              <td className="p-4">{v.size}</td>
              <td className="p-4 font-mono text-xs">{v.sku}</td>
              <td className="p-4">
                <span className={v.stock === 0 ? "text-crimson font-medium" : ""}>
                  {v.stock === 0 ? "Agotado" : v.stock}
                </span>
              </td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => updateStock(v.id, -1)}
                  className="w-7 h-7 border border-obsidian/20 text-obsidian/70 hover:border-obsidian"
                >
                  −
                </button>
                <button
                  onClick={() => updateStock(v.id, 1)}
                  className="w-7 h-7 border border-obsidian/20 text-obsidian/70 hover:border-obsidian"
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
