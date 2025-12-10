/**
 * API Routes: Campañas de Donación
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/campanas - Listar campañas (✅ EJEMPLO REFACTORIZADO)
 * POST /api/campanas - Crear campaña (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { CampanasController } from "@/app/controllers/campanas.controller";


export async function GET(request: NextRequest) {
  return CampanasController.getAll(request);
}

export async function POST(request: NextRequest) {
  return CampanasController.create(request);
}


