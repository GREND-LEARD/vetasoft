/**
 * Campañas Service
 * Maneja las operaciones de base de datos para campañas de donación
 */

import { sql } from "@/app/lib/db";

export class CampanasService {
  /**
   * Obtener todas las campañas con filtro opcional por estado activo
   */
  static async findAll(activo: string | null) {
    if (activo !== null) {
      const activoBool = activo === "true";
      return await sql`
        SELECT 
          c.*,
          u.nombre as creado_por_nombre,
          COUNT(d.donacion_id) as total_donaciones
        FROM campana_donacion c
        LEFT JOIN usuarios u ON c.creado_por = u.usuario_id
        LEFT JOIN donaciones d ON c.campana_id = d.campana_id
        WHERE c.activo = ${activoBool}
        GROUP BY c.campana_id, u.nombre 
        ORDER BY c.fecha_inicio DESC
      `;
    } else {
      return await sql`
        SELECT 
          c.*,
          u.nombre as creado_por_nombre,
          COUNT(d.donacion_id) as total_donaciones
        FROM campana_donacion c
        LEFT JOIN usuarios u ON c.creado_por = u.usuario_id
        LEFT JOIN donaciones d ON c.campana_id = d.campana_id
        GROUP BY c.campana_id, u.nombre 
        ORDER BY c.fecha_inicio DESC
      `;
    }
  }

  // TODO: Agregar método create para POST
}
