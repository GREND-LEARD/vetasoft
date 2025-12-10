
import { NextRequest } from "next/server";
import { AnimalesController } from "@/app/controllers/animales.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return AnimalesController.getById(request, id);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return AnimalesController.update(request, id);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return AnimalesController.delete(request, id);
}


