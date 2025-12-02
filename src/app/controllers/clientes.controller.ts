/**
 * Clientes Controller
 * Maneja la lógica de negocio para clientes
 */

import { NextResponse } from "next/server";
import { ClientesService } from "@/app/services/clientes.service";

export class ClientesController {
  /**
   * GET - Listar todos los clientes
   */
  static async getAll() {
    try {
      const clientes = await ClientesService.findAll();

      return NextResponse.json({
        success: true,
        data: clientes,
      });
    } catch (error) {
      console.error("Error fetching clientes:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los clientes",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST

  /**
   * GET BY ID - Obtener un cliente específico con sus animales
   */


  // TODO: Agregar método update para PUT
  // TODO: Agregar método delete para DELETE
}
