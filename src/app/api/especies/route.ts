/**
 * API Routes: Especies
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/especies - Listar especies (✅ EJEMPLO REFACTORIZADO)
 * POST /api/especies - Crear especie (TODO: Refactorizar)
 */

import { EspeciesController } from "@/app/controllers/especies.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET() {
  return EspeciesController.getAll();
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return EspeciesController.create(request);
// }
