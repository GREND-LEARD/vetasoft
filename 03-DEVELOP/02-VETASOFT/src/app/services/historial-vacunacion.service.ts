/**
 * Historial Vacunación Service
 * Maneja las operaciones de base de datos para historial de vacunación
 */

import { sql } from "@/app/lib/db";

export class HistorialVacunacionService {
  /**
   * Obtener historial de vacunación con filtro opcional por animal
   */
  static async findAll(animal_id: string | null) {
    if (animal_id) {
      return await sql`
        SELECT 
          hv.*,
          a.nombre as animal_nombre,
          v.nombre as vacuna_nombre,
          v.intervalo_meses,
          u.nombre as veterinario_nombre,
          e.nombre_especie
        FROM historial_vacunacion hv
        LEFT JOIN animales a ON hv.animal_id = a.animal_id
        LEFT JOIN vacunas v ON hv.vacuna_id = v.vacuna_id
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        LEFT JOIN veterinarios vet ON hv.veterinario_id = vet.veterinario_id
        LEFT JOIN usuarios u ON vet.usuario_id = u.usuario_id
        WHERE hv.animal_id = ${animal_id}
        ORDER BY hv.fecha_vacunacion DESC
      `;
    } else {
      return await sql`
        SELECT 
          hv.*,
          a.nombre as animal_nombre,
          v.nombre as vacuna_nombre,
          v.intervalo_meses,
          u.nombre as veterinario_nombre,
          e.nombre_especie
        FROM historial_vacunacion hv
        LEFT JOIN animales a ON hv.animal_id = a.animal_id
        LEFT JOIN vacunas v ON hv.vacuna_id = v.vacuna_id
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        LEFT JOIN veterinarios vet ON hv.veterinario_id = vet.veterinario_id
        LEFT JOIN usuarios u ON vet.usuario_id = u.usuario_id
        ORDER BY hv.fecha_vacunacion DESC
      `;
    }
  }

  static async create(body: any) {
    return await sql`
      INSERT INTO historial_vacunacion (animal_id, vacuna_id, veterinario_id, fecha_vacunacion, observaciones)
      VALUES (${body.animal_id}, ${body.vacuna_id}, ${body.veterinario_id}, ${body.fecha_vacunacion}, ${body.observaciones})
      RETURNING *
    `;
  }

  static async findById(id: string) {
    return await sql`
      SELECT 
        hv.*,
        a.nombre as animal_nombre,
        v.nombre as vacuna_nombre,
        v.intervalo_meses,
        u.nombre as veterinario_nombre,
        e.nombre_especie
      FROM historial_vacunacion hv
      LEFT JOIN animales a ON hv.animal_id = a.animal_id
      LEFT JOIN vacunas v ON hv.vacuna_id = v.vacuna_id
      LEFT JOIN especies e ON v.especie_id = e.especie_id
      LEFT JOIN veterinarios vet ON hv.veterinario_id = vet.veterinario_id
      LEFT JOIN usuarios u ON vet.usuario_id = u.usuario_id
      WHERE hv.historial_vacunacion_id = ${id}
    `;
  }


}
