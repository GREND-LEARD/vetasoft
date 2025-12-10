

import { NextRequest, NextResponse } from "next/server";
import { AnimalesService } from "@/app/services/animales.service";

export class AnimalesController {

    static async getAll(request: NextRequest) {
        try {
            const { searchParams } = new URL(request.url);
            const cliente_id = searchParams.get("cliente_id");
            const estado = searchParams.get("estado");

            const filters = {
                cliente_id: cliente_id ? parseInt(cliente_id) : null,
                estado: estado,
            };

            const animales = await AnimalesService.findAll(filters);

            return NextResponse.json({
                success: true,
                data: animales,
            },
            { status: 200 }
          );
        } catch (error) {
            console.error("Error fetching animales:", error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Error al obtener los animales",
                },
                { status: 500 }
            );
        }
    }




  static async getById(request: NextRequest, id: string) {
    try {
      const animal = await AnimalesService.findById(id);

      if (!animal) {
        return NextResponse.json(
          { success: false, error: "Animal no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: animal,
      },
      { status: 200 }
    );
    } catch (error) {
      console.error("Error fetching animal:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener el animal" },
        { status: 500 }
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const animal = await AnimalesService.create(body);
      return NextResponse.json({
        success: true,
        data: animal,
      },
      { status: 201 }
    );
    } catch (error) {
      console.error("Error creating animal:", error);
      return NextResponse.json(
        { success: false, error: "Error al crear el animal" },
        { status: 500 }
      );
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const animal = await AnimalesService.update(id, body);
      return NextResponse.json({
        success: true,
        data: animal,
      },
      { status: 200 }
    );
    } catch (error) {
      console.error("Error updating animal:", error);
      return NextResponse.json(
        { success: false, error: "Error al actualizar el animal" },
        { status: 500 }
      );
    }
  }

  static async delete(request: NextRequest, id: string) {
    try {
      const animal = await AnimalesService.delete(id);
      return NextResponse.json({
        success: true,
        data: animal,
      },
      { status: 200 }
    );
    } catch (error) {
      console.error("Error deleting animal:", error);
      return NextResponse.json(
        { success: false, error: "Error al eliminar el animal" },
        { status: 500 }
      );
    }
  }
}
