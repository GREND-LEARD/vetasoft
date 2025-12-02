/**
 * Usuarios Controller
 * Maneja la lógica de negocio para usuarios
 */

import { NextResponse } from "next/server";
import { UsuariosService } from "@/app/services/usuarios.service";

export class UsuariosController {
  /**
   * GET - Listar todos los usuarios
   */
  static async getAll() {
    try {
      const usuarios = await UsuariosService.findAll();

      return NextResponse.json({
        success: true,
        data: usuarios,
      });
    } catch (error) {
      console.error("Error fetching usuarios:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los usuarios",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST
}
