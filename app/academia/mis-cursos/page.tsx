"use client";

import Link from "next/link";
import StudentShell from "@/components/academia/StudentShell";
import { CourseCover, Eyebrow, ProgressBar, btnPrimary } from "@/components/academia/Brand";
import { COURSES, DEMO_STUDENT, allLessons } from "@/lib/academiaDemo";
import { useProgress } from "@/lib/academiaProgress";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches";
}

export default function MisCursos() {
  const { done } = useProgress();

  const enrolled = COURSES.filter((c) => DEMO_STUDENT.enrolled.includes(c.slug));
  const stats = enrolled.map((c) => {
    const lessons = allLessons(c);
    const completed = (done[c.slug] ?? []).length;
    return { course: c, total: lessons.length, completed, next: lessons.find((l) => !(done[c.slug] ?? []).includes(l.id)) };
  });
  const totalLessons = stats.reduce((n, s) => n + s.total, 0);
  const totalDone = stats.reduce((n, s) => n + s.completed, 0);
  const overall = Math.round((totalDone / totalLessons) * 100);
  const current = stats.find((s) => s.next) ?? stats[0];
  const currentPct = Math.round((current.completed / current.total) * 100);

  return (
    <StudentShell>
      <main className="px-5 md:px-10 py-10 max-w-6xl">
        <Eyebrow>{greeting()}</Eyebrow>
        <h1 className="mt-4 font-acadserif text-5xl md:text-6xl text-white">
          Hola, <em className="text-acad-champagne">{DEMO_STUDENT.name}.</em>
        </h1>
        <p className="mt-3 text-acad-muted">Sigue donde lo dejaste. Una lección al día cambia el resultado.</p>

        {/* Continuar */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-acad-panel overflow-hidden grid md:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <CourseCover course={current.course} />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-acad-gold">Continuar viendo</p>
            <h2 className="mt-3 font-acadserif text-3xl md:text-4xl text-white leading-tight">
              {current.next?.title ?? "Programa completado"}
            </h2>
            <p className="mt-2 text-sm text-acad-muted">
              {current.course.title} · {current.next?.duration ?? "Repasa cuando quieras"}
            </p>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-white/50 mb-2">
                <span>
                  {current.completed} de {current.total} lecciones
                </span>
                <span className="text-acad-champagne">{currentPct}%</span>
              </div>
              <ProgressBar value={currentPct} />
            </div>
            <Link href={`/academia/curso/${current.course.slug}`} className={`${btnPrimary} mt-8 self-start`}>
              {current.completed === 0 ? "Empezar ahora" : "Continuar lección"}
            </Link>
          </div>
        </section>

        {/* Cifras del alumno */}
        <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Programas activos", value: String(enrolled.length) },
            { label: "Lecciones completadas", value: `${totalDone}/${totalLessons}` },
            { label: "Progreso general", value: `${overall}%` },
            { label: "Racha actual", value: totalDone > 0 ? "1 día" : "0 días" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-acad-panel/60 p-5">
              <p className="text-[11px] text-acad-muted">{s.label}</p>
              <p className="mt-2 text-3xl font-light text-white tabular-nums tracking-tight">{s.value}</p>
            </div>
          ))}
        </section>

        {/* Programas */}
        <section id="programas" className="mt-16 scroll-mt-10">
          <h2 className="font-acadserif text-4xl text-white">Tus programas</h2>
          <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {COURSES.map((c) => {
              const isEnrolled = DEMO_STUDENT.enrolled.includes(c.slug);
              const total = allLessons(c).length;
              const completed = (done[c.slug] ?? []).length;
              const pct = Math.round((completed / total) * 100);
              const card = (
                <article className="group h-full rounded-2xl border border-white/10 bg-acad-panel overflow-hidden hover:border-acad-gold/40 transition-colors">
                  <CourseCover course={c} locked={!isEnrolled} compact />
                  <div className="p-5">
                    {isEnrolled ? (
                      <>
                        <div className="flex justify-between text-xs text-white/50 mb-2">
                          <span>
                            {completed} de {total} lecciones
                          </span>
                          <span className="text-acad-champagne">{pct}%</span>
                        </div>
                        <ProgressBar value={pct} />
                        <p className="mt-5 text-sm text-white group-hover:text-acad-champagne transition">
                          {completed === 0 ? "Empezar programa" : pct === 100 ? "Volver a ver" : "Continuar"} →
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-white/55">{c.tagline}</p>
                        <p className="mt-5 text-sm text-acad-champagne">Desbloquear por ${c.price} →</p>
                      </>
                    )}
                  </div>
                </article>
              );
              return isEnrolled ? (
                <Link key={c.slug} href={`/academia/curso/${c.slug}`}>
                  {card}
                </Link>
              ) : (
                <div key={c.slug}>{card}</div>
              );
            })}
          </div>
        </section>
      </main>
    </StudentShell>
  );
}
