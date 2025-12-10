/**
 * API Route: Auth Verify
 * GET /api/auth/verify - Verificar validez del token JWT
 */

import { AuthController } from "@/app/controllers/auth.controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return AuthController.verify(request);
}
