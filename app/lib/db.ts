/**
 * Configuración de conexión a PostgreSQL con Neon
 *
 * Neon es una base de datos PostgreSQL serverless en la nube
 * https://neon.tech
 */

import { neon } from "@neondatabase/serverless";

// Verificar que la variable de entorno esté configurada
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está configurada en .env.local");
}

const sql = neon(process.env.DATABASE_URL);

/**
 * Ejecuta una query en la base de datos
 *
 * @param queryText  SQL query a ejecutar
 * @param params     Parámetros de la query (usar $1, $2, etc en PostgreSQL)
 * @returns          Resultado de la query
 */
export async function query<T = any>(
  queryText: string,
  params: any[] = []
): Promise<T[]> {
  try {
    const result = await sql(queryText, params);
    return result as T[];
  } catch (error) {
    console.error("Database query error:", error);
    console.error("Query:", queryText);
    console.error("Params:", params);
    throw error;
  }
}

/**
 * Ejecuta una query que retorna un solo resultado
 */
export async function queryOne<T = any>(
  queryText: string,
  params: any[] = []
): Promise<T | null> {
  const results = await query<T>(queryText, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Verifica la conexión a la base de datos
 */
export async function checkConnection(): Promise<boolean> {
  try {
    await sql("SELECT 1");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}

/**
 * Ejecuta múltiples queries en una transacción
 * (Neon soporta transacciones automáticas)
 */
export async function transaction<T>(
  callback: (sql: typeof import("@neondatabase/serverless").neon) => Promise<T>
): Promise<T> {
  try {
    return await callback(sql);
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}

export default sql;
