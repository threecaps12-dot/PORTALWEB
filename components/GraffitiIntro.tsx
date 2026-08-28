"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Cortina de apertura: logo con entrada suave (fade + scale) y un barrido
 * de brillo diagonal, sobre fondo obsidian con viñeta dorada sutil.
 * Se muestra una vez por sesión y es tocable para saltarla.
 */
export default function GraffitiIntro() {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("three-caps-intro-seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("three-caps-intro-seen", "1");
      const startClose = setTimeout(() => setClosing(true), 1800);
      const unmount = setTimeout(() => setShow(false), 2400);
      return () => {
        clearTimeout(startClose);
        clearTimeout(unmount);
      };
    }
  }, []);

  function skip() {
    setClosing(true);
    setTimeout(() => setShow(false), 500);
  }

  if (!show) return null;

  return (
    <button
      onClick={skip}
      aria-label="Saltar introducción"
      className={`fixed inset-0 z-[100] w-full bg-obsidian flex flex-col items-center justify-center cursor-pointer ${
        closing ? "animate-curtain-out" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.14),transparent_65%)]" />

      <div className="relative w-40 h-40 md:w-52 md:h-52 animate-logo-in">
        <Image
          src="/brand/three-caps-logo.jpg"
          alt="Three Caps"
          fill
          className="rounded-full object-cover"
          priority
        />
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cream/50 to-transparent animate-shine-sweep" />
        </div>
        <div className="absolute inset-0 rounded-full ring-1 ring-gold/40" />
      </div>

      <span className="absolute bottom-10 text-cream/40 text-[11px] tracking-[0.25em]">
        TOCA PARA CONTINUAR
      </span>
    </button>
  );
}
