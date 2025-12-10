/**
 * API Routes: Usuarios
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/usuarios - Listar usuarios (✅ EJEMPLO REFACTORIZADO)
 * POST /api/usuarios - Crear usuario (TODO: Refactorizar)
 */

import { UsuariosController } from "@/app/controllers/usuarios.controller";
import { NextRequest } from "next/server";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return UsuariosController.getAll();
}

export async function POST(request: NextRequest){
  return UsuariosController.create(request);

} 

