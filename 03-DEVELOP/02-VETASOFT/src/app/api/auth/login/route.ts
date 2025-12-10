/**
 * API Route: Auth Login
 * POST /api/auth/login - Autenticar usuario y generar token JWT
 */

import { AuthController } from "@/app/controllers/auth.controller";
import { NextRequest } from "next/server";
import { withValidation } from "@/app/middleware/validation.middleware";
import { loginSchema } from "@/app/utils/validation.schemas";

export const POST = withValidation(loginSchema, (request: NextRequest) => {
  return AuthController.login(request);
});
