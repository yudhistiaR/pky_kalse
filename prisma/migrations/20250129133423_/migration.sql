/*
  Warnings:

  - You are about to drop the column `riwayat_pekerjaan` on the `Hakim` table. All the data in the column will be lost.
  - You are about to drop the column `riwayat_pendidikan` on the `Hakim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Hakim` DROP COLUMN `riwayat_pekerjaan`,
    DROP COLUMN `riwayat_pendidikan`;
