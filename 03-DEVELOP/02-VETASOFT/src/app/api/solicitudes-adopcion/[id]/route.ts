


import { NextRequest } from "next/server";
import { SolicitudesAdopcionController } from "@/app/controllers/solicitudes-adopcion.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return SolicitudesAdopcionController.getById(request, id);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return SolicitudesAdopcionController.updateEstado(request, id);
}
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return SolicitudesAdopcionController.delete(request, id);
}
