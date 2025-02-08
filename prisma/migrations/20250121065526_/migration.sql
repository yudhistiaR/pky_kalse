-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `telpon` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetaData` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `jabatan_lama` VARCHAR(191) NULL,
    `jabatan_baru` VARCHAR(191) NULL,
    `tanggal_tmp` DATETIME(3) NULL,

    UNIQUE INDEX `MetaData_id_key`(`id`),
    FULLTEXT INDEX `MetaData_nama_jabatan_lama_jabatan_baru_idx`(`nama`, `jabatan_lama`, `jabatan_baru`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hakim` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `jabatan` VARCHAR(191) NULL,
    `golongan` VARCHAR(191) NULL,
    `riwayat_pekerjaan` VARCHAR(191) NULL,
    `pengadilanId` VARCHAR(191) NULL,

    UNIQUE INDEX `Hakim_id_key`(`id`),
    FULLTEXT INDEX `Hakim_nama_jabatan_golongan_idx`(`nama`, `jabatan`, `golongan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengadilan` (
    `id` VARCHAR(191) NOT NULL,
    `alamat` TEXT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pengadilan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hakim` ADD CONSTRAINT `Hakim_pengadilanId_fkey` FOREIGN KEY (`pengadilanId`) REFERENCES `pengadilan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
