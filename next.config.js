// Nov 2026: la tienda usa el Supabase original (smqdyqqtiufzmdltgsrx, plan Pro pagado hasta el 11 dic)
// con todo su catálogo. Esto reemplaza las variables de Vercel en el build. Antes del 11 dic se migra
// todo al proyecto gratis (qrawlwyqrturuhqcgfhk) y se borran estas dos líneas.
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://smqdyqqtiufzmdltgsrx.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "sb_publishable_R6iskKMfOYdwcEHVRi9jQA_jQIovtLD";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // El optimizador de imagenes de Vercel devolvia 402 (limite del plan) y las fotos nuevas
    // salian rotas. Las fotos se sirven directo desde Supabase Storage; el panel admin ya
    // las reduce a WebP de max 900 px antes de subirlas.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qrawlwyqrturuhqcgfhk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },      {
        protocol: "https",
        hostname: "smqdyqqtiufzmdltgsrx.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  eslint: {
    // No bloquear el build de producción por reglas de lint —
    // el lint se corre aparte en desarrollo/CI.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // No bloquear el build por errores de tipos menores mientras el
    // proyecto está en fase activa de desarrollo. Quitar esto antes
    // de un lanzamiento final serio.
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
