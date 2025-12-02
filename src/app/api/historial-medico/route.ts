/**
 * API Routes: Historial Médico
 * GET /api/historial-medico - Listar historial médico
 * POST /api/historial-medico - Crear registro médico
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar historial médico
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const animal_id = searchParams.get("animal_id");
    const veterinario_id = searchParams.get("veterinario_id");

    const historial = await sql`
      SELECT 
        h.*,
        a.nombre as animal_nombre,
        cl.nombre as cliente_nombre,
        u.nombre as veterinario_nombre,
        tc.nombre as tipo_consulta_nombre
      FROM historial_medico h
      LEFT JOIN animales a ON h.animal_id = a.animal_id
      LEFT JOIN clientes cl ON a.cliente_id = cl.cliente_id
      LEFT JOIN veterinarios v ON h.veterinario_id = v.veterinario_id
      LEFT JOIN usuarios u ON v.usuario_id = u.usuario_id
      LEFT JOIN tipo_consulta tc ON h.tipo_consulta_id = tc.tipo_consulta_id
      WHERE (${animal_id}::int IS NULL OR h.animal_id = ${animal_id}::int)
        AND (${veterinario_id}::int IS NULL OR h.veterinario_id = ${veterinario_id}::int)
      ORDER BY h.fecha_consulta DESC
    `;

    return NextResponse.json({
      success: true,
      data: historial,
    });
  } catch (error) {
    console.error("Error fetching historial médico:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener el historial médico",
      },
      { status: 500 }
    );
  }
}

// POST - Crear registro médico
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cita_id,
      animal_id,
      veterinario_id,
      tipo_consulta_id,
      fecha_consulta,
      sintomas,
      diagnostico,
      tratamiento,
      examenes_realizados,
      medicamentos,
      proxima_cita,
      observaciones,
      peso,
      temperatura,
      frecuencia_cardiaca,
      frecuencia_respiratoria,
    } = body;

    if (
      !cita_id ||
      !animal_id ||
      !veterinario_id ||
      !tipo_consulta_id ||
      !diagnostico ||
      !tratamiento
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cita, animal, veterinario, tipo de consulta, diagnóstico y tratamiento son requeridos",
        },
        { status: 400 }
      );
    }

    const newHistorial = await sql`
      INSERT INTO historial_medico (
        cita_id, animal_id, veterinario_id, tipo_consulta_id,
        fecha_consulta, sintomas, diagnostico, tratamiento,
        examenes_realizados, medicamentos, proxima_cita,
        observaciones, peso, temperatura,
        frecuencia_cardiaca, frecuencia_respiratoria
      )
      VALUES (
        ${cita_id}, ${animal_id}, ${veterinario_id}, ${tipo_consulta_id},
        ${fecha_consulta || null}, ${
      sintomas || null
    }, ${diagnostico}, ${tratamiento},
        ${examenes_realizados || null}, ${medicamentos || null}, ${
      proxima_cita || null
    },
        ${observaciones || null}, ${peso || null}, ${temperatura || null},
        ${frecuencia_cardiaca || null}, ${frecuencia_respiratoria || null}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newHistorial[0],
        message: "Registro médico creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating historial médico:", error);

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
        error: "Error al crear el registro médico",
      },
      { status: 500 }
    );
  }
}
