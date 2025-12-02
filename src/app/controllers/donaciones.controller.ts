/**
 * Donaciones Controller
 * Maneja la lógica de negocio para donaciones
 */

import { NextRequest, NextResponse } from "next/server";
import { DonacionesService } from "@/app/services/donaciones.service";

export class DonacionesController {
  /**
   * GET - Listar donaciones con filtro opcional
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const campana_id = searchParams.get("campana_id");

      const donaciones = await DonacionesService.findAll(campana_id);

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

  // TODO: Agregar método create para POST
}
