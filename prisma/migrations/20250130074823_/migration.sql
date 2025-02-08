-- AlterTable
ALTER TABLE `Pekerjaan` ADD COLUMN `dataPribadiHakimId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Pendidikan` ADD COLUMN `dataPribadiHakimId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `DataPribadiHakim` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `nip` VARCHAR(191) NULL,
    `kelahiran` VARCHAR(191) NULL,
    `agama` VARCHAR(191) NULL,
    `jenis_kelamin` VARCHAR(191) NULL,
    `status_perkawinan` VARCHAR(191) NULL,
    `jabatan` VARCHAR(191) NULL,
    `pangkat` VARCHAR(191) NULL,
    `kantor` VARCHAR(191) NULL,
    `alamat_kantor` VARCHAR(191) NULL,
    `tlp_kantor` VARCHAR(191) NULL,
    `alamat_rumah` VARCHAR(191) NULL,
    `alamat_asal` VARCHAR(191) NULL,
    `tlp_hp` VARCHAR(191) NULL,

    UNIQUE INDEX `DataPribadiHakim_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnakHakim` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `dataPribadiHakimId` VARCHAR(191) NULL,

    UNIQUE INDEX `AnakHakim_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnakHakim` ADD CONSTRAINT `AnakHakim_dataPribadiHakimId_fkey` FOREIGN KEY (`dataPribadiHakimId`) REFERENCES `DataPribadiHakim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pendidikan` ADD CONSTRAINT `Pendidikan_dataPribadiHakimId_fkey` FOREIGN KEY (`dataPribadiHakimId`) REFERENCES `DataPribadiHakim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pekerjaan` ADD CONSTRAINT `Pekerjaan_dataPribadiHakimId_fkey` FOREIGN KEY (`dataPribadiHakimId`) REFERENCES `DataPribadiHakim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
