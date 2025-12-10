/**
 * Estados Adopcion Controller
 * Maneja la lógica de negocio para estados de adopción
 */

import { NextRequest, NextResponse } from "next/server";
import { EstadosAdopcionService } from "@/app/services/estados-adopcion.service";

export class EstadosAdopcionController {
  /**
   * GET - Listar todos los estados de adopción
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const activo = searchParams.get("activo");

      const filters = {
        activo: activo !== null ? activo === "true" : null,
      };

      const estados = await EstadosAdopcionService.findAll(filters);

      return NextResponse.json({
        success: true,
        data: estados,
      });
    } catch (error) {
      console.error("Error fetching estados adopcion:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los estados de adopción",
        },
        { status: 500 }
      );
    }
  }


  static async getById(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      const estado = await EstadosAdopcionService.findById(Number(id));

      return NextResponse.json({
        success: true,
        data: estado,
      });
    } catch (error) {
      console.error("Error fetching estado adopcion:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el estado de adopción",
        },
        { status: 500 }
      );
    }
  }
}
