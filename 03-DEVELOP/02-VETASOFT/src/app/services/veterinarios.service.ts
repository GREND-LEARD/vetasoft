/**
 * Veterinarios Service
 * Maneja las operaciones de base de datos para veterinarios
 */

import { sql } from "@/app/lib/db";

export class VeterinariosService {
  /**
   * Obtener todos los veterinarios activos
   */
  static async findAll() {
    const veterinarios = await sql`
      SELECT 
        v.*,
        u.nombre as nombre_completo,
        u.correo,
        u.telefono
      FROM veterinarios v
      LEFT JOIN usuarios u ON v.usuario_id = u.usuario_id
      WHERE v.activo = true
      ORDER BY u.nombre
    `;

    return veterinarios;
  }

  static async findById(id: string) {
    const veterinarios = await sql`
      SELECT 
        v.*,
        u.nombre as nombre_completo,
        u.correo,
        u.telefono
      FROM veterinarios v
      LEFT JOIN usuarios u ON v.usuario_id = u.usuario_id
      WHERE v.veterinario_id = ${id}
    `;

    return veterinarios.length > 0 ? veterinarios[0] : null;
  }

  static async create(body: any) {
    return await sql`
      INSERT INTO veterinarios (usuario_id)
      VALUES (${body.usuario_id})
      RETURNING *
    `;
  }

  static async update(id: string, body: any) {
    return await sql`
      UPDATE veterinarios
      SET usuario_id = ${body.usuario_id}
      WHERE veterinario_id = ${id}
      RETURNING *
    `;
  }

  static async delete(id: string) {
    const result = await sql`
      UPDATE veterinarios
      SET activo = false
      WHERE veterinario_id = ${id}
      RETURNING *
    `;
    return result[0] || null;
  }


}
