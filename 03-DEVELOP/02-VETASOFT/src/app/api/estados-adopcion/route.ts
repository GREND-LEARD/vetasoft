/**
 * API Routes: Estados Adopcion
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/estados-adopcion - Listar estados de adopción (✅ EJEMPLO REFACTORIZADO)
 * POST /api/estados-adopcion - Crear estado adopción (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { EstadosAdopcionController } from "@/app/controllers/estados-adopcion.controller";

export async function GET(request: NextRequest) {
  return EstadosAdopcionController.getAll(request);
}

