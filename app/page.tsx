export default function HomePage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', margin: '0', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🚀 MCP Server Supabase
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', margin: '10px 0' }}>
          Servidor MCP (Model Context Protocol) para Supabase usando la implementación oficial
        </p>
        <div style={{ display: 'inline-flex', gap: '10px', marginTop: '20px' }}>
          <span style={{ background: '#10b981', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem' }}>
            ✅ Servidor Activo
          </span>
          <span style={{ background: '#f59e0b', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem' }}>
            🔒 Read-Only
          </span>
          <span style={{ background: '#8b5cf6', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem' }}>
            🎯 Project-Scoped
          </span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        {/* Estado del Servidor */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '1.5rem' }}>📊 Estado del Servidor</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✅</span>
              <span>Servidor MCP funcionando</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#f59e0b', fontSize: '1.2rem' }}>🔒</span>
              <span>Modo read-only activo</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#8b5cf6', fontSize: '1.2rem' }}>⚡</span>
              <span>Management API optimizada</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#3b82f6', fontSize: '1.2rem' }}>🛡️</span>
              <span>Protección contra SQL injection</span>
            </div>
          </div>
        </div>

        {/* Endpoint */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '1.5rem' }}>🔧 Endpoint MCP</h2>
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <code style={{ color: '#1e40af', fontSize: '1rem', fontWeight: 'bold' }}>
              /api/mcp
            </code>
          </div>
          <p style={{ margin: '15px 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Único endpoint que maneja HTTP Streamable para máxima compatibilidad
          </p>
        </div>

      </div>

      {/* Herramientas MCP */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', marginBottom: '30px' }}>
        <h2 style={{ margin: '0 0 25px 0', color: '#1f2937', fontSize: '1.8rem' }}>🛠️ Herramientas Disponibles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e40af', fontSize: '1.2rem' }}>📋 list_tables</h3>
            <p style={{ margin: '0 0 10px 0', color: '#4b5563', fontSize: '0.95rem' }}>Lista tablas del proyecto usando Management API oficial</p>
            <div style={{ background: '#e0e7ff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#3730a3' }}>
              Argumentos: <code>schemas?: string[]</code>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#dc2626', fontSize: '1.2rem' }}>⚡ execute_sql</h3>
            <p style={{ margin: '0 0 10px 0', color: '#4b5563', fontSize: '0.95rem' }}>Ejecuta consultas SQL en modo read-only con protección contra injection</p>
            <div style={{ background: '#fee2e2', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#991b1b' }}>
              Argumentos: <code>query: string</code>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#059669', fontSize: '1.2rem' }}>💚 health_check</h3>
            <p style={{ margin: '0 0 10px 0', color: '#4b5563', fontSize: '0.95rem' }}>Estado de salud del servidor y conexión a Supabase</p>
            <div style={{ background: '#d1fae5', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#065f46' }}>
              Sin argumentos
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#7c3aed', fontSize: '1.2rem' }}>ℹ️ server_info</h3>
            <p style={{ margin: '0 0 10px 0', color: '#4b5563', fontSize: '0.95rem' }}>Información dinámica del servidor y configuración actual</p>
            <div style={{ background: '#ede9fe', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#5b21b6' }}>
              Sin argumentos
            </div>
          </div>

        </div>
      </div>

      {/* Configuración de Clientes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        {/* Edge Functions */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '1.4rem' }}>🔌 Edge Functions / APIs</h3>
          <pre style={{ background: '#1f2937', color: '#f8fafc', padding: '15px', borderRadius: '8px', fontSize: '0.85rem', overflow: 'auto', margin: '0' }}>
{`const response = await fetch(
  'https://tu-proyecto.vercel.app/api/mcp',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'list_tables',
        arguments: { schemas: ['public'] }
      }
    })
  }
);`}
          </pre>
        </div>

        {/* Cursor */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '1.4rem' }}>🎯 Cursor MCP</h3>
          <p style={{ margin: '0 0 15px 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Añade a tu <code>.cursor/mcp.json</code>:
          </p>
          <pre style={{ background: '#1f2937', color: '#f8fafc', padding: '15px', borderRadius: '8px', fontSize: '0.85rem', overflow: 'auto', margin: '0' }}>
{`{
  "mcpServers": {
    "supabase": {
      "url": "https://tu-proyecto.vercel.app/api/mcp"
    }
  }
}`}
          </pre>
        </div>

      </div>

      {/* Ejemplo de Uso */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', marginBottom: '30px' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '1.8rem' }}>🧪 Ejemplo de Prueba</h2>
        <p style={{ margin: '0 0 15px 0', color: '#6b7280' }}>
          Prueba el servidor con este comando curl:
        </p>
        <pre style={{ background: '#1f2937', color: '#f8fafc', padding: '20px', borderRadius: '8px', fontSize: '0.9rem', overflow: 'auto', margin: '0' }}>
{`curl -X POST https://tu-proyecto.vercel.app/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "health_check",
      "arguments": {}
    }
  }'`}
        </pre>
      </div>

      {/* Variables de Entorno */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '1.8rem' }}>🔐 Variables de Entorno Requeridas</h2>
        <p style={{ margin: '0 0 15px 0', color: '#6b7280' }}>
          Configura estas 4 variables en Vercel Dashboard → Settings → Environment Variables:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          
          <div style={{ background: '#fef3c7', padding: '15px', borderRadius: '8px', border: '1px solid #f59e0b' }}>
            <code style={{ color: '#92400e', fontWeight: 'bold' }}>SUPABASE_ACCESS_TOKEN</code>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#78350f' }}>Token personal de Supabase</p>
          </div>

          <div style={{ background: '#dbeafe', padding: '15px', borderRadius: '8px', border: '1px solid #3b82f6' }}>
            <code style={{ color: '#1e40af', fontWeight: 'bold' }}>SUPABASE_PROJECT_REF</code>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#1e3a8a' }}>Reference ID del proyecto</p>
          </div>

          <div style={{ background: '#dcfce7', padding: '15px', borderRadius: '8px', border: '1px solid #22c55e' }}>
            <code style={{ color: '#15803d', fontWeight: 'bold' }}>SUPABASE_URL</code>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#14532d' }}>URL del proyecto Supabase</p>
          </div>

          <div style={{ background: '#fce7f3', padding: '15px', borderRadius: '8px', border: '1px solid #ec4899' }}>
            <code style={{ color: '#be185d', fontWeight: 'bold' }}>SUPABASE_ANON_KEY</code>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#831843' }}>Clave anon/public del proyecto</p>
          </div>

        </div>
      </div>

      <footer style={{ textAlign: 'center', marginTop: '50px', padding: '20px', color: '#6b7280', fontSize: '0.9rem' }}>
        <p style={{ margin: '0' }}>
          ✨ Construido con ❤️ por el equipo Tributaria usando la implementación oficial de Supabase MCP
        </p>
      </footer>
    </div>
  );
} 