/*
  Warnings:

  - The primary key for the `NFTCount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `KoreaCount` on the `NFTCount` table. All the data in the column will be lost.
  - You are about to drop the column `YonseiCount` on the `NFTCount` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `NFTCount` table. All the data in the column will be lost.
  - Added the required column `team` to the `NFTCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NFTCount` DROP PRIMARY KEY,
    DROP COLUMN `KoreaCount`,
    DROP COLUMN `YonseiCount`,
    DROP COLUMN `id`,
    ADD COLUMN `count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `team` ENUM('KOREA', 'YONSEI') NOT NULL,
    ADD PRIMARY KEY (`team`);
