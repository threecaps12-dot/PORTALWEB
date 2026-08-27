"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Overlay de apertura: el logo se revela con efecto aerosol (blur +
 * fade) y luego se desvanece mostrando el sitio. Se muestra solo
 * una vez por sesión.
 */
export default function GraffitiIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("three-caps-intro-seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("three-caps-intro-seen", "1");
      const timer = setTimeout(() => setShow(false), 2600);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-obsidian flex items-center justify-center animate-fade-out"
      style={{ animationDelay: "2.0s" }}
      aria-hidden="true"
    >
      {/* Textura de spray sutil detrás del logo */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,rgba(140,11,30,0.5),transparent_60%)]" />

      <div className="relative w-48 h-48 md:w-64 md:h-64 animate-spray-in">
        <Image
          src="/brand/three-caps-logo.jpg"
          alt="Three Caps"
          fill
          className="rounded-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
