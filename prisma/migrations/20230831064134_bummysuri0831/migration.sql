/*
  Warnings:

  - You are about to drop the column `NFT_image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userCardAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `NFT_image`,
    DROP COLUMN `name`,
    ADD COLUMN `isMinted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isTaken` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `univ` ENUM('KOREA', 'YONSEI') NULL,
    MODIFY `totalPoint` INTEGER NOT NULL DEFAULT 2000;

-- CreateIndex
CREATE UNIQUE INDEX `User_userCardAddress_key` ON `User`(`userCardAddress`);
