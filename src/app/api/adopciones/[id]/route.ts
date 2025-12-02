/**
 * API Routes: Solicitud de Adopción Individual
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/adopciones/[id] - Obtener solicitud por ID (✅ EJEMPLO REFACTORIZADO)
 * PUT /api/adopciones/[id] - Actualizar estado de solicitud (TODO: Refactorizar)
 * 
 * Nota: No tiene DELETE porque las solicitudes no se eliminan, solo cambian de estado
 */

import { NextRequest } from "next/server";
import { AdopcionesController } from "@/app/controllers/adopciones.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  //return AdopcionesController.getById(request, id);
}

// TODO: Implementa PUT para cambiar estado de la solicitud
// Ejemplo: estado_id: 1 (Pendiente), 2 (Aprobada), 3 (Rechazada)
// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   const { id } = await params;
//   return AdopcionesController.updateEstado(request, id);
// }
