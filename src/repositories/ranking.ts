import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { BettingRequest, BettingResultResponse, GameResult, GameResultUpdate, TotalEarnedPoint, MiniGameType, gameType, UserRankingType, UserRankingListType } from "../models/sample";

const prisma = new PrismaClient();
//랭킹 조회
export const getTop10UsersByTotalPoint = async () : Promise<UserRankingListType> => {
    return await prisma.user.findMany({
      select: {
        userCardAddress: true,
        totalPoint: true,
        pointDate: true 
      },
      orderBy: {
        totalPoint: 'desc',
        pointDate: 'asc'
      },
      take: 10,
    });
  };
  
  export const getUserRankingById = async (userId: number) : Promise< number >=> {
    const users = await prisma.user.findMany({
      orderBy: {
        totalPoint: 'desc',
        pointDate: 'asc'
      },
    });
  
    const ranking = users.findIndex(user => user.id === userId) + 1;
    return ranking;
  };