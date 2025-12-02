/**
 * Especies Service
 * Maneja las operaciones de base de datos para especies
 */

import { sql } from "@/app/lib/db";

export class EspeciesService {
  /**
   * Obtener todas las especies activas
   */
  static async findAll() {
    const especies = await sql`
      SELECT 
        e.*,
        COUNT(r.raza_id) as total_razas
      FROM especies e
      LEFT JOIN razas r ON e.especie_id = r.especie_id AND r.activo = true
      WHERE e.activo = true
      GROUP BY e.especie_id
      ORDER BY e.nombre_especie
    `;

    return especies;
  }

  // TODO: Agregar método create para POST
}
