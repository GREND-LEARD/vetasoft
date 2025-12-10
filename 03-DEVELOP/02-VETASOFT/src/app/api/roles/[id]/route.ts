/**
 * API Routes: Rol Individual
 * GET /api/roles/[id] - Obtener rol por ID
 */

import { NextRequest } from "next/server";
import { RolesController } from "@/app/controllers/roles.controller";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
  
}

// GET - Obtener rol por ID
export async function GET(request: NextRequest,{ params }: RouteParams) {
  const { id } = await params;
  return RolesController.getById(parseInt(id));
}
