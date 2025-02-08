/*
  Warnings:

  - You are about to drop the `pengadilan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Hakim` DROP FOREIGN KEY `Hakim_pengadilanId_fkey`;

-- DropIndex
DROP INDEX `Hakim_pengadilanId_fkey` ON `Hakim`;

-- DropTable
DROP TABLE `pengadilan`;

-- CreateTable
CREATE TABLE `Pengadilan` (
    `id` VARCHAR(191) NOT NULL,
    `alamat` TEXT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pengadilan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hakim` ADD CONSTRAINT `Hakim_pengadilanId_fkey` FOREIGN KEY (`pengadilanId`) REFERENCES `Pengadilan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
