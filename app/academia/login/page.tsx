"use client";

import { useRouter } from "next/navigation";
import AuroraBackground from "@/components/admin/AuroraBackground";
import { useDemoSession } from "@/lib/academiaProgress";
import { DEMO_STUDENT } from "@/lib/academiaDemo";

export default function AcademiaLogin() {
  const router = useRouter();
  const { login } = useDemoSession();

  // Demo: no valida contra ningún servidor ni guarda lo que se escribe,
  // solo abre la sesión de ejemplo del alumno.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login();
    router.push("/academia/mis-cursos");
  }

  return (
    <main className="relative overflow-hidden min-h-[80vh] flex items-center justify-center px-4">
      <AuroraBackground />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm bg-obsidian/80 backdrop-blur border border-cream/10 p-8"
      >
        <h1 className="font-display text-5xl leading-none">Entra a tu cuenta</h1>
        <p className="text-cream/50 text-sm mt-2 mb-8">Usa el usuario que te llegó al comprar tu curso.</p>

        <label className="block text-xs tracking-widest text-cream/60 mb-1">CORREO</label>
        <input
          type="email"
          defaultValue={DEMO_STUDENT.email}
          readOnly
          className="w-full bg-obsidian border border-cream/20 px-3 py-2.5 mb-5 text-cream/80"
        />

        <label className="block text-xs tracking-widest text-cream/60 mb-1">CONTRASEÑA</label>
        <input
          type="password"
          defaultValue="demo1234"
          readOnly
          className="w-full bg-obsidian border border-cream/20 px-3 py-2.5 mb-8 text-cream/80"
        />

        <button
          type="submit"
          className="w-full bg-crimson hover:bg-crimson-hover text-cream font-display text-2xl tracking-widest py-3 transition-colors"
        >
          ENTRAR
        </button>
        <p className="text-cream/40 text-xs mt-4 text-center">Demo: los datos ya vienen llenos, solo dale a entrar.</p>
      </form>
    </main>
  );
}
