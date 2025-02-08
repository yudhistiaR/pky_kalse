-- DropIndex
DROP INDEX `Hakim_nama_jabatan_golongan_idx` ON `Hakim`;

-- CreateIndex
CREATE FULLTEXT INDEX `Hakim_nip_nama_jabatan_golongan_idx` ON `Hakim`(`nip`, `nama`, `jabatan`, `golongan`);
