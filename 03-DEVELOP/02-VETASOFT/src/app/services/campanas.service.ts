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

  static async findById(id: string) {
    return await sql`
      SELECT 
        c.*,
        u.nombre as creado_por_nombre,
        COUNT(d.donacion_id) as total_donaciones
      FROM campana_donacion c
      LEFT JOIN usuarios u ON c.creado_por = u.usuario_id
      LEFT JOIN donaciones d ON c.campana_id = d.campana_id
      WHERE c.campana_id = ${id}
      GROUP BY c.campana_id, u.nombre 
    `;
  }


  static async create(body: any) {
    return await sql`
      INSERT INTO campana_donacion (nombre, fecha_inicio, fecha_fin, objetivo, creado_por)
      VALUES (${body.nombre}, ${body.fecha_inicio}, ${body.fecha_fin}, ${body.objetivo}, ${body.creado_por})
      RETURNING *
    `;
  }

static async update(id: string, body: any) {
    return await sql`
      UPDATE campana_donacion
      SET nombre = ${body.nombre},
          fecha_inicio = ${body.fecha_inicio},
          fecha_fin = ${body.fecha_fin},
          objetivo = ${body.objetivo},
          creado_por = ${body.creado_por}
      WHERE campana_id = ${id}
      RETURNING *
    `;
  }  

static async delete(id: string) {
    return await sql`
      UPDATE campana_donacion
      SET activo = false
      WHERE campana_id = ${id}
      RETURNING *
    `;
  }
}