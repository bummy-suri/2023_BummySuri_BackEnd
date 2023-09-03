import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { BettingRequest, BettingResultResponse, GameResult, GameResultUpdate, TotalEarnedPoint, MiniGameType, gameType, UserRankingType, UserRankingListType } from "../models/sample";

const prisma = new PrismaClient();

//사용자 베팅 정보 저장
export const saveBetting = async (
    bettingData: BettingRequest,
    userId: number, 
    gameType: gameType
): Promise<number> => {
    console.log(typeof bettingData.bettingPoint);
    return prisma.betting.create({
        data: {
            userId: userId,
            gameType: gameType,
            ...bettingData,
        }
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
}

//사용자 베팅 정보 조회
export const getBetting = async (userId: number, gameType: string): Promise<BettingRequest | null> => {
    return prisma.betting.findUnique({
        where: {
            userId_gameType: {
                userId: userId,
                gameType: gameType
            }
        }
    }).then((result) => {
        if (result) {
            return {
                selected: result.selected,
                playing: result.playing,
                predictedWinner: result.predictedWinner,
                predictedScore: result.predictedScore,
                bettingPoint: result.bettingPoint
            };
        } else {
            return null;
        }
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
}

//베팅 정보 수정
export const updateBetting = async (
    bettingData: Partial<BettingRequest>,
    userId: number,
    gameType: gameType
) => {
    return prisma.betting.update({
        where: {
            userId_gameType: {
                userId: userId,
                gameType: gameType
            }
        },
        data: bettingData
    }).then((result) => {
        if (result) {
            return {
                selected: result.selected,
                playing: result.playing,
                predictedWinner: result.predictedWinner,
                predictedScore: result.predictedScore,
                bettingPoint: result.bettingPoint
            };
        } else {
            return null;
        }
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
};


//게임 결과 저장
export const saveGameResult = async (gameType: string, gameData: GameResult): Promise<string> => {
    return prisma.game.create({
        data: {
            gameType: gameType,
            ...gameData
        },
    }).then((result) => {
        return result.gameType;
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
}

//게임 결과 조회
export const getGameResult = async (gameType: string): Promise<GameResult | null> => {
    return prisma.game.findUnique({
        where: {
            gameType: gameType
        }
    }).then((result) => {
        if (result) {
            return {
                playing: result.playing,
                KoreaScore: result.KoreaScore,
                YonseiScore: result.YonseiScore,
            };
        } else {
            return null;
        }
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
}

//게임 결과 수정
export const updateGameResult = async (gameType: string, gameData: GameResultUpdate): Promise<GameResult> => {
    return prisma.game.update({
        where: {
            gameType: gameType
        },
        data: gameData
    }).then((result) => {
        return {
            playing: result.playing,
            KoreaScore: result.KoreaScore,
            YonseiScore: result.YonseiScore,
        };
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
}

//베팅 결과 확인 저장 및 포인트 반영
export const checkBettingResult = async (BettingResultData: BettingResultResponse, userId: number, gameType: string): Promise<BettingResultResponse> => {
    return prisma.betting.update({
            where: {
                userId_gameType: {
                    userId: userId,
                    gameType: gameType
                }
            },
            data: {
                success: BettingResultData.success,
                earnedPoint: BettingResultData.earnedPoint
            }
        }).then(async (result) => {

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    totalPoint: BettingResultData.totalPoint
                }
            });

            return {
                success: result.success,
                earnedPoint: result.earnedPoint,
                totalPoint: BettingResultData.totalPoint
            };
        }).catch((e) => {
            throw new PrismaError(e.message);
        });
};

//포인트 가져가기
export const totalEarnedPointResult = (userId: number, totalEarnedPoint: number): Promise<TotalEarnedPoint> => {
    return prisma.user.findUnique({
        where: { id: userId }
    })
    .then(user => {
        if (!user) {
            throw new Error('User does not exist.');
        }
        
        if (user.isTaken) {
            throw new Error('Points have already been taken.');
        }

        const totalPoint = user.totalPoint + totalEarnedPoint;
        
        return prisma.user.update({
            where: { id: userId },
            data: {
                totalPoint: totalPoint,
                isTaken: true
            }
        });
    })
    .then(updatedUser => {
        return {
            totalPoint: updatedUser.totalPoint,
            isTaken: updatedUser.isTaken
        };
    })
    .catch(e => {
        if (e instanceof PrismaError) {
            throw new PrismaError(e.message);
        } else {
            throw new Error(e.message);
        }
    });
};

//미니포인트 결과 저장 및 포인트 반영
export const saveMiniGameResult = async (userId: number, result: boolean) : Promise<MiniGameType> => {
    const POINTS_FOR_WIN = 100;
    const POINTS_FOR_LOSE = 0;

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) throw new Error("User not found");

    const miniGame = await prisma.miniGame.findFirst({
        where: { userId }
    });

    if (!miniGame) {
        throw new Error("MiniGame record not found");
    }

    const updatedTimes = miniGame.times + 1;
    const updatedTotalPoint = user.totalPoint + (result ? POINTS_FOR_WIN : POINTS_FOR_LOSE);

    // Update MiniGame times
    await prisma.miniGame.update({
        where: { id: miniGame.id },
        data: { times: updatedTimes }
    });

    // Update User totalPoint
    await prisma.user.update({
        where: { id: userId },
        data: { totalPoint: updatedTotalPoint }
    });

    return { times: updatedTimes, totalPoint: updatedTotalPoint };
};

//랭킹 조회
export const getTop10UsersByTotalPoint = async () : Promise<UserRankingListType> => {
    return await prisma.user.findMany({
      select: {
        userCardAddress: true,
        totalPoint: true
      },
      orderBy: {
        totalPoint: 'desc',
      },
      take: 10,
    });
  };
  
  export const getUserRankingById = async (userId: number) : Promise< number >=> {
    const users = await prisma.user.findMany({
      orderBy: {
        totalPoint: 'desc',
      },
    });
  
    const ranking = users.findIndex(user => user.id === userId) + 1;
    return ranking;
  };