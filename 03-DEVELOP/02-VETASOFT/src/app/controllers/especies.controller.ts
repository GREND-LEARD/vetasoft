/**
 * Especies Controller
 * Maneja la lógica de negocio para especies
 */

import { NextResponse } from "next/server";
import { EspeciesService } from "@/app/services/especies.service";

export class EspeciesController {
  /**
   * GET - Listar todas las especies
   */
  static async getAll() {
    try {
      const especies = await EspeciesService.findAll();

      return NextResponse.json({
        success: true,
        data: especies,
      });
    } catch (error) {
      console.error("Error fetching especies:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener las especies",
        },
        { status: 500 }
      );
    }
  }

  // TODO: Agregar método create para POST
  static async create(request: Request) {
    try {
      const data = await request.json();
      const especie = await EspeciesService.create(data);
      return NextResponse.json({
        success: true,
        data: especie,
      });
    } catch (error) {
      console.error("Error al crear especie", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al crear la especie",
        },
        { status: 500 }
      );
    }
}
//Por id
  static async getById(id: string) {
    try {
      const especie = await EspeciesService.findById(id);
      return NextResponse.json({
        success: true,
        data: especie,
      });
    } catch (error) {
      console.error("Error fetching especie by ID:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener la especie",
        },
        { status: 500 }
      );
    }
}
//Actualizar especie
  static async update(request: Request, id: string) {
    try {
      const especie = await request.json();
      return NextResponse.json({
        success: true,
        data: await EspeciesService.update(id, especie),
      });
    } catch (error) {
      console.error("Error al actualizar especie", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al actualizar la especie",
        },
        { status: 500 }
      );
    }
}
}
