import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const daftarPengadilan = await prisma.pengadilan.findMany();
  const hakimList = [];

  console.log("Seeding database...");

  for (let i = 1; i <= 500; i++) {
    const pengadilan = daftarPengadilan[i % daftarPengadilan.length]; // Rotasi pengadilan

    hakimList.push({
      nip: `19770813${2000 + i}121002`,
      nama: `Hakim ${i}`,
      tempat_lahir: `Kota ${i}`,
      tanggal_lahir: `198${i % 10}-08-13`,
      alamat: `Alamat Hakim ${i}`,
      agama: i % 2 === 0 ? "Islam" : "Kristen",
      jenis_kelamin: i % 2 === 0 ? "Laki-Laki" : "Perempuan",
      jabatan: `Hakim Pengadilan ${i}`,
      golongan: `IV.${String.fromCharCode(97 + (i % 4))}`, // IV.a, IV.b, IV.c, IV.d
      tlp_kantor: `0898123456${i}`,
      alamat_asal: `Alamat Asal ${i}`,
      telpon: `081234567${i}`,
      pasangan: `Pasangan ${i}`,
      pengadilanId: pengadilan.id,
    });
  }

  await prisma.hakim.createMany({
    data: hakimList,
    skipDuplicates: true,
  });

  console.log("Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
