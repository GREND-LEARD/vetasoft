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

  static async create(body: any) {
    return await sql`
      INSERT INTO vacunas (nombre, intervalo_meses, especie_id)
      VALUES (${body.nombre}, ${body.intervalo_meses}, ${body.especie_id})
      RETURNING *
    `;
  }

  static async update(id: string, body: any) {
    return await sql`
      UPDATE vacunas
      SET nombre = ${body.nombre}, intervalo_meses = ${body.intervalo_meses}, especie_id = ${body.especie_id}
      WHERE vacuna_id = ${id}
      RETURNING *
    `;
  }

  static async delete(id: string) {
    const result = await sql`
      UPDATE vacunas
      SET activo = false
      WHERE vacuna_id = ${id}
      RETURNING *
    `;
    return result[0] || null;
  }

} 
