import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hakimSeed = async () => {
  for (let i = 0; i < 100; i++) {
    const hakim = await prisma.MetaData.create({
      data: {
        nama_hakim: `hakim-${i}`,
        jabatan_lama: `jabatan-${i}`,
        pengadilan_lama: `pengadilan-${i}`,
        jabatan_baru: `jabatan-${i}`,
        pengadilan_baru: `pengadilan-${i}`,
      },
    });
    console.log(`Create Hakim : ${hakim.nama_hakim}`);
    console.log(`Hakim Count : ${i}`);
  }
};

hakimSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
