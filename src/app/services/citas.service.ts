/**
 * Citas Service
 * Maneja las operaciones de base de datos para citas
 */

import { sql } from "@/app/lib/db";

export class CitasService {
  /**
   * Obtener todas las citas con filtros opcionales
   */
  static async findAll(filters: {
    veterinario_id: string | null;
    estado_id: string | null;
    fecha_inicio: string | null;
    fecha_fin: string | null;
  }) {
    const citas = await sql`
      SELECT 
        c.*,
        a.nombre as animal_nombre,
        cl.nombre as cliente_nombre,
        cl.telefono as cliente_telefono,
        u.nombre as veterinario_nombre,
        tc.nombre as tipo_consulta_nombre,
        ec.estado_nombre
      FROM citas c
      LEFT JOIN animales a ON c.animal_id = a.animal_id
      LEFT JOIN clientes cl ON a.cliente_id = cl.cliente_id
      LEFT JOIN veterinarios v ON c.veterinario_id = v.veterinario_id
      LEFT JOIN usuarios u ON v.usuario_id = u.usuario_id
      LEFT JOIN tipo_consulta tc ON c.tipo_consulta_id = tc.tipo_consulta_id
      LEFT JOIN estado_citas ec ON c.estado_id = ec.estado_id
      WHERE (${filters.veterinario_id}::int IS NULL OR c.veterinario_id = ${filters.veterinario_id}::int)
        AND (${filters.estado_id}::int IS NULL OR c.estado_id = ${filters.estado_id}::int)
        AND (${filters.fecha_inicio}::date IS NULL OR c.fecha_cita >= ${filters.fecha_inicio}::date)
        AND (${filters.fecha_fin}::date IS NULL OR c.fecha_cita <= ${filters.fecha_fin}::date)
      ORDER BY c.fecha_cita DESC
    `;

    return citas;
  }

  // TODO: Agregar método create para POST
}
