/**
 * API Routes: Citas
 * GET /api/citas - Listar citas con filtros
 * POST /api/citas - Crear nueva cita
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar citas con filtros
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const veterinario_id = searchParams.get("veterinario_id");
    const estado_id = searchParams.get("estado_id");
    const fecha_inicio = searchParams.get("fecha_inicio");
    const fecha_fin = searchParams.get("fecha_fin");

    // Si hay filtros, aplicarlos individualmente
    const citas = await sql`
      SELECT 
        c.*,
        a.nombre as animal_nombre,
        cl.nombre as cliente_nombre,
        cl.telefono as cliente_telefono,
        u.nombre as veterinario_nombre,
        tc.nombre as tipo_consulta_nombre,
        ec.estado_nombre
      FROM citas c
      LEFT JOIN animales a ON c.animal_id = a.animal_id
      LEFT JOIN clientes cl ON a.cliente_id = cl.cliente_id
      LEFT JOIN veterinarios v ON c.veterinario_id = v.veterinario_id
      LEFT JOIN usuarios u ON v.usuario_id = u.usuario_id
      LEFT JOIN tipo_consulta tc ON c.tipo_consulta_id = tc.tipo_consulta_id
      LEFT JOIN estado_citas ec ON c.estado_id = ec.estado_id
      WHERE (${veterinario_id}::int IS NULL OR c.veterinario_id = ${veterinario_id}::int)
        AND (${estado_id}::int IS NULL OR c.estado_id = ${estado_id}::int)
        AND (${fecha_inicio}::date IS NULL OR c.fecha_cita >= ${fecha_inicio}::date)
        AND (${fecha_fin}::date IS NULL OR c.fecha_cita <= ${fecha_fin}::date)
      ORDER BY c.fecha_cita DESC
    `;

    return NextResponse.json({
      success: true,
      data: citas,
    });
  } catch (error) {
    console.error("Error fetching citas:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las citas",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nueva cita
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      animal_id,
      veterinario_id,
      tipo_consulta_id,
      fecha_cita,
      motivo,
      estado_id,
      observaciones,
      creado_por,
    } = body;

    if (
      !animal_id ||
      !veterinario_id ||
      !tipo_consulta_id ||
      !fecha_cita ||
      !estado_id ||
      !creado_por
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos requeridos deben ser completados",
        },
        { status: 400 }
      );
    }

    const newCita = await sql`
      INSERT INTO citas (
        animal_id, veterinario_id, tipo_consulta_id,
        fecha_cita, motivo, estado_id, observaciones, creado_por
      )
      VALUES (
        ${animal_id}, ${veterinario_id}, ${tipo_consulta_id},
        ${fecha_cita}, ${motivo || null}, ${estado_id}, ${
      observaciones || null
    }, ${creado_por}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newCita[0],
        message: "Cita creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating cita:", error);

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
        error: "Error al crear la cita",
      },
      { status: 500 }
    );
  }
}
