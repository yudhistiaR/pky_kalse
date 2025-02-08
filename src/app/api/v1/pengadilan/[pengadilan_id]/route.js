import { PengadilanController } from "@/app/api/controller/PengadilanController";

export async function GET(_, { params }) {
  const pengadilan_id = (await params).pengadilan_id;
  return await PengadilanController.GETBYID(pengadilan_id);
}

export async function PATCH(req, { params }) {
  const pengadilan_id = (await params).pengadilan_id;
  return await PengadilanController.UPDATE(pengadilan_id, req);
}
