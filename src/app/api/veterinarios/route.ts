/**
 * API Routes: Veterinarios
 * GET /api/veterinarios - Listar todos los veterinarios
 * POST /api/veterinarios - Crear nuevo veterinario
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar todos los veterinarios
export async function GET() {
  try {
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

    return NextResponse.json({
      success: true,
      data: veterinarios,
    });
  } catch (error) {
    console.error("Error fetching veterinarios:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los veterinarios",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo veterinario
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      usuario_id,
      numero_licencia,
      especialidad,
      fecha_contratacion,
      horario_inicio,
      horario_fin,
    } = body;

    if (!usuario_id || !numero_licencia) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario y número de licencia son requeridos",
        },
        { status: 400 }
      );
    }

    const newVeterinario = await sql`
      INSERT INTO veterinarios (
        usuario_id, numero_licencia, especialidad,
        fecha_contratacion, horario_inicio, horario_fin
      )
      VALUES (
        ${usuario_id}, ${numero_licencia}, ${especialidad || null},
        ${fecha_contratacion || null}, ${horario_inicio || null}, ${
      horario_fin || null
    }
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newVeterinario[0],
        message: "Veterinario registrado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating veterinario:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un veterinario con ese número de licencia",
        },
        { status: 409 }
      );
    }

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "El usuario especificado no existe",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al registrar el veterinario",
      },
      { status: 500 }
    );
  }
}
