/**
 * Veterinarios Controller
 * Maneja la lógica de negocio para veterinarios
 */

import { NextRequest, NextResponse } from "next/server";
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

  /**
   * GET BY ID - Obtener un veterinario específico
   */
  static async getById(request: NextRequest, id: string) {
    try {
      const veterinario = await VeterinariosService.findById(id);

      if (!veterinario) {
        return NextResponse.json(
          { success: false, error: "Veterinario no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: veterinario,
      });
    } catch (error) {
      console.error("Error fetching veterinario:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener el veterinario" },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método update para PUT
  // TODO: Agregar método delete para DELETE
}
