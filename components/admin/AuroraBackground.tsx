/**
 * Fondo "aurora": tres nubes de color (crimson/gold/ámbar) flotando y
 * mezclándose lento sobre el obsidiana. Puramente decorativo — se pone
 * detrás del contenido con pointer-events-none.
 */
export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[70%] h-[70%] top-[-20%] left-[-10%] rounded-full blur-3xl opacity-40 animate-aurora-drift-1"
        style={{ background: "radial-gradient(circle, rgba(140,11,30,0.65), transparent 70%)" }}
      />
      <div
        className="absolute w-[60%] h-[60%] bottom-[-15%] right-[-10%] rounded-full blur-3xl opacity-35 animate-aurora-drift-2"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.5), transparent 70%)" }}
      />
      <div
        className="absolute w-[55%] h-[55%] top-[30%] left-[30%] rounded-full blur-3xl opacity-25 animate-aurora-drift-3"
        style={{ background: "radial-gradient(circle, rgba(255,107,53,0.45), transparent 70%)" }}
      />
    </div>
  );
}
