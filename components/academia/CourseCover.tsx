import { ACCENT_GRADIENT, type Course } from "@/lib/academiaDemo";

/** Portada generada para cada curso (en la real el dueño sube su propia imagen). */
export default function CourseCover({ course, locked = false }: { course: Course; locked?: boolean }) {
  return (
    <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${ACCENT_GRADIENT[course.accent]}`}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(250,248,245,0.15) 0 2px, transparent 2px 14px)",
        }}
      />
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <span className="self-start bg-obsidian/70 text-cream text-[11px] tracking-widest px-2 py-1">
          {course.kind.toUpperCase()} · {course.level.toUpperCase()}
        </span>
        <h3 className="font-display text-3xl md:text-4xl leading-none text-cream drop-shadow-lg">
          {course.title}
        </h3>
      </div>
      {locked && (
        <div className="absolute inset-0 bg-obsidian/70 flex flex-col items-center justify-center gap-2">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
            <rect x="5" y="11" width="14" height="10" rx="1" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          <span className="font-display tracking-widest text-gold">NO INCLUIDO EN TU PLAN</span>
        </div>
      )}
    </div>
  );
}
