/**
 * Estado Citas Service
 * Maneja las operaciones de base de datos para estados de citas
 */

import { sql } from "@/app/lib/db";

export class EstadoCitasService {
  /**
   * Obtener todos los estados de citas con filtros opcionales
   */
  static async findAll(filters: {
    activo: boolean | null;
  }) {
    const estados = await sql`
      SELECT 
        estado_id,
        estado_nombre,
        descripcion,
        activo
      FROM estado_citas
      WHERE (${filters.activo}::boolean IS NULL OR activo = ${filters.activo}::boolean)
      ORDER BY estado_nombre ASC
    `;

    return estados;
  }

  static async findById(id: number) {
    const estado = await sql`
      SELECT 
        estado_id,
        estado_nombre,
        descripcion,
        activo
      FROM estado_citas
      WHERE estado_id = ${id}
    `;

    return estado;
  }
}
