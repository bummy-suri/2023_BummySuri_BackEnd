import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { UserType, BettingRequest, BettingResultResponse, GameResult, GameResultUpdate} from "../models/sample";

const prisma = new PrismaClient();

//사용자 베팅 정보 저장
export const saveBetting = async (
    bettingData: BettingRequest,
    userId: number, 
    gameType: string
): Promise<number> => {
    return prisma.betting.create({
        data: {
            userId: userId,
            gameType: gameType,
            ...bettingData
        }
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e?.message);
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
        throw new PrismaError(e?.message);
    });
}

//베팅 정보 수정
export const updateBetting = async (
    bettingData: Partial<BettingRequest>,
    userId: number,
    gameType: string
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
        throw new PrismaError(e?.message);
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
        throw new PrismaError(e?.message);
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
        throw new PrismaError(e?.message);
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
        throw new PrismaError(e?.message);
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
            throw new PrismaError(e?.message);
        });
};


//미니게임 횟수 저장
export const saveMiniGameTimes = async (
    time: number,
    userId: number
): Promise<number> => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    }).then((user) => {
        if (!user) {
            throw new Error("User not found");
        }
        return prisma.miniGame.findFirst({
            where: {
                userId: userId
            }
        });
    }).then((miniGame) => {
        if (!miniGame) {
            return prisma.miniGame.create({
                data: {
                    userId: userId,
                    times: 0
                }
            });
        } else {
            return prisma.miniGame.update({
                where: {
                    id: miniGame.id
                },
                data: {
                    times: time
                }
            });
        }
    }).then((result) => {
        return result.times;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    });
};


//미니게임 횟수 조회
export const getTimes = async (userId: number): Promise<number | null> => {
    return prisma.miniGame.findFirst({
        where: {
            userId: userId
        }
    }).then((result) => {
        if (result) {
            return result.times;
        } else {
            return 10000;
        }
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

//미니게임 포인트 저장
export const saveMiniGamePoint = async (userId: number): Promise<number> => {

        return prisma.user.findUnique({
            where: {
                id: userId
            }
        }).then((user) => {
            if (!user) {
                throw new Error("User not found");
            }

            return prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    totalPoint: user.totalPoint + 300,
                },
            });
        }).then((updatedUser) => {
            return updatedUser.totalPoint;
        }).catch((e) => {
            throw new PrismaError(e?.message);
        });
};
