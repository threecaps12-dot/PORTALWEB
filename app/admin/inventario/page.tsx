"use client";

import { useState } from "react";

type VariantRow = {
  id: string;
  productName: string;
  size: string;
  sku: string;
  stock: number;
};

// Placeholder — reemplazar por fetch a Supabase product_variants join products.
const INITIAL_VARIANTS: VariantRow[] = [
  { id: "1", productName: "Gorra Three Caps Bordada", size: "Única", sku: "TC-GORRA-001", stock: 6 },
  { id: "2", productName: "Hoodie Three Caps", size: "M", sku: "TC-HOOD-002-M", stock: 2 },
  { id: "3", productName: "Hoodie Three Caps", size: "L", sku: "TC-HOOD-002-L", stock: 0 },
  { id: "4", productName: "Camiseta Firma Bordada", size: "S", sku: "TC-CAM-003-S", stock: 14 },
];

export default function InventarioPage() {
  const [variants, setVariants] = useState(INITIAL_VARIANTS);

  function updateStock(id: string, delta: number) {
    // En producción: update en Supabase product_variants set stock = stock + delta
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, stock: Math.max(0, v.stock + delta) } : v))
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-obsidian">Inventario</h1>
        <button className="text-xs bg-crimson text-cream px-4 py-2 tracking-wide hover:bg-crimson-hover transition-colors">
          + AGREGAR PRODUCTO
        </button>
      </div>

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
            {variants.map((v) => (
              <tr key={v.id} className="border-b border-obsidian/5">
                <td className="p-4">{v.productName}</td>
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
    </div>
  );
}
