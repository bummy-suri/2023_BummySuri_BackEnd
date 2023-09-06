-- CreateTable
CREATE TABLE `Issued` (
    `ownerid` INTEGER NOT NULL,
    `tokenid` INTEGER NOT NULL,
    `contractAddr` ENUM('KOREA', 'YONSEI') NOT NULL,

    PRIMARY KEY (`contractAddr`, `tokenid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Issued` ADD CONSTRAINT `Issued_tokenid_contractAddr_fkey` FOREIGN KEY (`tokenid`, `contractAddr`) REFERENCES `Token`(`id`, `contractAddr`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issued` ADD CONSTRAINT `Issued_ownerid_fkey` FOREIGN KEY (`ownerid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
