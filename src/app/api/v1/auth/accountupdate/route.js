import { AuthController } from "@/app/api/controller/AuthController";

export async function PATCH(req, _) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || null;

  return await AuthController.CHANGEPASSWORD(id, req);
}
