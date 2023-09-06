/*
  Warnings:

  - You are about to drop the column `imageHash` on the `NftMetadata` table. All the data in the column will be lost.
  - Added the required column `image` to the `NftMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NftMetadata` DROP COLUMN `imageHash`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
