/*
  Warnings:

  - The primary key for the `Issued` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `contractAddr` on the `Issued` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to alter the column `contractAddr` on the `Token` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `Issued` DROP FOREIGN KEY `Issued_tokenid_contractAddr_fkey`;

-- AlterTable
ALTER TABLE `Issued` DROP PRIMARY KEY,
    MODIFY `contractAddr` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`contractAddr`, `tokenid`);

-- AlterTable
ALTER TABLE `Token` MODIFY `contractAddr` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Issued` ADD CONSTRAINT `Issued_tokenid_contractAddr_fkey` FOREIGN KEY (`tokenid`, `contractAddr`) REFERENCES `Token`(`id`, `contractAddr`) ON DELETE RESTRICT ON UPDATE CASCADE;
