-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userCardAddress` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `univ` ENUM('KOREA', 'YONSEI') NOT NULL,
    `NFT_image` VARCHAR(191) NULL,
    `totalPoint` INTEGER NOT NULL,

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
    `predictedScore` VARCHAR(191) NOT NULL,
    `bettingPoint` INTEGER NOT NULL,
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
    `times` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_gameType_fkey` FOREIGN KEY (`gameType`) REFERENCES `Game`(`gameType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MiniGame` ADD CONSTRAINT `MiniGame_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
