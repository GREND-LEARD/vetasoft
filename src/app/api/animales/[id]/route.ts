/**
 * API Routes: Animal Individual
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/animales/[id] - Obtener animal por ID (✅ EJEMPLO REFACTORIZADO)
 * PUT /api/animales/[id] - Actualizar animal (TODO: Refactorizar)
 * DELETE /api/animales/[id] - Desactivar animal (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { AnimalesController } from "@/app/controllers/animales.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return AnimalesController.getById(request, id);
}

// TODO: Implementa PUT siguiendo el patrón
// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   const { id } = await params;
//   return AnimalesController.update(request, id);
// }

// TODO: Implementa DELETE siguiendo el patrón
// export async function DELETE(request: NextRequest, { params }: RouteParams) {
//   const { id } = await params;
//   return AnimalesController.delete(request, id);
// }

