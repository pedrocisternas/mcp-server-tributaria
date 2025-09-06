// Tipos para el servidor MCP Supabase
export interface SupabaseConfig {
  accessToken: string;
  projectRef: string;
  readOnly?: boolean;
}

export interface MCPServerConfig {
  supabase: SupabaseConfig;
  redis?: {
    url: string;
  };
  transport: 'http' | 'sse';
}

export interface SupabaseToolResult {
  [x: string]: unknown;
  content: Array<{
    type: 'text';
    text: string;
    [x: string]: unknown;
  }>;
}

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  checks: {
    supabase: boolean;
    redis?: boolean;
  };
  version: string;
}

// Tipos de herramientas de Supabase MCP
export type SupabaseToolName = 
  | 'list_tables'
  | 'list_projects' 
  | 'get_project'
  | 'execute_sql'
  | 'get_project_url'
  | 'get_anon_key'
  | 'generate_typescript_types'
  | 'search_docs'
  | 'list_edge_functions'
  | 'get_logs';

export interface ProxyMCPServerOptions {
  supabaseAccessToken: string;
  supabaseProjectRef: string;
  readOnly: boolean;
  redisUrl?: string;
} 