/**
 * Authentication Middleware
 * Middleware para proteger rutas que requieren autenticación
 */

import { NextRequest, NextResponse } from "next/server";
import { JwtUtil } from "@/app/utils/jwt.util";

/**
 * Higher-Order Function para proteger rutas con autenticación JWT
 * 
 * Uso:
 * ```typescript
 * import { withAuth } from "@/app/middleware/auth.middleware";
 * 
 * export const GET = withAuth(async (request: NextRequest, context?: any) => {
 *   // El usuario autenticado está disponible en request.user
 *   const user = (request as any).user;
 *   // ... tu lógica aquí
 * });
 * ```
 */
export function withAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "No autorizado - Token no proporcionado",
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remover "Bearer "
    const payload = JwtUtil.verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: "No autorizado - Token inválido o expirado",
        },
        { status: 401 }
      );
    }

    // Agregar el usuario al request para que esté disponible en el handler
    (request as any).user = payload;

    // Continuar con el handler original
    return handler(request, context);
  };
}

/**
 * Middleware para verificar roles específicos
 * 
 * Uso:
 * ```typescript
 * import { withRole } from "@/app/middleware/auth.middleware";
 * 
 * export const GET = withRole([1], async (request: NextRequest, context?: any) => {
 *   // Solo usuarios con rol_id = 1 pueden acceder
 * });
 * ```
 */
export function withRole(allowedRoles: number[], handler: Function) {
  return withAuth(async (request: NextRequest, context?: any) => {
    const user = (request as any).user;

    if (!allowedRoles.includes(user.roleId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Acceso denegado - No tienes los permisos necesarios",
        },
        { status: 403 }
      );
    }

    return handler(request, context);
  });
}
