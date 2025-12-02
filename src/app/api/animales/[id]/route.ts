/**
 * API Routes: Animal Individual
 * GET /api/animales/[id] - Obtener animal por ID con historial
 * PUT /api/animales/[id] - Actualizar animal
 * DELETE /api/animales/[id] - Desactivar animal
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener animal por ID con historial médico
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Obtener animal
    const animal = await sql`
      SELECT 
        a.*,
        c.nombre as cliente_nombre,
        c.telefono as cliente_telefono,
        c.correo as cliente_correo,
        r.nombre_raza,
        e.nombre_especie
      FROM animales a
      LEFT JOIN clientes c ON a.cliente_id = c.cliente_id
      LEFT JOIN razas r ON a.raza_id = r.raza_id
      LEFT JOIN especies e ON r.especie_id = e.especie_id
      WHERE a.animal_id = ${id}
    `;

    if (animal.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Animal no encontrado",
        },
        { status: 404 }
      );
    }

    // Obtener historial médico
    const historial = await sql`
      SELECT 
        h.*,
        v.nombre as veterinario_nombre,
        tc.nombre as tipo_consulta_nombre
      FROM historial_medico h
      LEFT JOIN veterinarios vet ON h.veterinario_id = vet.veterinario_id
      LEFT JOIN usuarios v ON vet.usuario_id = v.usuario_id
      LEFT JOIN tipo_consulta tc ON h.tipo_consulta_id = tc.tipo_consulta_id
      WHERE h.animal_id = ${id}
      ORDER BY h.fecha_consulta DESC
      LIMIT 10
    `;

    // Obtener historial de vacunación
    const vacunas = await sql`
      SELECT 
        hv.*,
        v.nombre as vacuna_nombre,
        vet_user.nombre as veterinario_nombre
      FROM historial_vacunacion hv
      LEFT JOIN vacunas v ON hv.vacuna_id = v.vacuna_id
      LEFT JOIN veterinarios vet ON hv.veterinario_id = vet.veterinario_id
      LEFT JOIN usuarios vet_user ON vet.usuario_id = vet_user.usuario_id
      WHERE hv.animal_id = ${id}
      ORDER BY hv.fecha_vacunacion DESC
      LIMIT 10
    `;

    return NextResponse.json({
      success: true,
      data: {
        ...animal[0],
        historial_medico: historial,
        historial_vacunacion: vacunas,
      },
    });
  } catch (error) {
    console.error("Error fetching animal:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener el animal",
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar animal
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      nombre,
      raza_id,
      edad,
      fecha_nacimiento,
      peso,
      sexo,
      descripcion,
      numero_chip,
      estado,
      activo,
    } = body;

    const updatedAnimal = await sql`
      UPDATE animales 
      SET 
        nombre = COALESCE(${nombre}, nombre),
        raza_id = COALESCE(${raza_id}, raza_id),
        edad = COALESCE(${edad}, edad),
        fecha_nacimiento = COALESCE(${fecha_nacimiento}, fecha_nacimiento),
        peso = COALESCE(${peso}, peso),
        sexo = COALESCE(${sexo}, sexo),
        descripcion = COALESCE(${descripcion}, descripcion),
        numero_chip = COALESCE(${numero_chip}, numero_chip),
        estado = COALESCE(${estado}, estado),
        activo = COALESCE(${activo}, activo)
      WHERE animal_id = ${id}
      RETURNING *
    `;

    if (updatedAnimal.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Animal no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedAnimal[0],
      message: "Animal actualizado exitosamente",
    });
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error updating animal:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe un animal con ese número de chip",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al actualizar el animal",
      },
      { status: 500 }
    );
  }
}

// DELETE - Desactivar animal
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deactivatedAnimal = await sql`
      UPDATE animales 
      SET activo = false 
      WHERE animal_id = ${id}
      RETURNING *
    `;

    if (deactivatedAnimal.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Animal no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deactivatedAnimal[0],
      message: "Animal desactivado exitosamente",
    });
  } catch (error) {
    console.error("Error deactivating animal:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al desactivar el animal",
      },
      { status: 500 }
    );
  }
}
