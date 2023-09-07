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
          id: user.issued[0].tokenid,
          contractAddr: user.issued[0].contractAddr
      }
  });

      return {
        userCardAddress: user.userCardAddress,
        totalPoint: user.totalPoint,
        image: nftMetadata ? nftMetadata.image : null,
        contractAddr: user.issued[0].contractAddr
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
  if (!users) {
    throw new PrismaError("users not found");
  }
  const userCardAddress = users[0].userCardAddress;
  const totalPoint = users[0].totalPoint;
  const ranking = users.findIndex(user => user.id === userId) + 1;

  if (!users || !users[0] || !users[1]) {
    throw new PrismaError("users not found");
  }

  // if (!users[0].issued || !users[0].issued[0] || !users[0].issued[1]) {
  //   throw new PrismaError("Required fields are missing in users array");
  // }


  const NFTMetaData = await prisma.token.findFirst({
    where: {
      id: users[0].issued[0].tokenid,
      contractAddr: users[0].issued[0].contractAddr
    }
  });
  if (!NFTMetaData) {
    throw new PrismaError("NFTMetaData not found");
  }

  const image = NFTMetaData.image;
  const contractAddr = users[0].issued[0].contractAddr;

  return {
    userCardAddress: userCardAddress,
    totalPoint: totalPoint,
    ranking: ranking,
    image: image,
    contractAddr: contractAddr
  };
};
