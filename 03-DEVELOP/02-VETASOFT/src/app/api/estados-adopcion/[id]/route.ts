import { NextRequest } from "next/server";
import { EstadosAdopcionController } from "@/app/controllers/estados-adopcion.controller";

export async function GET(request: NextRequest) {
return EstadosAdopcionController.getById(request);
}