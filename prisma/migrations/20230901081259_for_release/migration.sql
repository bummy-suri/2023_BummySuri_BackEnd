-- CreateTable
CREATE TABLE `NFTCount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `KoreaCount` INTEGER NOT NULL DEFAULT 0,
    `YonseiCount` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
