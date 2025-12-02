/**
 * API Routes: Cita Individual
 * GET /api/citas/[id] - Obtener cita por ID
 * PUT /api/citas/[id] - Actualizar cita
 * DELETE /api/citas/[id] - Cancelar cita
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener cita por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const cita = await sql`
      SELECT 
        c.*,
        a.nombre as animal_nombre,
        a.edad as animal_edad,
        a.peso as animal_peso,
        cl.nombre as cliente_nombre,
        cl.telefono as cliente_telefono,
        cl.correo as cliente_correo,
        u.nombre as veterinario_nombre,
        tc.nombre as tipo_consulta_nombre,
        tc.costo as tipo_consulta_costo,
        ec.estado_nombre,
        r.nombre_raza,
        e.nombre_especie
      FROM citas c
      LEFT JOIN animales a ON c.animal_id = a.animal_id
      LEFT JOIN clientes cl ON a.cliente_id = cl.cliente_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      LEFT JOIN veterinarios v ON c.veterinario_id = v.veterinario_id
      LEFT JOIN usuarios u ON v.usuario_id = u.usuario_id
      LEFT JOIN tipo_consulta tc ON c.tipo_consulta_id = tc.tipo_consulta_id
      LEFT JOIN estado_citas ec ON c.estado_id = ec.estado_id
      WHERE c.cita_id = ${id}
    `;

    if (cita.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cita no encontrada",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: cita[0],
    });
  } catch (error) {
    console.error("Error fetching cita:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener la cita",
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar cita
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { fecha_cita, motivo, estado_id, observaciones } = body;

    const updatedCita = await sql`
      UPDATE citas 
      SET 
        fecha_cita = COALESCE(${fecha_cita}, fecha_cita),
        motivo = COALESCE(${motivo}, motivo),
        estado_id = COALESCE(${estado_id}, estado_id),
        observaciones = COALESCE(${observaciones}, observaciones)
      WHERE cita_id = ${id}
      RETURNING *
    `;

    if (updatedCita.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cita no encontrada",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCita[0],
      message: "Cita actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error updating cita:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al actualizar la cita",
      },
      { status: 500 }
    );
  }
}

// DELETE - Cancelar cita (cambiar estado a cancelado)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Necesitarías tener un estado de "Cancelado" en la tabla estado_citas
    // Por ahora, simplemente marcaremos en observaciones
    const cancelledCita = await sql`
      UPDATE citas 
      SET observaciones = CONCAT(COALESCE(observaciones, ''), ' [CANCELADA]')
      WHERE cita_id = ${id}
      RETURNING *
    `;

    if (cancelledCita.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cita no encontrada",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: cancelledCita[0],
      message: "Cita cancelada exitosamente",
    });
  } catch (error) {
    console.error("Error cancelling cita:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al cancelar la cita",
      },
      { status: 500 }
    );
  }
}
