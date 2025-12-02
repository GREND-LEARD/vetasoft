/**
 * API Routes: Usuarios
 * GET /api/usuarios - Listar todos los usuarios
 * POST /api/usuarios - Crear nuevo usuario
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar todos los usuarios con información de rol
export async function GET() {
  try {
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

    return NextResponse.json({
      success: true,
      data: usuarios,
    });
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los usuarios",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo usuario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, correo, contrasena, telefono, direccion, rol_id } = body;

    // Validación básica
    if (!nombre || !correo || !contrasena || !rol_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Nombre, correo, contraseña y rol son requeridos",
        },
        { status: 400 }
      );
    }

    // En producción, deberías hashear la contraseña aquí
    // import bcrypt from 'bcrypt';
    // const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUsuario = await sql`
      INSERT INTO usuarios (nombre, correo, contrasena, telefono, direccion, rol_id)
      VALUES (${nombre}, ${correo}, ${contrasena}, ${telefono || null}, ${
      direccion || null
    }, ${rol_id})
      RETURNING *
    `;

    // No devolver la contraseña en la respuesta
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { contrasena: _password, ...usuarioSinPassword } = newUsuario[0] as Record<string, unknown>;

    return NextResponse.json(
      {
        success: true,
        data: usuarioSinPassword,
        message: "Usuario creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating usuario:", error);

    // Check for unique constraint violation (email duplicado)
    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un usuario con ese correo electrónico",
        },
        { status: 409 }
      );
    }

    // Check for foreign key violation (rol_id no existe)
    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "El rol especificado no existe",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear el usuario",
      },
      { status: 500 }
    );
  }
}
