"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (password.length < 6) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }
    if (password !== confirm) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setMessage({ type: "error", text: "No se pudo actualizar. Intenta de nuevo." });
      return;
    }

    setPassword("");
    setConfirm("");
    setMessage({ type: "ok", text: "Contraseña actualizada. Ya quedaste al mando de tu clave." });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-obsidian/10 p-6 max-w-md flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="new-password" className="text-obsidian/50 text-xs tracking-wide">
          NUEVA CONTRASEÑA
        </label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-obsidian/15 px-3 py-2.5 text-sm focus:outline-none focus:border-crimson transition-colors"
          placeholder="••••••••"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm-password" className="text-obsidian/50 text-xs tracking-wide">
          CONFIRMAR CONTRASEÑA
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border border-obsidian/15 px-3 py-2.5 text-sm focus:outline-none focus:border-crimson transition-colors"
          placeholder="••••••••"
          required
        />
      </div>

      {message && (
        <p className={`text-xs ${message.type === "ok" ? "text-green-700" : "text-crimson"}`}>
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="self-start bg-obsidian hover:bg-crimson disabled:opacity-50 text-cream text-xs tracking-[0.15em] px-6 py-3 transition-all hover:scale-[1.02] active:scale-95"
      >
        {loading ? "GUARDANDO..." : "ACTUALIZAR CONTRASEÑA"}
      </button>
    </form>
  );
}
