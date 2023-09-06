-- CreateTable
CREATE TABLE `NftMetadata` (
    `owner` INTEGER NOT NULL,
    `contractAddr` VARCHAR(191) NOT NULL,
    `tokenId` VARCHAR(191) NOT NULL,
    `imageHash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NftMetadata_owner_key`(`owner`),
    PRIMARY KEY (`contractAddr`, `tokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NftMetadata` ADD CONSTRAINT `NftMetadata_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
