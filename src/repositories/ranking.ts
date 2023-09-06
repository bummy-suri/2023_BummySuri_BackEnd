import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import {  UserRankingType, UserRankingListType } from "../models/sample";

const prisma = new PrismaClient();
//랭킹 조회

export const getTop10UsersByTotalPoint = async (): Promise<any> => { // Changed the return type to any for demonstration
  const users = await prisma.user.findMany({
    select: {
      id: true,
      userCardAddress: true,
      totalPoint: true,
      pointDate: true,
      issued: true
    },
    orderBy: [
      { totalPoint: 'desc' },
      { pointDate: 'asc' },
    ],
    take: 10,
  });

  const userWithNFTImages = await Promise.all(
    users.map(async (user) => {
      const nftMetadata = await prisma.token.findFirst({
        where: {
          id: user.issued[1].tokenid,
          contractAddr: user.issued[2].contractAddr
      }
  });

      return {
        userCardAddress: user.userCardAddress,
        totalPoint: user.totalPoint,
        image: nftMetadata ? nftMetadata.image : null,
      };
    })
  );

  return userWithNFTImages;
};

export const getUserRankingById = async (userId: number): Promise<{ ranking: number, image: string | null }> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      totalPoint: true,
      pointDate: true,
      issued: true
    },
    orderBy: [
      { totalPoint: 'desc' },
      { pointDate: 'asc' },
    ],
  });

  const ranking = users.findIndex(user => user.id === userId) + 1;

  const NFTMetaData = await prisma.token.findFirst({
    where: {
      id: users[1].issued[1].tokenid,
      contractAddr: users[1].issued[2].contractAddr
  }
});

  return {
    ranking,
    image: NFTMetaData ? NFTMetaData.image : null,
  };
};
