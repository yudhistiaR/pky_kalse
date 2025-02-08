/*
  Warnings:

  - You are about to drop the column `alamat_kantor` on the `Hakim` table. All the data in the column will be lost.
  - You are about to drop the column `alamat_rumah` on the `Hakim` table. All the data in the column will be lost.
  - You are about to drop the column `kantor` on the `Hakim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Hakim` DROP COLUMN `alamat_kantor`,
    DROP COLUMN `alamat_rumah`,
    DROP COLUMN `kantor`,
    MODIFY `alamat_asal` TEXT NULL;
