/**
 * Roles Controller
 * Maneja la lógica de negocio para roles de usuario
 */

import { NextResponse } from "next/server";
import { RolesService } from "@/app/services/roles.service";

export class RolesController {
  /**
   * GET - Listar todos los roles
   */
  static async getAll() {
    try {
      const roles = await RolesService.findAll();

      return NextResponse.json({
        success: true,
        data: roles,
      });
    } catch (error) {
      console.error("Error fetching roles:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los roles",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST
}
