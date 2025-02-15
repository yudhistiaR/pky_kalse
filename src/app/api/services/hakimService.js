import { prisma } from "@/lib/db";

export class HakimServices {
  static async GETHAKIM() {
    return await prisma.hakim.findMany({
      include: {
        pengadilan: {
          orderBy: {
            nama: "desc",
          },
          select: {
            nama: true,
          },
        },
      },
    });
  }

  static async GETID(id) {
    return await prisma.hakim.findMany({
      where: {
        id: id,
      },
      include: {
        anak: true,
        pemberitaan: true,
        pekerjaan: true,
        pendidikan: true,
        pengadilan: true,
      },
    });
  }

  static async FILTERHAKIMDATA(req) {
    const { page, limit, search: searchData } = req;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const filter = searchData
      ? {
          OR: [
            {
              nip: {
                search: searchData,
              },
            },
            {
              nama: {
                search: searchData,
              },
            },
            {
              jabatan: {
                search: searchData,
              },
            },
            {
              golongan: {
                search: searchData,
              },
            },
          ],
        }
      : {};

    const whereFilter = searchData ? filter : {};

    const totalItems = await prisma.hakim.count({
      where: filter,
    });

    const hakim = await prisma.hakim.findMany({
      orderBy: {
        nama: "desc",
      },
      include: {
        anak: true,
        pemberitaan: true,
        pekerjaan: true,
        pendidikan: true,
        pengadilan: true,
      },
      where: whereFilter,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const totalPage = Math.ceil(totalItems / limitNumber);

    return {
      currentPage: pageNumber,
      totalPage,
      totalItems,
      data: hakim,
    };
  }

  static async CREATE(req) {
    console.log("server", req);
    return await prisma.hakim.create({ data: req });
  }

  static async UPDATE(id, req) {
    return await prisma.hakim.update({ where: { id: id }, data: req });
  }

  static async DELETE(id) {
    return await prisma.hakim.delete({ where: { id: id } });
  }
  static async DELETEMANY(req) {
    return await prisma.hakim.deleteMany({
      where: {
        id: {
          in: req.userId,
        },
      },
    });
  }
}
