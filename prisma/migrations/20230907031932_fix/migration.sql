/*
  Warnings:

  - The primary key for the `Attribute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `trait_type` on the `Attribute` table. All the data in the column will be lost.
  - Added the required column `key` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Betting_gameType_fkey` ON `Betting`;

-- AlterTable
ALTER TABLE `Attribute` DROP PRIMARY KEY,
    DROP COLUMN `trait_type`,
    ADD COLUMN `key` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`tokenid`, `key`);
