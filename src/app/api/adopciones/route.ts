/**
 * API Routes: Solicitudes de Adopción
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/adopciones - Listar solicitudes (✅ EJEMPLO REFACTORIZADO)
 * POST /api/adopciones - Crear nueva solicitud (TODO: Refactorizar siguiendo el patrón)
 * PUT /api/adopciones - Actualizar estado (TODO: Refactorizar siguiendo el patrón)
 */

import { NextRequest } from "next/server";
import { AdopcionesController } from "@/app/controllers/adopciones.controller";

// ✅ GET - EJEMPLO REFACTORIZADO
// La ruta solo maneja HTTP y delega al controlador
export async function GET(request: NextRequest) {
  return AdopcionesController.getAll(request);
}

// TODO: Implementa POST siguiendo el mismo patrón:
// 1. Crear método create() en AdopcionesService (queries SQL)
// 2. Crear método create() en AdopcionesController (validación + lógica)
// 3. Llamar al controlador aquí:
// export async function POST(request: NextRequest) {
//   return AdopcionesController.create(request);
// }

// TODO: Implementa PUT siguiendo el mismo patrón:
// 1. Crear método updateEstado() en AdopcionesService
// 2. Crear método update() en AdopcionesController
// 3. Llamar al controlador aquí:
// export async function PUT(request: NextRequest) {
//   return AdopcionesController.update(request);
// }
