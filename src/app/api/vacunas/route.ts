/**
 * API Routes: Vacunas
 * GET /api/vacunas - Listar vacunas
 * POST /api/vacunas - Crear nueva vacuna
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar vacunas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const especie_id = searchParams.get("especie_id");

    let vacunas;
    
    if (especie_id) {
      vacunas = await sql`
        SELECT 
          v.*,
          e.nombre_especie
        FROM vacunas v
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        WHERE v.activo = true AND v.especie_id = ${especie_id}
        ORDER BY e.nombre_especie, v.nombre
      `;
    } else {
      vacunas = await sql`
        SELECT 
          v.*,
          e.nombre_especie
        FROM vacunas v
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        WHERE v.activo = true
        ORDER BY e.nombre_especie, v.nombre
      `;
    }

    return NextResponse.json({
      success: true,
      data: vacunas,
    });
  } catch (error) {
    console.error("Error fetching vacunas:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las vacunas",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nueva vacuna
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      descripcion,
      edad_minima_meses,
      intervalo_meses,
      especie_id,
    } = body;

    if (
      !nombre ||
      edad_minima_meses === undefined ||
      !intervalo_meses ||
      !especie_id
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Nombre, edad mínima, intervalo y especie son requeridos",
        },
        { status: 400 }
      );
    }

    const newVacuna = await sql`
      INSERT INTO vacunas (
        nombre, descripcion, edad_minima_meses,
        intervalo_meses, especie_id
      )
      VALUES (
        ${nombre}, ${descripcion || null}, ${edad_minima_meses},
        ${intervalo_meses}, ${especie_id}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newVacuna[0],
        message: "Vacuna creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating vacuna:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe una vacuna con ese nombre para esta especie",
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
        error: "Error al crear la vacuna",
      },
      { status: 500 }
    );
  }
}
