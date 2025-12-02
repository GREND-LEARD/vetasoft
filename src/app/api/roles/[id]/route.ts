/**
 * API Routes: Rol Individual
 * GET /api/roles/[id] - Obtener rol por ID
 * PUT /api/roles/[id] - Actualizar rol
 * DELETE /api/roles/[id] - Desactivar rol
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener rol por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const role = await sql`
      SELECT * FROM roles_usuario WHERE rol_id = ${id}
    `;

    if (role.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Rol no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: role[0],
    });
  } catch (error) {
    console.error("Error fetching role:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener el rol",
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar rol
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre_rol, descripcion, activo } = body;

    const updatedRole = await sql`
      UPDATE roles_usuario 
      SET 
        nombre_rol = COALESCE(${nombre_rol}, nombre_rol),
        descripcion = COALESCE(${descripcion}, descripcion),
        activo = COALESCE(${activo}, activo)
      WHERE rol_id = ${id}
      RETURNING *
    `;

    if (updatedRole.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Rol no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedRole[0],
      message: "Rol actualizado exitosamente",
    });
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error updating role:", error);

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
        error: "Error al actualizar el rol",
      },
      { status: 500 }
    );
  }
}

// DELETE - Desactivar rol
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deactivatedRole = await sql`
      UPDATE roles_usuario 
      SET activo = false 
      WHERE rol_id = ${id}
      RETURNING *
    `;

    if (deactivatedRole.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Rol no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deactivatedRole[0],
      message: "Rol desactivado exitosamente",
    });
  } catch (error) {
    console.error("Error deactivating role:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al desactivar el rol",
      },
      { status: 500 }
    );
  }
}
