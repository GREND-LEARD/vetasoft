/**
 * Roles Service
 * Maneja las operaciones de base de datos para roles de usuario
 */

import { sql } from "@/app/lib/db";

export class RolesService {
  /**
   * Obtener todos los roles activos
   */
  static async findAll() {
    const roles = await sql`
      SELECT * FROM roles_usuario 
      WHERE activo = true 
      ORDER BY nombre_rol
    `;

    return roles;
  }

  static async findById(id: number) {
    const role = await sql`
      SELECT * FROM roles_usuario 
      WHERE rol_id = ${id}
    `;

    return role[0] || null;
  }
}
