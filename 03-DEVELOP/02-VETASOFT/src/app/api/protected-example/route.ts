/**
 * EJEMPLO: Ruta protegida con autenticación
 * 
 * Este endpoint solo es accesible para usuarios autenticados.
 * Para proteger cualquier ruta, simplemente envuelve el handler con withAuth()
 */

import { withAuth } from "@/app/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async (request: NextRequest) => {
  // El usuario autenticado está disponible en request.user
  const user = (request as any).user;
  
  return NextResponse.json({
    success: true,
    message: "Esta es una ruta protegida",
    authenticatedUser: user,
  });
});
