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
  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const result = await AdopcionesService.create(body);
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
   * GET BY ID - Obtener una solicitud de adopción específica
   */
  static async getById(request: NextRequest, id: string) {
    try {
      const solicitud = await AdopcionesService.findById(id);

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

  static async updateEstado(request:NextRequest,  id:string)
  {
try {
    const body  = await request.json();
    const solicitud = await AdopcionesService.updateEstado(id,body);
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


  // TODO: Agregar método updateEstado para PUT (cambiar estado de solicitud)
  // Ejemplo: Pendiente (1) → Aprobada (2) o Rechazada (3)
}
