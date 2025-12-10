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
      },
      {status: 200}
    );
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

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const historial = await HistorialVacunacionService.create(body);
      return NextResponse.json({
        success: true,
        data: historial,
      },
      {status: 201}
    );
    } catch (error) {
      console.error("Error creating historial vacunación:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al crear el historial de vacunación",
        },
        { status: 500 }
      );
    }
  }

  static async getById(request: NextRequest, id: string) {
    try {
      const historial = await HistorialVacunacionService.findById(id);
      return NextResponse.json({
        success: true,
        data: historial,
      },
      {status: 200}
    );
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
}
