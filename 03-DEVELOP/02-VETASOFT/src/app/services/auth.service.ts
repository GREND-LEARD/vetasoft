/**
 * Auth Service
 * Maneja la lógica de autenticación (login, registro, verificación de tokens)
 */

import { sql } from "@/app/lib/db";
import { PasswordUtil } from "@/app/utils/password.util";
import { JwtUtil, JwtPayload } from "@/app/utils/jwt.util";

export class AuthService {
  /**
   * Autenticar un usuario (Login)
   * @param correo - Email del usuario
   * @param contrasena - Contraseña en texto plano
   * @returns Objeto con usuario y token si es exitoso, mensaje de error si falla
   */
  static async login(correo: string, contrasena: string) {
    // Buscar usuario activo por correo
    const usuarios = await sql`
      SELECT 
        u.usuario_id,
        u.nombre,
        u.correo,
        u.contrasena,
        u.rol_id,
        u.activo,
        u.fecha_registro,
        r.nombre_rol
      FROM usuarios u
      LEFT JOIN roles_usuario r ON u.rol_id = r.rol_id
      WHERE u.correo = ${correo} AND u.activo = true
    `;

    if (usuarios.length === 0) {
      return { success: false, message: "Credenciales inválidas" };
    }

    const usuario = usuarios[0];

    // Verificar contraseña
    const isPasswordValid = await PasswordUtil.verify(
      contrasena,
      usuario.contrasena
    );

    if (!isPasswordValid) {
      return { success: false, message: "Credenciales inválidas" };
    }

    // Generar JWT token
    const payload: JwtPayload = {
      userId: usuario.usuario_id,
      email: usuario.correo,
      roleId: usuario.rol_id,
      roleName: usuario.nombre_rol,
    };

    const token = JwtUtil.generateToken(payload);

    // Retornar usuario sin contraseña + token
    const { contrasena: _, ...usuarioSinPassword } = usuario;

    return {
      success: true,
      data: {
        user: usuarioSinPassword,
        token,
      },
    };
  }

  /**
   * Registrar un nuevo usuario
   * @param data - Datos del nuevo usuario
   * @returns Usuario creado y token si es exitoso, mensaje de error si falla
   */
  static async register(data: {
    nombre: string;
    correo: string;
    contrasena: string;
    rol_id?: number;
  }) {
    // Verificar si el correo ya existe
    const existingUser = await sql`
      SELECT usuario_id FROM usuarios WHERE correo = ${data.correo}
    `;

    if (existingUser.length > 0) {
      return { success: false, message: "El correo ya está registrado" };
    }

    // Hashear contraseña
    const hashedPassword = await PasswordUtil.hash(data.contrasena);

    // Crear usuario (rol_id por defecto es 2 si no se especifica)
    const nuevoUsuario = await sql`
      INSERT INTO usuarios (
        nombre,
        correo,
        contrasena,
        rol_id
      ) VALUES (
        ${data.nombre},
        ${data.correo},
        ${hashedPassword},
        ${data.rol_id || 2}
      ) RETURNING 
        usuario_id,
        nombre,
        correo,
        rol_id,
        activo,
        fecha_registro
    `;

    // Generar token
    const payload: JwtPayload = {
      userId: nuevoUsuario[0].usuario_id,
      email: nuevoUsuario[0].correo,
      roleId: nuevoUsuario[0].rol_id,
    };

    const token = JwtUtil.generateToken(payload);

    return {
      success: true,
      data: {
        user: nuevoUsuario[0],
        token,
      },
    };
  }

  /**
   * Verificar si un token es válido
   * @param token - Token JWT a verificar
   * @returns Payload del token si es válido, mensaje de error si no lo es
   */
  static async verifyToken(token: string) {
    const payload = JwtUtil.verifyToken(token);

    if (!payload) {
      return { success: false, message: "Token inválido o expirado" };
    }

    return {
      success: true,
      data: payload,
    };
  }
}
