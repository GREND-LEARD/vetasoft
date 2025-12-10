/**
 * API Routes: Cita Individual
 * GET /api/citas/[id] - Obtener cita por ID
 * PUT /api/citas/[id] - Actualizar cita
 * DELETE /api/citas/[id] - Cancelar cita
 */

import { NextRequest } from "next/server";
import { CitasController } from "@/app/controllers/citas.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Obtener cita por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return CitasController.getById(parseInt(id));
}

// PUT - Actualizar cita
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const data = await request.json();
  return CitasController.update(parseInt(id), data);
}

// DELETE - Cancelar cita
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return CitasController.delete(parseInt(id));
}


