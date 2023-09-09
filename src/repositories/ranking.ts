import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import {  UserRankingType, UserRankingListType, UserRankingDataType} from "../models/sample";

const prisma = new PrismaClient();
//랭킹 조회

export const getTop10UsersByTotalPoint = async (): Promise<any> => {
  const users = await prisma.user.findMany({
    where: {
      isMinted: true
    },
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
    take: 12,
  });

  console.log(users)

  const userWithNFTImages = await Promise.all(
    users.map(async (user) => {
        if (!user.issued || !user.issued[0]) {
            return null; // or return {}; based on your requirement
          }
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

  return userWithNFTImages.filter((user) => user !== null);
};

export const getUserRankingById = async (userId: number): Promise<UserRankingDataType> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      userCardAddress: true,
      totalPoint: true,
      pointDate: true,
      issued: true,
      isMinted: true
    },
    orderBy: [
      { totalPoint: 'desc' },
      { pointDate: 'asc' },
    ],
  });
  if (!users) {
    throw new PrismaError("users not found");
  }
  const ranking = users.findIndex(user => user.id === userId) + 1;
  const userCardAddress = users[ranking-1].userCardAddress;
  const totalPoint = users[ranking-1].totalPoint;




  const NFTMetaData = await prisma.token.findFirst({
    where: {
      id: users[ranking-1].issued[0].tokenid,
      contractAddr: users[ranking-1].issued[0].contractAddr
    }
  });
  if (!NFTMetaData) {
    throw new PrismaError("NFTMetaData not found");
  }

  const image = NFTMetaData.image;
  const contractAddr = users[ranking-1].issued[0].contractAddr;

  return {
    userCardAddress: userCardAddress,
    totalPoint: totalPoint,
    ranking: ranking,
    image: image,
    contractAddr: contractAddr
  };
};
