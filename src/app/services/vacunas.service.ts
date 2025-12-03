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

  /**
   * Obtener una vacuna por ID
   */
  static async findById(id: string) {
    const vacunas = await sql`
      SELECT 
        v.*,
        e.nombre_especie
      FROM vacunas v
      LEFT JOIN especies e ON v.especie_id = e.especie_id
      WHERE v.vacuna_id = ${id}
    `;

    return vacunas.length > 0 ? vacunas[0] : null;
  }

  // TODO: Agregar método update(id, data) para PUT
  // TODO: Agregar método delete(id) para DELETE
}
