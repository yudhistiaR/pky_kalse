/*
  Warnings:

  - You are about to drop the column `dataPribadiHakimId` on the `AnakHakim` table. All the data in the column will be lost.
  - You are about to drop the column `dataPribadiHakimId` on the `Pekerjaan` table. All the data in the column will be lost.
  - You are about to drop the column `dataPribadiHakimId` on the `Pendidikan` table. All the data in the column will be lost.
  - You are about to drop the `DataPribadiHakim` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AnakHakim` DROP FOREIGN KEY `AnakHakim_dataPribadiHakimId_fkey`;

-- DropForeignKey
ALTER TABLE `Pekerjaan` DROP FOREIGN KEY `Pekerjaan_dataPribadiHakimId_fkey`;

-- DropForeignKey
ALTER TABLE `Pendidikan` DROP FOREIGN KEY `Pendidikan_dataPribadiHakimId_fkey`;

-- DropIndex
DROP INDEX `AnakHakim_dataPribadiHakimId_fkey` ON `AnakHakim`;

-- DropIndex
DROP INDEX `Pekerjaan_dataPribadiHakimId_fkey` ON `Pekerjaan`;

-- DropIndex
DROP INDEX `Pendidikan_dataPribadiHakimId_fkey` ON `Pendidikan`;

-- AlterTable
ALTER TABLE `AnakHakim` DROP COLUMN `dataPribadiHakimId`,
    ADD COLUMN `hakimId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Hakim` ADD COLUMN `pasanagan` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Pekerjaan` DROP COLUMN `dataPribadiHakimId`;

-- AlterTable
ALTER TABLE `Pendidikan` DROP COLUMN `dataPribadiHakimId`;

-- DropTable
DROP TABLE `DataPribadiHakim`;

-- CreateTable
CREATE TABLE `Pemberitaan` (
    `id` VARCHAR(191) NOT NULL,
    `hakimId` VARCHAR(191) NULL,
    `sumberBerita` VARCHAR(191) NULL,
    `judulBerita` VARCHAR(191) NULL,

    UNIQUE INDEX `Pemberitaan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pemberitaan` ADD CONSTRAINT `Pemberitaan_hakimId_fkey` FOREIGN KEY (`hakimId`) REFERENCES `Hakim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnakHakim` ADD CONSTRAINT `AnakHakim_hakimId_fkey` FOREIGN KEY (`hakimId`) REFERENCES `Hakim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
