/**
 * Citas Controller
 * Maneja la lógica de negocio para citas
 */

import { NextRequest, NextResponse } from "next/server";
import { CitasService } from "@/app/services/citas.service";

export class CitasController {
  /**
   * GET - Listar citas con filtros opcionales
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const veterinario_id = searchParams.get("veterinario_id");
      const estado_id = searchParams.get("estado_id");
      const fecha_inicio = searchParams.get("fecha_inicio");
      const fecha_fin = searchParams.get("fecha_fin");

      const filters = {
        veterinario_id,
        estado_id,
        fecha_inicio,
        fecha_fin,
      };

      const citas = await CitasService.findAll(filters);

      return NextResponse.json({
        success: true,
        data: citas,
      });
    } catch (error) {
      console.error("Error fetching citas:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener las citas",
        },
        { status: 500 }
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const cita = await CitasService.create(body);
      return NextResponse.json({
        success: true,
        data: cita,
      });
    } catch (error) {
      console.error("Error creating cita:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al crear la cita",
        },
        { status: 500 }
      );
    }
  }

  /**
   * GET BY ID - Obtener cita por ID
   */
  static async getById(id: number) {
    try {
      const cita = await CitasService.findById(id);
      return NextResponse.json({
        success: true,
        data: cita,
      });
    } catch (error) {
      console.error("Error finding cita:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al buscar la cita",
        },
        { status: 500 }
      );
    }
  }

  /**
   * PUT - Actualizar cita
   */
  static async update(id: number, data: any) {
    try {
      const cita = await CitasService.update(id, data);
      return NextResponse.json({
        success: true,
        data: cita,
      });
    } catch (error) {
      console.error("Error updating cita:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al actualizar la cita",
        },
        { status: 500 }
      );
    }
  }

  /**
   * DELETE - Cancelar cita
   */
  static async delete(id: number) {
    try {
      const cita = await CitasService.delete(id);
      return NextResponse.json({
        success: true,
        data: cita,
      });
    } catch (error) {
      console.error("Error deleting cita:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al eliminar la cita",
        },
        { status: 500 }
      );
    }
  }





}

