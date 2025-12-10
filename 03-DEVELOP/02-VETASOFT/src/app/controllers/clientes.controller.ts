import { NextResponse, NextRequest } from "next/server";
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
  static async create(request: NextRequest) {
    try {
      const data = await request.json();
      const cliente = await ClientesService.create(data);
      return NextResponse.json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al actrualizar el usuario",
        },
        { status: 500 }
      );
    }
  }
  /**
   * GET BY ID - Obtener un cliente específico con sus animales
   */
 static async getById(id: string) {
    try {
      const cliente = await ClientesService.findById(id); 
      return NextResponse.json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      console.error("Error al encontrar el cliente:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el cliente",
        },
        { status: 500 }
      );
    }
 }
  // TODO: Agregar método update para PUT

  static async update(id: string, data: any) {
    try {
      const cliente = await ClientesService.update(id, data); 
      return NextResponse.json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al actualizar el cliente",
        },
        { status: 500 }
      );
    }
  }
  // TODO: Agregar método delete para DELETE
  static async delete(id: string) {
    try {
      const cliente = await ClientesService.deactivate(id); 
      return NextResponse.json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      console.error("Error al desactivar el cliente:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al desactivar el cliente",    
        }, {status:500});}
  }}
