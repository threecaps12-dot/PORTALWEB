"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CourseCover from "@/components/academia/CourseCover";
import { COURSES, DEMO_STUDENT, allLessons } from "@/lib/academiaDemo";
import { useDemoSession, useProgress } from "@/lib/academiaProgress";

export default function MisCursos() {
  const router = useRouter();
  const { loggedIn } = useDemoSession();
  const { done } = useProgress();

  useEffect(() => {
    if (loggedIn === false) router.replace("/academia/login");
  }, [loggedIn, router]);

  if (!loggedIn) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <p className="text-gold tracking-[0.3em] text-sm">BIENVENIDO DE NUEVO</p>
      <h1 className="font-display text-6xl mt-2 mb-10">Hola, {DEMO_STUDENT.name}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {COURSES.map((course) => {
          const enrolled = DEMO_STUDENT.enrolled.includes(course.slug);
          const total = allLessons(course).length;
          const completed = (done[course.slug] ?? []).length;
          const pct = Math.round((completed / total) * 100);

          const card = (
            <article className="bg-obsidian-soft border border-cream/10 h-full group">
              <CourseCover course={course} locked={!enrolled} />
              <div className="p-5">
                {enrolled ? (
                  <>
                    <div className="flex justify-between text-sm text-cream/60 mb-2">
                      <span>
                        {completed} de {total} lecciones
                      </span>
                      <span className="text-gold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-cream/10">
                      <div className="h-full bg-crimson transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="font-display tracking-widest text-lg mt-5 group-hover:text-crimson transition-colors">
                      {completed === 0 ? "EMPEZAR CURSO" : pct === 100 ? "VOLVER A VER" : "CONTINUAR"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-cream/60 text-sm">{course.tagline}</p>
                    <p className="font-display tracking-widest text-lg mt-5 text-gold">
                      DESBLOQUEAR · ${course.price} USD
                    </p>
                  </>
                )}
              </div>
            </article>
          );

          return enrolled ? (
            <Link key={course.slug} href={`/academia/curso/${course.slug}`}>
              {card}
            </Link>
          ) : (
            <div key={course.slug}>{card}</div>
          );
        })}
      </div>
    </main>
  );
}
