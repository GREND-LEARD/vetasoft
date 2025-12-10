/**
 * API Route: Auth Register
 * POST /api/auth/register - Registrar nuevo usuario y generar token JWT
 */

import { AuthController } from "@/app/controllers/auth.controller";
import { NextRequest } from "next/server";
import { withValidation } from "@/app/middleware/validation.middleware";
import { registerSchema } from "@/app/utils/validation.schemas";

export const POST = withValidation(registerSchema, (request: NextRequest) => {
  return AuthController.register(request);
});
