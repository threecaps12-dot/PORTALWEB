/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // El optimizador de imagenes de Vercel devolvia 402 (limite del plan) y las fotos nuevas
    // salian rotas. Las fotos se sirven directo desde Supabase Storage; el panel admin ya
    // las reduce a JPG de max 1800 px antes de subirlas.
    unoptimized: true,
    remotePatterns: [
      {
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
