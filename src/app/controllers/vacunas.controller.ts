/**
 * Vacunas Controller
 * Maneja la lógica de negocio para vacunas
 */

import { NextRequest, NextResponse } from "next/server";
import { VacunasService } from "@/app/services/vacunas.service";

export class VacunasController {
  /**
   * GET - Listar vacunas con filtro opcional
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const especie_id = searchParams.get("especie_id");

      const vacunas = await VacunasService.findAll(especie_id);

      return NextResponse.json({
        success: true,
        data: vacunas,
      });
    } catch (error) {
      console.error("Error fetching vacunas:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener las vacunas",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST

  /**
   * GET BY ID - Obtener una vacuna específica
   */
  static async getById(request: NextRequest, id: string) {
    try {
      const vacuna = await VacunasService.findById(id);

      if (!vacuna) {
        return NextResponse.json(
          { success: false, error: "Vacuna no encontrada" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: vacuna,
      });
    } catch (error) {
      console.error("Error fetching vacuna:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener la vacuna" },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método update para PUT
  // TODO: Agregar método delete para DELETE
}
