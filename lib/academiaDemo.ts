// Datos de ejemplo para la demo de la Academia. En la versión real esto
// sale de Supabase (courses, modules, lessons, enrollments).

// Marca provisional de la academia: se cambia aquí y se actualiza en todas las pantallas.
export const BRAND = {
  name: "Escala",
  suffix: "Academy",
  tagline: "Academia privada de ecommerce",
};

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
  number: string;
  title: string;
  tagline: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  kind: "Programa" | "Mentoría";
  price: number;
  hours: string;
  theme: "gold" | "ivory" | "bronze";
  modules: Module[];
};

export const DEMO_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const COURSES: Course[] = [
  {
    slug: "dropshipping-desde-cero",
    number: "01",
    title: "Dropshipping desde cero",
    tagline: "Monta tu primera tienda y consigue tu primera venta en 30 días.",
    level: "Principiante",
    kind: "Programa",
    price: 97,
    hours: "6 h 30 min",
    theme: "gold",
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
              "Cómo funciona el modelo, dónde está el dinero y los errores que hacen que la mayoría abandone en el primer mes.",
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
            description: "El filtro para decidir si un producto vale la pena antes de gastar un dólar.",
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
            description: "Cómo negociar, pedir muestras y evitar proveedores que arruinan tus reseñas.",
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
    number: "02",
    title: "Anuncios que venden",
    tagline: "Meta y TikTok Ads para escalar tu tienda sin quemar presupuesto.",
    level: "Intermedio",
    kind: "Programa",
    price: 147,
    hours: "4 h 45 min",
    theme: "ivory",
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
            title: "Creativos que detienen el scroll",
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
            description: "CPA, ROAS y CTR explicados con números reales.",
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
    slug: "mentoria-privada",
    number: "03",
    title: "Mentoría privada",
    tagline: "Ocho semanas de acompañamiento uno a uno para llevar tu tienda a cinco cifras.",
    level: "Avanzado",
    kind: "Mentoría",
    price: 497,
    hours: "8 semanas",
    theme: "bronze",
    modules: [
      {
        id: "m1",
        title: "Semanas 1 a 4",
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
        title: "Semanas 5 a 8",
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

// Alumno de la demo: tiene 2 programas, la mentoría aparece bloqueada.
export const DEMO_STUDENT = {
  name: "Andrés",
  fullName: "Andrés Gómez",
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
  joined: string;
};

export const DEMO_STUDENTS: DemoStudent[] = [
  { id: "s1", name: "Andrés Gómez", email: "alumno@demo.com", courses: ["dropshipping-desde-cero", "anuncios-que-venden"], expires: null, progress: 28, joined: "18 oct" },
  { id: "s2", name: "Valentina Ríos", email: "vale.rios@gmail.com", courses: ["dropshipping-desde-cero"], expires: null, progress: 71, joined: "12 oct" },
  { id: "s3", name: "Kevin Martínez", email: "kevinm@hotmail.com", courses: ["mentoria-privada", "dropshipping-desde-cero"], expires: "2026-12-20", progress: 45, joined: "02 oct" },
  { id: "s4", name: "Laura Pineda", email: "laupineda@gmail.com", courses: ["anuncios-que-venden"], expires: null, progress: 12, joined: "27 sep" },
  { id: "s5", name: "Daniel Herrera", email: "dherrera@gmail.com", courses: ["dropshipping-desde-cero", "anuncios-que-venden"], expires: null, progress: 93, joined: "15 sep" },
];

// Ventas de ejemplo por mes para el gráfico del panel (USD)
export const DEMO_MONTHLY_SALES = [
  { month: "May", value: 1840 },
  { month: "Jun", value: 2610 },
  { month: "Jul", value: 3120 },
  { month: "Ago", value: 2890 },
  { month: "Sep", value: 4370 },
  { month: "Oct", value: 5280 },
];

export const TESTIMONIALS = [
  {
    quote: "En la semana tres hice mi primera venta. Lo que más me sirvió fue el filtro de productos, me ahorró meses de prueba y error.",
    name: "Valentina R.",
    role: "Alumna · Programa 01",
  },
  {
    quote: "Pasé de gastar a ciegas en anuncios a saber exactamente qué apagar y qué escalar. Mi costo por venta bajó a la mitad.",
    name: "Daniel H.",
    role: "Alumno · Programa 02",
  },
  {
    quote: "La mentoría me ordenó el negocio. Hoy tengo proveedores fijos, procesos claros y por fin tiempo libre.",
    name: "Kevin M.",
    role: "Mentoría privada",
  },
];

export const FAQ = [
  { q: "¿Necesito experiencia previa?", a: "No. El Programa 01 empieza desde cero y te lleva paso a paso hasta tu primera venta." },
  { q: "¿Por cuánto tiempo tengo acceso?", a: "Los programas grabados son de acceso de por vida, incluidas las actualizaciones. La mentoría dura ocho semanas." },
  { q: "¿Puedo verlo desde el celular?", a: "Sí. La plataforma funciona en celular, tablet y computador, y guarda tu progreso automáticamente." },
  { q: "¿Cómo recibo mi acceso?", a: "Al confirmar tu pago te llega un correo con tu usuario y contraseña para entrar a la plataforma." },
];

export function getCourse(slug: string) {
  return COURSES.find((c) => c.slug === slug);
}

export function allLessons(course: Course) {
  return course.modules.flatMap((m) => m.lessons);
}
