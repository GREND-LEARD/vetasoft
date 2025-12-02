/**
 * Especies Controller
 * Maneja la lógica de negocio para especies
 */

import { NextResponse } from "next/server";
import { EspeciesService } from "@/app/services/especies.service";

export class EspeciesController {
  /**
   * GET - Listar todas las especies
   */
  static async getAll() {
    try {
      const especies = await EspeciesService.findAll();

      return NextResponse.json({
        success: true,
        data: especies,
      });
    } catch (error) {
      console.error("Error fetching especies:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener las especies",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST
}
