/**
 * Usuarios Service
 * Maneja las operaciones de base de datos para usuarios
 */

import { sql } from "@/app/lib/db";
import { PasswordUtil } from "@/app/utils/password.util";

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

  static async findById(id: number) {
    const usuario = await sql`
      SELECT 
        u.*,
        r.nombre_rol,
        r.descripcion as rol_descripcion
      FROM usuarios u
      LEFT JOIN roles_usuario r ON u.rol_id = r.rol_id
      WHERE u.usuario_id = ${id}
    `;

    return usuario[0] || null;
  }

  static async create(data: any) {
    // Hashear contraseña antes de insertar
    const hashedPassword = await PasswordUtil.hash(data.contrasena);
    
    const usuario = await sql`
      INSERT INTO usuarios (
        nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        rol_id
      ) VALUES (
        ${data.nombre},
        ${data.correo},
        ${hashedPassword},
        ${data.telefono || null},
        ${data.direccion || null},
        ${data.rol_id || 2}
      ) RETURNING 
        usuario_id,
        nombre,
        correo,
        telefono,
        direccion,
        rol_id
    `;

    return usuario[0];
  }

   // Para login
  static async authenticate(correo: string, contrasena: string) {
    const usuario = await sql`
      SELECT * FROM usuarios 
      WHERE correo = ${correo} AND activo = true
    `;
    
    if (usuario.length === 0) {
      return null; // Usuario no encontrado
    }
    
    // Verificar contraseña con el util
    const isValid = await PasswordUtil.verify(contrasena, usuario[0].contrasena);
    
    if (!isValid) {
      return null; // Contraseña incorrecta
    }
    
    // No retornar la contraseña
    const { contrasena: _, ...usuarioSinPassword } = usuario[0];
    return usuarioSinPassword;
  }

  static async update(id: number, data: any) {
    // 1. Obtener usuario actual para preservar datos no enviados
    const current = await this.findById(id);
    if (!current) return null;

    // 2. Hashear password si viene nuevo
    let passwordFinal = current.contrasena;
    if (data.contrasena) {
      passwordFinal = await PasswordUtil.hash(data.contrasena);
    }

    // 3. Update completo con datos mezclados
    const usuario = await sql`
      UPDATE usuarios 
      SET 
        nombre = ${data.nombre !== undefined ? data.nombre : current.nombre},
        correo = ${data.correo !== undefined ? data.correo : current.correo},
        contrasena = ${passwordFinal},
        telefono = ${data.telefono !== undefined ? data.telefono : current.telefono},
        direccion = ${data.direccion !== undefined ? data.direccion : current.direccion},
        rol_id = ${data.rol_id !== undefined ? data.rol_id : current.rol_id},
        activo = ${data.activo !== undefined ? data.activo : current.activo}
      WHERE usuario_id = ${id}
      RETURNING *
    `;

    return usuario[0];
  } 

  static async delete(id: number) {
    // Soft delete: marcar como inactivo en lugar de eliminar
    const usuario = await sql`
      UPDATE usuarios 
      SET activo = false
      WHERE usuario_id = ${id}
      RETURNING *
    `;

    return usuario[0];
  } 

}
