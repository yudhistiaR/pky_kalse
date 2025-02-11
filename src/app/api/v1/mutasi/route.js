import { MetaDataContollers } from "../../controller/metadataController";

export async function GET(req) {
  const searchParamas = req.nextUrl.searchParams;
  const mutasi = searchParamas.get("m");
  const page = searchParamas.get("page") || 1;
  const limit = searchParamas.get("limit") || 10;
  const search = searchParamas.get("search");
  const start = searchParamas.get("start");
  const end = searchParamas.get("end");

  if (!page && !limit) {
    return await MetaDataContollers.HAKIM();
  }

  return await MetaDataContollers.FILTERHAKIMDATA({
    mutasi,
    page,
    limit,
    search,
    start,
    end,
  });
}

export async function POST(req) {
  return await MetaDataContollers.CREATEMANY(req);
}
