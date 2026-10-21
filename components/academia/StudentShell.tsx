"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DEMO_STUDENT } from "@/lib/academiaDemo";
import { useDemoSession } from "@/lib/academiaProgress";
import { Logo } from "@/components/academia/Brand";

const NAV = [
  { label: "Inicio", href: "/academia/mis-cursos", icon: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
  { label: "Mis programas", href: "/academia/mis-cursos#programas", icon: "M4 5h16v14H4zM4 9h16M9 5v4" },
  { label: "Recursos", href: null, icon: "M6 3h9l5 5v13H6zM14 3v6h6" },
  { label: "Comunidad", href: null, icon: "M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a4 4 0 100-8 4 4 0 000 8zM21 20v-2a4 4 0 00-3-3.9M16 2.1a4 4 0 010 7.8" },
];

/** Estructura del área privada del alumno: barra lateral + contenido. Redirige al login sin sesión. */
export default function StudentShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loggedIn, logout } = useDemoSession();

  useEffect(() => {
    if (loggedIn === false) router.replace("/academia/login");
  }, [loggedIn, router]);

  if (!loggedIn) return null;

  return (
    <div className="min-h-[calc(100vh-29px)] lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="hidden lg:flex flex-col border-r border-white/5 bg-acad-panel/60 px-5 py-6 sticky top-0 h-[calc(100vh-29px)]">
        <Logo size="sm" />
        <nav className="mt-10 space-y-1">
          {NAV.map((item) => {
            const active = item.href === pathname;
            const inner = (
              <>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                <span className="flex-1">{item.label}</span>
                {!item.href && <span className="text-[9px] tracking-widest uppercase text-acad-muted">Pronto</span>}
              </>
            );
            const cls = `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              active ? "bg-white/[0.06] text-white" : "text-white/55 hover:text-white hover:bg-white/[0.03]"
            }`;
            return item.href ? (
              <Link key={item.label} href={item.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <span key={item.label} className={`${cls} cursor-default opacity-60`}>
                {inner}
              </span>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-acad-gold/25 bg-gradient-to-b from-acad-gold/10 to-transparent p-4">
          <p className="text-[10px] tracking-[0.12em] uppercase text-acad-gold">Mentoría privada</p>
          <p className="mt-2 text-sm text-white/80 leading-snug">Acompañamiento uno a uno durante 8 semanas.</p>
          <p className="mt-3 text-xs text-acad-champagne">Desbloquear →</p>
        </div>

        <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-acad-champagne to-acad-gold grid place-items-center text-black text-xs font-semibold">
            AG
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{DEMO_STUDENT.fullName}</p>
            <p className="text-[11px] text-acad-muted truncate">{DEMO_STUDENT.email}</p>
          </div>
          <button
            type="button"
            title="Cerrar sesión"
            onClick={() => {
              logout();
              router.push("/academia");
            }}
            className="text-acad-muted hover:text-white transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 4h4a1 1 0 011 1v14a1 1 0 01-1 1h-4M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </aside>

      <header className="lg:hidden flex items-center justify-between px-5 h-14 border-b border-white/5">
        <Logo size="sm" href="/academia/mis-cursos" />
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/academia");
          }}
          className="text-xs text-acad-muted"
        >
          Salir
        </button>
      </header>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
