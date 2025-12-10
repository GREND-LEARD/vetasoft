import { NextRequest } from "next/server";
import { HistorialMedicoController } from "@/app/controllers/historial-medico.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return HistorialMedicoController.getById(request, id);
}

