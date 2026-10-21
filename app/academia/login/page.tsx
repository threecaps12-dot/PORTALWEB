"use client";

import { useRouter } from "next/navigation";
import { useDemoSession } from "@/lib/academiaProgress";
import { BRAND, DEMO_STUDENT } from "@/lib/academiaDemo";
import { Logo, btnPrimary } from "@/components/academia/Brand";

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
    <main className="min-h-[calc(100vh-29px)] grid lg:grid-cols-2">
      <section className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden acad-grain border-r border-white/5 bg-[radial-gradient(80%_60%_at_30%_30%,rgba(201,169,110,0.22),transparent_70%),linear-gradient(160deg,#15130f,#07070a)]">
        <Logo />
        <div>
          <p className="font-acadserif text-5xl leading-[1] text-white max-w-lg">
            Tu progreso, tus programas y tu mentor en un solo lugar.
          </p>
          <p className="mt-6 text-sm text-acad-muted tracking-wide">{BRAND.tagline}</p>
        </div>
        <div className="flex gap-10 text-sm">
          <div>
            <p className="font-acadserif text-3xl text-white">40+</p>
            <p className="text-acad-muted text-xs mt-1">lecciones</p>
          </div>
          <div>
            <p className="font-acadserif text-3xl text-white">1.200+</p>
            <p className="text-acad-muted text-xs mt-1">alumnos</p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="lg:hidden mb-12">
            <Logo />
          </div>
          <h1 className="font-acadserif text-4xl text-white">Inicia sesión</h1>
          <p className="text-acad-muted mt-3 mb-10">Entra con el usuario que te llegó al correo.</p>

          <label className="block text-xs text-white/60 mb-2">Correo electrónico</label>
          <input
            type="email"
            defaultValue={DEMO_STUDENT.email}
            readOnly
            className="w-full rounded-xl bg-acad-panel border border-white/10 px-4 py-3.5 mb-5 text-white/85 outline-none focus:border-acad-gold/60"
          />

          <div className="flex justify-between mb-2">
            <label className="text-xs text-white/60">Contraseña</label>
            <span className="text-xs text-acad-gold/80">¿La olvidaste?</span>
          </div>
          <input
            type="password"
            defaultValue="demo1234"
            readOnly
            className="w-full rounded-xl bg-acad-panel border border-white/10 px-4 py-3.5 mb-8 text-white/85 outline-none focus:border-acad-gold/60"
          />

          <button type="submit" className={`${btnPrimary} w-full !py-3.5`}>
            Entrar a la plataforma
          </button>
          <p className="text-acad-muted text-xs mt-6 text-center">Demo: los datos ya vienen llenos, solo dale a entrar.</p>
        </form>
      </section>
    </main>
  );
}
