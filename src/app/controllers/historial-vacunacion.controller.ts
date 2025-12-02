/**
 * Historial Vacunación Controller
 * Maneja la lógica de negocio para historial de vacunación
 */

import { NextRequest, NextResponse } from "next/server";
import { HistorialVacunacionService } from "@/app/services/historial-vacunacion.service";

export class HistorialVacunacionController {
  /**
   * GET - Listar historial de vacunación con filtro opcional
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const animal_id = searchParams.get("animal_id");

      const historial = await HistorialVacunacionService.findAll(animal_id);

      return NextResponse.json({
        success: true,
        data: historial,
      });
    } catch (error) {
      console.error("Error fetching historial vacunación:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el historial de vacunación",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST
}
