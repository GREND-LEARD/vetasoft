



import { RolesController } from "@/app/controllers/roles.controller";

export async function GET() {
  return RolesController.getAll();
}


