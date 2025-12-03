/**
 * API Routes: Veterinario Individual
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/veterinarios/[id] - Obtener veterinario por ID (✅ EJEMPLO REFACTORIZADO)
 * PUT /api/veterinarios/[id] - Actualizar veterinario (TODO: Refactorizar)
 * DELETE /api/veterinarios/[id] - Desactivar veterinario (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { VeterinariosController } from "@/app/controllers/veterinarios.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return VeterinariosController.getById(request, id);
}

// TODO: Implementa PUT siguiendo el patrón
// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   const { id } = await params;
//   return VeterinariosController.update(request, id);
// }

// TODO: Implementa DELETE siguiendo el patrón
// export async function DELETE(request: NextRequest, { params }: RouteParams) {
//   const { id } = await params;
//   return VeterinariosController.delete(request, id);
// }
