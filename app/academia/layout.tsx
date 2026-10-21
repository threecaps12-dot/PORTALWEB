import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { BRAND } from "@/lib/academiaDemo";

// Una sola familia: Archivo normal para texto y expandida para titulares (ver .font-acadserif en globals.css)
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-acad", display: "swap" });

export const metadata: Metadata = {
  title: `${BRAND.name} ${BRAND.suffix} | ${BRAND.tagline}`,
  description: "Programas y mentorías de ecommerce. Entra con tu usuario y aprende a tu ritmo.",
};

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${archivo.variable} font-acad min-h-screen bg-acad-bg text-white/90 antialiased selection:bg-acad-gold selection:text-black`}
    >
      <div className="relative z-50 text-center text-[11px] tracking-[0.12em] text-acad-gold/80 py-1.5 border-b border-white/5 bg-black">
        VISTA PREVIA · CONTENIDO DE EJEMPLO
      </div>
      {children}
    </div>
  );
}
