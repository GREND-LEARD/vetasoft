/**
 * Database Connection Configuration
 * Neon PostgreSQL Serverless Connection
 */

import { neon } from "@neondatabase/serverless";

// Get database URL from environment variables
// Use a placeholder during build time to avoid build errors
const databaseUrl = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder";

// Create SQL query function
export const sql = neon(databaseUrl);

/**
 * Execute a SQL query using template literals
 * @param strings Template strings
 * @param values Template values
 * @returns Query results
 */
export async function query<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  try {
    const result = await sql(strings, ...values);
    return result as T[];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Check database connection
 * @returns true if connected, false otherwise
 */
export async function checkConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1 as connected`;
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}

/**
 * Get a single row from query results using template literals
 */
export async function queryOne<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T | null> {
  const results = await query<T>(strings, ...values);
  return results.length > 0 ? results[0] : null;
}
