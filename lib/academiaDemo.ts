// Datos de ejemplo para la demo de la Academia. En la versión real esto
// sale de Supabase (courses, modules, lessons, enrollments).

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  description: string;
  materials?: { label: string; kind: "pdf" | "link" | "plantilla" }[];
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  kind: "Curso" | "Mentoría";
  price: number;
  accent: "crimson" | "gold" | "ember";
  modules: Module[];
};

export const DEMO_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const COURSES: Course[] = [
  {
    slug: "dropshipping-desde-cero",
    title: "Dropshipping desde cero",
    tagline: "Monta tu primera tienda y haz tu primera venta en 30 días.",
    level: "Principiante",
    kind: "Curso",
    price: 97,
    accent: "crimson",
    modules: [
      {
        id: "m1",
        title: "Mentalidad y modelo de negocio",
        lessons: [
          {
            id: "l1",
            title: "Qué es el dropshipping de verdad",
            duration: "12:40",
            description:
              "Cómo funciona el modelo, dónde está el dinero y los errores que hacen que el 90% abandone en el primer mes.",
            materials: [{ label: "Guía rápida del modelo", kind: "pdf" }],
          },
          {
            id: "l2",
            title: "Cuánto necesitas para empezar",
            duration: "09:15",
            description: "Presupuesto real: tienda, anuncios, muestras y colchón para probar productos.",
            materials: [{ label: "Calculadora de presupuesto", kind: "plantilla" }],
          },
        ],
      },
      {
        id: "m2",
        title: "Encontrar el producto ganador",
        lessons: [
          {
            id: "l3",
            title: "Las 5 señales de un producto ganador",
            duration: "18:02",
            description: "El filtro que uso para decidir si un producto vale la pena antes de gastar un dólar.",
          },
          {
            id: "l4",
            title: "Espiar a la competencia sin pagar herramientas",
            duration: "14:30",
            description: "Biblioteca de anuncios, TikTok y Amazon para validar demanda en minutos.",
            materials: [{ label: "Lista de herramientas gratis", kind: "link" }],
          },
          {
            id: "l5",
            title: "Proveedores confiables y tiempos de envío",
            duration: "16:48",
            description: "Cómo negociar, pedir muestras y evitar proveedores que te arruinan las reseñas.",
          },
        ],
      },
      {
        id: "m3",
        title: "Tu tienda lista para vender",
        lessons: [
          {
            id: "l6",
            title: "Montar la tienda paso a paso",
            duration: "22:10",
            description: "De cero a tienda publicada: dominio, tema, páginas clave y pagos.",
            materials: [{ label: "Checklist de lanzamiento", kind: "pdf" }],
          },
          {
            id: "l7",
            title: "Página de producto que convierte",
            duration: "19:05",
            description: "Fotos, textos y garantías que hacen que el cliente compre sin pensarlo dos veces.",
          },
        ],
      },
    ],
  },
  {
    slug: "anuncios-que-venden",
    title: "Anuncios que venden",
    tagline: "Meta y TikTok Ads para escalar tu tienda sin quemar plata.",
    level: "Intermedio",
    kind: "Curso",
    price: 147,
    accent: "gold",
    modules: [
      {
        id: "m1",
        title: "Fundamentos de pauta",
        lessons: [
          {
            id: "l1",
            title: "Estructura de campañas que funciona",
            duration: "15:20",
            description: "Campañas, conjuntos y anuncios: cómo organizarlos para leer resultados claros.",
          },
          {
            id: "l2",
            title: "Creativos que paran el scroll",
            duration: "17:45",
            description: "Ganchos de 3 segundos, formatos UGC y cómo grabar con tu celular.",
            materials: [{ label: "50 ganchos probados", kind: "pdf" }],
          },
        ],
      },
      {
        id: "m2",
        title: "Escalar",
        lessons: [
          {
            id: "l3",
            title: "Leer métricas sin enredarte",
            duration: "13:10",
            description: "CPA, ROAS y CTR explicados con números reales de mis tiendas.",
          },
          {
            id: "l4",
            title: "Escalar presupuesto sin romper la campaña",
            duration: "20:35",
            description: "Escalado vertical y horizontal, y cuándo apagar un anuncio.",
          },
        ],
      },
    ],
  },
  {
    slug: "mentoria-tienda-pro",
    title: "Mentoría Tienda Pro",
    tagline: "Acompañamiento 1 a 1 durante 8 semanas para llevar tu tienda a 5 cifras.",
    level: "Avanzado",
    kind: "Mentoría",
    price: 497,
    accent: "ember",
    modules: [
      {
        id: "m1",
        title: "Semana 1 a 4",
        lessons: [
          {
            id: "l1",
            title: "Auditoría de tu tienda",
            duration: "45:00",
            description: "Revisión en vivo de tu tienda, productos y anuncios actuales.",
          },
          {
            id: "l2",
            title: "Plan de acción personalizado",
            duration: "38:20",
            description: "Objetivos, presupuesto y calendario para las próximas semanas.",
          },
        ],
      },
      {
        id: "m2",
        title: "Semana 5 a 8",
        lessons: [
          {
            id: "l3",
            title: "Automatizar operaciones",
            duration: "41:15",
            description: "Atención al cliente, pedidos y proveedores en piloto automático.",
          },
          {
            id: "l4",
            title: "Marca propia y siguiente nivel",
            duration: "50:00",
            description: "Cómo pasar de dropshipping a marca propia con margen real.",
          },
        ],
      },
    ],
  },
];

// Alumno de la demo: tiene 2 cursos, la mentoría aparece bloqueada.
export const DEMO_STUDENT = {
  name: "Andrés",
  email: "alumno@demo.com",
  enrolled: ["dropshipping-desde-cero", "anuncios-que-venden"],
};

export type DemoStudent = {
  id: string;
  name: string;
  email: string;
  courses: string[];
  expires: string | null;
  progress: number;
};

export const DEMO_STUDENTS: DemoStudent[] = [
  { id: "s1", name: "Andrés Gómez", email: "alumno@demo.com", courses: ["dropshipping-desde-cero", "anuncios-que-venden"], expires: null, progress: 28 },
  { id: "s2", name: "Valentina Ríos", email: "vale.rios@gmail.com", courses: ["dropshipping-desde-cero"], expires: null, progress: 71 },
  { id: "s3", name: "Kevin Martínez", email: "kevinm@hotmail.com", courses: ["mentoria-tienda-pro", "dropshipping-desde-cero"], expires: "2026-12-20", progress: 45 },
  { id: "s4", name: "Laura Pineda", email: "laupineda@gmail.com", courses: ["anuncios-que-venden"], expires: null, progress: 12 },
];

export function getCourse(slug: string) {
  return COURSES.find((c) => c.slug === slug);
}

export function allLessons(course: Course) {
  return course.modules.flatMap((m) => m.lessons);
}

export const ACCENT_GRADIENT: Record<Course["accent"], string> = {
  crimson: "from-crimson via-[#4a0610] to-obsidian",
  gold: "from-gold/80 via-[#5c4a12] to-obsidian",
  ember: "from-[#FF6B35] via-crimson to-obsidian",
};
