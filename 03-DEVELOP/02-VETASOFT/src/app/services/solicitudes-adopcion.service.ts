/**
 * Solicitudes Adopcion Service
 * Maneja las operaciones de base de datos para solicitudes de adopción
 */

import { sql } from "@/app/lib/db";

export class SolicitudesAdopcionService {
  /**
   * Obtener todas las solicitudes con filtros opcionales
   */
  static async findAll(filters: {
    estado_id: number | null;
    animal_id: number | null;
  }) {
    const solicitudes = await sql`
      SELECT 
        s.*,
        a.nombre as animal_nombre,
        a.edad as animal_edad,
        r.nombre_raza,
        e.nombre_especie,
        ea.nombre as estado_nombre,
        u.nombre as respondido_por_nombre
      FROM solicitudes_adopcion s
      LEFT JOIN animales a ON s.animal_id = a.animal_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      LEFT JOIN estado_adopcion ea ON s.estado_id = ea.estado_id
      LEFT JOIN usuarios u ON s.respondido_por = u.usuario_id
      WHERE (${filters.estado_id}::int IS NULL OR s.estado_id = ${filters.estado_id}::int)
        AND (${filters.animal_id}::int IS NULL OR s.animal_id = ${filters.animal_id}::int)
      ORDER BY s.fecha_solicitud DESC
    `;

    return solicitudes;
  }

  /**
   * Crear nueva solicitud de adopción
   */
  static async create(data: any) {
    const result = await sql`
      INSERT INTO solicitudes_adopcion (
        animal_id,
        estado_id,
        respondido_por,
        observaciones_respuesta,
        fecha_solicitud,
        fecha_respuesta,
        fecha_aprobacion,
        fecha_rechazo
      )
      VALUES (
        ${data.animal_id},
        ${data.estado_id},
        ${data.respondido_por},
        ${data.observaciones_respuesta},
        ${data.fecha_solicitud},
        ${data.fecha_respuesta},
        ${data.fecha_aprobacion},
        ${data.fecha_rechazo}
      )
      RETURNING *
    `;
    return result.length > 0 ? result[0] : null;
  }

  /**
   * Obtener una solicitud de adopción por ID con detalles completos
   */
  static async findById(id: string) {
    const solicitudes = await sql`
      SELECT 
        s.*,
        a.nombre as animal_nombre,
        a.edad as animal_edad,
        r.nombre_raza,
        e.nombre_especie,
        ea.nombre as estado_nombre,
        u.nombre as respondido_por_nombre
      FROM solicitudes_adopcion s
      LEFT JOIN animales a ON s.animal_id = a.animal_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      LEFT JOIN estado_adopcion ea ON s.estado_id = ea.estado_id
      LEFT JOIN usuarios u ON s.respondido_por = u.usuario_id
      WHERE s.solicitud_id = ${id}
    `;

    return solicitudes.length > 0 ? solicitudes[0] : null;
  }

  /**
   * Actualizar estado de una solicitud de adopción
   */
  static async updateEstado(id: string, data: {
    estado_id: number;
    respondido_por: number;
    observaciones_respuesta?: string;
  }) {
    const result = await sql`
      UPDATE solicitudes_adopcion 
      SET 
        estado_id = ${data.estado_id},
        respondido_por = ${data.respondido_por},
        observaciones_respuesta = COALESCE(${data.observaciones_respuesta}, observaciones_respuesta),
        fecha_respuesta = CURRENT_TIMESTAMP
      WHERE solicitud_id = ${id}
      RETURNING *
    `;

    return result.length > 0 ? result[0] : null;
  }
  static async delete(id: string) {
    const result = await sql`
      DELETE FROM solicitudes_adopcion
      WHERE solicitud_id = ${id}
      RETURNING *
    `;
    return result.length > 0 ? result[0] : null;
  }
}
