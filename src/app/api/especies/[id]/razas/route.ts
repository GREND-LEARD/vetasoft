/**
 * API Routes: Razas por Especie
 * GET /api/especies/[id]/razas - Obtener razas de una especie
 * POST /api/especies/[id]/razas - Crear nueva raza para una especie
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener razas de una especie
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const razas = await sql`
      SELECT * FROM razas 
      WHERE especie_id = ${id} AND activo = true
      ORDER BY nombre_raza
    `;

    return NextResponse.json({
      success: true,
      data: razas,
    });
  } catch (error) {
    console.error("Error fetching razas:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las razas",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nueva raza para una especie
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre_raza, descripcion } = body;

    if (!nombre_raza) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre de la raza es requerido",
        },
        { status: 400 }
      );
    }

    const newRaza = await sql`
      INSERT INTO razas (especie_id, nombre_raza, descripcion)
      VALUES (${id}, ${nombre_raza}, ${descripcion || null})
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newRaza[0],
        message: "Raza creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating raza:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe una raza con ese nombre para esta especie",
        },
        { status: 409 }
      );
    }

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "La especie especificada no existe",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear la raza",
      },
      { status: 500 }
    );
  }
}
