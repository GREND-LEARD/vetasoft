/**
 * API Routes: Solicitudes de Adopción
 * GET /api/adopciones - Listar solicitudes
 * POST /api/adopciones - Crear nueva solicitud
 * PUT /api/adopciones - Actualizar estado de solicitud
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar solicitudes de adopción
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const estado_id = searchParams.get("estado_id");
    const animal_id = searchParams.get("animal_id");

    const estadoIdNum = estado_id ? parseInt(estado_id) : null;
    const animalIdNum = animal_id ? parseInt(animal_id) : null;

    const solicitudes = await sql`
      SELECT 
        s.*,
        a.nombre as animal_nombre,
        a.edad as animal_edad,
        r.nombre_raza,
        e.nombre_especie,
        ea.nombre as estado_nombre,
        u.nombre as respondido_por_nombre
      FROM solicitudes_adopcion s
      LEFT JOIN animales a ON s.animal_id = a.animal_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      LEFT JOIN estado_adopcion ea ON s.estado_id = ea.estado_id
      LEFT JOIN usuarios u ON s.respondido_por = u.usuario_id
      WHERE (${estadoIdNum}::int IS NULL OR s.estado_id = ${estadoIdNum}::int)
        AND (${animalIdNum}::int IS NULL OR s.animal_id = ${animalIdNum}::int)
      ORDER BY s.fecha_solicitud DESC
    `;

    return NextResponse.json({
      success: true,
      data: solicitudes,
    });
  } catch (error) {
    console.error("Error fetching solicitudes:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las solicitudes",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nueva solicitud
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      animal_id,
      nombre_solicitante,
      correo_solicitante,
      telefono_solicitante,
      direccion_solicitante,
      experiencia_animales,
      motivo,
      estado_id,
    } = body;

    if (
      !animal_id ||
      !nombre_solicitante ||
      !correo_solicitante ||
      !telefono_solicitante ||
      !direccion_solicitante ||
      !experiencia_animales ||
      !motivo ||
      !estado_id
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos son requeridos",
        },
        { status: 400 }
      );
    }

    const newSolicitud = await sql`
      INSERT INTO solicitudes_adopcion (
        animal_id, nombre_solicitante, correo_solicitante,
        telefono_solicitante, direccion_solicitante,
        experiencia_animales, motivo, estado_id
      )
      VALUES (
        ${animal_id}, ${nombre_solicitante}, ${correo_solicitante},
        ${telefono_solicitante}, ${direccion_solicitante},
        ${experiencia_animales}, ${motivo}, ${estado_id}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newSolicitud[0],
        message: "Solicitud de adopción creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating solicitud:", error);

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "El animal o estado especificado no existe",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear la solicitud",
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar estado de solicitud (sin ID en la ruta, se pasa en el body)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { solicitud_id, estado_id, observacion_respuesta, respondido_por } =
      body;

    if (!solicitud_id || !estado_id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de solicitud y estado son requeridos",
        },
        { status: 400 }
      );
    }

    const updatedSolicitud = await sql`
      UPDATE solicitudes_adopcion 
      SET 
        estado_id = ${estado_id},
        observacion_respuesta = ${observacion_respuesta || null},
        respondido_por = ${respondido_por || null},
        fecha_respuesta = CURRENT_TIMESTAMP
      WHERE solicitud_id = ${solicitud_id}
      RETURNING *
    `;

    if (updatedSolicitud.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Solicitud no encontrada",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedSolicitud[0],
      message: "Solicitud actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error updating solicitud:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al actualizar la solicitud",
      },
      { status: 500 }
    );
  }
}
