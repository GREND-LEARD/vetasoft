/**
 * API Routes: Donaciones
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/donaciones - Listar donaciones (✅ EJEMPLO REFACTORIZADO)
 * POST /api/donaciones - Registrar donación (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { DonacionesController } from "@/app/controllers/donaciones.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return DonacionesController.getAll(request);
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return DonacionesController.create(request);
// }
