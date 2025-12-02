/**
 * API Routes: Roles de Usuario
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/roles - Listar roles (✅ EJEMPLO REFACTORIZADO)
 * POST /api/roles - Crear rol (TODO: Refactorizar)
 */

import { RolesController } from "@/app/controllers/roles.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET() {
  return RolesController.getAll();
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return RolesController.create(request);
// }
