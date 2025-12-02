/**
 * Animales Controller
 * Maneja la lógica de negocio para animales
 */

import { NextRequest, NextResponse } from "next/server";
import { AnimalesService } from "@/app/services/animales.service";

export class AnimalesController {
  /**
   * GET - Listar todos los animales con filtros opcionales
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const cliente_id = searchParams.get("cliente_id");
      const estado = searchParams.get("estado");

      const filters = {
        cliente_id: cliente_id ? parseInt(cliente_id) : null,
        estado: estado,
      };

      const animales = await AnimalesService.findAll(filters);

      return NextResponse.json({
        success: true,
        data: animales,
      });
    } catch (error) {
      console.error("Error fetching animales:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los animales",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST

  /**
   * GET BY ID - Obtener un animal específico con su historial
   */
  static async getById(request: NextRequest, id: string) {
    try {
      // Obtener animal
      const animal = await AnimalesService.findById(id);

      if (!animal) {
        return NextResponse.json(
          { success: false, error: "Animal no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: animal,
      });
    } catch (error) {
      console.error("Error fetching animal:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener el animal" },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método update para PUT
  // TODO: Agregar método delete para DELETE
}
