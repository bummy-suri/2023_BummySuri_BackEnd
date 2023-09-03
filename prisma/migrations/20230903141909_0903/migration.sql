/*
  Warnings:

  - Added the required column `miniGameType` to the `MiniGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Betting` MODIFY `predictedScore` VARCHAR(191) NULL,
    MODIFY `bettingPoint` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MiniGame` ADD COLUMN `miniGameType` VARCHAR(191) NOT NULL;
