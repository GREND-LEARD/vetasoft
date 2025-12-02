/**
 * Adopciones Service
 * Maneja las operaciones de base de datos para solicitudes de adopción
 */

import { sql } from "@/app/lib/db";

export class AdopcionesService {
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

  // TODO: Aquí agregarás los métodos para POST y PUT
  // Ejemplo:
  // static async create(data: SolicitudAdopcionData) { ... }
  // static async updateEstado(solicitud_id: number, data: UpdateEstadoData) { ... }
}
