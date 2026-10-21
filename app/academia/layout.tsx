import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { BRAND } from "@/lib/academiaDemo";

const inter = Inter({ subsets: ["latin"], variable: "--font-acad", display: "swap" });
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-acad-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} ${BRAND.suffix} | ${BRAND.tagline}`,
  description: "Programas y mentorías de ecommerce. Entra con tu usuario y aprende a tu ritmo.",
};

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${serif.variable} font-acad min-h-screen bg-acad-bg text-white/90 antialiased selection:bg-acad-gold selection:text-black`}
    >
      <div className="relative z-50 text-center text-[11px] tracking-[0.25em] text-acad-gold/80 py-1.5 border-b border-white/5 bg-black">
        VISTA PREVIA · CONTENIDO DE EJEMPLO
      </div>
      {children}
    </div>
  );
}
