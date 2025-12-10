/**
 * API Routes: Solicitudes Adopcion
 * Rutas HTTP que delegan la lógica al controlador
 * 
 * GET /api/solicitudes-adopcion - Listar solicitudes
 * POST /api/solicitudes-adopcion - Crear solicitud
 */

import { NextRequest } from "next/server";
import { SolicitudesAdopcionController } from "@/app/controllers/solicitudes-adopcion.controller";

// GET - Listar todas las solicitudes
export async function GET(request: NextRequest) {
  return SolicitudesAdopcionController.getAll(request);
}

// POST - Crear nueva solicitud
export async function POST(request: NextRequest) {
  return SolicitudesAdopcionController.create(request);
}
