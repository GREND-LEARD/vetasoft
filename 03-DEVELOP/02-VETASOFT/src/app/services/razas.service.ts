/**
 * Razas Service
 * Maneja las operaciones de base de datos para razas
 */

import { sql } from "@/app/lib/db";

export class RazasService {
  /**
   * Obtener todas las razas con filtros opcionales
   */
  static async findAll(filters: {
    especie_id: number | null;
  }) {
    const razas = await sql`
      SELECT 
        r.raza_id,
        r.nombre_raza,
        r.descripcion,
        r.especie_id,
        e.nombre_especie
      FROM razas r
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      WHERE (${filters.especie_id}::int IS NULL OR r.especie_id = ${filters.especie_id}::int)
      ORDER BY e.nombre_especie ASC, r.nombre_raza ASC
    `;

    return razas;
  }

  // TODO: Agregar método create(data) para POST

   static async create(data: any) {
    const raza = await sql`
      INSERT INTO razas (
        nombre_raza,
        descripcion,
        especie
      )
      VALUES (
        ${data.nombre_raza},
        ${data.descripcion},
        ${data.especie}
      )
      RETURNING *;
    `;
    return raza[0];
  }
  // TODO: Agregar método findById(id) para GET por ID

  static async findById(id: string) {
    const raza = await sql`
      SELECT
        r.raza_id,
        r.nombre_raza,
        r.descripcion,
        r.especie,
        e.nombre_especie
      FROM razas r
      LEFT JOIN especies e ON r.especie = e.especie_id
      WHERE r.raza_id = ${id}::int
    `;

    if (raza.length === 0) return null;
    return raza[0];
  }
  // TODO: Agregar método update(id, data) para PUT
  static async update(id: string, data: any) {
    const updated = await sql`
      UPDATE razas
      SET
        nombre_raza = ${data.nombre_raza},
        descripcion = ${data.descripcion},
        especie = ${data.especie}
      WHERE raza_id = ${id}::int
      RETURNING *;
    `;

    return updated[0] || null;
  }

}
