


import { VeterinariosController } from "@/app/controllers/veterinarios.controller";
import { NextRequest } from "next/server";

// ✅ GET - EJEMPLO REFACTORIZADO
export async function GET() {
  return VeterinariosController.getAll();
}

export async function POST(request: NextRequest,) {
  return VeterinariosController.create(request)
}

