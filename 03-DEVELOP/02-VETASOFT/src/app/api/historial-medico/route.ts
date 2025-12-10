/**
 * API Routes: Historial Médico
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/historial-medico - Listar historial (✅ EJEMPLO REFACTORIZADO)
 * POST /api/historial-medico - Crear registro (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { HistorialMedicoController } from "@/app/controllers/historial-medico.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return HistorialMedicoController.getAll(request);
}

export async function POST(request: NextRequest) {
  return HistorialMedicoController.create(request);
}

