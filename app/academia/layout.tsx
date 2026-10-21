import type { Metadata } from "next";
import AcademiaHeader from "@/components/academia/AcademiaHeader";

export const metadata: Metadata = {
  title: "Academia Three Caps | Cursos de dropshipping",
  description: "Cursos y mentorías de dropshipping. Entra con tu usuario y aprende a tu ritmo.",
};

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-obsidian text-cream">
      <AcademiaHeader />
      {children}
      <footer className="border-t border-cream/10 mt-20 py-8 text-center text-cream/40 text-xs tracking-widest">
        ACADEMIA THREE CAPS · DEMO
      </footer>
    </div>
  );
}
