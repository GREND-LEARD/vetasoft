/**
 * Donaciones Controller
 * Maneja la lógica de negocio para donaciones
 */

import { NextRequest, NextResponse } from "next/server";
import { DonacionesService } from "@/app/services/donaciones.service";

export class DonacionesController {
  /**
   * GET - Listar donaciones con filtro opcional por campaña
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const campana_id = searchParams.get("campana_id");

      const donaciones = await DonacionesService.findAll(
        campana_id ? Number(campana_id) : null
      );

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

  /**
   * POST - Crear nueva donación
   */
  static async create(request: NextRequest) {
    try {
      const data = await request.json();
      const donacion = await DonacionesService.create(data);

      return NextResponse.json({
        success: true,
        data: donacion,
      });
    } catch (error) {
      console.error("Error creating donacion:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al crear la donación",
        },
        { status: 500 }
      );
    }
  }

  /**
   * GET BY ID - Obtener donación por ID
   */
  static async getById(id: number) {
    try {
      const donaciones = await DonacionesService.findAll(null);
      const donacion = donaciones.find((d: any) => d.donacion_id === id);
      
      return NextResponse.json({
        success: true,
        data: donacion,
      });
    } catch (error) {
      console.error("Error fetching donacion:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener la donación",
        },
        { status: 500 }
      );
    }
  }

  /**
   * PUT - Actualizar donación
   */
  static async update(id: number, data: any) {
    try {
      const donacion = await DonacionesService.update(id, data);

      return NextResponse.json({
        success: true,
        data: donacion,
      });
    } catch (error) {
      console.error("Error updating donacion:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al actualizar la donación",
        },
        { status: 500 }
      );
    }
  }

  /**
   * DELETE - Eliminar donación
   */
  static async delete(id: number) {
    try {
      const donacion = await DonacionesService.delete(id);

      return NextResponse.json({
        success: true,
        data: donacion,
      });
    } catch (error) {
      console.error("Error deleting donacion:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al eliminar la donación",
        },
        { status: 500 }
      );
    }
  }
}
