"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "spraying" | "revealed" | "closing";

/**
 * Cortina de apertura: el logo aparece "escrito" con un pase de spray
 * (clip-path barriendo de izquierda a derecha + un borde de luz que
 * simula la boquilla del spray), se mantiene un instante, y luego dos
 * paneles tipo telón se abren en direcciones opuestas. Una vez por
 * sesión, tocable para saltarla.
 */
export default function GraffitiIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("spraying");

  useEffect(() => {
    const seen = sessionStorage.getItem("three-caps-intro-seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("three-caps-intro-seen", "1");
      const toRevealed = setTimeout(() => setPhase("revealed"), 1150);
      const toClosing = setTimeout(() => setPhase("closing"), 2050);
      const unmount = setTimeout(() => setShow(false), 2800);
      return () => {
        clearTimeout(toRevealed);
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
  const spraying = phase === "spraying";

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.14),transparent_60%)]" />
        {/* Textura fina de pared, apenas visible, para que el spray tenga "superficie" */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #FAF8F5 0px, #FAF8F5 1px, transparent 1px, transparent 14px)",
          }}
        />

        <div className="relative w-[78vw] max-w-md md:max-w-xl">
          {/* Bruma del spray: un par de nubes suaves que se disipan detrás del logo */}
          {spraying && (
            <>
              <span
                className="absolute -inset-x-6 top-1/3 h-1/3 bg-[radial-gradient(ellipse,rgba(250,248,245,0.35),transparent_70%)] blur-xl animate-mist-fade"
                style={{ animationDelay: "80ms" }}
              />
              <span
                className="absolute -inset-x-10 top-1/2 h-1/2 bg-[radial-gradient(ellipse,rgba(212,175,55,0.25),transparent_70%)] blur-2xl animate-mist-fade"
                style={{ animationDelay: "260ms" }}
              />
            </>
          )}

          <div className="relative w-full aspect-[1942/809] animate-spray-focus">
            <div className="absolute inset-0 animate-spray-reveal">
              <Image
                src="/brand/three-caps-wordmark.png"
                alt="Three Caps"
                fill
                priority
                className="object-contain drop-shadow-[0_0_18px_rgba(212,175,55,0.2)]"
              />
            </div>

            {/* Boquilla del spray: borde de luz que recorre el logo mientras se revela */}
            {spraying && (
              <span className="absolute inset-y-0 w-6 -ml-3 blur-md bg-gradient-to-r from-transparent via-cream to-transparent animate-spray-glow-move" />
            )}
          </div>
        </div>

        <span className="absolute bottom-10 text-cream/40 text-[11px] tracking-[0.25em]">
          TOCA PARA CONTINUAR
        </span>
      </button>
    </div>
  );
}
