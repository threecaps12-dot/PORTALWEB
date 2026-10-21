import Link from "next/link";
import { BRAND, COURSES, FAQ, TESTIMONIALS, allLessons } from "@/lib/academiaDemo";
import { CourseCover, Eyebrow, Logo, btnGhost, btnPrimary } from "@/components/academia/Brand";

const STATS = [
  { value: "1.200+", label: "Alumnos" },
  { value: "40+", label: "Lecciones en video" },
  { value: "4,9", label: "Valoración media" },
  { value: "24/7", label: "Acceso a la plataforma" },
];

const PILLARS = [
  { n: "01", title: "Producto", text: "Un método para encontrar y validar productos antes de invertir." },
  { n: "02", title: "Tienda", text: "Una tienda que inspira confianza y convierte visitas en ventas." },
  { n: "03", title: "Tráfico", text: "Anuncios rentables en Meta y TikTok, sin quemar presupuesto." },
  { n: "04", title: "Escala", text: "Procesos, proveedores y números para crecer con orden." },
];

const PLANS = [
  {
    name: "Esencial",
    price: 97,
    desc: "Para dar tus primeros pasos con una base sólida.",
    features: ["Programa 01 completo", "Plantillas y checklists", "Acceso de por vida", "Actualizaciones incluidas"],
    featured: false,
  },
  {
    name: "Profesional",
    price: 197,
    desc: "El camino completo, de la primera venta a escalar.",
    features: ["Programas 01 y 02", "Biblioteca de creativos", "Plantillas y checklists", "Acceso de por vida", "Soporte por correo"],
    featured: true,
  },
  {
    name: "Mentoría",
    price: 497,
    desc: "Acompañamiento uno a uno, cupos limitados.",
    features: ["Todo lo de Profesional", "8 semanas de mentoría privada", "Auditoría de tu tienda", "Plan de acción personal"],
    featured: false,
  },
];

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-acad-gold shrink-0 mt-0.5">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Vista de la plataforma dentro del hero: muestra el producto antes de que entren. */
function PlatformPreview() {
  const lessons = allLessons(COURSES[0]).slice(0, 5);
  return (
    <div className="relative">
      <div className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(201,169,110,0.25),transparent)] blur-2xl" />
      <div className="relative rounded-2xl border border-white/10 bg-acad-panel/90 backdrop-blur shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 h-9 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="ml-3 text-[10px] text-acad-muted tracking-wide">plataforma · {BRAND.name.toLowerCase()}</span>
        </div>
        <div className="grid grid-cols-[1.5fr_1fr]">
          <div className="p-4 border-r border-white/5">
            <div className="relative aspect-video rounded-lg overflow-hidden acad-grain bg-[radial-gradient(100%_80%_at_70%_20%,rgba(201,169,110,0.35),transparent_60%),linear-gradient(160deg,#1b1712,#0a0908)]">
              <div className="absolute inset-0 grid place-items-center">
                <span className="w-12 h-12 rounded-full bg-white/90 grid place-items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#000" className="ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
                <div className="h-full w-[38%] bg-acad-gold" />
              </div>
            </div>
            <p className="mt-3 text-[10px] tracking-[0.12em] uppercase text-acad-gold">Lección 3 de 7</p>
            <p className="font-acadserif text-lg leading-tight text-white mt-1">Las 5 señales de un producto ganador</p>
          </div>
          <div className="p-3 space-y-1">
            {lessons.map((l, i) => (
              <div key={l.id} className={`flex items-center gap-2 rounded-md px-2 py-2 text-[11px] ${i === 2 ? "bg-white/5 text-white" : "text-white/55"}`}>
                <span className={`w-3.5 h-3.5 rounded-full border grid place-items-center ${i < 2 ? "bg-acad-gold border-acad-gold" : "border-white/25"}`}>
                  {i < 2 && (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </span>
                <span className="truncate">{l.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-xl border border-white/10 bg-acad-raised/95 backdrop-blur px-4 py-3 shadow-2xl">
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-acad-champagne to-acad-gold grid place-items-center text-black text-xs font-semibold">
          VR
        </span>
        <div>
          <p className="text-xs text-white">Valentina completó el Módulo 2</p>
          <p className="text-[10px] text-acad-muted">hace 4 minutos</p>
        </div>
      </div>
    </div>
  );
}

export default function AcademiaHome() {
  return (
    <main className="overflow-x-hidden">
      {/* Navegación */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-acad-bg/75 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#programas" className="hover:text-white transition">Programas</a>
            <a href="#metodo" className="hover:text-white transition">Método</a>
            <a href="#planes" className="hover:text-white transition">Planes</a>
            <a href="#faq" className="hover:text-white transition">Preguntas</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/academia/login" className="hidden sm:inline text-sm text-white/70 hover:text-white transition">
              Iniciar sesión
            </Link>
            <a href="#planes" className={`${btnPrimary} !px-5 !py-2`}>
              Unirme
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(201,169,110,0.14),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acad-gold/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-24 grid xl:grid-cols-[1.05fr_1fr] gap-16 items-center">
          <div>
            <Eyebrow>{BRAND.tagline}</Eyebrow>
            <h1 className="mt-7 font-acadserif text-5xl sm:text-6xl lg:text-7xl leading-[0.98] text-white">
              De cero a tu primera venta online en 30 días.
            </h1>
            <p className="mt-7 text-lg text-white/60 max-w-xl leading-relaxed">
              Programas en video, plantillas listas para usar y mentoría directa con alguien que ya vende en Estados
              Unidos. Sin humo, con números reales.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#planes" className={btnPrimary}>
                Empieza hoy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#programas" className={btnGhost}>
                Ver programas
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["AG", "VR", "KM", "LP"].map((i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-acad-bg bg-gradient-to-br from-acad-raised to-black grid place-items-center text-[10px] text-acad-champagne"
                  >
                    {i}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/50">
                Más de 1.200 alumnos ya están dentro
              </p>
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto xl:max-w-none">
            <PlatformPreview />
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section className="border-y border-white/5 bg-acad-panel/50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`py-10 text-center ${i > 0 ? "md:border-l border-white/5" : ""}`}>
              <p className="font-acadserif text-5xl text-white">{s.value}</p>
              <p className="mt-2 text-xs tracking-[0.12em] uppercase text-acad-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programas */}
      <section id="programas" className="max-w-7xl mx-auto px-5 md:px-8 py-28 scroll-mt-16">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
                        <h2 className="mt-5 font-acadserif text-4xl md:text-5xl text-white leading-none">
              Tres niveles. Un solo camino.
            </h2>
          </div>
          <p className="max-w-sm text-white/50">
            Cada programa construye sobre el anterior. Empieza donde estés y avanza a tu ritmo.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((c) => (
            <article
              key={c.slug}
              className="group rounded-2xl border border-white/10 bg-acad-panel overflow-hidden hover:border-acad-gold/40 transition-colors"
            >
              <div className="overflow-hidden">
                <div className="group-hover:scale-[1.03] transition-transform duration-700">
                  <CourseCover course={c} />
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/60 leading-relaxed min-h-[3.2rem]">{c.tagline}</p>
                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-sm">
                  <span className="text-acad-muted">
                    {c.modules.length} módulos · {c.hours}
                  </span>
                  <span className="text-white">${c.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Método */}
      <section id="metodo" className="relative border-t border-white/5 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-28 grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
          <div>
                        <h2 className="mt-5 font-acadserif text-4xl md:text-5xl text-white leading-none">
              Cómo funciona el método
            </h2>
            <p className="mt-6 text-white/55 max-w-md leading-relaxed">
              Nada de teoría suelta. Cada lección termina con una acción concreta para aplicar en tu tienda ese mismo día.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {PILLARS.map((p) => (
              <div key={p.n} className="bg-acad-bg p-8">
                <span className="font-acadserif text-sm text-acad-gold">{p.n}</span>
                <h3 className="mt-4 text-lg text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-28 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] max-w-md rounded-2xl overflow-hidden border border-white/10 acad-grain bg-[radial-gradient(90%_70%_at_50%_20%,rgba(201,169,110,0.25),transparent_70%),linear-gradient(180deg,#141310,#08080a)]">
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-acad-gold/50">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
                <p className="mt-4 text-[11px] tracking-[0.12em] uppercase text-acad-muted">Tu foto aquí</p>
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-acadserif text-3xl text-white">Fundador de {BRAND.name}</p>
              <p className="text-sm text-acad-muted mt-1">Empresario de ecommerce en USA</p>
            </div>
          </div>
          <div>
                        <h2 className="mt-5 font-acadserif text-4xl md:text-5xl text-white leading-none">
              Quién está detrás
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed">
              Empecé desde cero, con poco capital y muchos errores. Hoy tengo una marca propia vendiendo en Estados
              Unidos. En esta academia te enseño exactamente lo que me funcionó, sin rellenos y con números reales.
            </p>
            <blockquote className="mt-10 border-l border-acad-gold/50 pl-6 text-xl text-white/80 leading-snug">
              “No vendo motivación. Te doy un sistema y te acompaño a ejecutarlo.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="border-t border-white/5 bg-acad-panel/40">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-28">
          <div className="text-center">
                        <h2 className="mt-5 font-acadserif text-4xl md:text-5xl text-white">Alumnos</h2>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-white/10 bg-acad-bg p-8 flex flex-col">
                                <blockquote className="mt-5 mt-0 text-lg text-white/80 leading-relaxed flex-1">“{t.quote}”</blockquote>
                <figcaption className="mt-8 pt-5 border-t border-white/5">
                  <p className="text-white text-sm">{t.name}</p>
                  <p className="text-acad-muted text-xs mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="border-t border-white/5 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-28">
          <div className="text-center">
                        <h2 className="mt-5 font-acadserif text-4xl md:text-5xl text-white">Planes</h2>
            <p className="mt-4 text-white/50">Pago único. Sin mensualidades.</p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  p.featured
                    ? "border border-acad-gold/60 bg-gradient-to-b from-acad-gold/[0.12] to-acad-panel shadow-[0_30px_80px_-30px_rgba(201,169,110,0.45)]"
                    : "border border-white/10 bg-acad-panel"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-acad-gold text-black text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                    Más elegido
                  </span>
                )}
                <p className="text-sm tracking-[0.2em] uppercase text-acad-gold">{p.name}</p>
                <p className="mt-4 font-acadserif text-6xl text-white">
                  ${p.price}
                  <span className="text-base font-acad text-acad-muted ml-2">USD</span>
                </p>
                <p className="mt-3 text-sm text-white/50">{p.desc}</p>
                <ul className="mt-8 space-y-3 text-sm text-white/75 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/academia/login" className={`mt-10 ${p.featured ? btnPrimary : btnGhost}`}>
                  Quiero entrar
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-acad-muted">
            Garantía de 7 días. Si no es para ti, te devolvemos tu dinero.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/5 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-28">
          <div className="text-center">
                        <h2 className="mt-5 font-acadserif text-5xl text-white">Preguntas frecuentes</h2>
          </div>
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none text-lg text-white">
                  {f.q}
                  <span className="text-acad-gold text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-white/55 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_100%,rgba(201,169,110,0.2),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 py-32 text-center">
          <h2 className="font-acadserif text-5xl md:text-7xl text-white leading-[0.95]">
            Empieza hoy.
          </h2>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <a href="#planes" className={btnPrimary}>
              Ver planes
            </a>
            <Link href="/academia/login" className={btnGhost}>
              Ya soy alumno
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-acad-muted">
          <Logo size="sm" />
          <p>© 2026 {BRAND.name} {BRAND.suffix}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
