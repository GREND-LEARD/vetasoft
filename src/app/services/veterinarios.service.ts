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

  // TODO: Agregar métodos para POST
  // static async create(data: VeterinarioData) { ... }

  /**
   * Obtener un veterinario por ID
   */
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

  // TODO: Agregar método update(id, data) para PUT
  // TODO: Agregar método delete(id) para DELETE
}
