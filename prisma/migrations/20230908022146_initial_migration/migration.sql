-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userCardAddress` VARCHAR(191) NOT NULL,
    `univ` ENUM('KOREA', 'YONSEI') NULL,
    `pointDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalPoint` INTEGER NOT NULL DEFAULT 2000,
    `isMinted` BOOLEAN NOT NULL DEFAULT false,
    `isTaken` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_userCardAddress_key`(`userCardAddress`),
    INDEX `User_totalPoint_idx`(`totalPoint`),
    INDEX `User_pointDate_idx`(`pointDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameType` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `selected` BOOLEAN NOT NULL,
    `playing` VARCHAR(191) NOT NULL,
    `predictedWinner` VARCHAR(191) NOT NULL,
    `predictedScore` VARCHAR(191) NULL,
    `bettingPoint` VARCHAR(191) NOT NULL,
    `success` BOOLEAN NOT NULL DEFAULT false,
    `earnedPoint` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Betting_userId_gameType_key`(`userId`, `gameType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `gameType` VARCHAR(191) NOT NULL,
    `playing` VARCHAR(191) NOT NULL,
    `KoreaScore` INTEGER NOT NULL,
    `YonseiScore` INTEGER NOT NULL,

    PRIMARY KEY (`gameType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MiniGame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `times` INTEGER NOT NULL DEFAULT 0,
    `quiz` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NFTCount` (
    `team` ENUM('KOREA', 'YONSEI') NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`team`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Issued` (
    `ownerid` INTEGER NOT NULL,
    `tokenid` INTEGER NOT NULL,
    `contractAddr` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`contractAddr`, `tokenid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL,
    `contractAddr` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `owned` BOOLEAN NOT NULL,
    `priority` INTEGER NOT NULL,

    INDEX `Token_owned_idx`(`owned`),
    INDEX `Token_priority_idx`(`priority`),
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

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MiniGame` ADD CONSTRAINT `MiniGame_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issued` ADD CONSTRAINT `Issued_tokenid_contractAddr_fkey` FOREIGN KEY (`tokenid`, `contractAddr`) REFERENCES `Token`(`id`, `contractAddr`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issued` ADD CONSTRAINT `Issued_ownerid_fkey` FOREIGN KEY (`ownerid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attribute` ADD CONSTRAINT `Attribute_tokenid_fkey` FOREIGN KEY (`tokenid`) REFERENCES `Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
