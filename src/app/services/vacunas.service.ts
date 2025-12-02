/**
 * Vacunas Service
 * Maneja las operaciones de base de datos para vacunas
 */

import { sql } from "@/app/lib/db";

export class VacunasService {
  /**
   * Obtener todas las vacunas con filtro opcional por especie
   */
  static async findAll(especie_id: string | null) {
    if (especie_id) {
      return await sql`
        SELECT 
          v.*,
          e.nombre_especie
        FROM vacunas v
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        WHERE v.activo = true AND v.especie_id = ${especie_id}
        ORDER BY e.nombre_especie, v.nombre
      `;
    } else {
      return await sql`
        SELECT 
          v.*,
          e.nombre_especie
        FROM vacunas v
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        WHERE v.activo = true
        ORDER BY e.nombre_especie, v.nombre
      `;
    }
  }

  // TODO: Agregar método create para POST
}
