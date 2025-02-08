import { prisma } from "@/lib/db";

export class PengadilanService {
  static async CREATE(req) {
    return await prisma.pengadilan.create({ data: req });
  }

  static async GETALL() {
    return await prisma.pengadilan.findMany({
      orderBy: {
        nama: "asc",
      },
      select: {
        id: true,
        nama: true,
        alamat: true,
        _count: {
          select: { Hakim: true },
        },
      },
    });
  }

  static async GETBYID(id) {
    return await prisma.pengadilan.findMany({
      where: { id: id },
    });
  }

  static async UPDATE(id, req) {
    return await prisma.pengadilan.update({ where: { id: id }, data: req });
  }

  static async DELETE(req) {
    return await prisma.pengadilan.delete({ where: req });
  }
}
