-- DropIndex
DROP INDEX `Hakim_nip_nama_jabatan_golongan_idx` ON `hakim`;

-- CreateIndex
CREATE FULLTEXT INDEX `Hakim_nip_nama_jabatan_golongan_pengadilanId_idx` ON `Hakim`(`nip`, `nama`, `jabatan`, `golongan`, `pengadilanId`);
