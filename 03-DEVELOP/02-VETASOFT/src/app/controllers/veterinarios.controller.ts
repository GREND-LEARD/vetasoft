/**
 * Veterinarios Controller
 * Maneja la lógica de negocio para veterinarios
 */

import { NextRequest, NextResponse } from "next/server";
import { VeterinariosService } from "@/app/services/veterinarios.service";

export class VeterinariosController {
  /**
   * GET - Listar todos los veterinarios
   */
  static async getAll() {
    try {
      const veterinarios = await VeterinariosService.findAll();

      return NextResponse.json({
        success: true,
        data: veterinarios,
      });
    } catch (error) {
      console.error("Error fetching veterinarios:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener los veterinarios",
        },
        { status: 500 }
      );
    }
  }

  static async getById(request: NextRequest, id: string) {
    try {
      const veterinario = await VeterinariosService.findById(id);

      if (!veterinario) {
        return NextResponse.json(
          { success: false, error: "Veterinario no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: veterinario,
      });
    } catch (error) {
      console.error("Error fetching veterinario:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener el veterinario" },
        { status: 500 }
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const veterinario = await VeterinariosService.create(body);

      if (!veterinario) {
        return NextResponse.json(
          { success: false, error: "Veterinario no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: veterinario,
      });
    } catch (error) {
      console.error("Error fetching veterinario:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener el veterinario" },
        { status: 500 }
      );
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const veterinario = await VeterinariosService.update(id, body);

      if (!veterinario) {
        return NextResponse.json(
          { success: false, error: "Veterinario no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: veterinario,
      });
    } catch (error) {
      console.error("Error fetching veterinario:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener el veterinario" },
        { status: 500 }
      );
    }
  }

  static async delete(request: NextRequest, id: string) {
    try {
      const veterinario = await VeterinariosService.delete(id);

      if (!veterinario) {
        return NextResponse.json(
          { success: false, error: "Veterinario no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: veterinario,
      });
    } catch (error) {
      console.error("Error fetching veterinario:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener el veterinario" },
        { status: 500 }
      );
    }
  }

}
