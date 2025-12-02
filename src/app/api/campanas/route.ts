/**
 * API Routes: Campañas de Donación
 * GET /api/campanas - Listar campañas
 * POST /api/campanas - Crear nueva campaña
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar campañas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activo = searchParams.get("activo");

    let campanas;
    
    if (activo !== null) {
      const activoBool = activo === "true";
      campanas = await sql`
        SELECT 
          c.*,
          u.nombre as creado_por_nombre,
          COUNT(d.donacion_id) as total_donaciones
        FROM campana_donacion c
        LEFT JOIN usuarios u ON c.creado_por = u.usuario_id
        LEFT JOIN donaciones d ON c.campana_id = d.campana_id
        WHERE c.activo = ${activoBool}
        GROUP BY c.campana_id, u.nombre 
        ORDER BY c.fecha_inicio DESC
      `;
    } else {
      campanas = await sql`
        SELECT 
          c.*,
          u.nombre as creado_por_nombre,
          COUNT(d.donacion_id) as total_donaciones
        FROM campana_donacion c
        LEFT JOIN usuarios u ON c.creado_por = u.usuario_id
        LEFT JOIN donaciones d ON c.campana_id = d.campana_id
        GROUP BY c.campana_id, u.nombre 
        ORDER BY c.fecha_inicio DESC
      `;
    }

    return NextResponse.json({
      success: true,
      data: campanas,
    });
  } catch (error) {
    console.error("Error fetching campañas:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las campañas",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nueva campaña
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      descripcion,
      meta_monto,
      fecha_inicio,
      fecha_fin,
      creado_por,
    } = body;

    if (!nombre || !meta_monto || !fecha_inicio || !fecha_fin || !creado_por) {
      return NextResponse.json(
        {
          success: false,
          error: "Nombre, meta de monto, fechas y creador son requeridos",
        },
        { status: 400 }
      );
    }

    const newCampana = await sql`
      INSERT INTO campana_donacion (
        nombre, descripcion, meta_monto,
        fecha_inicio, fecha_fin, creado_por
      )
      VALUES (
        ${nombre}, ${descripcion || null}, ${meta_monto},
        ${fecha_inicio}, ${fecha_fin}, ${creado_por}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newCampana[0],
        message: "Campaña creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating campaña:", error);

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "El usuario especificado no existe",
        },
        { status: 400 }
      );
    }

    if (dbError.code === "23514") {
      return NextResponse.json(
        {
          success: false,
          error: "Valores inválidos: verifica fechas y montos",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear la campaña",
      },
      { status: 500 }
    );
  }
}
