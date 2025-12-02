/**
 * API Routes: Usuario Individual
 * GET /api/usuarios/[id] - Obtener usuario por ID
 * PUT /api/usuarios/[id] - Actualizar usuario
 * DELETE /api/usuarios/[id] - Desactivar usuario
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener usuario por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const usuario = await sql`
      SELECT 
        u.usuario_id,
        u.nombre,
        u.correo,
        u.telefono,
        u.direccion,
        u.rol_id,
        u.fecha_registro,
        u.ultimo_acceso,
        u.activo,
        r.nombre_rol,
        r.descripcion as rol_descripcion
      FROM usuarios u
      LEFT JOIN roles_usuario r ON u.rol_id = r.rol_id
      WHERE u.usuario_id = ${id}
    `;

    if (usuario.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: usuario[0],
    });
  } catch (error) {
    console.error("Error fetching usuario:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener el usuario",
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar usuario
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre, correo, telefono, direccion, rol_id, activo } = body;

    const updatedUsuario = await sql`
      UPDATE usuarios 
      SET 
        nombre = COALESCE(${nombre}, nombre),
        correo = COALESCE(${correo}, correo),
        telefono = COALESCE(${telefono}, telefono),
        direccion = COALESCE(${direccion}, direccion),
        rol_id = COALESCE(${rol_id}, rol_id),
        activo = COALESCE(${activo}, activo)
      WHERE usuario_id = ${id}
      RETURNING 
        usuario_id, nombre, correo, telefono, direccion, rol_id, 
        fecha_registro, ultimo_acceso, activo
    `;

    if (updatedUsuario.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUsuario[0],
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error updating usuario:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un usuario con ese correo electrónico",
        },
        { status: 409 }
      );
    }

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
        error: "Error al actualizar el usuario",
      },
      { status: 500 }
    );
  }
}

// DELETE - Desactivar usuario
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deactivatedUsuario = await sql`
      UPDATE usuarios 
      SET activo = false 
      WHERE usuario_id = ${id}
      RETURNING usuario_id, nombre, correo, activo
    `;

    if (deactivatedUsuario.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deactivatedUsuario[0],
      message: "Usuario desactivado exitosamente",
    });
  } catch (error) {
    console.error("Error deactivating usuario:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al desactivar el usuario",
      },
      { status: 500 }
    );
  }
}
