/**
 * Auth Controller
 * Maneja las peticiones HTTP de autenticación
 */

import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/app/services/auth.service";

export class AuthController {
  /**
   * POST /api/auth/login
   * Autenticar usuario y generar token
   */
  static async login(request: NextRequest) {
    try {
      // Los datos ya vienen validados por el middleware Joi
      const { correo, contrasena } = (request as any).validatedData;

      const result = await AuthService.login(correo, contrasena);

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: result.message,
          },
          { status: 401 }
        );
      }

      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error("Error en login:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error interno del servidor",
        },
        { status: 500 }
      );
    }
  }

  /**
   * POST /api/auth/register
   * Registrar nuevo usuario y generar token
   */
  static async register(request: NextRequest) {
    try {
      // Los datos ya vienen validados por el middleware Joi
      const data = (request as any).validatedData;

      const result = await AuthService.register(data);

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: result.message,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.error("Error en registro:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error interno del servidor",
        },
        { status: 500 }
      );
    }
  }

  /**
   * GET /api/auth/verify
   * Verificar validez del token JWT
   */
  static async verify(request: NextRequest) {
    try {
      const authHeader = request.headers.get("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          {
            success: false,
            error: "Token no proporcionado",
          },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7); // Remover "Bearer "
      const result = await AuthService.verifyToken(token);

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: result.message,
          },
          { status: 401 }
        );
      }

      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error("Error en verificación:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Error interno del servidor",
        },
        { status: 500 }
      );
    }
  }
}
