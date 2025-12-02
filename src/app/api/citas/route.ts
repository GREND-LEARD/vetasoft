/**
 * API Routes: Citas
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/citas - Listar citas (✅ EJEMPLO REFACTORIZADO)
 * POST /api/citas - Crear cita (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { CitasController } from "@/app/controllers/citas.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return CitasController.getAll(request);
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return CitasController.create(request);
// }
