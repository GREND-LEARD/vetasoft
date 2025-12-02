/**
 * API Routes: Historial de Vacunación
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/historial-vacunacion - Listar historial (✅ EJEMPLO REFACTORIZADO)
 * POST /api/historial-vacunacion - Registrar vacunación (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { HistorialVacunacionController } from "@/app/controllers/historial-vacunacion.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return HistorialVacunacionController.getAll(request);
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return HistorialVacunacionController.create(request);
// }

