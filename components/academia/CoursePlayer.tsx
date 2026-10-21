"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEMO_STUDENT, DEMO_VIDEO_URL, allLessons, type Course } from "@/lib/academiaDemo";
import { useDemoSession, useProgress } from "@/lib/academiaProgress";

const MATERIAL_LABEL = { pdf: "PDF", link: "ENLACE", plantilla: "PLANTILLA" };

export default function CoursePlayer({ course }: { course: Course }) {
  const router = useRouter();
  const { loggedIn } = useDemoSession();
  const { done, toggle } = useProgress();
  const lessons = allLessons(course);
  const [currentId, setCurrentId] = useState(lessons[0].id);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (loggedIn === false) router.replace("/academia/login");
  }, [loggedIn, router]);

  useEffect(() => {
    setPlaying(false);
  }, [currentId]);

  if (!loggedIn) return null;

  if (!DEMO_STUDENT.enrolled.includes(course.slug)) {
    return (
      <main className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Este curso no está en tu plan</h1>
        <p className="text-cream/60 mt-4">Escríbenos para desbloquearlo y te damos acceso en minutos.</p>
        <Link href="/academia/mis-cursos" className="inline-block mt-8 font-display tracking-widest text-crimson text-xl">
          VOLVER A MIS CURSOS
        </Link>
      </main>
    );
  }

  const index = lessons.findIndex((l) => l.id === currentId);
  const lesson = lessons[index];
  const completed = done[course.slug] ?? [];
  const isDone = completed.includes(lesson.id);
  const pct = Math.round((completed.length / lessons.length) * 100);
  const next = lessons[index + 1];

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Link href="/academia/mis-cursos" className="text-cream/50 hover:text-cream text-sm tracking-widest">
        ← MIS CURSOS
      </Link>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-4">
        <section>
          <div className="relative aspect-video bg-black border border-cream/10 overflow-hidden">
            {playing ? (
              <video key={lesson.id} src={DEMO_VIDEO_URL} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-crimson/40 via-obsidian to-obsidian group"
              >
                <span className="w-20 h-20 rounded-full bg-crimson group-hover:scale-110 transition-transform flex items-center justify-center">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="font-display text-3xl md:text-4xl px-6 text-center">{lesson.title}</span>
                <span className="text-cream/50 text-sm">{lesson.duration} · video de ejemplo</span>
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.3em]">
                LECCIÓN {index + 1} DE {lessons.length}
              </p>
              <h1 className="font-display text-4xl md:text-5xl mt-1">{lesson.title}</h1>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => toggle(course.slug, lesson.id)}
                className={`font-display tracking-widest text-lg px-5 py-2 border transition-colors ${
                  isDone ? "bg-gold text-obsidian border-gold" : "border-cream/30 hover:border-cream"
                }`}
              >
                {isDone ? "✓ COMPLETADA" : "MARCAR COMO VISTA"}
              </button>
              {next && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isDone) toggle(course.slug, lesson.id);
                    setCurrentId(next.id);
                  }}
                  className="bg-crimson hover:bg-crimson-hover font-display tracking-widest text-lg px-5 py-2 transition-colors"
                >
                  SIGUIENTE →
                </button>
              )}
            </div>
          </div>

          <p className="text-cream/70 mt-4 max-w-3xl">{lesson.description}</p>

          {lesson.materials && (
            <div className="mt-8">
              <h2 className="font-display text-2xl tracking-wide mb-3">Material de la clase</h2>
              <ul className="space-y-2">
                {lesson.materials.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-center justify-between bg-obsidian-soft border border-cream/10 px-4 py-3"
                  >
                    <span>{m.label}</span>
                    <span className="text-xs tracking-widest text-gold">{MATERIAL_LABEL[m.kind]} · DESCARGAR</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <aside className="bg-obsidian-soft border border-cream/10 self-start lg:sticky lg:top-28">
          <div className="p-5 border-b border-cream/10">
            <h2 className="font-display text-2xl leading-none">{course.title}</h2>
            <div className="flex justify-between text-sm text-cream/60 mt-3 mb-2">
              <span>Tu progreso</span>
              <span className="text-gold">{pct}%</span>
            </div>
            <div className="h-1.5 bg-cream/10">
              <div className="h-full bg-crimson transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          {course.modules.map((mod, mi) => (
            <div key={mod.id}>
              <p className="px-5 pt-4 pb-2 text-xs tracking-widest text-cream/40">
                MÓDULO {mi + 1} · {mod.title.toUpperCase()}
              </p>
              <ul>
                {mod.lessons.map((l) => {
                  const active = l.id === currentId;
                  const seen = completed.includes(l.id);
                  return (
                    <li key={l.id}>
                      <button
                        type="button"
                        onClick={() => setCurrentId(l.id)}
                        className={`w-full text-left px-5 py-3 flex items-center gap-3 text-sm transition-colors ${
                          active ? "bg-crimson/20 border-l-2 border-crimson" : "border-l-2 border-transparent hover:bg-cream/5"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center text-[11px] ${
                            seen ? "bg-gold border-gold text-obsidian" : "border-cream/30"
                          }`}
                        >
                          {seen && "✓"}
                        </span>
                        <span className="flex-1">{l.title}</span>
                        <span className="text-cream/40 text-xs">{l.duration}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}
