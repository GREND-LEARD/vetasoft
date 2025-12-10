/**
 * Historial Médico Controller
 * Maneja la lógica de negocio para historial médico
 */

import { NextRequest, NextResponse } from "next/server";
import { HistorialMedicoService } from "@/app/services/historial-medico.service";

export class HistorialMedicoController {
  /**
   * GET - Listar historial médico con filtros opcionales
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const animal_id = searchParams.get("animal_id");
      const veterinario_id = searchParams.get("veterinario_id");

      const filters = {
        animal_id,
        veterinario_id,
      };

      const historial = await HistorialMedicoService.findAll(filters);

      return NextResponse.json({
        success: true,
        data: historial,
      },
      {status: 200}
    );
    } catch (error) {
      console.error("Error fetching historial médico:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el historial médico",
        },
        { status: 500 }
      );
    }
  }

  static async getById(request: NextRequest, id: string) {
    try {
      const historial = await HistorialMedicoService.findById(id);
      return NextResponse.json({
        success: true,
        data: historial,
      },
      {status: 200}
    );
    } catch (error) {
      console.error("Error fetching historial médico:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el historial médico",
        },
        { status: 500 }
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const historial = await HistorialMedicoService.create(body);
      return NextResponse.json({
        success: true,
        data: historial,
      },
      {status: 200}
    );
    } catch (error) {
      console.error("Error creating historial médico:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al crear el historial médico",
        },
        { status: 500 }
      );
    }
  }
}
