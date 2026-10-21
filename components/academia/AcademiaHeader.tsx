"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDemoSession } from "@/lib/academiaProgress";

export default function AcademiaHeader() {
  const { loggedIn, logout } = useDemoSession();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-obsidian/90 backdrop-blur border-b border-cream/10">
      <div className="bg-gold text-obsidian text-center text-xs tracking-widest py-1.5 font-medium">
        VERSIÓN DEMO · CONTENIDO DE EJEMPLO ·{" "}
        <Link href="/academia/panel" className="underline underline-offset-2 hover:text-crimson">
          VER PANEL DEL DUEÑO
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/academia" className="flex items-center gap-3">
          <Image
            src="/brand/three-caps-wordmark.png"
            alt="Three Caps"
            width={1942}
            height={809}
            className="h-7 w-auto object-contain"
            priority
          />
          <span className="font-display text-xl tracking-widest text-crimson border-l border-cream/20 pl-3">
            ACADEMIA
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 font-display text-lg tracking-wide text-cream/80">
          <Link href="/academia#cursos" className="hidden sm:block hover:text-crimson transition-colors">
            CURSOS
          </Link>
          {loggedIn ? (
            <>
              <Link href="/academia/mis-cursos" className="hover:text-crimson transition-colors">
                MIS CURSOS
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/academia");
                }}
                className="text-cream/50 hover:text-cream transition-colors text-base"
              >
                SALIR
              </button>
            </>
          ) : (
            <Link
              href="/academia/login"
              className="bg-crimson hover:bg-crimson-hover text-cream px-4 py-1.5 transition-colors"
            >
              ENTRAR
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
