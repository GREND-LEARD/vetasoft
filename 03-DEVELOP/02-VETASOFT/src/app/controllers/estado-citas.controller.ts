/**
 * Estado Citas Controller
 * Maneja la lógica de negocio para estados de citas
 */

import { NextRequest, NextResponse } from "next/server";
import { EstadoCitasService } from "../services/estado-citas.service";

export class EstadoCitasController {
  /**
   * GET - Listar todos los estados de citas
   */
  static async getAll(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const activo = searchParams.get("activo");

      const filters = {
        activo: activo !== null ? activo === "true" : null,
      };

      const estados = await EstadoCitasService.findAll(filters);

      return NextResponse.json({
        success: true,
        data: estados,
      });
    } catch (error) {
      console.error("Error fetching estado citas:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los estados de citas",
        },
        { status: 500 }
      );
    }
  }
static async getById(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const estado = await EstadoCitasService.findById(Number(id));

      return NextResponse.json({
        success: true,
        data: estado,
      },
      {status:200}
    );
    } catch (error) {
      console.error("Error fetching estado citas:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el estado de citas",
        },
        { status: 500 }
      );
    }
  }  


} 
