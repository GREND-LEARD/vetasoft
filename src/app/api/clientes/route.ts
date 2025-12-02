/**
 * API Routes: Clientes
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/clientes - Listar clientes (✅ EJEMPLO REFACTORIZADO)
 * POST /api/clientes - Crear cliente (TODO: Refactorizar)
 */

import { ClientesController } from "@/app/controllers/clientes.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET() {
  return ClientesController.getAll();
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return ClientesController.create(request);
// }
