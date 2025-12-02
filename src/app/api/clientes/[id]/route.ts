/**
 * API Routes: Cliente Individual
 * GET /api/clientes/[id] - Obtener cliente por ID con sus animales
 * PUT /api/clientes/[id] - Actualizar cliente
 * DELETE /api/clientes/[id] - Desactivar cliente
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener cliente por ID con sus animales
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Obtener cliente
    const cliente = await sql`
      SELECT 
        c.*,
        u.nombre as empleado_nombre
      FROM clientes c
      LEFT JOIN usuarios u ON c.empleado_id = u.usuario_id
      WHERE c.cliente_id = ${id}
    `;

    if (cliente.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cliente no encontrado",
        },
        { status: 404 }
      );
    }

    // Obtener animales del cliente
    const animales = await sql`
      SELECT 
        a.*,
        r.nombre_raza,
        e.nombre_especie
      FROM animales a
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      WHERE a.cliente_id = ${id} AND a.activo = true
      ORDER BY a.fecha_ingreso DESC
    `;

    return NextResponse.json({
      success: true,
      data: {
        ...cliente[0],
        animales: animales,
      },
    });
  } catch (error) {
    console.error("Error fetching cliente:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener el cliente",
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar cliente
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      nombre,
      correo,
      telefono,
      direccion,
      fecha_nacimiento,
      documento_id,
      empleado_id,
      activo,
    } = body;

    const updatedCliente = await sql`
      UPDATE clientes 
      SET 
        nombre = COALESCE(${nombre}, nombre),
        correo = COALESCE(${correo}, correo),
        telefono = COALESCE(${telefono}, telefono),
        direccion = COALESCE(${direccion}, direccion),
        fecha_nacimiento = COALESCE(${fecha_nacimiento}, fecha_nacimiento),
        documento_id = COALESCE(${documento_id}, documento_id),
        empleado_id = COALESCE(${empleado_id}, empleado_id),
        activo = COALESCE(${activo}, activo)
      WHERE cliente_id = ${id}
      RETURNING *
    `;

    if (updatedCliente.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cliente no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCliente[0],
      message: "Cliente actualizado exitosamente",
    });
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error updating cliente:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un cliente con ese documento",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al actualizar el cliente",
      },
      { status: 500 }
    );
  }
}

// DELETE - Desactivar cliente
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deactivatedCliente = await sql`
      UPDATE clientes 
      SET activo = false 
      WHERE cliente_id = ${id}
      RETURNING *
    `;

    if (deactivatedCliente.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cliente no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deactivatedCliente[0],
      message: "Cliente desactivado exitosamente",
    });
  } catch (error) {
    console.error("Error deactivating cliente:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al desactivar el cliente",
      },
      { status: 500 }
    );
  }
}
