/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@supabase/mcp-server-supabase'],
  
  // Optimización para Vercel
  poweredByHeader: false,
  
  // Configuración de redirects para compatibilidad
  async redirects() {
    return [
      {
        source: '/mcp/:transport',
        destination: '/api/:transport',
        permanent: true,
      },
    ];
  },
  
  // Configuración de TypeScript estricta
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configuración de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 