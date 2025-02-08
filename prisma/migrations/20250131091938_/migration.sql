/*
  Warnings:

  - You are about to drop the column `pasanagan` on the `Hakim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Hakim` DROP COLUMN `pasanagan`,
    ADD COLUMN `pasangan` VARCHAR(191) NULL;
