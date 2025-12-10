import { NextRequest } from "next/server";
import { EspeciesController } from "@/app/controllers/especies.controller";

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET - Obtener especie por ID
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  return EspeciesController.getById(params.id);
}

/**
 * PUT - Actualizar especie por ID
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  const data = await request.json();
  return EspeciesController.update(data,params.id);
}
