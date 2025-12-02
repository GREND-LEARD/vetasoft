/**
 * API Routes: Veterinarios
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/veterinarios - Listar veterinarios (✅ EJEMPLO REFACTORIZADO)
 * POST /api/veterinarios - Crear veterinario (TODO: Refactorizar)
 */

import { VeterinariosController } from "@/app/controllers/veterinarios.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET() {
  return VeterinariosController.getAll();
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return VeterinariosController.create(request);
// }
