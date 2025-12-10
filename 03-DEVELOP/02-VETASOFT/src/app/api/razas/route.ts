/**
 * API Routes: Razas
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/razas - Listar razas (EJEMPLO REFACTORIZADO)
 * POST /api/razas - Crear raza (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { RazasController } from "@/app/controllers/razas.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return RazasController.getAll(request);
}

// TODO: Implementa POST siguiendo el patrón
export async function POST(request: NextRequest) {
  const data = await request.json();
  return RazasController.create(data);
} 



