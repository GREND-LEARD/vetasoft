
import { NextRequest } from "next/server";
import { UsuariosController } from "@/app/controllers/usuarios.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}


export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return UsuariosController.getById(parseInt(id));
}


export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const data = await request.json();
  return UsuariosController.update(parseInt(id), data);
}


export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return UsuariosController.delete(parseInt(id), );
}
