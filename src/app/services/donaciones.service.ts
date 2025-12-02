/**
 * Donaciones Service
 * Maneja las operaciones de base de datos para donaciones
 */

import { sql } from "@/app/lib/db";

export class DonacionesService {
  /**
   * Obtener todas las donaciones con filtro opcional por campaña
   */
  static async findAll(campana_id: string | null) {
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

  // TODO: Agregar método create para POST
}
