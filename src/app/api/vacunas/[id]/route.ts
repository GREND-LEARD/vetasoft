/**
 * API Routes: Vacuna Individual
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/vacunas/[id] - Obtener vacuna por ID (✅ EJEMPLO REFACTORIZADO)
 * PUT /api/vacunas/[id] - Actualizar vacuna (TODO: Refactorizar)
 * DELETE /api/vacunas/[id] - Desactivar vacuna (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { VacunasController } from "@/app/controllers/vacunas.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return VacunasController.getById(request, id);
}

// TODO: Implementa PUT siguiendo el patrón
// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   const { id } = await params;
//   return VacunasController.update(request, id);
// }

// TODO: Implementa DELETE siguiendo el patrón
// export async function DELETE(request: NextRequest, { params }: RouteParams) {
//   const { id } = await params;
//   return VacunasController.delete(request, id);
// }
