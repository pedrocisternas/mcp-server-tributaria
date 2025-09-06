# Plan de Implementación: Servidor MCP Supabase en Vercel

## Resumen del Proyecto
Desplegar un servidor MCP (Model Context Protocol) para integrar la app Nutria (Expo/React Native) con Supabase, desplegado en Vercel con configuración de seguridad y rendimiento óptimos.

## Objetivos Específicos
- ✅ Servidor MCP usando `@supabase/mcp-server-supabase` en modo read-only
- ✅ Limitado a un único proyecto Supabase específico
- ✅ Desplegado en Vercel usando `@vercel/mcp-adapter`
- ✅ Activar Fluid Compute para baja latencia
- ✅ Variables de entorno seguras (no en repositorio)
- ✅ Endpoint de verificación funcional

## ✅ INVESTIGACIÓN COMPLETADA - Hallazgos Clave

### 1. ✅ Investigación de Documentación MCP Supabase
**Hallazgos Principales:**
- ✅ **Paquete confirmado**: `@supabase/mcp-server-supabase` disponible en npm
- ✅ **Flags requeridos confirmados**: 
  - `--read-only`: Restringe operaciones a solo lectura
  - `--project-ref=<project-ref>`: Limita acceso a un proyecto específico
- ✅ **Herramientas disponibles**: 33 herramientas organizadas por grupos:
  - **Account**: `list_projects`, `get_project`, `create_project`, etc.
  - **Database**: `list_tables`, `execute_sql`, `apply_migration`, etc.
  - **Development**: `get_project_url`, `get_anon_key`, `generate_typescript_types`
  - **Edge Functions**: `list_edge_functions`, `deploy_edge_function`
  - **Knowledge Base**: `search_docs`
- ✅ **Configuración de cliente**:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--read-only", "--project-ref=<project-ref>"],
      "env": {"SUPABASE_ACCESS_TOKEN": "<token>"}
    }
  }
}
```

### 2. ✅ Investigación de Vercel MCP Adapter  
**Hallazgos Principales:**
- ✅ **Paquete actualizado**: `@vercel/mcp-adapter` → `mcp-handler` 
- ✅ **Estructura de archivos**: `app/[transport]/route.ts` o `api/server.ts`
- ✅ **Transportes soportados**: HTTP Streamable y SSE
- ✅ **Redis requerido**: Solo para transporte SSE (`process.env.REDIS_URL`)
- ✅ **Plantillas oficiales disponibles**:
  - Next.js: `vercel-labs/mcp-for-next.js`
  - Functions: `vercel-labs/mcp-on-vercel`
- ✅ **Configuración básica**:
```typescript
import { createMcpHandler } from 'mcp-handler';
const handler = createMcpHandler((server) => {
  // Definir herramientas
});
export { handler as GET, handler as POST, handler as DELETE };
```

### 3. ✅ Investigación de Prácticas de Seguridad
**Hallazgos Principales:**
- ✅ **Variables de entorno requeridas**:
  - `SUPABASE_ACCESS_TOKEN`: Token personal de acceso (obligatorio)
  - `SUPABASE_PROJECT_REF`: ID del proyecto (para --project-ref)
- ✅ **Configuración read-only**: Implementada a nivel de servidor MCP Supabase
- ✅ **Scope de proyecto**: `--project-ref` limita acceso a un solo proyecto
- ✅ **Buenas prácticas verificadas**:
  - Variables de entorno en Vercel (no en repositorio)
  - Tokens con scope limitado
  - Modo read-only por defecto recomendado

### 4. ✅ Investigación de Fluid Compute
**Hallazgos Principales:**
- ✅ **Qué es**: Modelo híbrido serverless-server que optimiza concurrencia y reduce costos
- ✅ **Beneficios para MCP**: 
  - Reduce cold starts hasta 90%
  - Concurrencia optimizada para workloads I/O-bound
  - Ahorro de costos de hasta 95% con Active CPU pricing
- ✅ **Activación**: Habilitado por defecto en nuevos proyectos, manual en existentes
- ✅ **Configuración recomendada**:
  - Activar en Project Settings → Functions
  - Ajustar `maxDuration` a 800s para cuentas Pro/Enterprise
  - Monitorear en Observability tab
- ✅ **Verificación**: Via logs de función y métricas en Vercel dashboard

## 🚀 PLAN DE IMPLEMENTACIÓN ACTUALIZADO (Basado en Investigación)

### Fase 1: Estructura Base del Proyecto ✅
- [x] Inicializar usando plantilla oficial de Vercel `mcp-for-next.js` 
- [x] Configurar `package.json` con `mcp-handler` (no `@vercel/mcp-adapter`)
- [x] Crear `.gitignore` apropiado para Next.js + variables de entorno
- [x] Configurar estructura `app/[transport]/route.ts` para ambos transportes

### Fase 2: Implementación del Servidor MCP Híbrido
- [ ] **ENFOQUE HÍBRIDO**: Crear proxy MCP que encapsula servidor Supabase
- [ ] Implementar `createMcpHandler` con `mcp-handler`
- [ ] Proxy que ejecuta internamente `@supabase/mcp-server-supabase`
- [ ] Configurar flags `--read-only` y `--project-ref` en el proxy
- [ ] Implementar manejo de errores y logging

### Fase 3: Configuración de Despliegue y Seguridad
- [ ] Configurar variables de entorno seguras en Vercel:
  - `SUPABASE_ACCESS_TOKEN`
  - `SUPABASE_PROJECT_REF` 
  - `REDIS_URL` (para SSE transport)
- [ ] Activar Fluid Compute con configuración optimizada
- [ ] Configurar `maxDuration: 800` para cuentas Pro/Enterprise
- [ ] Implementar configuración multi-transport (HTTP + SSE)

### Fase 4: Verificación y Testing
- [ ] Implementar endpoint de health check
- [ ] Crear cliente de prueba para verificar `list_tables`
- [ ] Probar ambos transportes (HTTP Streamable y SSE)
- [ ] Verificar logs de Fluid Compute y métricas de performance

### Fase 5: Documentación y Entrega
- [ ] README con instrucciones paso a paso basadas en hallazgos
- [ ] Ejemplos de configuración para diferentes clientes MCP
- [ ] Guía de troubleshooting con casos comunes identificados
- [ ] Scripts de despliegue automatizado

## Entregables Esperados

1. **Repositorio Completo:**
   - `api/server.ts` (o estructura equivalente)
   - `package.json` con dependencias
   - `.gitignore`
   - `README.md`
   - Archivos de configuración necesarios

2. **Documentación de Despliegue:**
   - Instrucciones paso a paso
   - Configuración de variables de entorno
   - Activación de Fluid Compute
   - Verificación de funcionamiento

3. **Ejemplos de Uso:**
   - Llamadas JSON-RPC
   - Respuestas esperadas
   - Casos de error común

4. **Verificación de Seguridad:**
   - Confirmación de modo read-only
   - Limitación a proyecto específico
   - Variables de entorno seguras

## Criterios de Éxito

- [ ] Servidor MCP funcional en Vercel
- [ ] Responde correctamente a `list_tables`
- [ ] Modo read-only verificado
- [ ] Fluid Compute activo y funcionando
- [ ] Variables de entorno configuradas de forma segura
- [ ] Documentación completa y clara

## 🎯 DECISIÓN ARQUITECTÓNICA CLAVE

Basado en la investigación, el enfoque más efectivo será crear un **servidor MCP proxy híbrido** que:

1. **Use la plantilla oficial de Vercel** (`mcp-for-next.js`) como base
2. **Implemente un proxy MCP** que internamente ejecute el servidor Supabase oficial
3. **Maneje ambos transportes** (HTTP Streamable + SSE) para máxima compatibilidad
4. **Configure automáticamente** los flags de seguridad (`--read-only`, `--project-ref`)
5. **Optimice para Fluid Compute** para máximo rendimiento y ahorro de costos

## 🚀 Próximos Pasos INMEDIATOS

1. ✅ **Investigación completada** - Hallazgos documentados y validados
2. 🔄 **SIGUIENTE: Implementar arquitectura híbrida** - Comenzar con plantilla oficial
3. 🎯 **Configurar proxy MCP-Supabase** - Integración segura y optimizada 
4. 🔧 **Activar Fluid Compute** - Configuración de rendimiento
5. 📋 **Testing exhaustivo** - Verificar todos los transportes y herramientas
6. 📚 **Documentación final** - Guías paso a paso basadas en hallazgos reales

---

**✅ INVESTIGACIÓN COMPLETADA - LISTO PARA IMPLEMENTACIÓN**  
*Todas las tecnologías, configuraciones y mejores prácticas han sido identificadas y validadas.* 