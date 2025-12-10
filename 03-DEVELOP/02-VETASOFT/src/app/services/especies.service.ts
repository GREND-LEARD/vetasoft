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
 static async create(data: any) {
  const especie = await sql`
    INSERT INTO especies (
    nombre_especie,
     descripcion) 
    VALUES (
    ${data.nombre_especie},
    ${data.descripcion}) 
    RETURNING *;
  `;
  return especie[0];
} 
// Especie por id

  static async findById(id: string) {
    const especie = await sql`
      SELECT 
        e.*,
        COUNT(r.raza_id) as total_razas
      FROM especies e
      LEFT JOIN razas r ON e.especie_id = r.especie_id AND r.activo = true
      WHERE e.especie_id = ${id}
      GROUP BY e.especie_id
    `;
    if (especie.length === 0) {
      return null;
      return especie[0];
    }
}
// Actualizar especie

  static async update(id: string, data: any) {
    const especie = await sql`
      UPDATE especies 
      SET
        nombre_especie = ${data.nombre_especie},
        descripcion = ${data.descripcion}
      WHERE especie_id = ${id}
      RETURNING *;
    `;
    return especie[0]||null;
}

}
