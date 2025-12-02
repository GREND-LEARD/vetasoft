/**
 * API Routes: Animales
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/animales - Listar animales (✅ EJEMPLO REFACTORIZADO)
 * POST /api/animales - Crear animal (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { AnimalesController } from "@/app/controllers/animales.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest) {
  return AnimalesController.getAll(request);
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return AnimalesController.create(request);
// }
