import Link from "next/link";
import AuroraBackground from "@/components/admin/AuroraBackground";
import CourseCover from "@/components/academia/CourseCover";
import { COURSES, allLessons } from "@/lib/academiaDemo";

const STEPS = [
  { n: "01", title: "Eliges tu curso", text: "Cursos grabados o mentoría 1 a 1, según dónde estés." },
  { n: "02", title: "Recibes tu acceso", text: "Te llega tu usuario y contraseña para entrar a la plataforma." },
  { n: "03", title: "Aprendes a tu ritmo", text: "Videos, plantillas y PDFs. Desde el celular o el computador." },
];

export default function AcademiaHome() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <AuroraBackground />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
          <p className="text-gold tracking-[0.3em] text-sm mb-4">ACADEMIA THREE CAPS</p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-4xl">
            Aprende a vender <span className="text-crimson">como la calle</span> manda.
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-xl">
            Lo que me funcionó para montar Three Caps, explicado paso a paso. Dropshipping, anuncios y marca
            propia, sin humo.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#cursos"
              className="bg-crimson hover:bg-crimson-hover text-cream font-display text-xl tracking-widest px-8 py-3 transition-colors"
            >
              VER CURSOS
            </Link>
            <Link
              href="/academia/login"
              className="border border-cream/30 hover:border-cream text-cream font-display text-xl tracking-widest px-8 py-3 transition-colors"
            >
              YA TENGO CUENTA
            </Link>
          </div>
        </div>
      </section>

      <section id="cursos" className="max-w-7xl mx-auto px-4 md:px-8 py-20 scroll-mt-24">
        <h2 className="font-display text-5xl mb-10">Cursos y mentorías</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <article key={course.slug} className="bg-obsidian-soft border border-cream/10 flex flex-col">
              <CourseCover course={course} />
              <div className="p-5 flex flex-col flex-1">
                <p className="text-cream/70 flex-1">{course.tagline}</p>
                <p className="text-cream/40 text-sm mt-4">
                  {course.modules.length} módulos · {allLessons(course).length} lecciones
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-3xl text-gold">${course.price} USD</span>
                  <span className="font-display tracking-widest text-crimson">QUIERO ACCESO</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="font-display text-5xl mb-10">Cómo funciona</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t-2 border-crimson pt-5">
              <span className="font-display text-5xl text-cream/20">{s.n}</span>
              <h3 className="font-display text-3xl mt-2">{s.title}</h3>
              <p className="text-cream/60 mt-2">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
