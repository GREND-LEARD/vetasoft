/**
 * Citas Controller
 * Maneja la lógica de negocio para citas
 */

import { NextRequest, NextResponse } from "next/server";
import { CitasService } from "@/app/services/citas.service";

export class CitasController {
  /**
   * GET - Listar citas con filtros opcionales
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const veterinario_id = searchParams.get("veterinario_id");
      const estado_id = searchParams.get("estado_id");
      const fecha_inicio = searchParams.get("fecha_inicio");
      const fecha_fin = searchParams.get("fecha_fin");

      const filters = {
        veterinario_id,
        estado_id,
        fecha_inicio,
        fecha_fin,
      };

      const citas = await CitasService.findAll(filters);

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

  // TODO: Agregar método create para POST
}
