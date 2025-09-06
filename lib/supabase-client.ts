import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase usando las variables de entorno
export function createSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('SUPABASE_URL y SUPABASE_ANON_KEY son requeridas');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Esquemas del sistema que se excluyen (basado en MCP oficial)
const SYSTEM_SCHEMAS = [
  'information_schema',
  'pg_catalog',
  'pg_toast',
  '_timescaledb_internal',
];

// SQL Query oficial del MCP de Supabase para list_tables
function getListTablesQuery(schemas: string[] = ['public']) {
  // Consulta SQL oficial basada en el MCP de Supabase
  let sql = `
    SELECT DISTINCT
      nc.nspname AS schema,
      c.relname AS name,
      c.oid :: int8 AS id,
      obj_description(c.oid) AS comment
    FROM
      pg_namespace nc
      JOIN pg_class c ON nc.oid = c.relnamespace
    WHERE
      c.relkind = 'r'  -- Solo tablas regulares
  `;

  if (schemas.length > 0) {
    sql += ` AND nc.nspname IN (${schemas.map((s) => `'${s}'`).join(',')})`;
  } else {
    sql += ` AND nc.nspname NOT IN (${SYSTEM_SCHEMAS.map((s) => `'${s}'`).join(',')})`;
  }

  sql += ` ORDER BY nc.nspname, c.relname`;
  
  return sql;
}

// Función oficial para listar tablas usando Management API (ÚNICA IMPLEMENTACIÓN)
export async function listSupabaseTablesOfficial(schemas: string[] = ['public']) {
  try {
    const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
    const projectRef = process.env.SUPABASE_PROJECT_REF;
    
    if (!accessToken || !projectRef) {
      throw new Error('SUPABASE_ACCESS_TOKEN y SUPABASE_PROJECT_REF son requeridas para Management API');
    }

    console.log('🔍 Usando Management API oficial para list_tables...');

    // Usar Management API oficial (mismo endpoint que @supabase/mcp-server-supabase)
    const response = await fetch(
      `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getListTablesQuery(schemas),
          read_only: true
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Management API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Management API response:', data);

    // Extraer nombres de las tablas ordenados alfabéticamente
    const tableNames = data.map((table: any) => table.name).sort();
    
    return {
      tables: tableNames,
      fullData: data, // Información completa: id, schema, comment
      method: 'management_api_official',
      success: true,
      note: `Detectadas ${tableNames.length} tablas usando Management API oficial`
    };

  } catch (error) {
    console.error('❌ Error en Management API oficial:', error);
    throw error;
  }
}

// Función para obtener información del proyecto
export async function getProjectInfo() {
  try {
    const supabase = createSupabaseClient();
    
    // Verificar conexión con una operación mínima
    const connectionTest = await supabase.from('profiles').select('count').limit(0);
    
    return {
      projectRef: process.env.SUPABASE_PROJECT_REF || 'unknown',
      name: 'Tributaria',
      url: process.env.SUPABASE_URL || 'unknown',
      connected: !connectionTest.error,
      hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
      timestamp: new Date().toISOString(),
      connectionTest: connectionTest.error ? `Error: ${connectionTest.error.message}` : 'Success'
    };
  } catch (error) {
    console.error('Error en getProjectInfo:', error);
    throw error;
  }
} 