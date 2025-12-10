/**
 * Donaciones Service
 * Maneja las operaciones de base de datos para donaciones
 */

import { sql } from "@/app/lib/db";

export class DonacionesService {
  /**
   * Obtener todas las donaciones con filtro opcional por campaña
   */
  static async findAll(campana_id: number | null = null) {
    if (campana_id) {
      return await sql`
        SELECT 
          d.*,
          c.nombre as campana_nombre
        FROM donaciones d
        LEFT JOIN campana_donacion c ON d.campana_id = c.campana_id
        WHERE d.campana_id = ${campana_id}
        ORDER BY d.fecha_donacion DESC
      `;
    } else {
      return await sql`
        SELECT 
          d.*,
          c.nombre as campana_nombre
        FROM donaciones d
        LEFT JOIN campana_donacion c ON d.campana_id = c.campana_id
        ORDER BY d.fecha_donacion DESC
      `;
    }
  }

  static async create(data: any) {
    const result = await sql`
      INSERT INTO donaciones (campana_id, monto, fecha_donacion)
      VALUES (${data.campana_id}, ${data.monto}, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    return result.length > 0 ? result[0] : null;
  }

  static async update(id: number, data: any) {
    const result = await sql`
      UPDATE donaciones
      SET campana_id = COALESCE(${data.campana_id}, campana_id),
          monto = COALESCE(${data.monto}, monto),
          fecha_donacion = COALESCE(${data.fecha_donacion}, fecha_donacion)
      WHERE donacion_id = ${id}
      RETURNING *
    `;
    return result.length > 0 ? result[0] : null;
  }

  static async delete(id: number) {
    const result = await sql`
      DELETE FROM donaciones
      WHERE donacion_id = ${id}
      RETURNING *
    `;
    return result.length > 0 ? result[0] : null;
  }

}
