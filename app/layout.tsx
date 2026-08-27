import type { Metadata } from "next";
import GraffitiIntro from "@/components/GraffitiIntro";
import "./globals.css";

export const metadata: Metadata = {
  title: "Three Caps — Gorras y streetwear urbano",
  description: "Edición limitada. Bordado real. Diseño de la calle.",
  icons: {
    icon: "/brand/three-caps-logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-cream text-obsidian font-body antialiased">
        <GraffitiIntro />
        {children}
      </body>
    </html>
  );
}
