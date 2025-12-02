/**
 * Historial Médico Service
 * Maneja las operaciones de base de datos para historial médico
 */

import { sql } from "@/app/lib/db";

export class HistorialMedicoService {
  /**
   * Obtener historial médico con filtros opcionales
   */
  static async findAll(filters: {
    animal_id: string | null;
    veterinario_id: string | null;
  }) {
    const historial = await sql`
      SELECT 
        h.*,
        a.nombre as animal_nombre,
        cl.nombre as cliente_nombre,
        u.nombre as veterinario_nombre,
        tc.nombre as tipo_consulta_nombre
      FROM historial_medico h
      LEFT JOIN animales a ON h.animal_id = a.animal_id
      LEFT JOIN clientes cl ON a.cliente_id = cl.cliente_id
      LEFT JOIN veterinarios v ON h.veterinario_id = v.veterinario_id
      LEFT JOIN usuarios u ON v.usuario_id = u.usuario_id
      LEFT JOIN tipo_consulta tc ON h.tipo_consulta_id = tc.tipo_consulta_id
      WHERE (${filters.animal_id}::int IS NULL OR h.animal_id = ${filters.animal_id}::int)
        AND (${filters.veterinario_id}::int IS NULL OR h.veterinario_id = ${filters.veterinario_id}::int)
      ORDER BY h.fecha_consulta DESC
    `;

    return historial;
  }

  // TODO: Agregar método create para POST
}
