/**
 * Razas Controller
 * Maneja la lógica de negocio para razas
 */
import { NextRequest, NextResponse } from "next/server";
import { RazasService } from "@/app/services/razas.service";

export class RazasController {
  /**
   * GET - Listar todas las razas con filtro opcional
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const especie_id = searchParams.get("especie_id");

      const razas = await RazasService.findAll({
        especie_id: especie_id ? parseInt(especie_id) : null,
      });

      return NextResponse.json({
        success: true,
        data: razas,
      });
    } catch (error) {
      console.error("Error fetching razas:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener las razas" },
        { status: 500 }
      );
    }
  }

  /**
   * POST - Crear raza
   */
  static async create(request: NextRequest) {
    try {
      const data = await request.json();
      const nueva = await RazasService.create(data);

      return NextResponse.json(
        {
          success: true,
          data: nueva,
          message: "Raza creada exitosamente",
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error("Error creating raza:", error);

      if (error.code === "23503") {
        return NextResponse.json(
          { success: false, error: "La especie especificada no existe" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, error: "Error al crear la raza" },
        { status: 500 }
      );
    }
  }

  /**
   * GET BY ID
   */
  static async getById(id: string) {
    try {
      const raza = await RazasService.findById(id);

      if (!raza) {
        return NextResponse.json(
          { success: false, error: "Raza no encontrada" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: raza,
      });
    } catch (error) {
      console.error("Error fetching raza:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener la raza" },
        { status: 500 }
      );
    }
  }

  /**
   * PUT - Actualizar raza
   */
  static async update(request: NextRequest, id: string) {
    try {
      const data = await request.json();
      const updated = await RazasService.update(id, data);

      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Raza no encontrada" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: updated,
        message: "Raza actualizada correctamente",
      });
    } catch (error) {
      console.error("Error updating raza:", error);
      return NextResponse.json(
        { success: false, error: "Error al actualizar la raza" },
        { status: 500 }
      );
    }
  }
}
