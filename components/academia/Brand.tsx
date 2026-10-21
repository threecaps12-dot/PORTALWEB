import Link from "next/link";
import { BRAND, type Course } from "@/lib/academiaDemo";

export function Logo({ href = "/academia", size = "md" }: { href?: string; size?: "sm" | "md" }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      <span
        className={`relative grid place-items-center rounded-full border border-acad-gold/50 ${
          size === "sm" ? "w-7 h-7" : "w-8 h-8"
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-acad-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 18h16M6 14h12M8 10h8M10 6h4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`font-acadserif uppercase text-white ${size === "sm" ? "text-base" : "text-lg"}`}>{BRAND.name}</span>
        <span className="ml-1.5 text-[10px] tracking-[0.12em] text-acad-muted uppercase">{BRAND.suffix}</span>
      </span>
    </Link>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-[0.12em] uppercase text-acad-gold">
      {children}
    </p>
  );
}

const THEMES: Record<Course["theme"], string> = {
  gold: "radial-gradient(120% 90% at 85% 10%, rgba(233,217,180,0.35), transparent 55%), radial-gradient(90% 80% at 10% 100%, rgba(201,169,110,0.35), transparent 60%), linear-gradient(160deg, #1b1712, #0a0908)",
  ivory: "radial-gradient(110% 90% at 20% 0%, rgba(245,240,230,0.28), transparent 55%), radial-gradient(80% 70% at 100% 100%, rgba(140,150,170,0.25), transparent 60%), linear-gradient(160deg, #16171b, #09090b)",
  bronze: "radial-gradient(110% 90% at 80% 100%, rgba(176,110,60,0.45), transparent 55%), radial-gradient(80% 70% at 0% 0%, rgba(201,169,110,0.25), transparent 60%), linear-gradient(160deg, #1d130d, #0a0807)",
};

/** Portada generada del programa. En la versión real el dueño sube su propia imagen. */
export function CourseCover({
  course,
  locked = false,
  compact = false,
  thumb = false,
}: {
  course: Course;
  locked?: boolean;
  compact?: boolean;
  thumb?: boolean;
}) {
  if (thumb) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden acad-grain grid place-items-center" style={{ background: THEMES[course.theme] }}>
        <span className="font-acadserif text-4xl text-white/80">{course.number}</span>
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] overflow-hidden acad-grain" style={{ background: THEMES[course.theme] }}>
      <div className="absolute inset-3 border border-white/10" />
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] tracking-[0.12em] uppercase text-white/60">
          <span>
            {course.kind} {course.number}
          </span>
          <span>{course.level}</span>
        </div>
        <div>
          <h3 className={`font-acadserif uppercase text-white leading-[0.95] ${compact ? "text-xl" : "text-[1.65rem]"}`}>
            {course.title}
          </h3>
        </div>
      </div>
      {locked && (
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] grid place-items-center">
          <div className="text-center">
            <span className="mx-auto grid place-items-center w-11 h-11 rounded-full border border-acad-gold/50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-acad-gold">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
            </span>
            <p className="mt-3 text-[11px] tracking-[0.12em] uppercase text-acad-champagne">No incluido en tu plan</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-acad-gold to-acad-champagne transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function ProgressRing({ value, size = 44 }: { value: number; size?: number }) {
  const r = (size - 4) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#C9A96E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (value / 100) * c}
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[11px] text-white/80 tabular-nums">{value}%</span>
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-acad-champagne to-acad-gold text-black text-sm font-medium px-6 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset,0_10px_30px_-10px_rgba(201,169,110,0.6)] hover:brightness-110 transition";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white/90 text-sm px-6 py-3 hover:border-white/40 hover:bg-white/5 transition";
