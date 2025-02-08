import { AuthController } from "@/app/api/controller/AuthController";

export async function POST(req) {
  return AuthController.REGISTER(req);
}
