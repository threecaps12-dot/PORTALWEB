import type { Metadata } from "next";
import Script from "next/script";
import GraffitiIntro from "@/components/GraffitiIntro";
import "./globals.css";

export const metadata: Metadata = {
  title: "Three Caps — Gorras y streetwear urbano",
  description: "Edición limitada. Bordado real. Diseño de la calle.",
  icons: {
    icon: "/brand/three-caps-logo.jpg",
  },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("three-caps-theme");
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body className="bg-cream text-obsidian dark:bg-obsidian dark:text-cream font-body antialiased transition-colors duration-300">
        <GraffitiIntro />
        {children}
      </body>
    </html>
  );
}
