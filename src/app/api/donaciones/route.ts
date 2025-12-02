/**
 * API Routes: Donaciones
 * GET /api/donaciones - Listar donaciones
 * POST /api/donaciones - Registrar nueva donación
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { DatabaseError } from "@/app/types/database.types";

// GET - Listar donaciones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campana_id = searchParams.get("campana_id");

    let donaciones;
    
    if (campana_id) {
      donaciones = await sql`
        SELECT 
          d.*,
          c.nombre as campana_nombre
        FROM donaciones d
        LEFT JOIN campana_donacion c ON d.campana_id = c.campana_id
        WHERE d.campana_id = ${campana_id}
        ORDER BY d.fecha_donacion DESC
      `;
    } else {
      donaciones = await sql`
        SELECT 
          d.*,
          c.nombre as campana_nombre
        FROM donaciones d
        LEFT JOIN campana_donacion c ON d.campana_id = c.campana_id
        ORDER BY d.fecha_donacion DESC
      `;
    }

    return NextResponse.json({
      success: true,
      data: donaciones,
    });
  } catch (error) {
    console.error("Error fetching donaciones:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las donaciones",
      },
      { status: 500 }
    );
  }
}

// POST - Registrar nueva donación
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      campana_id,
      nombre_donante,
      correo_donante,
      telefono_donante,
      monto,
      metodo_pago,
      numero_transaccion,
      observaciones,
      anonimo,
    } = body;

    if (!campana_id || !nombre_donante || !monto) {
      return NextResponse.json(
        {
          success: false,
          error: "Campaña, nombre del donante y monto son requeridos",
        },
        { status: 400 }
      );
    }

    // Iniciar transacción: registrar donación y actualizar monto recaudado
    const newDonacion = await sql`
      WITH nueva_donacion AS (
        INSERT INTO donaciones (
          campana_id, nombre_donante, correo_donante, telefono_donante,
          monto, metodo_pago, numero_transaccion, observaciones, anonimo
        )
        VALUES (
          ${campana_id}, ${nombre_donante}, ${correo_donante || null}, ${
      telefono_donante || null
    },
          ${monto}, ${metodo_pago || null}, ${numero_transaccion || null}, 
          ${observaciones || null}, ${anonimo || false}
        )
        RETURNING *
      ),
      actualizar_campana AS (
        UPDATE campana_donacion
        SET monto_recaudado = monto_recaudado + ${monto}
        WHERE campana_id = ${campana_id}
        RETURNING *
      )
      SELECT * FROM nueva_donacion
    `;

    return NextResponse.json(
      {
        success: true,
        data: newDonacion[0],
        message: "Donación registrada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    const dbError = error as DatabaseError;
    console.error("Error creating donación:", error);

    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "Ya existe una donación con ese número de transacción",
        },
        { status: 409 }
      );
    }

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          error: "La campaña especificada no existe",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error al registrar la donación",
      },
      { status: 500 }
    );
  }
}
