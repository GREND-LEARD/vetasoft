/**
 * API Routes: Donación Individual
 * GET /api/donaciones/[id] - Obtener donación por ID
 * PUT /api/donaciones/[id] - Actualizar donación
 * DELETE /api/donaciones/[id] - Eliminar donación
 */

import { NextRequest } from "next/server";
import { DonacionesController } from "@/app/controllers/donaciones.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener donación por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  
  return DonacionesController.getById(Number(id));
}

// PUT - Actualizar donación
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const data = await request.json();
  return DonacionesController.update(Number(id), data);
}

// DELETE - Eliminar donación
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return DonacionesController.delete(Number(id));
}