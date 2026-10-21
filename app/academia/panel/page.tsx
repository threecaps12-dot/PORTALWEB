"use client";

import { useState } from "react";
import {
  COURSES,
  DEMO_MONTHLY_SALES,
  DEMO_STUDENTS,
  allLessons,
  type Course,
  type DemoStudent,
} from "@/lib/academiaDemo";
import { CourseCover, Logo, ProgressBar, btnGhost, btnPrimary } from "@/components/academia/Brand";

type Tab = "resumen" | "programas" | "alumnos";

const NAV: { id: Tab | null; label: string; icon: string }[] = [
  { id: "resumen", label: "Resumen", icon: "M4 13h6V4H4zM14 20h6v-9h-6zM14 4v4h6V4zM4 20h6v-4H4z" },
  { id: "programas", label: "Programas", icon: "M4 5h16v14H4zM10 9l5 3-5 3z" },
  { id: "alumnos", label: "Alumnos", icon: "M16 20v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 10a4 4 0 100-8 4 4 0 000 8zM22 20v-2a4 4 0 00-3-3.9" },
  { id: null, label: "Ventas", icon: "M3 3v18h18M7 15l4-4 3 3 5-6" },
  { id: null, label: "Ajustes", icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" },
];

const TITLES: Record<Tab, [string, string]> = {
  resumen: ["Resumen", "Así va tu academia este mes."],
  programas: ["Programas", "Crea programas, organiza módulos y sube tus lecciones."],
  alumnos: ["Alumnos", "Da acceso, controla vencimientos y mira el avance de cada alumno."],
};

const inputCls =
  "w-full rounded-xl bg-acad-bg border border-white/10 px-4 py-3 text-sm text-white placeholder:text-acad-muted outline-none focus:border-acad-gold/60 transition";
const labelCls = "block text-xs text-white/55 mb-2";

function tempPassword() {
  return "ES-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PanelDemo() {
  const [tab, setTab] = useState<Tab>("resumen");
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [students, setStudents] = useState<DemoStudent[]>(DEMO_STUDENTS);

  return (
    <div className="min-h-[calc(100vh-29px)] lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="hidden lg:flex flex-col border-r border-white/5 bg-acad-panel/60 px-5 py-6 sticky top-0 h-[calc(100vh-29px)]">
        <Logo size="sm" />
        <p className="mt-8 mb-3 px-3 text-[10px] tracking-[0.12em] uppercase text-acad-muted">Administración</p>
        <nav className="space-y-1">
          {NAV.map((item) => (
            <button
              key={item.label}
              type="button"
              disabled={!item.id}
              onClick={() => item.id && setTab(item.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                item.id === tab
                  ? "bg-white/[0.06] text-white"
                  : item.id
                    ? "text-white/55 hover:text-white hover:bg-white/[0.03]"
                    : "text-white/30 cursor-default"
              }`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span className="flex-1 text-left">{item.label}</span>
              {!item.id && <span className="text-[9px] tracking-widest uppercase">Pronto</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-5 border-t border-white/5 flex items-center gap-3">
          <span className="w-9 h-9 rounded-full border border-acad-gold/50 grid place-items-center text-acad-champagne text-xs">
            TÚ
          </span>
          <div>
            <p className="text-sm text-white">Dueño de la academia</p>
            <p className="text-[11px] text-acad-muted">Administrador</p>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="lg:hidden flex items-center justify-between px-5 h-14 border-b border-white/5">
          <Logo size="sm" />
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value as Tab)}
            className="bg-acad-panel border border-white/10 rounded-lg text-sm px-3 py-1.5"
          >
            <option value="resumen">Resumen</option>
            <option value="programas">Programas</option>
            <option value="alumnos">Alumnos</option>
          </select>
        </header>

        <main className="px-5 md:px-10 py-10 max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-acadserif text-4xl text-white">{TITLES[tab][0]}</h1>
              <p className="mt-2 text-acad-muted">{TITLES[tab][1]}</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Academia en línea
            </span>
          </div>

          {tab === "resumen" && <Overview courses={courses} students={students} />}
          {tab === "programas" && <ProgramsTab courses={courses} setCourses={setCourses} students={students} />}
          {tab === "alumnos" && <StudentsTab courses={courses} students={students} setStudents={setStudents} />}
        </main>
      </div>
    </div>
  );
}

function Overview({ courses, students }: { courses: Course[]; students: DemoStudent[] }) {
  const max = Math.max(...DEMO_MONTHLY_SALES.map((m) => m.value));
  const thisMonth = DEMO_MONTHLY_SALES[DEMO_MONTHLY_SALES.length - 1].value;
  const lastMonth = DEMO_MONTHLY_SALES[DEMO_MONTHLY_SALES.length - 2].value;
  const growth = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
  const avgProgress = Math.round(students.reduce((n, s) => n + s.progress, 0) / students.length);

  const kpis = [
    { label: "Ingresos del mes", value: `$${thisMonth.toLocaleString("en-US")}`, delta: `+${growth}%` },
    { label: "Alumnos activos", value: String(students.length), delta: "+2 esta semana" },
    { label: "Avance promedio", value: `${avgProgress}%`, delta: "de los alumnos" },
    { label: "Lecciones publicadas", value: String(courses.reduce((n, c) => n + allLessons(c).length, 0)), delta: `en ${courses.length} programas` },
  ];

  return (
    <>
      <section className="mt-10 grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-acad-panel p-5">
            <p className="text-xs text-acad-muted">{k.label}</p>
            <p className="mt-3 text-3xl font-light tracking-tight text-white tabular-nums">{k.value}</p>
            <p className="mt-2 text-xs text-acad-champagne/80">{k.delta}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid xl:grid-cols-[1.6fr_1fr] gap-6">
        <div className="rounded-2xl border border-white/10 bg-acad-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Ingresos por mes</p>
              <p className="text-xs text-acad-muted mt-1">Últimos 6 meses · USD</p>
            </div>
            <p className="text-2xl font-light tracking-tight text-white tabular-nums">
              ${DEMO_MONTHLY_SALES.reduce((n, m) => n + m.value, 0).toLocaleString("en-US")}
            </p>
          </div>
          <div className="mt-8 h-56 flex items-end gap-4">
            {DEMO_MONTHLY_SALES.map((m, i) => {
              const last = i === DEMO_MONTHLY_SALES.length - 1;
              return (
                <div key={m.month} className="flex-1 h-full flex flex-col justify-end items-center gap-3">
                  <span className={`text-[11px] tabular-nums ${last ? "text-acad-champagne" : "text-acad-muted"}`}>
                    ${(m.value / 1000).toFixed(1)}k
                  </span>
                  <div
                    className={`w-full rounded-t-md ${
                      last ? "bg-gradient-to-t from-acad-gold/70 to-acad-champagne" : "bg-white/[0.08]"
                    }`}
                    style={{ height: `${(m.value / max) * 75}%` }}
                  />
                  <span className="text-xs text-acad-muted">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-acad-panel p-6">
          <p className="text-sm text-white">Alumnos recientes</p>
          <ul className="mt-5 space-y-4">
            {students.slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-acad-raised border border-white/10 grid place-items-center text-[11px] text-acad-champagne">
                  {initials(s.name)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{s.name}</p>
                  <p className="text-[11px] text-acad-muted">Se unió el {s.joined}</p>
                </div>
                <span className="text-xs text-white/60 tabular-nums">{s.progress}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-white/10 bg-acad-panel p-6">
        <p className="text-sm text-white">Rendimiento por programa</p>
        <div className="mt-5 space-y-5">
          {courses.map((c) => {
            const n = students.filter((s) => s.courses.includes(c.slug)).length;
            return (
              <div key={c.slug} className="grid grid-cols-[1fr_auto] md:grid-cols-[220px_1fr_120px] items-center gap-4">
                <p className="text-sm text-white/85 truncate">{c.title}</p>
                <div className="hidden md:block">
                  <ProgressBar value={(n / students.length) * 100} />
                </div>
                <p className="text-xs text-acad-muted text-right">
                  {n} alumnos · ${(n * c.price).toLocaleString("en-US")}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ProgramsTab({
  courses,
  setCourses,
  students,
}: {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  students: DemoStudent[];
}) {
  const [open, setOpen] = useState<string | null>(courses[0]?.slug ?? null);
  const [showNew, setShowNew] = useState(false);

  function addCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") || "").trim();
    if (!title) return;
    const slug = "nuevo-" + Date.now();
    setCourses((prev) => [
      ...prev,
      {
        slug,
        number: String(prev.length + 1).padStart(2, "0"),
        title,
        tagline: String(f.get("tagline") || ""),
        level: "Principiante",
        kind: f.get("kind") === "Mentoría" ? "Mentoría" : "Programa",
        price: Number(f.get("price") || 0),
        hours: "Nuevo",
        theme: (["gold", "ivory", "bronze"] as const)[prev.length % 3],
        modules: [{ id: "m1", title: "Módulo 1", lessons: [] }],
      },
    ]);
    setOpen(slug);
    setShowNew(false);
  }

  function addLesson(slug: string, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const title = String(f.get("title") || "").trim();
    if (!title) return;
    const moduleId = String(f.get("module"));
    setCourses((prev) =>
      prev.map((c) =>
        c.slug !== slug
          ? c
          : {
              ...c,
              modules: c.modules.map((m) =>
                m.id !== moduleId
                  ? m
                  : { ...m, lessons: [...m.lessons, { id: "l" + Date.now(), title, duration: "Nueva", description: "" }] }
              ),
            }
      )
    );
    form.reset();
  }

  return (
    <div className="mt-10 space-y-5">
      <div className="flex justify-end">
        <button type="button" onClick={() => setShowNew((s) => !s)} className={btnPrimary}>
          + Nuevo programa
        </button>
      </div>

      {showNew && (
        <form onSubmit={addCourse} className="rounded-2xl border border-acad-gold/40 bg-acad-panel p-6 grid md:grid-cols-2 gap-5">
          <p className="md:col-span-2 font-acadserif text-3xl text-white">Nuevo programa</p>
          <div className="md:col-span-2">
            <label className={labelCls}>Título</label>
            <input name="title" required placeholder="Ej: TikTok Shop para principiantes" className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Descripción corta</label>
            <input name="tagline" placeholder="Qué va a lograr el alumno" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tipo</label>
            <select name="kind" className={inputCls}>
              <option>Programa</option>
              <option>Mentoría</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Precio (USD)</label>
            <input name="price" type="number" min="0" defaultValue="97" className={inputCls} />
          </div>
          <label className="md:col-span-2 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-8 text-sm text-acad-muted cursor-pointer hover:border-acad-gold/50 transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-acad-gold">
              <path d="M12 16V4M7 9l5-5 5 5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Arrastra la portada o haz clic para subirla
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={() => setShowNew(false)} className={btnGhost}>
              Cancelar
            </button>
            <button type="submit" className={btnPrimary}>
              Crear programa
            </button>
          </div>
        </form>
      )}

      {courses.map((c) => {
        const isOpen = open === c.slug;
        const enrolled = students.filter((s) => s.courses.includes(c.slug)).length;
        return (
          <div key={c.slug} className="rounded-2xl border border-white/10 bg-acad-panel overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : c.slug)}
              className="w-full flex items-center gap-5 p-4 text-left hover:bg-white/[0.02] transition"
            >
              <div className="w-28 shrink-0 rounded-lg overflow-hidden hidden sm:block">
                <CourseCover course={c} thumb />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-[0.12em] uppercase text-acad-gold">
                  {c.kind} {c.number}
                </p>
                <h3 className="mt-1 font-acadserif text-3xl text-white truncate">{c.title}</h3>
                <p className="mt-1 text-xs text-acad-muted">
                  {c.modules.length} módulos · {allLessons(c).length} lecciones · {enrolled} alumnos · ${c.price}
                </p>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 text-xs text-emerald-300/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Publicado
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`text-acad-muted mr-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isOpen && (
              <div className="border-t border-white/5 p-6 space-y-6">
                {c.modules.map((m, mi) => (
                  <div key={m.id}>
                    <p className="flex items-center gap-3 text-sm text-white">
                      <span className="text-xs text-acad-gold tabular-nums">0{mi + 1}</span>
                      {m.title}
                    </p>
                    {m.lessons.length === 0 ? (
                      <p className="mt-3 text-sm text-acad-muted">Todavía no hay lecciones en este módulo.</p>
                    ) : (
                      <ul className="mt-3 rounded-xl border border-white/5 divide-y divide-white/5">
                        {m.lessons.map((l) => (
                          <li key={l.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-acad-muted">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            <span className="flex-1 text-white/80">{l.title}</span>
                            <span className="text-xs text-acad-muted tabular-nums">{l.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <form onSubmit={(e) => addLesson(c.slug, e)} className="rounded-xl border border-dashed border-white/15 p-5 space-y-4">
                  <p className="text-sm text-white">Agregar lección</p>
                  <div className="grid md:grid-cols-[1fr_180px] gap-4">
                    <input name="title" placeholder="Título de la lección" className={inputCls} />
                    <select name="module" className={inputCls}>
                      {c.modules.map((m, mi) => (
                        <option key={m.id} value={m.id}>
                          Módulo {mi + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-acad-bg px-4 py-3 text-sm text-acad-muted cursor-pointer hover:border-acad-gold/50 transition">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-acad-gold">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M10 9l5 3-5 3z" />
                      </svg>
                      Subir video de la lección
                      <input type="file" accept="video/*" className="hidden" />
                    </label>
                    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-acad-bg px-4 py-3 text-sm text-acad-muted cursor-pointer hover:border-acad-gold/50 transition">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-acad-gold">
                        <path d="M6 3h9l5 5v13H6zM14 3v6h6" strokeLinejoin="round" />
                      </svg>
                      Adjuntar PDF o plantilla
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className={btnPrimary}>
                      Publicar lección
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StudentsTab({
  courses,
  students,
  setStudents,
}: {
  courses: Course[];
  students: DemoStudent[];
  setStudents: React.Dispatch<React.SetStateAction<DemoStudent[]>>;
}) {
  const [showNew, setShowNew] = useState(false);
  const [query, setQuery] = useState("");
  const [created, setCreated] = useState<{ email: string; password: string } | null>(null);

  function addStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    const name = String(f.get("name") || "").trim();
    if (!email || !name) return;
    const picked = courses.filter((c) => f.get("c-" + c.slug)).map((c) => c.slug);
    setStudents((prev) => [
      { id: "s" + Date.now(), name, email, courses: picked, expires: String(f.get("expires") || "") || null, progress: 0, joined: "hoy" },
      ...prev,
    ]);
    setCreated({ email, password: tempPassword() });
    setShowNew(false);
  }

  function toggleAccess(id: string, slug: string) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id !== id ? s : { ...s, courses: s.courses.includes(slug) ? s.courses.filter((x) => x !== slug) : [...s.courses, slug] }
      )
    );
  }

  const q = query.trim().toLowerCase();
  const visible = q ? students.filter((s) => (s.name + s.email).toLowerCase().includes(q)) : students;

  return (
    <div className="mt-10 space-y-5">
      <div className="flex flex-wrap gap-3 justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar alumno por nombre o correo"
          className={`${inputCls} max-w-sm`}
        />
        <button
          type="button"
          onClick={() => {
            setShowNew((s) => !s);
            setCreated(null);
          }}
          className={btnPrimary}
        >
          + Agregar alumno
        </button>
      </div>

      {created && (
        <div className="rounded-2xl border border-acad-gold/40 bg-acad-gold/[0.06] p-5 flex items-start gap-4">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-acad-gold text-black shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
          <div>
            <p className="text-white">Alumno creado y acceso enviado</p>
            <p className="text-sm text-white/60 mt-1">
              Usuario <span className="text-white">{created.email}</span> · contraseña temporal{" "}
              <span className="text-acad-champagne font-mono">{created.password}</span>
            </p>
          </div>
        </div>
      )}

      {showNew && (
        <form onSubmit={addStudent} className="rounded-2xl border border-acad-gold/40 bg-acad-panel p-6 grid md:grid-cols-2 gap-5">
          <p className="md:col-span-2 font-acadserif text-3xl text-white">Nuevo alumno</p>
          <div>
            <label className={labelCls}>Nombre completo</label>
            <input name="name" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Correo</label>
            <input name="email" type="email" required className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <p className={labelCls}>Programas a los que tendrá acceso</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {courses.map((c) => (
                <label
                  key={c.slug}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-acad-bg px-4 py-3 text-sm text-white/80 cursor-pointer has-[:checked]:border-acad-gold/60 has-[:checked]:bg-acad-gold/[0.06] transition"
                >
                  <input type="checkbox" name={"c-" + c.slug} className="accent-[#C9A96E]" />
                  {c.title}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Acceso hasta (opcional)</label>
            <input name="expires" type="date" className={`${inputCls} [color-scheme:dark]`} />
          </div>
          <div className="flex items-end justify-end gap-3">
            <button type="button" onClick={() => setShowNew(false)} className={btnGhost}>
              Cancelar
            </button>
            <button type="submit" className={btnPrimary}>
              Crear y enviar acceso
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border border-white/10 bg-acad-panel overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-xs text-acad-muted border-b border-white/5">
              <th className="px-5 py-4 font-normal">Alumno</th>
              <th className="px-5 py-4 font-normal">Acceso (clic para dar o quitar)</th>
              <th className="px-5 py-4 font-normal w-36">Progreso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {visible.map((s) => (
              <tr key={s.id} className="hover:bg-white/[0.015]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-acad-raised border border-white/10 grid place-items-center text-[11px] text-acad-champagne">
                      {initials(s.name)}
                    </span>
                    <div>
                      <p className="text-white">{s.name}</p>
                      <p className="text-acad-muted text-xs">{s.email}</p>
                      <p className="text-[11px] text-acad-gold/70 mt-0.5">
                        {s.expires ? `Acceso hasta ${s.expires}` : "Acceso de por vida"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {courses.map((c) => {
                      const has = s.courses.includes(c.slug);
                      return (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => toggleAccess(s.id, c.slug)}
                          className={`rounded-full text-[11px] px-2.5 py-1 border transition whitespace-nowrap ${
                            has
                              ? "border-acad-gold/60 bg-acad-gold/10 text-acad-champagne"
                              : "border-white/10 text-white/30 hover:text-white/70"
                          }`}
                        >
                          {c.number} · {c.title}
                        </button>
                      );
                    })}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <ProgressBar value={s.progress} />
                  <p className="text-xs text-acad-muted mt-2 tabular-nums">{s.progress}%</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
