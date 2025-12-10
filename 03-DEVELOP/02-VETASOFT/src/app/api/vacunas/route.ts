/**
 * API Routes: Vacunas
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/vacunas - Listar vacunas (✅ EJEMPLO REFACTORIZADO)
 * POST /api/vacunas - Crear vacuna (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { VacunasController } from "@/app/controllers/vacunas.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return VacunasController.getAll(request);
}

export async function POST(request: NextRequest) {
  return VacunasController.create(request);
}
