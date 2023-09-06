-- CreateTable
CREATE TABLE `Issued` (
    `ownerid` INTEGER NOT NULL,
    `tokenid` INTEGER NOT NULL,
    `contractAddr` ENUM('KOREA', 'YONSEI') NOT NULL,

    PRIMARY KEY (`contractAddr`, `tokenid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contractAddr` ENUM('KOREA', 'YONSEI') NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `owned` BOOLEAN NOT NULL,

    UNIQUE INDEX `Token_id_contractAddr_key`(`id`, `contractAddr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attribute` (
    `tokenid` INTEGER NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tokenid`, `key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_totalPoint_idx` ON `User`(`totalPoint`);

-- CreateIndex
CREATE INDEX `User_pointDate_idx` ON `User`(`pointDate`);

-- AddForeignKey
ALTER TABLE `Issued` ADD CONSTRAINT `Issued_tokenid_contractAddr_fkey` FOREIGN KEY (`tokenid`, `contractAddr`) REFERENCES `Token`(`id`, `contractAddr`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issued` ADD CONSTRAINT `Issued_ownerid_fkey` FOREIGN KEY (`ownerid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attribute` ADD CONSTRAINT `Attribute_tokenid_fkey` FOREIGN KEY (`tokenid`) REFERENCES `Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
