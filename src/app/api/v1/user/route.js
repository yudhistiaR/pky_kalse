import { UserController } from "../../controller/UserController";

export async function GET(req, _) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || null;
  const search = searchParams.get("search") || null;

  if (id) {
    return await UserController.GETUSER(id);
  } else {
    return await UserController.GETUSERS(search);
  }
}

export async function PATCH(req, _) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || null;

  return await UserController.UPDATE(id, req);
}
