-- CreateTable
CREATE TABLE `Pendidikan` (
    `id` VARCHAR(191) NOT NULL,
    `hakimId` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pendidikan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pekerjaan` (
    `id` VARCHAR(191) NOT NULL,
    `hakimId` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pekerjaan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pendidikan` ADD CONSTRAINT `Pendidikan_hakimId_fkey` FOREIGN KEY (`hakimId`) REFERENCES `Hakim`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pekerjaan` ADD CONSTRAINT `Pekerjaan_hakimId_fkey` FOREIGN KEY (`hakimId`) REFERENCES `Hakim`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
