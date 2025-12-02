/**
 * Campañas Controller
 * Maneja la lógica de negocio para campañas de donación
 */

import { NextRequest, NextResponse } from "next/server";
import { CampanasService } from "@/app/services/campanas.service";

export class CampanasController {
  /**
   * GET - Listar campañas con filtro opcional
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const activo = searchParams.get("activo");

      const campanas = await CampanasService.findAll(activo);

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

  // TODO: Agregar método create para POST
}
