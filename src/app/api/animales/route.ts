/**
 * API Routes: Animales
 * GET /api/animales - Listar todos los animales
 * POST /api/animales - Crear nuevo animal
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar todos los animales
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cliente_id = searchParams.get("cliente_id");
    const estado = searchParams.get("estado");

    const clienteIdNum = cliente_id ? parseInt(cliente_id) : null;

    const animales = await sql`
      SELECT 
        a.*,
        c.nombre as cliente_nombre,
        c.documento_id as cliente_documento,
        r.nombre_raza,
        e.nombre_especie
      FROM animales a
      LEFT JOIN clientes c ON a.cliente_id = c.cliente_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      WHERE a.activo = true
        AND (${clienteIdNum}::int IS NULL OR a.cliente_id = ${clienteIdNum}::int)
        AND (${estado}::text IS NULL OR a.estado = ${estado}::text)
      ORDER BY a.fecha_ingreso DESC
    `;

    return NextResponse.json({
      success: true,
      data: animales,
    });
  } catch (error) {
    console.error("Error fetching animales:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los animales",
      },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo animal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cliente_id,
      nombre,
      raza_id,
      edad,
      fecha_nacimiento,
      peso,
      sexo,
      descripcion,
      numero_chip,
      estado,
    } = body;

    // Validación básica
    if (
      !cliente_id ||
      !nombre ||
      !raza_id ||
      edad === undefined ||
      !peso ||
      !sexo ||
      !descripcion
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos requeridos deben ser completados",
        },
        { status: 400 }
      );
    }

    const newAnimal = await sql`
      INSERT INTO animales (
        cliente_id, nombre, raza_id, edad, fecha_nacimiento,
        peso, sexo, descripcion, numero_chip, estado
      )
      VALUES (
        ${cliente_id}, ${nombre}, ${raza_id}, ${edad}, ${
      fecha_nacimiento || null
    },
        ${peso}, ${sexo}, ${descripcion}, ${numero_chip || null}, ${
      estado || "Activo"
    }
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        data: newAnimal[0],
        message: "Animal registrado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating animal:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un animal con ese número de chip",
        },
        { status: 409 }
      );
    }

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "El cliente o la raza especificada no existe",
        },
        { status: 400 }
      );
    }

    if (dbError.code === "23514") {
      return NextResponse.json(
        {
          success: false,
          error: "Valores inválidos: verifica edad y peso",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al registrar el animal",
      },
      { status: 500 }
    );
  }
}
