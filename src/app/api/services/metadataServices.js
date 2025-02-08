import { prisma } from "@/lib/db";

export class MetaDataServices {
  static async HAKIM() {
    return await prisma.metaData.findMany();
  }

  static async FILTERHAKIMDATA(req) {
    const { page, limit, search: searchData, start, end } = req;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const filter = {
      OR: [
        {
          nama: {
            search: searchData,
          },
        },
        {
          jabatan_lama: {
            search: searchData,
          },
        },
        {
          jabatan_baru: {
            search: searchData,
          },
        },
        ...(start && end
          ? [
              {
                tanggal_tmp: {
                  gte: new Date(start),
                  lte: new Date(end),
                },
              },
            ]
          : []),
      ],
    };

    const whereFilter = searchData || (start && end) ? filter : {};

    const totalItems = await prisma.metaData.count({
      where: whereFilter,
    });

    const hakim = await prisma.metaData.findMany({
      orderBy: {
        tanggal_tmp: "desc",
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

  static async CREATEMANY(req) {
    return await prisma.metaData.createMany({ data: req });
  }
}
