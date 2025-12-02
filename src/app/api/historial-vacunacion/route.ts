/**
 * API Routes: Historial de Vacunación
 * GET /api/historial-vacunacion - Listar historial de vacunación
 * POST /api/historial-vacunacion - Registrar vacunación
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar historial de vacunación
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const animal_id = searchParams.get("animal_id");

    let historial;
    
    if (animal_id) {
      historial = await sql`
        SELECT 
          hv.*,
          a.nombre as animal_nombre,
          v.nombre as vacuna_nombre,
          v.intervalo_meses,
          u.nombre as veterinario_nombre,
          e.nombre_especie
        FROM historial_vacunacion hv
        LEFT JOIN animales a ON hv.animal_id = a.animal_id
        LEFT JOIN vacunas v ON hv.vacuna_id = v.vacuna_id
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        LEFT JOIN veterinarios vet ON hv.veterinario_id = vet.veterinario_id
        LEFT JOIN usuarios u ON vet.usuario_id = u.usuario_id
        WHERE hv.animal_id = ${animal_id}
        ORDER BY hv.fecha_vacunacion DESC
      `;
    } else {
      historial = await sql`
        SELECT 
          hv.*,
          a.nombre as animal_nombre,
          v.nombre as vacuna_nombre,
          v.intervalo_meses,
          u.nombre as veterinario_nombre,
          e.nombre_especie
        FROM historial_vacunacion hv
        LEFT JOIN animales a ON hv.animal_id = a.animal_id
        LEFT JOIN vacunas v ON hv.vacuna_id = v.vacuna_id
        LEFT JOIN especies e ON v.especie_id = e.especie_id
        LEFT JOIN veterinarios vet ON hv.veterinario_id = vet.veterinario_id
        LEFT JOIN usuarios u ON vet.usuario_id = u.usuario_id
        ORDER BY hv.fecha_vacunacion DESC
      `;
    }

    return NextResponse.json({
      success: true,
      data: historial,
    });
  } catch (error) {
    console.error("Error fetching historial vacunación:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener el historial de vacunación",
      },
      { status: 500 }
    );
  }
}

// POST - Registrar vacunación
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      animal_id,
      vacuna_id,
      veterinario_id,
      fecha_vacunacion,
      lote_vacuna,
      proxima_vacuna,
      observaciones,
    } = body;

    if (
      !animal_id ||
      !vacuna_id ||
      !veterinario_id ||
      !fecha_vacunacion ||
      !lote_vacuna
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Animal, vacuna, veterinario, fecha y lote son requeridos",
        },
        { status: 400 }
      );
    }

    const newVacunacion = await sql`
      INSERT INTO historial_vacunacion (
        animal_id, vacuna_id, veterinario_id,
        fecha_vacunacion, lote_vacuna, proxima_vacuna, observaciones
      )
      VALUES (
        ${animal_id}, ${vacuna_id}, ${veterinario_id},
        ${fecha_vacunacion}, ${lote_vacuna}, ${proxima_vacuna || null}, ${
      observaciones || null
    }
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newVacunacion[0],
        message: "Vacunación registrada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating vacunación:", error);

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "Uno de los registros relacionados no existe",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al registrar la vacunación",
      },
      { status: 500 }
    );
  }
}
