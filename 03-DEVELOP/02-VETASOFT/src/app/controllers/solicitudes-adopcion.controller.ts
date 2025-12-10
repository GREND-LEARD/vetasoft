/**
 * Solicitudes Adopcion Controller
 * Maneja la lógica de negocio para solicitudes de adopción
 */

import { NextRequest, NextResponse } from "next/server";
import { SolicitudesAdopcionService } from "@/app/services/solicitudes-adopcion.service";

export class SolicitudesAdopcionController {
  /**
   * GET - Listar todas las solicitudes de adopción
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const estado_id = searchParams.get("estado_id");
      const animal_id = searchParams.get("animal_id");

      const filters = {
        estado_id: estado_id ? parseInt(estado_id) : null,
        animal_id: animal_id ? parseInt(animal_id) : null,
      };

      const solicitudes = await SolicitudesAdopcionService.findAll(filters);

      return NextResponse.json(
        {
          success: true,
          data: solicitudes,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching solicitudes:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener las solicitudes",
        },
        { status: 500 }
      );
    }
  }

  /**
   * POST - Crear nueva solicitud de adopción
   */
  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const result = await SolicitudesAdopcionService.create(body);
      return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
      console.error("Error creating solicitud:", error);
      return NextResponse.json(
        { success: false, error: "Error al crear la solicitud" },
        { status: 500 }
      );
    }
  }

  /**
   * GET - Obtener solicitud por ID
   */
  static async getById(request: NextRequest, id: string) {
    try {
      const solicitud = await SolicitudesAdopcionService.findById(id);

      if (!solicitud) {
        return NextResponse.json(
          { success: false, error: "Solicitud de adopción no encontrada" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: solicitud,
      });
    } catch (error) {
      console.error("Error fetching solicitud:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener la solicitud" },
        { status: 500 }
      );
    }
  }

  /**
   * PUT - Actualizar estado de solicitud
   */
  static async updateEstado(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const solicitud = await SolicitudesAdopcionService.updateEstado(id, body);
      return NextResponse.json({
        success: true,
        data: solicitud,
      });
    } catch (error) {
      console.error("Error updating solicitud:", error);
      return NextResponse.json(
        { success: false, error: "Error al actualizar la solicitud" },
        { status: 500 }
      );
    }
  }
  static async delete(request: NextRequest, id: string) {
    try {
      const solicitud = await SolicitudesAdopcionService.delete(id);
      return NextResponse.json({
        success: true,
        data: solicitud,
      });
    } catch (error) {
      console.error("Error deleting solicitud:", error);
      return NextResponse.json(
        { success: false, error: "Error al eliminar la solicitud" },
        { status: 500 }
      );
    }
  }
}
