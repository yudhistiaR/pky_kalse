import { PengadilanController } from "../../controller/PengadilanController";

export async function POST(req) {
  return await PengadilanController.CREATE(req);
}

export async function GET() {
  return await PengadilanController.GETALL();
}

export async function DELETE(req) {
  return await PengadilanController.DELETE(req);
}
