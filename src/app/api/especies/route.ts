/**
 * API Routes: Especies
 * GET /api/especies - Listar todas las especies
 * POST /api/especies - Crear nueva especie
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar todas las especies
export async function GET() {
  try {
    const especies = await sql`
      SELECT 
        e.*,
        COUNT(r.raza_id) as total_razas
      FROM especies e
      LEFT JOIN razas r ON e.especie_id = r.especie_id AND r.activo = true
      WHERE e.activo = true
      GROUP BY e.especie_id
      ORDER BY e.nombre_especie
    `;

    return NextResponse.json({
      success: true,
      data: especies,
    });
  } catch (error) {
    console.error("Error fetching especies:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las especies",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nueva especie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre_especie, descripcion } = body;

    if (!nombre_especie) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre de la especie es requerido",
        },
        { status: 400 }
      );
    }

    const newEspecie = await sql`
      INSERT INTO especies (nombre_especie, descripcion)
      VALUES (${nombre_especie}, ${descripcion || null})
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newEspecie[0],
        message: "Especie creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating especie:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe una especie con ese nombre",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear la especie",
      },
      { status: 500 }
    );
  }
}
