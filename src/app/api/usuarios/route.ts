/**
 * API Routes: Usuarios
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/usuarios - Listar usuarios (✅ EJEMPLO REFACTORIZADO)
 * POST /api/usuarios - Crear usuario (TODO: Refactorizar)
 */

import { UsuariosController } from "@/app/controllers/usuarios.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET() {
  return UsuariosController.getAll();
}

// TODO: Implementa POST siguiendo el patrón
// export async function POST(request: NextRequest) {
//   return UsuariosController.create(request);
// }
