import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import {  UserRankingType, UserRankingListType, UserRankingDataType} from "../models/sample";

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

export const getUserRankingById = async (userId: number): Promise<UserRankingDataType> => {
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
  });
  const userCardAddress = users[0].userCardAddress;
  const totalPoint = users[0].totalPoint;
  const ranking = users.findIndex(user => user.id === userId) + 1;

  const NFTMetaData = await prisma.token.findFirst({
    where: {
      id: users[1].issued[1].tokenid,
      contractAddr: users[1].issued[2].contractAddr
    }
  });
  if (!NFTMetaData) {
    throw new PrismaError("NFTMetaData not found");
  }

  const image = NFTMetaData.image;
  const contractAddr = users[1].issued[2].contractAddr;

  return {
    userCardAddress: userCardAddress,
    totalPoint: totalPoint,
    ranking: ranking,
    image: image,
    contractAddr: contractAddr
  };
};
