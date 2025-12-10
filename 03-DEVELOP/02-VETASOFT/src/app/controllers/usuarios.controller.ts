/**
 * Usuarios Controller
 * Maneja la lógica de negocio para usuarios
 */

import { NextRequest, NextResponse } from "next/server";
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

  static async getById(id: number) {
    try {
      const usuario = await UsuariosService.findById(id);

      return NextResponse.json({
        success: true,
        data: usuario,
      });
    } catch (error) {
      console.error("Error fetching usuario:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el usuario",
        },
        { status: 500 }
      );
    }
  }


  static async create(request: NextRequest) {
    try {
      const data = await request.json();

      // Validar datos requeridos
      if (!data.contrasena) {
        return NextResponse.json(
          {
            success: false,
            error: "La contraseña es obligatoria",
          },
          { status: 400 }
        );
      }

      const usuario = await UsuariosService.create(data);
      return NextResponse.json({
        success: true,
        data: usuario,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al crear el usuario",
        },
        { status: 500 }
      );
    }
  }
  
  static async update(id: number, data: any) {
    const usuario = await UsuariosService.update(id, data);
    return NextResponse.json({
      success: true,
      data: usuario,
    },
    {status: 200}
  );
  }

  static async delete(id: number) {
    const usuario = await UsuariosService.delete(id);
    return NextResponse.json({
      success: true,
      data: usuario,
    },
    {status: 200}
  );
  }

  

}
