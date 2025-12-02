/**
 * Usuarios Service
 * Maneja las operaciones de base de datos para usuarios
 */

import { sql } from "@/app/lib/db";

export class UsuariosService {
  /**
   * Obtener todos los usuarios activos con información de rol
   */
  static async findAll() {
    const usuarios = await sql`
      SELECT 
        u.*,
        r.nombre_rol,
        r.descripcion as rol_descripcion
      FROM usuarios u
      LEFT JOIN roles_usuario r ON u.rol_id = r.rol_id
      WHERE u.activo = true
      ORDER BY u.fecha_registro DESC
    `;

    return usuarios;
  }

  // TODO: Agregar métodos para POST
  // static async create(data: UsuarioData) { ... }
}
