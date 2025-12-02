/**
 * API Routes: Roles de Usuario
 * GET /api/roles - Listar todos los roles
 * POST /api/roles - Crear nuevo rol
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar todos los roles
export async function GET() {
  try {
    const roles = await sql`
      SELECT * FROM roles_usuario 
      WHERE activo = true 
      ORDER BY nombre_rol
    `;

    return NextResponse.json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los roles",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo rol
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre_rol, descripcion } = body;

    if (!nombre_rol) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre del rol es requerido",
        },
        { status: 400 }
      );
    }

    const newRole = await sql`
      INSERT INTO roles_usuario (nombre_rol, descripcion)
      VALUES (${nombre_rol}, ${descripcion || null})
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newRole[0],
        message: "Rol creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating role:", error);

    // Check for unique constraint violation
    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un rol con ese nombre",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear el rol",
      },
      { status: 500 }
    );
  }
}
