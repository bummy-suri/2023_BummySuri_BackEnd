/*
  Warnings:

  - The primary key for the `Attribute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `Attribute` table. All the data in the column will be lost.
  - Added the required column `trait_type` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Attribute` DROP PRIMARY KEY,
    DROP COLUMN `key`,
    ADD COLUMN `trait_type` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`tokenid`, `trait_type`);
