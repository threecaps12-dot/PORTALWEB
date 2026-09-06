"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import AuroraBackground from "@/components/admin/AuroraBackground";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "no-autorizado"
      ? "Esa cuenta no tiene acceso al panel admin."
      : null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4 relative overflow-hidden">
      <AuroraBackground />

      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/brand/three-caps-wordmark.png"
            alt="Three Caps"
            width={1942}
            height={809}
            className="h-16 w-auto object-contain mb-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            priority
          />
          <span className="text-gold text-xs tracking-[0.25em]">ACCESO RESTRINGIDO — ADMIN</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-obsidian-soft/70 backdrop-blur-xl border border-cream/10 shadow-[0_0_40px_rgba(140,11,30,0.15)] p-7 flex flex-col gap-4 transition-shadow duration-500 focus-within:border-gold/40 focus-within:shadow-[0_0_50px_rgba(212,175,55,0.15)]"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-cream/50 text-xs tracking-wide">
              CORREO
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-obsidian border border-cream/15 text-cream px-3 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="tunombre@threecapsusa.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-cream/50 text-xs tracking-wide">
              CONTRASEÑA
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-obsidian border border-cream/15 text-cream px-3 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-crimson text-xs -mt-1 border-l-2 border-crimson pl-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-crimson hover:bg-crimson-hover disabled:opacity-50 text-cream text-sm tracking-[0.15em] py-3 transition-all hover:scale-[1.02] active:scale-95"
          >
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </form>

        <p className="text-center text-cream/30 text-xs mt-6 tracking-wide">
          LEGION STUDIO — PANEL INTERNO
        </p>
      </div>
    </div>
  );
}
