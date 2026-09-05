"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Collection = { id: string; name: string; slug: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CollectionsManager({ collections }: { collections: Collection[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("collections")
      .insert({ name: name.trim(), slug: slugify(name) });

    setLoading(false);
    if (insertError) {
      setError("Ya existe una categoría con ese nombre.");
      return;
    }
    setName("");
    router.refresh();
  }

  async function handleDelete(id: string) {
    await supabase.from("collections").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="bg-white border border-obsidian/10 p-5 mb-8">
      <h2 className="text-sm font-medium text-obsidian mb-3">Categorías</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {collections.map((c) => (
          <span
            key={c.id}
            className="flex items-center gap-2 bg-obsidian/5 text-obsidian text-xs px-3 py-1.5"
          >
            {c.name}
            <button
              onClick={() => handleDelete(c.id)}
              className="text-obsidian/40 hover:text-crimson"
              title="Eliminar categoría (los productos quedan sin categoría, no se borran)"
            >
              ✕
            </button>
          </span>
        ))}
        {collections.length === 0 && (
          <span className="text-obsidian/40 text-xs">Todavía no hay categorías.</span>
        )}
      </div>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nueva categoría (ej. Accesorios)"
          className="border border-obsidian/15 px-3 py-2 text-sm flex-1 focus:outline-none focus:border-crimson"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-obsidian hover:bg-crimson disabled:opacity-50 text-cream text-xs tracking-wide px-4 py-2 transition-colors"
        >
          + Agregar
        </button>
      </form>
      {error && <p className="text-crimson text-xs mt-2">{error}</p>}
    </div>
  );
}
