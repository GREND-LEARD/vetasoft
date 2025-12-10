/**
 * API Routes: Cliente Individual
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/clientes/[id] - Obtener cliente por ID (EJEMPLO REFACTORIZADO)
 * PUT /api/clientes/[id] - Actualizar cliente (TODO: Refactorizar)
 * DELETE /api/clientes/[id] - Desactivar cliente (TODO: Refactorizar)
 */

import { NextRequest } from "next/server";
import { ClientesController } from "@/app/controllers/clientes.controller";

interface RouteParams {
  params:{
    id: string;
  };
}

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request:NextRequest,{ params }: RouteParams) {
  const { id } = params;
  return ClientesController.getById(id);
}

//return ClientesController.getById(request, id);

// TODO: Implementa PUT siguiendo el patrón
export async function PUT(request: NextRequest, { params }: RouteParams) {
const { id } = params;
const data = await request.json();
return ClientesController.update(id,data);
}

// TODO: Implementa DELETE siguiendo el patrón
export async function DELETE(request:NextRequest,{ params }: RouteParams) {
const { id } =  params;
return ClientesController.delete(id);
}
