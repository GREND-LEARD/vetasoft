/**
 * Campañas Controller
 * Maneja la lógica de negocio para campañas de donación
 */

import { NextRequest, NextResponse } from "next/server";
import { CampanasService } from "@/app/services/campanas.service";

export class CampanasController {
  /**
   * GET - Listar campañas con filtro opcional
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const activo = searchParams.get("activo");

      const campanas = await CampanasService.findAll(activo);

      return NextResponse.json({
        success: true,
        data: campanas,
      });
    } catch (error) {
      console.error("Error fetching campañas:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener las campañas",
        },
        { status: 500 }
      );
    }
  }

  static async getById(request: NextRequest, id: string) {
    try {
      const campana = await CampanasService.findById(id);
      return NextResponse.json({
        success: true,
        data: campana,
      });
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener la campaña",
        },
        { status: 500 }
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const campana = await CampanasService.create(body);
      return NextResponse.json({
        success: true,
        data: campana,
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al crear la campaña",
        },
        { status: 500 }
      );
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const campana = await CampanasService.update(id, body);
      return NextResponse.json({
        success: true,
        data: campana,
      });
    } catch (error) {
      console.error("Error updating campaign:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al actualizar la campaña",
        },
        { status: 500 }
      );
    }
  }

  static async delete(request: NextRequest, id: string) {
    try {
      const campana = await CampanasService.delete(id);
      return NextResponse.json({
        success: true,
        data: campana,
      });
    } catch (error) {
      console.error("Error deleting campaign:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al eliminar la campaña",
        },
        { status: 500 }
      );
    }
  } 

  
}
