/**
 * API Routes: Clientes
 * GET /api/clientes - Listar todos los clientes
 * POST /api/clientes - Crear nuevo cliente
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar todos los clientes
export async function GET() {
  try {
    const clientes = await sql`
      SELECT 
        c.*,
        u.nombre as empleado_nombre,
        COUNT(a.animal_id) as total_animales
      FROM clientes c
      LEFT JOIN usuarios u ON c.empleado_id = u.usuario_id
      LEFT JOIN animales a ON c.cliente_id = a.cliente_id AND a.activo = true
      WHERE c.activo = true
      GROUP BY c.cliente_id, u.nombre
      ORDER BY c.fecha_registro DESC
    `;

    return NextResponse.json({
      success: true,
      data: clientes,
    });
  } catch (error) {
    console.error("Error fetching clientes:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los clientes",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo cliente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      correo,
      telefono,
      direccion,
      fecha_nacimiento,
      documento_id,
      empleado_id,
    } = body;

    // Validación básica
    if (!nombre || !documento_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Nombre y documento son requeridos",
        },
        { status: 400 }
      );
    }

    const newCliente = await sql`
      INSERT INTO clientes (
        nombre, correo, telefono, direccion, 
        fecha_nacimiento, documento_id, empleado_id
      )
      VALUES (
        ${nombre}, 
        ${correo || null}, 
        ${telefono || null}, 
        ${direccion || null},
        ${fecha_nacimiento || null},
        ${documento_id},
        ${empleado_id || null}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newCliente[0],
        message: "Cliente creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating cliente:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un cliente con ese documento",
        },
        { status: 409 }
      );
    }

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "El empleado especificado no existe",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al crear el cliente",
      },
      { status: 500 }
    );
  }
}
