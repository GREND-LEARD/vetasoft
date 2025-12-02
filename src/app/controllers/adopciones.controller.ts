/**
 * Adopciones Controller
 * Maneja la lógica de negocio para las solicitudes de adopción
 */

import { NextRequest, NextResponse } from "next/server";
import { AdopcionesService } from "@/app/services/adopciones.service";

export class AdopcionesController {
  /**
   * GET - Listar solicitudes de adopción con filtros opcionales
   */
  static async getAll(request: NextRequest) {
    try {
      // Extraer parámetros de búsqueda
      const { searchParams } = new URL(request.url);
      const estado_id = searchParams.get("estado_id");
      const animal_id = searchParams.get("animal_id");

      // Convertir a números o null
      const filters = {
        estado_id: estado_id ? parseInt(estado_id) : null,
        animal_id: animal_id ? parseInt(animal_id) : null,
      };

      // Llamar al servicio
      const solicitudes = await AdopcionesService.findAll(filters);

      return NextResponse.json({
        success: true,
        data: solicitudes,
      });
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

  // TODO: Aquí agregarás los métodos POST y PUT
  // Ejemplo estructura:
  // 
  // static async create(request: NextRequest) {
  //   try {
  //     const body = await request.json();
  //     // 1. Validar datos
  //     // 2. Llamar al servicio
  //     const result = await AdopcionesService.create(body);
  //     // 3. Retornar respuesta
  //     return NextResponse.json({ success: true, data: result }, { status: 201 });
  //   } catch (error) {
  //     // Manejar errores
  //   }
  // }
}
