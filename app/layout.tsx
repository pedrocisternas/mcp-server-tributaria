import React from 'react';

export const metadata = {
  title: 'MCP Server Supabase',
  description: 'Servidor MCP para Supabase desplegado en Vercel con Fluid Compute',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
} 