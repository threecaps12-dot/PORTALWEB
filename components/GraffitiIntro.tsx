"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "draw" | "reveal" | "closing";

/**
 * Cortina de apertura: el escudo se "borda" con un trazo animado
 * (stroke-dashoffset con pathLength=1), se revela a color, y luego dos
 * paneles tipo telón se abren en direcciones opuestas para mostrar el
 * sitio. Una vez por sesión, tocable para saltarla.
 */
export default function GraffitiIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("draw");

  useEffect(() => {
    const seen = sessionStorage.getItem("three-caps-intro-seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("three-caps-intro-seen", "1");
      const toReveal = setTimeout(() => setPhase("reveal"), 1100);
      const toClosing = setTimeout(() => setPhase("closing"), 2150);
      const unmount = setTimeout(() => setShow(false), 2850);
      return () => {
        clearTimeout(toReveal);
        clearTimeout(toClosing);
        clearTimeout(unmount);
      };
    }
  }, []);

  function skip() {
    setPhase("closing");
    setTimeout(() => setShow(false), 700);
  }

  if (!show) return null;

  const closing = phase === "closing";
  const revealed = phase !== "draw";

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-obsidian transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          closing ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-obsidian transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          closing ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <button
        onClick={skip}
        aria-label="Saltar introducción"
        className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500 ${
          closing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.16),transparent_65%)]" />

        <div className="relative w-36 h-36 md:w-48 md:h-48">
          {!revealed && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(212,175,55,0.25)]">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                className="animate-draw"
              />
              <path
                d="M15 55 Q15 25 50 22 Q85 25 85 55 Q50 68 15 55 Z"
                fill="none"
                stroke="#FAF8F5"
                strokeWidth="2"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1, animationDelay: "300ms" }}
                className="animate-draw"
              />
              <path
                d="M15 55 Q50 75 85 55 L92 66 Q50 88 8 66 Z"
                fill="none"
                stroke="#8C0B1E"
                strokeWidth="2"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1, animationDelay: "550ms" }}
                className="animate-draw"
              />
            </svg>
          )}

          {revealed && (
            <div className="relative w-full h-full animate-badge-pop">
              <Image
                src="/brand/three-caps-logo.png"
                alt="Three Caps"
                fill
                className="object-contain rounded-full"
                priority
              />
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cream/40 to-transparent animate-shine-sweep" />
              </div>
            </div>
          )}
        </div>

        <span
          className={`mt-6 text-cream text-xs md:text-sm tracking-[0.4em] transition-opacity duration-500 ${
            revealed ? "opacity-80" : "opacity-0"
          }`}
        >
          THREE CAPS
        </span>

        <span className="absolute bottom-10 text-cream/40 text-[11px] tracking-[0.25em]">
          TOCA PARA CONTINUAR
        </span>
      </button>
    </div>
  );
}
