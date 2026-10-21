"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEMO_STUDENT, DEMO_VIDEO_URL, allLessons, type Course } from "@/lib/academiaDemo";
import { useDemoSession, useProgress } from "@/lib/academiaProgress";
import { Logo, ProgressRing, btnGhost, btnPrimary } from "@/components/academia/Brand";

const MATERIAL_LABEL = { pdf: "PDF", link: "Enlace", plantilla: "Plantilla" };
type Tab = "resumen" | "materiales" | "notas";

function notesKey(course: string, lesson: string) {
  return `escala-notas-${course}-${lesson}`;
}

export default function CoursePlayer({ course }: { course: Course }) {
  const router = useRouter();
  const { loggedIn } = useDemoSession();
  const { done, toggle } = useProgress();
  const lessons = allLessons(course);
  const [currentId, setCurrentId] = useState(lessons[0].id);
  const [playing, setPlaying] = useState(false);
  const [tab, setTab] = useState<Tab>("resumen");
  const [notes, setNotes] = useState("");
  const [openModules, setOpenModules] = useState<string[]>(course.modules.map((m) => m.id));

  useEffect(() => {
    if (loggedIn === false) router.replace("/academia/login");
  }, [loggedIn, router]);

  useEffect(() => {
    setPlaying(false);
    try {
      setNotes(localStorage.getItem(notesKey(course.slug, currentId)) ?? "");
    } catch {
      setNotes("");
    }
  }, [course.slug, currentId]);

  if (!loggedIn) return null;

  if (!DEMO_STUDENT.enrolled.includes(course.slug)) {
    return (
      <main className="max-w-xl mx-auto px-5 py-32 text-center">
        <h1 className="font-acadserif text-5xl text-white">Este programa no está en tu plan</h1>
        <p className="text-acad-muted mt-4">Escríbenos para desbloquearlo y te damos acceso en minutos.</p>
        <Link href="/academia/mis-cursos" className={`${btnGhost} mt-10`}>
          Volver a mis programas
        </Link>
      </main>
    );
  }

  const index = lessons.findIndex((l) => l.id === currentId);
  const lesson = lessons[index];
  const completed = done[course.slug] ?? [];
  const isDone = completed.includes(lesson.id);
  const pct = Math.round((completed.length / lessons.length) * 100);
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const moduleOf = course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id));

  function saveNotes(value: string) {
    setNotes(value);
    try {
      localStorage.setItem(notesKey(course.slug, currentId), value);
    } catch {}
  }

  return (
    <div className="min-h-[calc(100vh-29px)]">
      <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-acad-bg/80 backdrop-blur-xl">
        <div className="h-full px-5 md:px-8 flex items-center gap-5">
          <Link
            href="/academia/mis-cursos"
            className="grid place-items-center w-9 h-9 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition"
            title="Volver"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div className="hidden sm:block">
            <Logo size="sm" href="/academia/mis-cursos" />
          </div>
          <span className="hidden sm:block h-6 w-px bg-white/10" />
          <p className="flex-1 min-w-0 truncate text-sm text-white/70">{course.title}</p>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-xs text-acad-muted">Tu progreso</span>
            <ProgressRing value={pct} size={40} />
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
        <section className="px-5 md:px-8 py-8 min-w-0">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,1)]">
            {playing ? (
              <video key={lesson.id} src={DEMO_VIDEO_URL} controls autoPlay className="w-full h-full object-contain bg-black" />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 acad-grain bg-[radial-gradient(80%_70%_at_70%_20%,rgba(201,169,110,0.28),transparent_60%),linear-gradient(160deg,#17150f,#050506)]"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
                  <span className="w-20 h-20 rounded-full bg-white/95 grid place-items-center shadow-[0_0_0_10px_rgba(255,255,255,0.06)] group-hover:scale-105 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" className="ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="font-acadserif text-3xl md:text-5xl text-white text-center leading-tight max-w-2xl">
                    {lesson.title}
                  </span>
                </div>
                <div className="absolute bottom-5 left-6 right-6 flex justify-between text-xs text-white/50">
                  <span>{moduleOf?.title}</span>
                  <span>{lesson.duration} · video de ejemplo</span>
                </div>
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="text-[11px] tracking-[0.3em] uppercase text-acad-gold">
                Lección {index + 1} de {lessons.length}
              </p>
              <h1 className="mt-2 font-acadserif text-4xl md:text-5xl text-white leading-tight">{lesson.title}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => toggle(course.slug, lesson.id)}
                className={
                  isDone
                    ? "inline-flex items-center gap-2 rounded-full border border-acad-gold/60 bg-acad-gold/10 text-acad-champagne text-sm px-5 py-3"
                    : btnGhost
                }
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isDone ? "Completada" : "Marcar como completada"}
              </button>
              {next && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isDone) toggle(course.slug, lesson.id);
                    setCurrentId(next.id);
                  }}
                  className={btnPrimary}
                >
                  Siguiente lección →
                </button>
              )}
            </div>
          </div>

          <div className="mt-10 border-b border-white/10 flex gap-8 text-sm">
            {(
              [
                ["resumen", "Resumen"],
                ["materiales", `Materiales${lesson.materials ? ` (${lesson.materials.length})` : ""}`],
                ["notas", "Mis notas"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`pb-3 -mb-px border-b transition ${
                  tab === id ? "border-acad-gold text-white" : "border-transparent text-acad-muted hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-8 max-w-3xl">
            {tab === "resumen" && <p className="text-white/65 leading-relaxed text-lg">{lesson.description}</p>}
            {tab === "materiales" &&
              (lesson.materials ? (
                <ul className="space-y-3">
                  {lesson.materials.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-acad-panel px-5 py-4 hover:border-acad-gold/40 transition"
                    >
                      <span className="grid place-items-center w-10 h-10 rounded-lg bg-acad-gold/10 text-acad-gold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M6 3h9l5 5v13H6zM14 3v6h6" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="text-white text-sm">{m.label}</p>
                        <p className="text-acad-muted text-xs mt-0.5">{MATERIAL_LABEL[m.kind]}</p>
                      </div>
                      <span className="text-xs text-acad-champagne">Descargar ↓</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-acad-muted">Esta lección no tiene materiales adicionales.</p>
              ))}
            {tab === "notas" && (
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => saveNotes(e.target.value)}
                  rows={6}
                  placeholder="Escribe lo más importante de esta lección. Se guarda solo."
                  className="w-full rounded-xl bg-acad-panel border border-white/10 p-4 text-white/85 placeholder:text-acad-muted outline-none focus:border-acad-gold/50 resize-none"
                />
                <p className="mt-2 text-xs text-acad-muted">Tus notas son privadas y se guardan automáticamente.</p>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4 pt-6 border-t border-white/5 text-sm">
            {prev ? (
              <button type="button" onClick={() => setCurrentId(prev.id)} className="text-left text-acad-muted hover:text-white transition">
                <span className="block text-[11px] tracking-widest uppercase">Anterior</span>
                {prev.title}
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button type="button" onClick={() => setCurrentId(next.id)} className="text-right text-acad-muted hover:text-white transition">
                <span className="block text-[11px] tracking-widest uppercase">Siguiente</span>
                {next.title}
              </button>
            )}
          </div>
        </section>

        <aside className="lg:border-l border-t lg:border-t-0 border-white/5 bg-acad-panel/40 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-6 border-b border-white/5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-acad-gold">Contenido del programa</p>
            <p className="mt-2 text-sm text-acad-muted">
              {completed.length} de {lessons.length} lecciones completadas
            </p>
          </div>
          {course.modules.map((mod, mi) => {
            const open = openModules.includes(mod.id);
            const modDone = mod.lessons.filter((l) => completed.includes(l.id)).length;
            return (
              <div key={mod.id} className="border-b border-white/5">
                <button
                  type="button"
                  onClick={() =>
                    setOpenModules((o) => (o.includes(mod.id) ? o.filter((x) => x !== mod.id) : [...o, mod.id]))
                  }
                  className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition"
                >
                  <span className="font-acadserif italic text-2xl text-acad-gold/70 w-6">{mi + 1}</span>
                  <span className="flex-1">
                    <span className="block text-sm text-white">{mod.title}</span>
                    <span className="block text-[11px] text-acad-muted mt-0.5">
                      {modDone}/{mod.lessons.length} lecciones
                    </span>
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-acad-muted transition-transform ${open ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open && (
                  <ul className="pb-2">
                    {mod.lessons.map((l) => {
                      const active = l.id === currentId;
                      const seen = completed.includes(l.id);
                      return (
                        <li key={l.id}>
                          <button
                            type="button"
                            onClick={() => setCurrentId(l.id)}
                            className={`w-full flex items-center gap-3 pl-16 pr-6 py-3 text-left text-sm transition ${
                              active ? "bg-acad-gold/[0.08] text-white" : "text-white/60 hover:text-white"
                            }`}
                          >
                            <span
                              className={`w-[18px] h-[18px] shrink-0 rounded-full border grid place-items-center ${
                                seen ? "bg-acad-gold border-acad-gold" : active ? "border-acad-gold" : "border-white/25"
                              }`}
                            >
                              {seen && (
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5">
                                  <path d="M5 12l5 5L20 7" />
                                </svg>
                              )}
                            </span>
                            <span className="flex-1 leading-snug">{l.title}</span>
                            <span className="text-[11px] text-acad-muted tabular-nums">{l.duration}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
