import { prisma } from "@/lib/db";

export class MetaDataServices {
  static async HAKIM() {
    return await prisma.metaData.findMany();
  }

  static async FILTERHAKIMDATA(req) {
    const { page, limit, mutasi, search: searchData, start, end } = req;

    function extractPengadilan(jabatan) {
      if (!jabatan) return "";
      const words = jabatan.split(" ");
      return words.length > 1 ? words.slice(1).join(" ") : jabatan;
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const pengadilanList = await prisma.pengadilan.findMany();
    const listMetaData = await prisma.metaData.findMany();
    const pengadilanSet = new Set(
      pengadilanList.map((p) => p.nama.toUpperCase())
    );

    if (mutasi == "enter") {
      let hasilFilter = listMetaData.filter((h) =>
        pengadilanSet.has(extractPengadilan(h.jabatan_baru))
      );

      if (searchData && searchData.trim() !== "") {
        const searchLower = searchData.toLowerCase();
        hasilFilter = hasilFilter.filter(
          (h) =>
            h.nama.toLowerCase().includes(searchLower) ||
            h.jabatan_lama.toLowerCase().includes(searchLower) ||
            h.jabatan_baru.toLowerCase().includes(searchLower)
        );
      }

      const totalItems = hasilFilter.length;
      const totalPage = Math.ceil(totalItems / limitNumber);
      const paginatedData = hasilFilter.slice(
        (pageNumber - 1) * limitNumber,
        pageNumber * limitNumber
      );

      return {
        currentPage: pageNumber,
        totalPage,
        totalItems,
        data: paginatedData,
      };
    } else if (mutasi == "exit") {
      let hasilFilter = listMetaData.filter((h) =>
        pengadilanSet.has(h.jabatan_lama)
      );

      if (searchData && searchData.trim() !== "") {
        const searchLower = searchData.toLowerCase();
        hasilFilter = hasilFilter.filter(
          (h) =>
            h.nama.toLowerCase().includes(searchLower) ||
            h.jabatan_lama.toLowerCase().includes(searchLower) ||
            h.jabatan_baru.toLowerCase().includes(searchLower)
        );
      }

      const totalItems = hasilFilter.length;
      const totalPage = Math.ceil(totalItems / limitNumber);
      const paginatedData = hasilFilter.slice(
        (pageNumber - 1) * limitNumber,
        pageNumber * limitNumber
      );

      return {
        currentPage: pageNumber,
        totalPage,
        totalItems,
        data: paginatedData,
      };
    } else {
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
  }

  static async CREATEMANY(req) {
    return await prisma.metaData.createMany({ data: req });
  }

  static async DELETEMANY(req) {
    return await prisma.metaData.deleteMany({
      where: {
        id: {
          in: req.userId,
        },
      },
    });
  }
}
