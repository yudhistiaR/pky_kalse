import { HakimController } from "@/app/api/controller/hakimController";

export async function GET(req, res) {
  const searchParamas = req.nextUrl.searchParams;
  const page = searchParamas.get("page") || 1;
  const limit = searchParamas.get("limit") || 10;
  const search = searchParamas.get("search");

  if (!page && !limit) {
    return await HakimController.GETHAKIM();
  }

  return await HakimController.FILTERHAKIMDATA({
    page,
    limit,
    search,
  });
}

export async function POST(req, res) {
  return HakimController.CREATE(req);
}

export async function DELETE(req, _) {
  return HakimController.DELETEMANY(req);
}
