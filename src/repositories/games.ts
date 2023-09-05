import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { BettingRequest, BettingResultResponse,BettingResult, GameResult, GameResultUpdate, TotalEarnedPoint, gameType } from "../models/sample";

const prisma = new PrismaClient();

//사용자 베팅 정보 저장
export const saveBetting = async (
    bettingData: BettingRequest,
    userId: number, 
    gameType: gameType
): Promise<number> => {
    return prisma.betting.create({
        data: {
            userId: userId,
            gameType: gameType,
            selected: bettingData.selected,
            playing: bettingData.playing,
            predictedWinner: bettingData.predictedWinner,
            predictedScore: bettingData.predictedScore,
            bettingPoint: bettingData.bettingPoint
        }
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
}

//사용자 베팅 정보 조회
export const getBetting = async (userId: number, gameType: string): Promise<BettingRequest> => {
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
            throw new PrismaError("No matching betting record found");
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
export const getGameResult = async (gameType: string): Promise<GameResult> => {
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
            throw new PrismaError("No matching game result found");
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

//베팅 결과 확인 저장
export const checkBettingResult = async (BettingResultData: BettingResult, userId: number, gameType: string): Promise<BettingResult> => {
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
        }).then((result) => {
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
        const currentDate = new Date().toISOString();
        
        return prisma.user.update({
            where: { id: userId },
            data: {
                totalPoint: totalPoint,
                isTaken: true,
                pointDate: currentDate
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

export const pointChange = async (userId: number, point: number): Promise<number> => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new PrismaError("User not found");
    }

    if (user.totalPoint + point < 0) {
        throw new PrismaError("Not enough points");
    }
    const currentDate = new Date().toISOString();

    return prisma.user.update({
        where: { id: userId },
        data: {
            totalPoint: {
                increment: point
            },
            pointDate : currentDate
        }
    }).then((result) => {
        return result.totalPoint;
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
};

