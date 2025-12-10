import { NextRequest } from "next/server";
import { HistorialVacunacionController } from "@/app/controllers/historial-vacunacion.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return HistorialVacunacionController.getById(request, id);
}