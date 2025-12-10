

import { NextRequest } from "next/server";
import { VeterinariosController } from "@/app/controllers/veterinarios.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}


export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return VeterinariosController.getById(request, id);
}


export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return VeterinariosController.update(request, id);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return VeterinariosController.delete(request, id);
}
