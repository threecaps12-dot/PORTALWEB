"use client";

import { useState } from "react";
import { COURSES, DEMO_STUDENTS, allLessons, type Course, type DemoStudent } from "@/lib/academiaDemo";

type Tab = "resumen" | "cursos" | "alumnos";

function tempPassword() {
  return "TC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function PanelDemo() {
  const [tab, setTab] = useState<Tab>("resumen");
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [students, setStudents] = useState<DemoStudent[]>(DEMO_STUDENTS);

  const revenue = students.reduce(
    (sum, s) => sum + s.courses.reduce((acc, slug) => acc + (courses.find((c) => c.slug === slug)?.price ?? 0), 0),
    0
  );

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <p className="text-gold tracking-[0.3em] text-sm">VISTA DEL DUEÑO</p>
      <h1 className="font-display text-6xl mt-1">Panel de la Academia</h1>
      <p className="text-cream/50 mt-2 max-w-2xl">
        Desde aquí subes cursos, agregas lecciones y das acceso a tus alumnos. En la versión final esto vive dentro
        del panel admin que ya usas para la tienda.
      </p>

      <div className="flex gap-1 mt-8 border-b border-cream/10">
        {(["resumen", "cursos", "alumnos"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`font-display tracking-widest text-xl px-5 py-2 -mb-px border-b-2 transition-colors ${
              tab === t ? "border-crimson text-cream" : "border-transparent text-cream/50 hover:text-cream"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "resumen" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Alumnos activos", value: String(students.length) },
            { label: "Cursos publicados", value: String(courses.length) },
            { label: "Lecciones", value: String(courses.reduce((n, c) => n + allLessons(c).length, 0)) },
            { label: "Ventas de ejemplo", value: `$${revenue} USD` },
          ].map((s) => (
            <div key={s.label} className="bg-obsidian-soft border border-cream/10 p-5">
              <p className="text-cream/50 text-xs tracking-widest">{s.label.toUpperCase()}</p>
              <p className="font-display text-5xl mt-2 text-gold">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "cursos" && <CoursesTab courses={courses} setCourses={setCourses} students={students} />}
      {tab === "alumnos" && <StudentsTab courses={courses} students={students} setStudents={setStudents} />}
    </main>
  );
}

const inputCls = "w-full bg-obsidian border border-cream/20 px-3 py-2 text-cream focus:border-crimson outline-none";

function CoursesTab({
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
    const slug = title.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    setCourses((prev) => [
      ...prev,
      {
        slug,
        title,
        tagline: String(f.get("tagline") || ""),
        level: "Principiante",
        kind: f.get("kind") === "Mentoría" ? "Mentoría" : "Curso",
        price: Number(f.get("price") || 0),
        accent: "crimson",
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
                  : {
                      ...m,
                      lessons: [
                        ...m.lessons,
                        { id: "l" + Date.now(), title, duration: "nuevo", description: "" },
                      ],
                    }
              ),
            }
      )
    );
    form.reset();
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowNew((s) => !s)}
          className="bg-crimson hover:bg-crimson-hover font-display tracking-widest text-lg px-5 py-2 transition-colors"
        >
          + NUEVO CURSO
        </button>
      </div>

      {showNew && (
        <form onSubmit={addCourse} className="bg-obsidian-soft border border-crimson/50 p-5 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs tracking-widest text-cream/60">TÍTULO</label>
            <input name="title" required placeholder="Ej: TikTok Shop para principiantes" className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs tracking-widest text-cream/60">DESCRIPCIÓN CORTA</label>
            <input name="tagline" placeholder="Qué va a lograr el alumno" className={inputCls} />
          </div>
          <div>
            <label className="text-xs tracking-widest text-cream/60">TIPO</label>
            <select name="kind" className={inputCls}>
              <option>Curso</option>
              <option>Mentoría</option>
            </select>
          </div>
          <div>
            <label className="text-xs tracking-widest text-cream/60">PRECIO (USD)</label>
            <input name="price" type="number" min="0" defaultValue="97" className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs tracking-widest text-cream/60">PORTADA</label>
            <input type="file" accept="image/*" className="block text-sm text-cream/60 mt-1" />
          </div>
          <button type="submit" className="md:col-span-2 bg-gold text-obsidian font-display tracking-widest text-lg py-2">
            CREAR CURSO
          </button>
        </form>
      )}

      {courses.map((c) => {
        const isOpen = open === c.slug;
        const enrolled = students.filter((s) => s.courses.includes(c.slug)).length;
        return (
          <div key={c.slug} className="bg-obsidian-soft border border-cream/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : c.slug)}
              className="w-full flex flex-wrap items-center gap-4 justify-between p-5 text-left"
            >
              <div>
                <p className="text-xs tracking-widest text-gold">{c.kind.toUpperCase()}</p>
                <h3 className="font-display text-3xl">{c.title}</h3>
              </div>
              <div className="flex gap-6 text-sm text-cream/60">
                <span>{allLessons(c).length} lecciones</span>
                <span>{enrolled} alumnos</span>
                <span className="text-gold">${c.price}</span>
                <span className="text-green-400">● Publicado</span>
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-cream/10 p-5 space-y-5">
                {c.modules.map((m, mi) => (
                  <div key={m.id}>
                    <p className="text-xs tracking-widest text-cream/40 mb-2">
                      MÓDULO {mi + 1} · {m.title.toUpperCase()}
                    </p>
                    {m.lessons.length === 0 ? (
                      <p className="text-cream/40 text-sm">Todavía no hay lecciones en este módulo.</p>
                    ) : (
                      <ul className="divide-y divide-cream/5">
                        {m.lessons.map((l) => (
                          <li key={l.id} className="flex items-center justify-between py-2 text-sm">
                            <span>{l.title}</span>
                            <span className="text-cream/40">{l.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <form
                  onSubmit={(e) => addLesson(c.slug, e)}
                  className="border border-dashed border-cream/20 p-4 grid md:grid-cols-[1fr_200px_auto] gap-3 items-end"
                >
                  <div>
                    <label className="text-xs tracking-widest text-cream/60">NUEVA LECCIÓN</label>
                    <input name="title" placeholder="Título de la lección" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest text-cream/60">MÓDULO</label>
                    <select name="module" className={inputCls}>
                      {c.modules.map((m, mi) => (
                        <option key={m.id} value={m.id}>
                          Módulo {mi + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="bg-crimson hover:bg-crimson-hover font-display tracking-widest px-5 py-2">
                    AGREGAR
                  </button>
                  <div className="md:col-span-3 flex flex-wrap gap-6 text-sm text-cream/60">
                    <label className="flex items-center gap-2">
                      VIDEO <input type="file" accept="video/*" className="text-xs" />
                    </label>
                    <label className="flex items-center gap-2">
                      PDF / MATERIAL <input type="file" className="text-xs" />
                    </label>
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
  const [created, setCreated] = useState<{ email: string; password: string } | null>(null);

  function addStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    const name = String(f.get("name") || "").trim();
    if (!email || !name) return;
    const picked = courses.filter((c) => f.get("c-" + c.slug)).map((c) => c.slug);
    setStudents((prev) => [
      ...prev,
      { id: "s" + Date.now(), name, email, courses: picked, expires: String(f.get("expires") || "") || null, progress: 0 },
    ]);
    setCreated({ email, password: tempPassword() });
    setShowNew(false);
  }

  function toggleAccess(id: string, slug: string) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id !== id
          ? s
          : { ...s, courses: s.courses.includes(slug) ? s.courses.filter((x) => x !== slug) : [...s.courses, slug] }
      )
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setShowNew((s) => !s);
            setCreated(null);
          }}
          className="bg-crimson hover:bg-crimson-hover font-display tracking-widest text-lg px-5 py-2 transition-colors"
        >
          + AGREGAR ALUMNO
        </button>
      </div>

      {created && (
        <div className="bg-gold/10 border border-gold p-5">
          <p className="font-display text-2xl text-gold">Alumno creado</p>
          <p className="text-sm text-cream/70 mt-1">
            Se le enviaría por correo: usuario <b className="text-cream">{created.email}</b> · contraseña temporal{" "}
            <b className="text-cream font-mono">{created.password}</b>
          </p>
        </div>
      )}

      {showNew && (
        <form onSubmit={addStudent} className="bg-obsidian-soft border border-crimson/50 p-5 grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest text-cream/60">NOMBRE</label>
            <input name="name" required className={inputCls} />
          </div>
          <div>
            <label className="text-xs tracking-widest text-cream/60">CORREO</label>
            <input name="email" type="email" required className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest text-cream/60 mb-2">ACCESO A</p>
            <div className="flex flex-wrap gap-4">
              {courses.map((c) => (
                <label key={c.slug} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name={"c-" + c.slug} className="accent-crimson" />
                  {c.title}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs tracking-widest text-cream/60">ACCESO HASTA (OPCIONAL)</label>
            <input name="expires" type="date" className={inputCls} />
          </div>
          <button type="submit" className="self-end bg-gold text-obsidian font-display tracking-widest text-lg py-2">
            CREAR Y ENVIAR ACCESO
          </button>
        </form>
      )}

      <div className="bg-obsidian-soft border border-cream/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-xs tracking-widest text-cream/40 border-b border-cream/10">
              <th className="p-4 font-normal">ALUMNO</th>
              <th className="p-4 font-normal">CURSOS (CLIC PARA DAR O QUITAR)</th>
              <th className="p-4 font-normal">VENCE</th>
              <th className="p-4 font-normal">PROGRESO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/5">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="p-4">
                  <p>{s.name}</p>
                  <p className="text-cream/40 text-xs">{s.email}</p>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {courses.map((c) => {
                      const has = s.courses.includes(c.slug);
                      return (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => toggleAccess(s.id, c.slug)}
                          className={`text-xs px-2 py-1 border transition-colors ${
                            has ? "bg-crimson border-crimson text-cream" : "border-cream/15 text-cream/30 hover:text-cream/70"
                          }`}
                        >
                          {c.title}
                        </button>
                      );
                    })}
                  </div>
                </td>
                <td className="p-4 text-cream/60">{s.expires ?? "Sin vencimiento"}</td>
                <td className="p-4 w-40">
                  <div className="h-1.5 bg-cream/10">
                    <div className="h-full bg-gold" style={{ width: `${s.progress}%` }} />
                  </div>
                  <p className="text-xs text-cream/40 mt-1">{s.progress}%</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
