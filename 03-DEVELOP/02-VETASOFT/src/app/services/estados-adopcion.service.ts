/**
 * Estados Adopcion Service
 * Maneja las operaciones de base de datos para estados de adopción
 */

import { sql } from "@/app/lib/db";

export class EstadosAdopcionService {
  /**
   * Obtener todos los estados de adopción con filtros opcionales
   */
  static async findAll(filters: {
    activo: boolean | null;
  }) {
    const estados = await sql`
      SELECT 
        estado_id,
        nombre,
        descripcion,
        activo
      FROM estado_adopcion
      WHERE (${filters.activo}::boolean IS NULL OR activo = ${filters.activo}::boolean)
      ORDER BY nombre ASC
    `;

    return estados;
  }
  static async findById(id: number) {
    const estado = await sql`
      SELECT 
        estado_id,
        nombre,
        descripcion,
        activo
      FROM estado_adopcion
      WHERE estado_id = ${id}
    `;

    return estado;
  }
}
