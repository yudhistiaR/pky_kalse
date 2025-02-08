import { HakimController } from "@/app/api/controller/hakimController";

export async function PATCH(req, { params }) {
  const hakim_id = (await params).hakim_id;
  return HakimController.UPDATE(hakim_id, req);
}

export async function GET(req, { params }) {
  const hakim_id = (await params).hakim_id;
  return HakimController.GETID(hakim_id);
}

export async function DELETE(_, { params }) {
  const hakim_id = (await params).hakim_id;
  return HakimController.DELETE(hakim_id);
}
