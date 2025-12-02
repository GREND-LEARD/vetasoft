/**
 * Veterinarios Controller
 * Maneja la lógica de negocio para veterinarios
 */

import { NextResponse } from "next/server";
import { VeterinariosService } from "@/app/services/veterinarios.service";

export class VeterinariosController {
  /**
   * GET - Listar todos los veterinarios
   */
  static async getAll() {
    try {
      const veterinarios = await VeterinariosService.findAll();

      return NextResponse.json({
        success: true,
        data: veterinarios,
      });
    } catch (error) {
      console.error("Error fetching veterinarios:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los veterinarios",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST
}
