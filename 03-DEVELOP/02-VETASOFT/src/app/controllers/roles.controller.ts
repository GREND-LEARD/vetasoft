/**
 * Roles Controller
 * Maneja la lógica de negocio para roles de usuario
 */

import { NextRequest, NextResponse } from "next/server";
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


  static async getById(id:number)
  {
    try{
      const role = await RolesService .findById(id);

      if(!role)
      {
        return NextResponse.json({
          success: false,
          error: "Role no encontrado",
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: role,
      });


    }
    catch(error){
      console.error("Error fetching role:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener el role",
        },
        { status: 500 }
      );
    }
  }


  
}
