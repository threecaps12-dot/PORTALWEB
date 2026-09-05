"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "spraying" | "revealed" | "closing";

const EMBER_COLORS = ["#FFB84D", "#D4AF37", "#8C0B1E", "#FF6B35", "#FAF8F5"];

/** Genera un campo de chispas que suben por toda la pantalla, como si todo ardiera. */
function buildEmbers(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const left = 2 + ((i * 97) / count) + (i % 3) * 1.5; // esparcidas, no en fila perfecta
    return {
      left: `${Math.min(left, 97)}%`,
      size: 3 + (i % 4) * 1.5,
      color: EMBER_COLORS[i % EMBER_COLORS.length],
      delay: `${(i * 83) % 900}ms`,
      duration: `${1800 + (i % 5) * 260}ms`,
    };
  });
}

/**
 * Cortina de apertura: el logo arde y se "escribe" con un pase de spray
 * (clip-path barriendo de izquierda a derecha + una boquilla de luz),
 * mientras un campo de chispas sube por toda la pantalla y un resplandor
 * de fuego titila detrás del logo. Se mantiene un instante y luego dos
 * paneles tipo telón se abren en direcciones opuestas.
 * Se reproduce en cada carga/refresh; tocable para saltarla.
 */
export default function GraffitiIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("spraying");
  const [embers] = useState(() => buildEmbers(20));

  useEffect(() => {
    setShow(true);
    setPhase("spraying");
    const toRevealed = setTimeout(() => setPhase("revealed"), 1150);
    const toClosing = setTimeout(() => setPhase("closing"), 2050);
    const unmount = setTimeout(() => setShow(false), 2800);
    return () => {
      clearTimeout(toRevealed);
      clearTimeout(toClosing);
      clearTimeout(unmount);
    };
  }, []);

  function skip() {
    setPhase("closing");
    setTimeout(() => setShow(false), 700);
  }

  if (!show) return null;

  const closing = phase === "closing";
  const spraying = phase === "spraying";

  const PUFFS = [
    { top: "8%", size: 64, blur: "blur-lg", delay: "0ms", color: "rgba(255,180,80,0.5)" },
    { top: "38%", size: 90, blur: "blur-xl", delay: "60ms", color: "rgba(212,175,55,0.4)" },
    { top: "62%", size: 56, blur: "blur-md", delay: "120ms", color: "rgba(255,107,53,0.45)" },
    { top: "82%", size: 74, blur: "blur-lg", delay: "40ms", color: "rgba(212,175,55,0.35)" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian overflow-hidden">
      {/* Resplandor de fuego: titila detrás de todo mientras la intro está viva */}
      {!closing && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,107,53,0.32),transparent_60%)] animate-flame-flicker" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-crimson/25 via-transparent to-transparent" />
        </>
      )}

      {/* Campo de chispas subiendo por toda la pantalla */}
      {!closing &&
        embers.map((e, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full blur-[1px] animate-ember-float"
            style={{
              left: e.left,
              width: e.size,
              height: e.size,
              background: e.color,
              boxShadow: `0 0 7px 1.5px ${e.color}`,
              animationDelay: e.delay,
              animationDuration: e.duration,
            }}
          />
        ))}

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
        <div className="relative w-[80vw] max-w-md md:max-w-xl aspect-[1942/809] overflow-visible">
          {/* Brasa detrás del logo: glow intenso y titilante, como si ardiera */}
          {!closing && (
            <div className="absolute -inset-x-10 -inset-y-10 bg-[radial-gradient(ellipse,rgba(255,120,40,0.45),transparent_65%)] blur-2xl animate-flame-flicker" />
          )}

          <div className="relative w-full h-full overflow-hidden">
            {/* Nubes de bruma cálida que viajan junto al borde del spray */}
            {spraying &&
              PUFFS.map((p, i) => (
                <span
                  key={i}
                  className={`absolute rounded-full ${p.blur} animate-spray-glow-move`}
                  style={{
                    top: p.top,
                    width: p.size,
                    height: p.size,
                    marginLeft: -p.size / 2,
                    background: `radial-gradient(circle, ${p.color}, transparent 70%)`,
                    animationDelay: p.delay,
                  }}
                />
              ))}

            <div className="absolute inset-0 animate-spray-reveal">
              <Image
                src="/brand/three-caps-wordmark.png"
                alt="Three Caps"
                fill
                priority
                className="object-contain drop-shadow-[0_0_22px_rgba(255,120,40,0.35)]"
              />
            </div>

            {/* Boquilla del spray: borde de luz que recorre el logo mientras se revela */}
            {spraying && (
              <span className="absolute inset-y-0 w-8 -ml-4 blur-md bg-gradient-to-r from-transparent via-cream to-transparent animate-spray-glow-move" />
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
