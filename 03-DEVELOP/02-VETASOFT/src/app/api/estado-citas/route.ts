/**
 * API Routes: Estado Citas
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/estado-citas - Listar estados de citas (✅ EJEMPLO REFACTORIZADO)
 * POST /api/estado-citas - Crear estado cita (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { EstadoCitasController } from "@/app/controllers/estado-citas.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return EstadoCitasController.getAll(request);
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return EstadoCitasController.create(request);
// }
