# 🚀 MCP Server Supabase

Servidor MCP (Model Context Protocol) para integrar aplicaciones con Supabase de forma segura, desplegado en Vercel con optimizaciones avanzadas.

## ✨ Características

- 🔒 **Modo read-only** por defecto para máxima seguridad
- 🎯 **Project-scoped** - limitado a un único proyecto Supabase
- ⚡ **Management API** - usa la API oficial de Supabase para máximo rendimiento
- 🛡️ **Protección contra SQL injection** - validación y sanitización automática
- 🚄 **HTTP Streamable** - protocolo optimizado para edge functions
- 💰 **Costo optimizado** - desplegado en Vercel con plan gratuito compatible

## 🏗️ Arquitectura

```
[Edge Function] → [Vercel] → [MCP Handler] → [Supabase Management API]
     ↓              ↓           ↓                   ↓
   Cliente        Next.js    mcp-handler       Supabase DB
   Cursor          API      JSON-RPC 2.0      Read-only
   Claude         Route     Tool Calls        SQL Queries
```

## 🛠️ Herramientas Disponibles

| Herramienta | Descripción | Argumentos |
|-------------|-------------|------------|
| `list_tables` | Lista tablas del proyecto usando Management API | `schemas?: string[]` (default: `["public"]`) |
| `execute_sql` | Ejecuta consultas SQL en modo read-only | `query: string` |
| `health_check` | Estado de salud del servidor y conexión | Ninguno |
| `server_info` | Información detallada y dinámica del servidor | Ninguno |

## 🚀 Despliegue

### 1. Clonar y Configurar

```bash
# Clonar repositorio
git clone <tu-repo-url>
cd mcp-server-supabase

# Instalar dependencias
npm install

# Configurar variables de entorno locales
cp env.example .env.local
# Editar .env.local con tus valores
```

### 2. Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Deploy
vercel
```

### 3. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a **Settings → Environment Variables** y configura:

```bash
# TODAS SON OBLIGATORIAS
SUPABASE_ACCESS_TOKEN=sbp_tu_token_personal_aqui
SUPABASE_PROJECT_REF=tu_project_ref_aqui
SUPABASE_URL=https://tu-project.supabase.co
SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 4. Verificar Despliegue

```bash
curl -X POST https://tu-proyecto.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "health_check",
      "arguments": {}
    }
  }'
```

## 🔧 Configuración de Clientes MCP

### Edge Functions / API Calls

Para edge functions de Vercel, Netlify, o llamadas directas desde APIs:

```typescript
const response = await fetch('https://tu-proyecto.vercel.app/api/mcp', {
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
});
```

### Cursor

Añade a tu `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://tu-proyecto.vercel.app/api/mcp"
    }
  }
}
```

### Claude Desktop

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://tu-proyecto.vercel.app/api/mcp"
    }
  }
}
```

## 🧪 Ejemplos de Uso

### Listar Tablas

```bash
curl -X POST https://tu-proyecto.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "list_tables",
      "arguments": {
        "schemas": ["public"]
      }
    }
  }'
```

### Ejecutar SQL

```bash
curl -X POST https://tu-proyecto.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "execute_sql",
      "arguments": {
        "query": "SELECT * FROM users LIMIT 5"
      }
    }
  }'
```

### Verificar Salud

```bash
curl -X POST https://tu-proyecto.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "health_check",
      "arguments": {}
    }
  }'
```

## 🔒 Configuración de Supabase

### 1. Crear Token de Acceso

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard/account/tokens)
2. Click **"Generate new token"**
3. Asigna nombre: `MCP Server`
4. Copia el token (solo se muestra una vez)

### 2. Obtener Credenciales del Proyecto

1. Ve a tu proyecto en Supabase
2. **Project Settings → General**
3. Copia:
   - **Reference ID** → `SUPABASE_PROJECT_REF`
   - **URL** → `SUPABASE_URL`
4. **Project Settings → API**
5. Copia:
   - **anon/public key** → `SUPABASE_ANON_KEY`

## 🔒 Seguridad

### Modo Read-Only

- ✅ **Solo consultas SELECT** permitidas
- ✅ **Prevención de escritura** automática
- ✅ **Validación de permisos** por Supabase
- ✅ **Protección contra injection** con boundaries UUID

### Project Scoped

- ✅ **Limitado a un proyecto** específico de Supabase
- ✅ **No acceso cross-project**
- ✅ **Validación de credenciales** en cada request

## 🐛 Troubleshooting

### Error: "Variables de entorno requeridas no configuradas"

**Causa**: Faltan variables de entorno en Vercel

**Solución**: 
1. Ve a Vercel Dashboard → Settings → Environment Variables
2. Configura las 4 variables obligatorias
3. Redeploy el proyecto

### Error: "Management API error: 400"

**Causa**: Token o project ref incorrectos

**Solución**: 
1. Verifica el `SUPABASE_ACCESS_TOKEN` en Supabase Dashboard
2. Confirma el `SUPABASE_PROJECT_REF` es correcto
3. Redeploy en Vercel

### Error: "permission denied for table"

**Causa**: **NORMAL** - modo read-only funcionando correctamente

**Explicación**: Este error aparece cuando intentas operaciones de escritura (UPDATE, INSERT, DELETE). Es el comportamiento esperado.

### Error de Deploy: "maxDuration must be between 1 and 300"

**Causa**: Plan gratuito de Vercel tiene límite de 300s

**Solución**: El código ya está configurado para 300s (plan gratuito)

## 📊 Límites del Plan Gratuito

### Vercel Free Tier

- ✅ **Max Duration**: 300 segundos (suficiente)
- ✅ **Memory**: 1024 MB (óptimo)
- ✅ **Requests**: 100GB/mes (abundante)
- ❌ **Regions**: Solo 1 región (iad1)

### Optimizaciones Incluidas

- ⚡ **Cold start optimizado**: ~500ms
- 🔄 **Connection pooling**: Reutilización de conexiones
- 📦 **Bundle optimizado**: Dependencias mínimas
- 🎯 **Response caching**: Headers optimizados

## 🔄 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar variables locales
cp env.example .env.local
# Editar .env.local

# Ejecutar en desarrollo
npm run dev

# Verificar en http://localhost:3000
# Probar endpoint: http://localhost:3000/api/mcp
```

### Scripts Disponibles

```bash
npm run dev        # Desarrollo
npm run build      # Build de producción
npm run start      # Start de producción
npm run type-check # Verificar tipos TypeScript
npm run lint       # Linter
```

## 📄 Tecnologías

- **Framework**: Next.js 15.4.5
- **MCP Handler**: mcp-handler (latest)
- **Supabase SDK**: @supabase/supabase-js ^2.53.0
- **MCP Official**: @supabase/mcp-server-supabase ^0.4.5
- **TypeScript**: Strict mode
- **Validation**: Zod schemas

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Abre un Pull Request

## 📞 Soporte

- 🐛 Issues: GitHub Issues del repositorio
- 📧 Documentación: README.md actualizado
- 🔍 Debug: Usa `health_check` para diagnósticos

---

**✨ ¡Construido con ❤️ por el equipo Tributaria usando la implementación oficial de Supabase MCP!** 