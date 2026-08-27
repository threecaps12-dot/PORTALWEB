/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
